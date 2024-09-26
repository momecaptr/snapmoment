import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { direction, modalSection } from '@/widget/sideBar/createPostModal/CreatePostModal';
import { CreatePostDirection } from '@/widget/sideBar/createPostModal/createPost';
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';
import getCroppedImg from '@/widget/sideBar/lib/cropImage';

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
        // Передаем в getCroppedImg originUrl, то есть оригинальную картинку.
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

  const navigateBtnLogic = (directionValue: CreatePostDirection) => {
    switch (activeSection) {
      case modalSection.cropping:
        if (directionValue === direction.next) {
          dispatch(createPostActions.setActiveSection({ section: modalSection.filters }));
          // Сохраняем обрезанные изображения
          void saveCropImgToUrl();
        } else {
          dispatch(createPostActions.setAllPostImgs({ images: [] }));
        }
        break;
      case modalSection.filters:
        if (directionValue === direction.next) {
          dispatch(createPostActions.setActiveSection({ section: modalSection.publication }));
        } else {
          dispatch(createPostActions.setActiveSection({ section: modalSection.cropping }));
        }
        break;
      case modalSection.publication:
        if (directionValue === direction.next) {
          console.log('отправить');

          // pushToSend().then(() => {
          //   console.log({ final: allPostImages[0].buferUrl });
          // });
        } else {
          dispatch(createPostActions.setActiveSection({ section: modalSection.filters }));
        }
        break;
    }
  };

  return { navigateBtnLogic };
};
