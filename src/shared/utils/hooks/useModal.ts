'use client';
import { selectIsOpen, selectModalKey } from '@/app/model/appSelectors';
import { toggleModal } from '@/app/model/appSlice';
import { useAppDispatch } from '@/shared/utils';
import { useAppSelector } from '@/shared/utils';

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
