'use client';
import { AlertFnProps } from '@/shared/ui/alert/types/types';
import { useActions } from '@/shared/utils/hooks/useActions';

export const useAlert = () => {
  const { addErrorAlert, addSuccessAlert } = useActions();

  const successAlert = ({ autoClose = 3000, message }: AlertFnProps) => {
    addSuccessAlert({ autoClose, message });
  };

  const errorAlert = ({ autoClose = 3000, message }: AlertFnProps) => {
    addErrorAlert({ autoClose, message });
  };

  return { errorAlert, successAlert };
};
