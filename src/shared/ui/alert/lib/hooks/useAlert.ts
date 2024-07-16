import { useActions } from '@/shared/hooks/useActions';
import { AlertFnProps } from '@/shared/ui/alert/types/types';

const useAlert = () => {
  const { addErrorAlert, addSuccessAlert } = useActions();

  const successAlert = ({ autoClose = 3000, message }: AlertFnProps) => {
    addSuccessAlert({ autoClose, message });
  };

  const errorAlert = ({ autoClose = 3000, message }: AlertFnProps) => {
    addErrorAlert({ autoClose, message });
  };

  return { errorAlert, successAlert };
};

export default useAlert;
