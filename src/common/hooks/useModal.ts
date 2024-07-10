import { useAppDispatch } from '@/common/hooks/useAppDispatch';
import { useAppSelector } from '@/common/hooks/useAppSelector';
import { selectIsOpen, selectModalKey } from '@/lib/features/app/model/appSelectors';
import { toggleModal } from '@/lib/features/app/model/appSlice';

export enum ModalKey {
  AddCard = 'AddCard',
  AddDeck = 'AddDeck',
  DeleteCard = 'DeleteCard',
  DeleteDeck = 'DeleteDeck',
  EditCard = 'EditCard',
  EditDeck = 'EditDeck',
  Empty = 'Empty'
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
