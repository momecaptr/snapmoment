import React, { useRef, useState } from 'react';

import ArrowIosBackOutline from '@/../public/assets/components/ArrowIosBackOutline';
import { usePublishPostsImageMutation, usePublishPostsMutation } from '@/shared/api/profile/profileApi';
import { publicApi } from '@/shared/api/public/publicApi';
import { Image } from '@/shared/api/public/publicTypes';
// import { canvasPreview } from '@/widget/sideBar/lib/canvasPreview';
import { useAppDispatch, useAppSelector, useCustomToast } from '@/shared/lib';
import { Button, Modal, PhotosSwiper, Typography } from '@/shared/ui';
import { CreatePostDirection } from '@/widget/sideBar/createPostModal/createPost';
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { CropAndScaleSection } from '@/widget/sideBar/cropAndScaleSection/CropAndScaleSection';
import { FiltersSection } from '@/widget/sideBar/filtersSection/FiltersSection';
import { modalTitle } from '@/widget/sideBar/lib/modalTitle';
import { useNavigateBtnLogic } from '@/widget/sideBar/lib/navigateBtnLogic';
import { useSelectFilesAndShowError } from '@/widget/sideBar/lib/useSelectFilesAndShowError';
import { NoImagesPost } from '@/widget/sideBar/noImagesPost/NoImagesPost';
import { AddPostType, PublicationSection } from '@/widget/sideBar/publicationSection/PublicationSection';
import clsx from 'clsx';

import s from './CreatePostModal.module.scss';

type PropsCrPostModal = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const direction = {
  back: 'Back',
  next: 'Next'
} as const;

export const modalSection = {
  cropping: 'Cropping',
  filters: 'Filters',
  publication: 'Publication'
} as const;

// ! Это на случай, если понадобится FileReader
export const readFile = (file: File) => {
  return new Promise<string>((resolve) => {
    const reader = new FileReader();

    reader.addEventListener('load', () => resolve(reader.result as string));
    reader.readAsDataURL(file);
  });
};

export const CreatePostModal = (props: PropsCrPostModal) => {
  const { isOpen, setOpen } = props;

  const dispatch = useAppDispatch();
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  const activeSection = useAppSelector(createPostSelectors.activeSection);

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [data, setData] = useState<AddPostType>({
    description: '',
    location: ''
  });
  const [activeSwiperImgId, setActiveSwiperImgId] = useState(0);
  // const [activeSection, setActiveSection] = useState<CreatePostModalSections>(createPostModalSections.cropping);
  const imgRef = useRef<HTMLImageElement>(null);

  const [publishPostImages, { isLoading: isLoadingImages }] = usePublishPostsImageMutation();
  const [publishPostDescription, { isLoading: isLoadingDescription }] = usePublishPostsMutation();

  const { navigateBtnLogic } = useNavigateBtnLogic();

  const { showPromiseToast, showToast } = useCustomToast();

  const handleFormSubmit = (value: AddPostType) => {
    console.log({ data, imageToSend: allPostImages[0].buferUrl });
    setData(value);
  };

  const pushToSend = () => {
    // todo Отправляем на сервер изменения
    publishPostImages(allPostImages.map((el) => el.buferUrl))
      .unwrap()
      .then((res) => {
        const images = res as unknown as Image[];
        const childrenMetadata = images.map((el) => ({ uploadId: el.uploadId }));

        publishPostDescription({ childrenMetadata, description: data.description as string });
      })
      .then(() => {
        refresh();
      })
      .catch((error) => {
        showToast({ message: `${error}`, type: 'error' });
      });
  };

  const navigateBtnHandler = (direction: CreatePostDirection) => {
    navigateBtnLogic(direction);
    // activeSection === modalSection.publication && console.log('Эхай, блят');
    //   todo Когда нажали на publish, нужно взять постовские фотографии, обновить, поменяв url картинки на новый. Этот url мы и будем отправлять на сервер
  };

  const refresh = () => {
    new Promise((res) => {
      setTimeout(res, 1000);
    }).then(() => {
      dispatch(publicApi.util.resetApiState()); // Сбрасываем кэш => перезагружаем запросы.
      dispatch(createPostActions.setAllPostImgs({ images: [] }));
    });
  };

  const getIndexFromSwiper = (index: number) => {
    setActiveSwiperImgId(index);
  };

  const { onSelectFile } = useSelectFilesAndShowError(setErrorMessage);

  const nextButton = allPostImages.length ? (
    <Button
      onClick={() => {
        navigateBtnHandler(direction.next);
        console.log('А это в createPostModal');
        console.log({ data });
      }}
      type={activeSection === modalSection.publication ? 'submit' : 'button'}
      variant={'text'}
    >
      <Typography className={s.nextBtnTxt} variant={'h3'}>
        {activeSection === modalSection.publication ? 'Publish' : direction.next}
      </Typography>
    </Button>
  ) : null;

  const prevButton = allPostImages.length ? (
    <Button className={s.prevBtn} onClick={() => navigateBtnHandler(direction.back)} type={'button'} variant={'text'}>
      <ArrowIosBackOutline />
    </Button>
  ) : null;

  errorMessage && showToast({ message: `${errorMessage}`, type: 'error' });

  return (
    <Modal
      backButton={prevButton}
      className={clsx(activeSection !== modalSection.cropping && s.card)}
      classNameContent={s.createPostModal}
      nextButton={nextButton}
      onOpenChange={() => setOpen(false)}
      open={isOpen}
      showCloseButton={!allPostImages.length}
      title={modalTitle({ activeSection, allPostImages })}
    >
      <div className={clsx(s.boxContent, activeSection === modalSection.cropping ? s.fullWidth : s.splitContent)}>
        {allPostImages.length !== 0 ? (
          <>
            {activeSection === modalSection.cropping && (
              <CropAndScaleSection
                // errorMessage={errorMessage}
                onSelectFile={onSelectFile}
              />
            )}
            {activeSection !== modalSection.cropping && (
              <>
                <div className={s.leftContent}>
                  <PhotosSwiper
                    className={s.leftContentSwiper}
                    classNameImage={s.imageElement}
                    classNameSwiperSlide={s.customSwiperSide}
                    getIndex={getIndexFromSwiper}
                    sliders={allPostImages}
                    styles={allPostImages[activeSwiperImgId].filter ? allPostImages[activeSwiperImgId].filter : 'none'}
                  />
                </div>
                <div
                  className={clsx(
                    s.rightContent,
                    activeSection === modalSection.filters ? s.filtersPanel : s.publicationPanel
                  )}
                >
                  {activeSection === modalSection.filters && <FiltersSection imgIndex={activeSwiperImgId} />}
                  {activeSection === modalSection.publication && (
                    <PublicationSection onSubmitHandler={handleFormSubmit} />
                  )}
                </div>
              </>
            )}
          </>
        ) : (
          <NoImagesPost onSelectFile={onSelectFile} />
        )}
      </div>
    </Modal>
  );
};

