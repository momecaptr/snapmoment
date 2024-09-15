interface ScaleImageToCanvas {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  image: HTMLImageElement;
  scale: number;
}

export const scaleImageToCanvas = (props: ScaleImageToCanvas) => {
  const { canvasRef, image, scale } = props;
  const canvas = canvasRef.current;

  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  const pixelRatio = window.devicePixelRatio;

  // Рассчитываем размер изображения с учетом масштаба
  canvas.width = image.naturalWidth * scale * pixelRatio;
  canvas.height = image.naturalHeight * scale * pixelRatio;

  ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  ctx.imageSmoothingQuality = 'high';

  // Отрисовываем изображение с учетом масштаба
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth * scale,
    image.naturalHeight * scale
  );
};
