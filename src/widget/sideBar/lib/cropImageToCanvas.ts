import React from 'react';
import { type Crop } from 'react-image-crop';

interface CropImageToCanvas {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  crop: Crop;
  image: HTMLImageElement;
}

export const cropImageToCanvas = (props: CropImageToCanvas) => {
  const { canvasRef, crop, image } = props;
  const canvas = canvasRef.current;

  if (!canvas || !crop.width || !crop.height) {
    return;
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  const pixelRatio = window.devicePixelRatio;

  canvas.width = crop.width * pixelRatio;
  canvas.height = crop.height * pixelRatio;
  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';
  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );
};
