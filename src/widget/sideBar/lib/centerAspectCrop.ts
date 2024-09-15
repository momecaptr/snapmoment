import { centerCrop, makeAspectCrop } from 'react-image-crop';

/**
 * Эта функция создаёт обрезку изображения по заданному аспектному соотношению, чтобы изображение было отцентрировано.
 * Использует makeAspectCrop для создания обрезки с определённым соотношением сторон и центрирует её с помощью centerCrop.
 * Она нужна для автоматической установки обрезки при загрузке изображения.
 * @param mediaWidth
 * @param mediaHeight
 * @param aspect
 */
export const centerAspectCrop = (mediaWidth: number, mediaHeight: number, aspect: number) => {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%', // Единицы измерения - проценты
        width: 90 // Ширина обрезки - 90% от ширины изображения
      },
      aspect, // Соотношение сторон возьмем из state
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
};
