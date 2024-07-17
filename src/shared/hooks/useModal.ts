import { selectIsOpen, selectModalKey } from '@/app/model/appSelectors';
import { toggleModal } from '@/app/model/appSlice';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { useAppSelector } from '@/shared/hooks/useAppSelector';

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
