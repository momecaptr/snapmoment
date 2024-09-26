/**
 * Взято вот отсюда -https://github.com/CodingWith-Adam/react-easy-crop-tutorial/blob/main/src/cropImage.js и добавил типизацию
 * Так мы меняем оригинальную фотографию, применив к ней все изменения, которые сделали на этапе фильтрации
 * Используется для создания экземпляра HTMLImageElement из заданного URL. Изображения загружаются асинхронно, и функция возвращает Promise, чтобы гарантировать, что вы получите изображение только после его полной загрузки. Это предотвращает ошибки, когда вы пытаетесь работать с изображением до того, как оно будет готово.
 * Функция также обрабатывает ошибки загрузки. Если изображение не может быть загружено (например, из-за неправильного URL или проблем с сетью), вы получите соответствующее уведомление через reject
 * Установка атрибута crossOrigin позволяет избежать проблем с CORS (Cross-Origin Resource Sharing), если изображение загружается с другого домена.
 * Используя createImage, вы упрощаете процесс работы с изображениями, гарантируя, что они загружены и готовы к использованию, а также обрабатываете возможные ошибки.
 * @param {string} url - Image File url
 */
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

function getRadianAngle(degreeValue: number): number {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Взято вот отсюда -https://github.com/CodingWith-Adam/react-easy-crop-tutorial/blob/main/src/cropImage.js и добавил типизацию
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 * @param {number} rotation - optional rotation parameter
 */
export default async function getCroppedImg(
  imageSrc: null | string | undefined,
  pixelCrop: { height: number; width: number; x: number; y: number } | null,
  rotation = 0
): Promise<null | string> {
  if (!imageSrc || !pixelCrop) {
    return null;
  }
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  // set each dimensions to double largest dimension to allow for a safe area for the
  // image to rotate in without being clipped by canvas context
  canvas.width = safeArea;
  canvas.height = safeArea;

  // translate canvas context to a central location on image to allow rotating around the center.
  ctx?.translate(safeArea / 2, safeArea / 2);
  ctx?.rotate(getRadianAngle(rotation));
  ctx?.translate(-safeArea / 2, -safeArea / 2);

  // draw rotated image and store data.
  ctx?.drawImage(image, safeArea / 2 - image.width * 0.5, safeArea / 2 - image.height * 0.5);
  const data = ctx?.getImageData(0, 0, safeArea, safeArea);

  if (!data) {
    throw new Error('Failed to retrieve image data');
  }

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image with correct offsets for x,y crop values.
  ctx?.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  );

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      if (file) {
        resolve(URL.createObjectURL(file));
      } else {
        reject(new Error('Failed to create Blob'));
      }
    }, 'image/jpeg');
  });
}
