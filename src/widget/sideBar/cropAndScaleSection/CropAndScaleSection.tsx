import React, { ChangeEvent, useRef } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';

import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { Button } from '@/shared/ui';
import { aspectRatios } from '@/widget/sideBar/createPostModal/CreatePostModal';
import { AspectVals } from '@/widget/sideBar/createPostModal/createPost';
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { CropAndScalePanel } from '@/widget/sideBar/cropAndScalePanel/CropAndScalePanel';

import s from './CropAndScaleSection.module.scss';

type CropAndScaleSectionType = {
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const CropAndScaleSection = (props: CropAndScaleSectionType) => {
  const { onSelectFile } = props;
  const selectImgInputRef = () => inputRef.current?.click();
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);

  const onCropChange = ({ crop, id }: { crop: Point; id: string }) => {
    console.log({ crop });
    dispatch(createPostActions.updateCrop({ crop, id }));
  };

  const onZoomChange = ({ id, zoom }: { id: string; zoom: number }) => {
    dispatch(createPostActions.updateZoom({ id, zoom }));
  };

  const onAspectChange = ({ aspect, id }: { aspect: AspectVals; id: string }) => {
    if (aspect) {
      dispatch(createPostActions.updateAspect({ aspect, id }));
      if (aspect.text === aspectRatios[0].text) {
        dispatch(createPostActions.updateZoom({ id, zoom: 1 }));
        dispatch(createPostActions.updateCrop({ crop: { x: 0, y: 0 }, id }));
      }
    }
  };

  const onCropComplete = (id: string) => (croppedArea: Area, croppedAreaPixels: Area) => {
    dispatch(
      createPostActions.updateCroppedAreaPixels({
        croppedAreaPx: croppedAreaPixels,
        id
      })
    );
  };

  const cropperExtraStyles = {
    style: {
      containerStyle: {
        backgroundColor: '#333',
        backgroundPosition: 'center'
      },
      cropAreaStyle: {
        border: 'none'
      },
      mediaStyle: {
        height: '100%',
        'object-fit': 'contain'
      }
    }
  };

  return (
    <>
      <div className={s.croppingBlock}>
        {allPostImages.map((img) => (
          <div className={s.imageWrapper} key={img.id}>
            <div className={s.cropperElement}>
              <Cropper
                aspect={img.aspect.value}
                crop={img.crop}
                image={img.imageUrl}
                onCropChange={(crop) => onCropChange({ crop, id: img.id })}
                onCropComplete={onCropComplete(img.id)}
                onZoomChange={(zoom) => onZoomChange({ id: img.id, zoom })}
                showGrid={false}
                zoom={img.zoom}
                {...cropperExtraStyles}
              />
            </div>
          </div>
        ))}
        <CropAndScalePanel onAspectChange={onAspectChange} onZoomChange={onZoomChange} />
      </div>
      <Button className={s.addImg} onClick={selectImgInputRef} type={'button'}>
        AddImg
        <input
          accept={'image/jpeg, image/png'}
          id={'fileInput'}
          name={'file'}
          onChange={onSelectFile}
          ref={inputRef}
          style={{ display: 'none' }}
          type={'file'}
        />
      </Button>
    </>
  );
};
