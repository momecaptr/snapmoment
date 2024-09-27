import React, { useRef, useState } from 'react';

import ArrowIosBackOutline from '@/../public/assets/components/ArrowIosBackOutline';
// import { canvasPreview } from '@/widget/sideBar/lib/canvasPreview';
import { ModalKey, useAppSelector, useCustomToast, useModal } from '@/shared/lib';
import { Button, Modal, PhotosSwiper, Typography } from '@/shared/ui';
import { AddPostSection } from '@/widget/sideBar/addPostSection/AddPostSection';
import { CloseCreatePostModal } from '@/widget/sideBar/closeCreatePostModal/CloseCreatePostModal';
import { NextBackDirection } from '@/widget/sideBar/createPostModal/createPost';
import { createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { CropAndScaleSection } from '@/widget/sideBar/cropAndScaleSection/CropAndScaleSection';
import { FiltersSection } from '@/widget/sideBar/filtersSection/FiltersSection';
import { useNavigateBtnLogic } from '@/widget/sideBar/lib/useNavigateBtnLogic';
import { useSelectFilesAndShowError } from '@/widget/sideBar/lib/useSelectFilesAndShowError';
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

export const CreatePostModal = (props: PropsCrPostModal) => {
  const { isOpen, setOpen } = props;

  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  const activeSection = useAppSelector(createPostSelectors.activeSection);

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [activeSwiperImgId, setActiveSwiperImgId] = useState(0);
  const submitRef = useRef<HTMLButtonElement>(null); // ref для button в PublicationSection

  const { isOpen: isCloseModalOpen, setOpen: setIsCloseModalOpen } = useModal(ModalKey.CreatePostOnBlur);
  const { navigateBtnLogic } = useNavigateBtnLogic();
  const { showToast } = useCustomToast();
  const { onSelectFile } = useSelectFilesAndShowError(setErrorMessage);

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

  const isAddPostSection = activeSection === modalSection.addPost;
  const isCroppingSection = activeSection === modalSection.cropping;

  return (
    <>
      <CloseCreatePostModal isOpen={isCloseModalOpen} setOpen={setIsCloseModalOpen} />
      <Modal
        backButton={prevButton}
        className={clsx(!isAddPostSection && !isCroppingSection && s.card)}
        classNameContent={s.createPostModal}
        nextButton={nextButton}
        onOpenChange={() => setIsCloseModalOpen(true)}
        open={isOpen}
        showCloseButton={!allPostImages.length}
        title={activeSection}
      >
        <div className={clsx(s.boxContent, isAddPostSection || isCroppingSection ? s.fullWidth : s.splitContent)}>
          {/*<button onClick={handleClick}>ALALALALA</button>*/}
          {allPostImages.length !== 0 ? (
            <>
              {isCroppingSection && <CropAndScaleSection onSelectFile={onSelectFile} />}
              {!isAddPostSection && !isCroppingSection && (
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
            <AddPostSection onSelectFile={onSelectFile} />
          )}
        </div>
      </Modal>
    </>
  );
};
