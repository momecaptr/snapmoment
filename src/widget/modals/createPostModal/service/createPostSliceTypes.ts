import { direction, modalSection } from '../lib/createPostConstants';

export type AspectRatioVals = {
  text: string;
  value: number;
};

export type CreatePostImgProps = {
  aspect: AspectRatioVals;
  buferUrl: string;
  crop: CropInit;
  croppedAreaPx: CroppedAreaPx;
  filter: string;
  id: string;
  originUrl: string | undefined;
  url: string;
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

export type UpdateImgCrop = {
  crop: CropInit;
  id: string;
};

export type UpdateImgZoom = {
  id: string;
  zoom: number;
};

export type UpdateImgAspect = {
  aspect: AspectRatioVals;
  id: string;
};

// export type Sections = 'Cropping' | 'Filters' | 'Publication';
export type CreatePostModalSections = (typeof modalSection)[keyof typeof modalSection];
export type NextBackDirection = (typeof direction)[keyof typeof direction];