// const pushToSend = async () => {
//   const transformedImgs = await Promise.all(
//     allPostImages.map(async (img) => {
//       const canvas = document.createElement('canvas');
//       const ctx = canvas.getContext('2d');
//       // Теперь тут, когда все манипуляции с картинками сделали, НУЖНО ОБНОВИТЬ url, то есть к обрезанному изображению добавить фильтры!
//       // НО С ДРУГОЙ СТОРОНЫ, мы показываем эту картинку. То есть мы отображаем url и будем применять к нему фильтры. А есть же место, где мы уже добавляли фильтры. ТОГДА ПОВЕРХ ТЕХ ФИЛЬТРОВ МЫ ПОЛЬЗОВАТЕЛЮ НАЛОЖЕМ ЕЩЕ ФИЛЬРЫ.
//       // Так нельзя. Значит 3 варианта: 1 - в url и сразу закрываем модалку. НО ВАЛИДАЦИЯ ВДРУГ НЕ ПРОЙДЕТ. Тогда будет некрасиво
//       // 2 -- сохранять в originURL и originURL отправлять на сервер. Но чет мне не нравится этот вариант, потому что изменения кроппирования должны произойти для originUrl тоже
//       // 3 -- сделаем еще один стейт buferURL, где сохраним изменения на этапе кроппирования, как бы буферная зона, то то сохраняет все изменения, но нигдк не показывается. ЭТО И БУДЕМ ОТПРАВЛЯТЬ НА СЕРВЕР
//       const modifiedImage = await createImage(img.url as string);
//
//       canvas.width = modifiedImage.width;
//       canvas.height = modifiedImage.height;
//
//       ctx?.drawImage(modifiedImage, 0, 0, modifiedImage.width, modifiedImage.height);
//
//       if (ctx) {
//         ctx.filter = img.filter;
//       }
//
//       ctx?.drawImage(modifiedImage, 0, 0, modifiedImage.width, modifiedImage.height);
//
//       // const newImage = new Image();
//       //
//       // newImage.src = canvas.toDataURL();
//       //
//       // const base64Data = canvas.toDataURL('image/jpeg');
//       const blob = await new Promise<Blob | null>((resolve) =>
//         canvas.toBlob((result) => resolve(result), 'image/jpeg')
//       );
//
//       // Создание объектного URL из Blob
//       const objectUrl = blob ? URL.createObjectURL(blob) : null;
//
//       return {
//         croppedAreaPx: img.croppedAreaPx,
//         id: img.id,
//         url: objectUrl
//       };
//     })
//   );
//
//   //  Сохраняем то что получилось в buferUrl. Потом будем это отправлять в запросе
//   dispatch(createPostActions.updateBuferImageUrlWithFiltered(transformedImgs));
//
//   // todo Отправляем на сервер изменения
//   await publishPostImages(allPostImages.map((el) => el.buferUrl))
//     .unwrap()
//     .then((res) => {
//       const images = res as unknown as Image[];
//       const childrenMetadata = images.map((el) => ({ uploadId: el.uploadId }));
//
//       publishPostDescription({ childrenMetadata, description: data.description as string });
//     })
//     .then(() => {
//       refresh();
//     })
//     .catch((error) => {
//       showToast({ message: `${error}`, type: 'error' });
//     });
// };
