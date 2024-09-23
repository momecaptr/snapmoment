import { modalSection } from '@/widget/sideBar/createPostModal/CreatePostModal';
import { CreatePostImgProps, CreatePostModalSections } from '@/widget/sideBar/createPostModal/createPost';

interface ModalTitle {
  activeSection: CreatePostModalSections;
  allPostImages: CreatePostImgProps[];
}

/**
 * Function that returns the title of the modal
 * @param props.activeSection - current section
 * @param props.previews - array of previewsImages
 */

export const modalTitle = (props: ModalTitle) => {
  const { activeSection, allPostImages } = props;

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
