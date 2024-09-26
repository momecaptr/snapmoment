import { closeAllModals } from '@/myApp/model/appSlice';
import { useAppDispatch } from '@/shared/lib';
import { createPostActions } from '@/widget/sideBar/createPostModal/createPostSlice';

export const useRefreshPostCreationData = () => {
  const dispatch = useAppDispatch();

  const refreshPostCreationData = () => {
    // Чистим стейт
    dispatch(createPostActions.setAllPostImgs({ images: [] }));
    // Сбрасываем стейт названия модалки на Add Post (когда будем открывать модалку вновь, у нас все должно быть пусто)
    dispatch(createPostActions.setActiveSection({ section: 'Add Post' }));
    dispatch(closeAllModals());
  };

  return refreshPostCreationData;
};
