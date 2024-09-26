import React, { useRef, useState } from 'react';

import ArrowIosBackOutline from '@/../public/assets/components/ArrowIosBackOutline';
// import { canvasPreview } from '@/widget/sideBar/lib/canvasPreview';
import { ModalKey, useAppSelector, useCustomToast, useModal } from '@/shared/lib';
import { Button, Modal, PhotosSwiper, Typography } from '@/shared/ui';
import { CloseCreatePostModal } from '@/widget/sideBar/closeCreatePostModal/CloseCreatePostModal';
import { NextBackDirection } from '@/widget/sideBar/createPostModal/createPost';
import { createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { CropAndScaleSection } from '@/widget/sideBar/cropAndScaleSection/CropAndScaleSection';
import { FiltersSection } from '@/widget/sideBar/filtersSection/FiltersSection';
import { useNavigateBtnLogic } from '@/widget/sideBar/lib/navigateBtnLogic';
import { useSelectFilesAndShowError } from '@/widget/sideBar/lib/useSelectFilesAndShowError';
import { NoImagesPost } from '@/widget/sideBar/noImagesPost/NoImagesPost';
import { PublicationSection } from '@/widget/sideBar/publicationSection/PublicationSection';
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
  addPost: 'Add Post',
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

  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  const activeSection = useAppSelector(createPostSelectors.activeSection);

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [activeSwiperImgId, setActiveSwiperImgId] = useState(0);
  const submitRef = useRef<HTMLButtonElement>(null); // ref для button в PublicationSection

  const { isOpen: isCloseModalOpen, setOpen: setIsCloseModalOpen } = useModal(ModalKey.CreatePostOnBlur);
  const { navigateBtnLogic } = useNavigateBtnLogic();
  const { showPromiseToast, showToast } = useCustomToast();
  const { onSelectFile } = useSelectFilesAndShowError(setErrorMessage);

  const pseudoPromise = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const random = Math.random();

        if (random > 0.5) {
          resolve('Success data');
        } else {
          reject('Error data');
        }
      }, 1000);
    });
  };

  const handleClick = () => {
    const promise = pseudoPromise();

    showPromiseToast(promise, {
      error: 'Error occurred',
      loading: 'Loading...',
      success: 'Success'
    });
  };

  const navigateBtnHandler = (direction: NextBackDirection) => {
    navigateBtnLogic(direction);
  };

  const getIndexFromSwiper = (index: number) => {
    setActiveSwiperImgId(index);
  };

  const nextButton = allPostImages.length ? (
    <Button
      onClick={() => {
        if (activeSection === modalSection.publication) {
          submitRef.current?.click();
        } else {
          navigateBtnHandler(direction.next);
        }
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
    <>
      <CloseCreatePostModal isOpen={isCloseModalOpen} setOpen={setIsCloseModalOpen} />
      <Modal
        backButton={prevButton}
        className={clsx(activeSection !== modalSection.cropping && activeSection !== modalSection.addPost && s.card)}
        classNameContent={s.createPostModal}
        nextButton={nextButton}
        onOpenChange={() => setIsCloseModalOpen(true)}
        open={isOpen}
        showCloseButton={!allPostImages.length}
        title={activeSection}
      >
        <button onClick={handleClick}>Некоторый клик</button>
        <div
          className={clsx(
            s.boxContent,
            activeSection === modalSection.cropping || activeSection === modalSection.addPost
              ? s.fullWidth
              : s.splitContent
          )}
        >
          {/*<button onClick={handleClick}>ALALALALA</button>*/}
          {allPostImages.length !== 0 ? (
            <>
              {activeSection === modalSection.cropping && <CropAndScaleSection onSelectFile={onSelectFile} />}
              {activeSection !== modalSection.cropping && activeSection !== modalSection.addPost && (
                <>
                  <div className={s.leftContent}>
                    <PhotosSwiper
                      styles={
                        allPostImages[activeSwiperImgId].filter ? allPostImages[activeSwiperImgId].filter : 'none'
                      }
                      className={s.leftContentSwiper}
                      classNameImage={s.imageElement}
                      classNameSwiperSlide={s.customSwiperSide}
                      getIndex={getIndexFromSwiper}
                      sliders={allPostImages}
                    />
                  </div>
                  <div
                    className={clsx(
                      s.rightContent,
                      activeSection === modalSection.filters ? s.filtersPanel : s.publicationPanel
                    )}
                  >
                    {activeSection === modalSection.filters && <FiltersSection imgIndex={activeSwiperImgId} />}
                    {activeSection === modalSection.publication && <PublicationSection submitRef={submitRef} />}
                  </div>
                </>
              )}
            </>
          ) : (
            <NoImagesPost onSelectFile={onSelectFile} />
          )}
        </div>
      </Modal>
    </>
  );
};
