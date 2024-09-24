import React, { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import ArrowIosBackOutline from '@/../public/assets/components/ArrowIosBackOutline';
// import { canvasPreview } from '@/widget/sideBar/lib/canvasPreview';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Button, Modal, PhotosSwiper } from '@/shared/ui';
import { CreatePostDirection } from '@/widget/sideBar/createPostModal/createPost';
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { CropAndScaleSection } from '@/widget/sideBar/cropAndScaleSection/CropAndScaleSection';
import { FiltersSection } from '@/widget/sideBar/filtersSection/FiltersSection';
import { modalTitle } from '@/widget/sideBar/lib/modalTitle';
import { useNavigateBtnLogic } from '@/widget/sideBar/lib/navigateBtnLogic';
import { NoImagesPost } from '@/widget/sideBar/noImagesPost/NoImagesPost';
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
  const [activeSwiperImgId, setActiveSwiperImgId] = useState(0);
  // const [activeSection, setActiveSection] = useState<CreatePostModalSections>(createPostModalSections.cropping);
  const imgRef = useRef<HTMLImageElement>(null);

  const { navigateBtnLogic } = useNavigateBtnLogic();

  const navigateBtnHandler = (direction: CreatePostDirection) => {
    navigateBtnLogic(direction);
  };

  const getIndexFromSwiper = (index: number) => {
    setActiveSwiperImgId(index);
  };

  const {
    control,
    formState: { errors },
    handleSubmit,
    register
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const acceptedTypes = ['image/jpeg', 'image/png'];
    const maxSizeBytes = 20 * 1024 * 1024; // 20 MB Max

    if (!file) {
      return;
    }

    if (!acceptedTypes.includes(file.type)) {
      setErrorMessage('Wrong file type');

      return;
    }

    if (file.size > maxSizeBytes) {
      setErrorMessage('Max file size should be less than 20 MB');

      return;
    }

    // const imageDataUrl: any = await readFile(file);
    // dispatch(createPostActions.addPostImgs({ url: imageDataUrl }));

    const url = URL.createObjectURL(file);

    // createObjectURL убираем, потому что проблемы со стилями могли возникнуть (что то там про то, что размер createObjectUrl, если меняю, то в CSS нужно колдовать, поэтому вот так
    dispatch(createPostActions.addPostImgs({ url }));

    e.target.value = '';

    return () => URL.revokeObjectURL(url);
  };

  return (
    <Modal
      backButton={
        allPostImages.length ? (
          <Button onClick={() => navigateBtnHandler(direction.back)} type={'button'}>
            <ArrowIosBackOutline />
          </Button>
        ) : null
      }
      nextButton={
        allPostImages.length ? (
          <Button onClick={() => navigateBtnHandler(direction.next)} type={'button'}>
            {direction.next}
          </Button>
        ) : null
      }
      className={clsx(activeSection !== modalSection.cropping && s.card)}
      classNameContent={s.createPostModal}
      onOpenChange={() => setOpen(false)}
      open={isOpen}
      showCloseButton={!allPostImages.length}
      title={modalTitle({ activeSection, allPostImages })}
    >
      <div className={clsx(s.boxContent, activeSection === modalSection.cropping ? s.fullWidth : s.splitContent)}>
        {allPostImages.length !== 0 ? (
          <>
            {activeSection === modalSection.cropping && <CropAndScaleSection onSelectFile={onSelectFile} />}
            {activeSection !== modalSection.cropping && (
              <>
                <div className={s.leftContent}>
                  <PhotosSwiper
                    className={s.leftContentSwiper}
                    classNameImage={s.imageElement}
                    classNameSwiperSlide={s.customSwiperSide}
                    getIndex={getIndexFromSwiper}
                    sliders={allPostImages}
                    styles={allPostImages[activeSwiperImgId].filter ?? 'none'}
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
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div>Описание и прочая срань</div>
                    </form>
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
