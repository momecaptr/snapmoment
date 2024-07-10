import { useActions } from '@/common/hooks/useActions';
import { AlertFnProps } from '@/components/ui/alert/types/types';

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
