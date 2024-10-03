import React, { useRef, useState } from 'react';

import ArrowIosBackOutline from '@/../public/assets/components/ArrowIosBackOutline';
// import { canvasPreview } from '@/widget/sideBar/lib/canvasPreview';
import { ModalKey, useAppSelector, useCustomToast, useModal } from '@/shared/lib';
import { Button, Modal, PhotosSwiper, Typography } from '@/shared/ui';
import clsx from 'clsx';

import s from './CreatePostModal.module.scss';

import { useNavigateBtnLogic } from './hooks/useNavigateBtnLogic';
import { useSelectFilesAndShowError } from './hooks/useSelectFilesAndShowError';
import { direction, modalSection } from './lib/createPostConstants';
import { createPostSelectors } from './service/createPostSlice';
import { NextBackDirection } from './service/createPostSliceTypes';
import { AddPostSection } from './ui/addPostSection/AddPostSection';
import { CloseCreatePostModal } from './ui/closeCreatePostModal/CloseCreatePostModal';
import { CropAndScaleSection } from './ui/cropAndScaleSection/CropAndScaleSection';
import { FiltersSection } from './ui/filtersSection/FiltersSection';
import { PublicationSection } from './ui/publicationSection/PublicationSection';

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

  const closeGeneralModal = () => {
    if (activeSection !== modalSection.addPost) {
      setIsCloseModalOpen(true);
    } else {
      setOpen(false);
    }
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
        onOpenChange={closeGeneralModal}
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
