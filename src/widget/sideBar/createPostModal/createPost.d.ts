export type CropInit = {
  x: number;
  y: number;
};
export type AspectVals = {
  text: string;
  value: number;
};
export type CroppedImgForProps = Partial<CreatePostImgProps> & Pick<CreatePostImgProps, 'id'>;
export type UpdateImgById = Omit<CreatePostImgProps, 'imageUrl'>;

export type CreatePostImgProps = {
  aspect: AspectVals;
  crop: CropInit;
  croppedAreaPx: CroppedAreaPx;
  id: string;
  imageUrl: string | undefined;
  originalImageUrl: string;
  zoom: number;
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
  aspect: AspectVals;
  id: string;
};
