import {
  NextBackDirection,
  createPostActions,
  createPostModalDirections,
  createPostModalSections,
  createPostSelectors,
  getCroppedImg
} from '@/features';
import { useAppDispatch, useAppSelector } from '@/shared/lib';

// interface NavigateBtnLogic {
//   activeSection: CreatePostModalSections;
// }

/**
 * HookFunction that returns function to navigate between sections of the modal
 * Also here is logic to reset cropped area to originalImageUrl
 */

export const useNavigateBtnLogic = () => {
  const activeSection = useAppSelector(createPostSelectors.activeSection);
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  const dispatch = useAppDispatch();

  // Из-за async функции getCroppedImg, нужно все оборачивать в async тоже, чтобы передавать в стейт не массив промисов, а значения
  // Функция для сохранения обрезанных изображений при переходе на стадию Filters
  const saveCropImgToUrl = async () => {
    const newImages = await Promise.all(
      allPostImages.map(async (img) => {
        // Эта функция нужна чтобы можно было картинку из Cropper компоненты, то есть с вырезаемой областью, СОХРАНИТЬ. То есть можно было бы обрезаемое изображение пересохранить.
        // Мы не будем менять оригинал, мы сохраним это в параметре url и buferUrl
        const croppedImg = await getCroppedImg(img.originUrl, img.croppedAreaPx);
        // А тут возвращаем в url (НЕ В OriginImageURL, то есть не в оригинал, а в обрабатываемый url).

        return {
          croppedAreaPx: img.croppedAreaPx,
          id: img.id,
          url: croppedImg ?? undefined
        };
      })
    );

    dispatch(createPostActions.updateUrlAndBuferWithCropped(newImages));
  };

  const navigateBtnLogic = (directionValue: NextBackDirection) => {
    switch (activeSection) {
      case createPostModalSections.addPost:
        if (directionValue === createPostModalDirections.next) {
          dispatch(createPostActions.setActiveSection({ section: createPostModalSections.cropping }));
        } else {
          console.log('Начало');
        }
        break;
      case createPostModalSections.cropping:
        if (directionValue === createPostModalDirections.next) {
          dispatch(createPostActions.setActiveSection({ section: createPostModalSections.filters }));
          // Сохраняем обрезанные изображения
          void saveCropImgToUrl();
        } else {
          dispatch(createPostActions.setAllPostImgs({ images: [] }));
          dispatch(createPostActions.setActiveSection({ section: createPostModalSections.addPost }));
        }
        break;
      case createPostModalSections.filters:
        if (directionValue === createPostModalDirections.next) {
          dispatch(createPostActions.setActiveSection({ section: createPostModalSections.publication }));
        } else {
          dispatch(createPostActions.setActiveSection({ section: createPostModalSections.cropping }));
        }
        break;
      case createPostModalSections.publication:
        if (directionValue === createPostModalDirections.next) {
          console.log('отправить данные надобно');

          // pushToSend().then(() => {
          //   console.log({ final: allPostImages[0].buferUrl });
          // });
        } else {
          dispatch(createPostActions.setActiveSection({ section: createPostModalSections.filters }));
        }
        break;
    }
  };

  return { navigateBtnLogic };
};
