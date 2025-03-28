import { closeAllModals } from '@/myApp/model/appSlice';
import { useAppDispatch } from '@/shared/lib';

import { createPostActions } from '../service/createPostSlice';

/**
 * Кастомный хук, где производится:
 * @constructors * массив картинок затирается в пустой массив,
 * * переводим стейт ЗАГОЛОВКА модалки / секции в Add Post (начало)
 * * закрываем все модалки
 */
export const useRefreshPostCreationData = () => {
  const dispatch = useAppDispatch();

  const refreshPostCreationData = () => {
    // Чистим стейт
    dispatch(createPostActions.setAllPostImgs({ images: [] }));
    // Сбрасываем стейт названия модалки на Add Post (когда будем открывать модалку вновь, у нас все должно быть пусто)
    dispatch(createPostActions.setActiveSection({ section: 'Add Post' }));
    dispatch(closeAllModals());
  };

  return { refreshPostCreationData };
};
