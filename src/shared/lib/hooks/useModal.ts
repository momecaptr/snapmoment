import { selectIsOpen, selectModalKey } from '@/myApp/model/appSelectors';
import { toggleModal } from '@/myApp/model/appSlice';
import { useAppDispatch, useAppSelector } from '@/shared/lib';

export enum ModalKey {
  Success = 'Success',
  ViewLikes = 'ViewLikes',
  ViewPhoto = 'ViewPhoto'
}

export const useModal = (modalKey: ModalKey) => {
  const isOpenModal = useAppSelector(selectIsOpen);
  const contextModalKey = useAppSelector(selectModalKey);
  const dispatch = useAppDispatch();

  const setOpen = (open: boolean) => {
    dispatch(toggleModal({ key: modalKey, open }));
  };

  const isOpen = isOpenModal && modalKey === contextModalKey;

  return {
    contextModalKey,
    isOpen,
    setOpen
  };
};
