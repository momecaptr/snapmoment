import type { AspectRatioVals } from '../../../service/createPostSliceTypes';

import React from 'react';

import Expand from '@/../public/assets/components/Expand';
import IconHorizontalRectangle from '@/../public/assets/components/IconHorizontalRectangle';
import IconSquare from '@/../public/assets/components/IconSquare';
import IconVerticalRectangle from '@/../public/assets/components/IconVerticalRectangle';
import Maximize from '@/../public/assets/components/Maximize';
import MaximizeOutline from '@/../public/assets/components/MaximizeOutline';
import Picture from '@/../public/assets/components/PictureOutline';
import { useAppSelector } from '@/shared/lib';
import { CustomDropdownItem, CustomDropdownWrapper, Slider, Typography } from '@/shared/ui';
import { clsx } from 'clsx';

import s from './CropAndScalePanel.module.scss';

import { aspectRatios } from '../../../lib/createPostConstants';
import { createPostSelectors } from '../../../service/createPostSlice';

type PropsCropAndScale = {
  id: string;
  onAspectChange: ({ aspect }: { aspect: AspectRatioVals }) => void;
  onZoomChange: ({ zoom }: { zoom: number }) => void;
};

/**
 * Компонент `CropAndScalePanel` — панель для изменения соотношения сторон и масштабирования изображений.
 *
 * @description dsafds gbcz
 * @param {string} id * Уникальный идентификатор текущего изображения, используемый для получения состояния изображения из Redux.
 * @param {function} onAspectChange * Функция обратного вызова, вызываемая при изменении соотношения сторон изображения. Принимает объект с полем `aspect`, содержащим новое значение соотношения сторон.
 * @param {function} onZoomChange * Функция обратного вызова, вызываемая при изменении масштаба изображения. Принимает объект с полем `zoom`, содержащим новое значение масштаба.
 */
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
            <Expand style={{ height: '24px', width: '24px' }} />
          </div>
        }
        align={'start'}
        className={s.contentAspectsWrapper}
        classNameTriggerActive={s.ratioActive}
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
              {ratio.text === 'Original' && <Picture className={s.icon} height={24} width={24} />}
              {ratio.text === '1:1' && <IconSquare className={s.icon} height={24} width={24} />}
              {ratio.text === '4:5' && <IconVerticalRectangle className={s.icon} height={24} width={24} />}
              {ratio.text === '16:9' && <IconHorizontalRectangle className={s.icon} height={24} width={24} />}
            </div>
          </CustomDropdownItem>
        ))}
      </CustomDropdownWrapper>
      <CustomDropdownWrapper
        trigger={
          <div className={s.opener}>
            <MaximizeOutline style={{ height: '24px', width: '24px' }} />
          </div>
        }
        triggerActive={
          <div className={s.openerActive}>
            <Maximize style={{ height: '24px', width: '24px' }} />
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
