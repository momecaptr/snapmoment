import React, { ChangeEvent, useRef, useState } from 'react';

import { useAppSelector } from '@/shared/lib';
import { Button } from '@/shared/ui';
import Slider from '@/shared/ui/slider/Slider';
import { aspectRatios } from '@/widget/sideBar/createPostModal/CreatePostModal';
import { AspectVals } from '@/widget/sideBar/createPostModal/createPost';
import { createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import clsx from 'clsx';

import s from './CropAndScalePost.module.scss';

type PropsCropAndScale = {
  onAspectChange: ({ aspect, id }: { aspect: AspectVals; id: string }) => void;
  onSelectFile: (e: ChangeEvent<HTMLInputElement>) => void;
  onZoomChange: ({ id, zoom }: { id: string; zoom: number }) => void;
};
export const CropAndScalePost = (props: PropsCropAndScale) => {
  const { onAspectChange, onSelectFile, onZoomChange } = props;
  const [scale, setScale] = useState(1);
  const [isRatioDialogOpen, setIsRatioDialogOpen] = useState(false);
  const [isScaleDialogOpen, setIsScaleDialogOpen] = useState(false);
  const ratioDialogRef = useRef<HTMLDivElement | null>(null);
  const scaleDialogRef = useRef<HTMLDivElement | null>(null);
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);

  return (
    <div className={s.croppingPanel}>
      <div className={s.ratioAndScale}>
        {isRatioDialogOpen && (
          <div ref={ratioDialogRef}>
            <div className={s.ratioDialog}>
              {aspectRatios.map((ratio) => (
                <Button
                  className={clsx(
                    s.ratioButton,
                    ratio.value === aspectRatios.find((r) => r.value === ratio.value)?.value && s.selected
                  )}
                  key={ratio.text}
                  onClick={() => onAspectChange({ aspect: ratio, id: allPostImages[0].id })}
                  type={'button'}
                  variant={'outlined'}
                >
                  {ratio.text}
                </Button>
              ))}
            </div>
          </div>
        )}
        <Button onClick={() => setIsRatioDialogOpen(!isRatioDialogOpen)} type={'button'}>
          Ratio
        </Button>
        {isScaleDialogOpen && (
          <div ref={scaleDialogRef}>
            <div className={s.scaleDialog}>
              <Slider
                onValueChange={([newValue]) => {
                  onZoomChange({ id: allPostImages[0].id, zoom: newValue });
                }}
                max={3}
                min={1}
                step={0.1}
                value={[scale]}
              />
            </div>
          </div>
        )}
        <Button onClick={() => setIsScaleDialogOpen(!isScaleDialogOpen)} type={'button'}>
          Scale
        </Button>
      </div>
    </div>
  );
};
