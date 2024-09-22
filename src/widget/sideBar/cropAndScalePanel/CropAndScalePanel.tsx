import React from 'react';

import Expand from '@/../public/assets/components/Expand';
import IconHorizontalRectangle from '@/../public/assets/components/IconHorizontalRectangle';
import IconSquare from '@/../public/assets/components/IconSquare';
import IconVerticalRectangle from '@/../public/assets/components/IconVerticalRectangle';
import Picture from '@/../public/assets/components/PictureOutline';
import PlusCircleOutline from '@/../public/assets/components/PlusCircleOutline';
import { useAppSelector } from '@/shared/lib';
import { CustomDropdownItem, CustomDropdownWrapper, Slider, Typography } from '@/shared/ui';
import { AspectRatioVals } from '@/widget/sideBar/createPostModal/createPost';
import { createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import { clsx } from 'clsx';

import s from './CropAndScalePanel.module.scss';

export const aspectRatios: AspectRatioVals[] = [
  { comp: Picture, text: 'Original', value: 1 / 1 },
  { comp: IconSquare, text: '1:1', value: 1 / 1 },
  { comp: IconVerticalRectangle, text: '4:5', value: 4 / 5 },
  { comp: IconHorizontalRectangle, text: '16:9', value: 16 / 9 }
];

type PropsCropAndScale = {
  id: string;
  onAspectChange: ({ aspect }: { aspect: AspectRatioVals }) => void;
  onZoomChange: ({ zoom }: { zoom: number }) => void;
};
export const CropAndScalePanel = (props: PropsCropAndScale) => {
  const { id, onAspectChange, onZoomChange } = props;
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  const currentImage = useAppSelector((state) => createPostSelectors.soloImg(state, id));
  const zoomVal = currentImage?.zoom;

  const isActiveRatio = (ratio: AspectRatioVals) =>
    ratio.value === aspectRatios.find((r) => r.value === ratio.value)?.value;

  return (
    <div className={s.croppingPanel}>
      <CustomDropdownWrapper
        trigger={
          <div className={s.opener}>
            <Expand style={{ height: '36px', width: '36px' }} />
          </div>
        }
        align={'start'}
        className={s.contentAspectsWrapper}
        isArrow={false}
        side={'top'}
        sideOffset={2}
      >
        {aspectRatios.map((ratio) => (
          <CustomDropdownItem
            className={clsx(s.contentAspects, isActiveRatio(ratio) && s.active)}
            key={ratio.text}
            onClick={() => onAspectChange({ aspect: ratio })}
          >
            <div className={s.aspectWrapper}>
              <Typography variant={'regular_text_16'}>{ratio.text}</Typography>
              {ratio.comp && <ratio.comp className={s.icon} height={24} width={24} />}
            </div>
          </CustomDropdownItem>
        ))}
      </CustomDropdownWrapper>
      <CustomDropdownWrapper
        trigger={
          <div className={s.opener}>
            <PlusCircleOutline style={{ height: '36px', width: '36px' }} />
          </div>
        }
        align={'start'}
        className={s.contentZoomWrapper}
        isArrow={false}
        side={'top'}
        sideOffset={2}
      >
        <CustomDropdownItem className={s.contentZoom}>
          <div className={s.scaleDialog}>
            <Slider
              onValueChange={([newValue]) => {
                onZoomChange({ zoom: newValue });
              }}
              max={3}
              min={1}
              sliderContainerClassName={s.sliderContainer}
              step={0.1}
              value={[zoomVal || 1]}
            />
          </div>
        </CustomDropdownItem>
      </CustomDropdownWrapper>
    </div>
  );
};
