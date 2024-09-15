import { type Crop } from 'react-image-crop';

import { cropImageToCanvas } from '@/widget/sideBar/lib/cropImageToCanvas';

export interface SaveCrop {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  completedCrop: Crop | null;
  imgRef: React.MutableRefObject<HTMLImageElement | null>;
  setPreviews: React.Dispatch<React.SetStateAction<string[]>>;
}

/**
 * Функция сохраняет обрезанное изображение в виде blob в setPreview state.
 * Она получает изображение, которое было обрезано (на основе настроек completedCrop), отрисовывает его на холсте (canvas (CROPIMAGETOCANVAS)), а затем преобразует его в blob, который сохраняется в виде URL.
 * Этот URL добавляется в превью с помощью setPreviews
 * @param props.canvasRef - холст
 * @param props.completedCrop - обрезанное изображение
 * @param props.imgRef - изображение, которое было обрезано
 * @param props.setPreviews - функция для обновления превью
 */
export const saveCroppedImageLocally = (props: SaveCrop) => {
  const { canvasRef, completedCrop, imgRef, setPreviews } = props;

  if (!completedCrop || !canvasRef.current) {
    return;
  }
  if (!imgRef.current) {
    return;
  }
  cropImageToCanvas({ canvasRef, crop: completedCrop, image: imgRef.current });

  canvasRef.current.toBlob(
    (blob) => {
      if (!blob) {
        console.error('Не удалось создать Blob');

        return;
      }

      const croppedImageUrl = URL.createObjectURL(blob);

      setPreviews([croppedImageUrl]);
      console.log('Обрезанное изображение сохранено:', croppedImageUrl);
    },
    'image/jpeg',
    1
  );
  // const croppedImageUrl = canvasRef.current.toDataURL('image/jpeg', 1);
  //
  // setPreviews([croppedImageUrl]);
  // console.log('Обрезанное изображение сохранено:', croppedImageUrl);
};
