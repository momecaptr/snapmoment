import { useAppSelector } from '@/shared/lib';
import { modalSection } from '@/widget/sideBar/createPostModal/CreatePostModal';
import { createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';

/**
 * Function that returns the title of the modal
 * @param props.activeSection - current section
 * @param props.previews - array of previewsImages
 */

export const useModalTitle = () => {
  const activeSection = useAppSelector(createPostSelectors.activeSection);
  const allPostImages = useAppSelector(createPostSelectors.allPostImages);
  const modalTitle = () => {
    if (!allPostImages.length) {
      return 'Add Photo' as string;
    }
    if (activeSection === modalSection.cropping) {
      return modalSection.cropping as string;
    }
    if (activeSection === modalSection.filters) {
      return modalSection.filters as string;
    }
    if (activeSection === modalSection.publication) {
      return modalSection.publication as string;
    }
  };

  return modalTitle;
};
