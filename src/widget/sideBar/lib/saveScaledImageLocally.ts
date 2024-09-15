import { SaveCrop } from '@/widget/sideBar/lib/saveCroppedImageLocally';
import { scaleImageToCanvas } from '@/widget/sideBar/lib/scaleImageToCanvas';

interface SaveScaleCrop extends SaveCrop {
  scale: number;
}

const saveScaledImageLocally = (props: SaveScaleCrop) => {
  const { canvasRef, imgRef, scale, setPreviews } = props;

  if (!canvasRef.current || !imgRef.current) {
    return;
  }

  scaleImageToCanvas({
    canvasRef,
    image: imgRef.current,
    scale // Используем текущий коэффициент масштаба
  });

  canvasRef.current.toBlob(
    (blob) => {
      if (!blob) {
        console.error('Не удалось создать Blob');

        return;
      }

      const scaledImageUrl = URL.createObjectURL(blob);

      setPreviews([scaledImageUrl]);
      console.log('Масштабированное изображение сохранено:', scaledImageUrl);
    },
    'image/jpeg',
    1
  );
};
