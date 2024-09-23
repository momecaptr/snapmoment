import { ElementType } from 'react';

import { modalSection } from '@/widget/sideBar/createPostModal/CreatePostModal';

export type AspectRatioVals = {
  comp?: ElementType;
  text: string;
  value: number;
};

export type CreatePostImgProps = {
  aspect: AspectRatioVals;
  crop: CropInit;
  croppedAreaPx: CroppedAreaPx;
  id: string;
  imageUrl: string | undefined;
  originalImageUrl: string;
  zoom: number;
};

export type CropInit = {
  x: number;
  y: number;
};
export type CroppedAreaPx = {
  height: number;
  width: number;
  x: number;
  y: number;
} | null;

type UpdateImgCrop = {
  crop: CropInit;
  id: string;
};

type UpdateImgZoom = {
  id: string;
  zoom: number;
};

type UpdateImgAspect = {
  aspect: AspectRatioVals;
  id: string;
};

// export type Sections = 'Cropping' | 'Filters' | 'Publication';
export type CreatePostModalSections = (typeof modalSection)[keyof typeof modalSection];
