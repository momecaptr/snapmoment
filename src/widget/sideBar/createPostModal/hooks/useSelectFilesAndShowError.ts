import { ChangeEvent } from 'react';

import { useAppDispatch } from '@/shared/lib';

import { modalSection } from '../lib/createPostConstants';
import { createPostActions } from '../service/createPostSlice';

export const useSelectFilesAndShowError = (setErrorMessage: (value: string) => void) => {
  const dispatch = useAppDispatch();
  const onSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const acceptedTypes = ['image/jpeg', 'image/png'];
    const maxSizeBytes = 20 * 1024 * 1024; // 20 MB Max

    if (!file) {
      return;
    }

    if (!acceptedTypes.includes(file.type)) {
      setErrorMessage('Wrong file type');

      return;
    }

    if (file.size > maxSizeBytes) {
      setErrorMessage('Max file size should be less than 20 MB');

      return;
    }

    const url = URL.createObjectURL(file);

    dispatch(createPostActions.addPostImgs({ url }));
    dispatch(createPostActions.setActiveSection({ section: modalSection.cropping }));

    e.target.value = '';

    return () => URL.revokeObjectURL(url);
  };

  return {
    onSelectFile
  };
};
