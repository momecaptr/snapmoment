import { Sections } from '@/widget/sideBar/createPostModal/CreatePostModal';
import { ImgProps } from '@/widget/sideBar/createPostModal/createPost';

interface ModalTitle {
  activeSection: Sections;
  allPostImages: ImgProps[];
}

/**
 * Function that returns the title of the modal
 * @param props.activeSection - current section
 * @param props.previews - array of previewsImages
 */

export const modalTitle = (props: ModalTitle) => {
  const { activeSection, allPostImages } = props;

  if (!allPostImages.length) {
    return 'Add Photo';
  }
  if (activeSection === 'Cropping') {
    return 'Cropping' as string;
  }
  if (activeSection === 'Filters') {
    return 'Filters' as string;
  }
  if (activeSection === 'Publication') {
    return 'Publication' as string;
  }
};
