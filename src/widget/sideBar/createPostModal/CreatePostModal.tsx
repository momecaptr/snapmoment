import React, { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import ArrowIosBackOutline from '@/../public/assets/components/ArrowIosBackOutline';
// import { canvasPreview } from '@/widget/sideBar/lib/canvasPreview';
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Button, Modal } from '@/shared/ui';
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { CropAndScaleSection } from '@/widget/sideBar/cropAndScaleSection/CropAndScaleSection';
import { modalTitle } from '@/widget/sideBar/lib/modalTitle';
import { useNavigateBtnLogic } from '@/widget/sideBar/lib/navigateBtnLogic';
import { NoImagesPost } from '@/widget/sideBar/noImagesPost/NoImagesPost';
import clsx from 'clsx';
import Image from 'next/image';

import s from './CreatePostModal.module.scss';

type PropsCrPostModal = {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
};

export const modalSection = {
  cropping: 'Cropping',
  filters: 'Filters',
  publication: 'Publication'
} as const;

export const CreatePostModal = (props: PropsCrPostModal) => {
  const { isOpen, setOpen } = props;

  const dispatch = useAppDispatch();
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  const activeSection = useAppSelector(createPostSelectors.activeSection);

  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  // const [activeSection, setActiveSection] = useState<CreatePostModalSections>(createPostModalSections.cropping);
  const imgRef = useRef<HTMLImageElement>(null);

  const { navigateBtnLogic } = useNavigateBtnLogic();

  const navigateBtnHandler = (direction: 'back' | 'next') => {
    navigateBtnLogic(direction);
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

    const imageUrl = URL.createObjectURL(file);

    dispatch(createPostActions.addPostImgs({ imageUrl }));

    e.target.value = '';

    return () => URL.revokeObjectURL(imageUrl);
  };

  return (
    <Modal
      backButton={
        allPostImages.length ? (
          <Button onClick={() => navigateBtnHandler('back')} type={'button'}>
            <ArrowIosBackOutline />
          </Button>
        ) : null
      }
      nextButton={
        allPostImages.length ? (
          <Button onClick={() => navigateBtnHandler('next')} type={'button'}>
            Next
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
                  {allPostImages.map((img) => (
                    <div className={s.imageWrapper} key={img.id}>
                      <div className={s.imageSubWrapper}>
                        <Image
                          alt={'Post'}
                          className={s.imageElement}
                          height={500}
                          src={img.imageUrl || ''}
                          width={500}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div
                  className={clsx(
                    s.rightContent,
                    activeSection === modalSection.filters ? s.filtersPanel : s.publicationPanel
                  )}
                >
                  {activeSection === modalSection.filters && <div>Тут фильтры</div>}
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
