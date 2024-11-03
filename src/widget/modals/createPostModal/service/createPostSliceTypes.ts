import { PhotoAspectRatioType } from '@/entities';

import { createPostModalDirections, createPostModalSections } from '../lib/createPostConstants';

export type CreatePostImgProps = {
  aspect: PhotoAspectRatioType;
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
  aspect: PhotoAspectRatioType;
  id: string;
};

// export type Sections = 'Cropping' | 'Filters' | 'Publication';
export type CreatePostModalSections = (typeof createPostModalSections)[keyof typeof createPostModalSections];
export type NextBackDirection = (typeof createPostModalDirections)[keyof typeof createPostModalDirections];
