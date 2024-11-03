import React, { useRef, useState } from 'react';

import ArrowIosBackOutline from '@/../public/assets/components/ArrowIosBackOutline';
import {
  AddPost,
  CropAndScale,
  FilterImages,
  NextBackDirection,
  PublishPost,
  createPostModalDirections,
  createPostModalSections,
  createPostSelectors
} from '@/features';
// import { canvasPreview } from '@/widget/sideBar/hooks/canvasPreview';
import { ModalKey, useAppSelector, useCustomToast, useModal } from '@/shared/lib';
import { Button, Modal, PhotosSwiper, Typography } from '@/shared/ui';
import clsx from 'clsx';

import s from './CreatePostModal.module.scss';

import { useNavigateBtnLogic } from './hooks/useNavigateBtnLogic';
import { useSelectFilesAndShowError } from './hooks/useSelectFilesAndShowError';
import { CloseCreatePostModal } from './ui/closeCreatePostModal/CloseCreatePostModal';

type PropsCrPostModal = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const CreatePostModal = (props: PropsCrPostModal) => {
  const { isOpen, setOpen } = props;

  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  const activeSection = useAppSelector(createPostSelectors.activeSection);

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const [activeSwiperImgId, setActiveSwiperImgId] = useState(0);
  const submitRef = useRef<HTMLButtonElement>(null); // ref для button в PublishPost

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

  const closeGeneralModal = () => {
    if (activeSection !== createPostModalSections.addPost) {
      setIsCloseModalOpen(true);
    } else {
      setOpen(false);
    }
  };

  const nextButton = allPostImages.length ? (
    <Button
      onClick={() => {
        if (activeSection === createPostModalSections.publication) {
          submitRef.current?.click();
        } else {
          navigateBtnHandler(createPostModalDirections.next);
        }
      }}
      type={activeSection === createPostModalSections.publication ? 'submit' : 'button'}
      variant={'text'}
    >
      <Typography className={s.nextBtnTxt} variant={'h3'}>
        {activeSection === createPostModalSections.publication ? 'Publish' : createPostModalDirections.next}
      </Typography>
    </Button>
  ) : null;

  const prevButton = allPostImages.length ? (
    <Button
      className={s.prevBtn}
      onClick={() => navigateBtnHandler(createPostModalDirections.back)}
      type={'button'}
      variant={'text'}
    >
      <ArrowIosBackOutline />
    </Button>
  ) : null;

  if (errorMessage) {
    showToast({ message: `${errorMessage}`, type: 'error' });
    setErrorMessage(null);
  }

  const isAddPostSection = activeSection === createPostModalSections.addPost;
  const isCroppingSection = activeSection === createPostModalSections.cropping;

  return (
    <>
      <CloseCreatePostModal isOpen={isCloseModalOpen} setOpen={setIsCloseModalOpen} />
      <Modal
        backButton={prevButton}
        className={clsx(!isAddPostSection && !isCroppingSection && s.card)}
        classNameContent={s.createPostModal}
        nextButton={nextButton}
        onOpenChange={closeGeneralModal}
        open={isOpen}
        showCloseButton={!allPostImages.length}
        title={activeSection}
      >
        <div className={clsx(s.boxContent, isAddPostSection || isCroppingSection ? s.fullWidth : s.splitContent)}>
          {allPostImages.length !== 0 ? (
            <>
              {isCroppingSection && <CropAndScale onSelectFile={onSelectFile} />}
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
                      activeSection === createPostModalSections.filters ? s.filtersPanel : s.publicationPanel
                    )}
                  >
                    {activeSection === createPostModalSections.filters && <FilterImages imgIndex={activeSwiperImgId} />}
                    {activeSection === createPostModalSections.publication && <PublishPost submitRef={submitRef} />}
                  </div>
                </>
              )}
            </>
          ) : (
            <AddPost onSelectFile={onSelectFile} />
          )}
        </div>
      </Modal>
    </>
  );
};
