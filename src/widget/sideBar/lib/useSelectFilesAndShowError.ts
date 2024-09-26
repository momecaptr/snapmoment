import { ChangeEvent } from 'react';

import { useAppDispatch } from '@/shared/lib';
import { modalSection } from '@/widget/sideBar/createPostModal/CreatePostModal';
import { createPostActions } from '@/widget/sideBar/createPostModal/createPostSlice';

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

    // const imageDataUrl: any = await readFile(file);
    // dispatch(createPostActions.addPostImgs({ url: imageDataUrl }));

    const url = URL.createObjectURL(file);

    // createObjectURL убираем, потому что проблемы со стилями могли возникнуть (что то там про то, что размер createObjectUrl, если меняю, то в CSS нужно колдовать, поэтому вот так
    dispatch(createPostActions.addPostImgs({ url }));
    // Обновляем activeSection на cropping
    dispatch(createPostActions.setActiveSection({ section: modalSection.cropping }));

    e.target.value = '';

    return () => URL.revokeObjectURL(url);
  };

  return {
    onSelectFile
  };
};
