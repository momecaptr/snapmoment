import { Sections } from '@/widget/sideBar/createPostModal/CreatePostModal';

interface ModalTitle {
  activeSection: Sections;
  previews: string[];
}

/**
 * Function that returns the title of the modal
 * @param props.activeSection - current section
 * @param props.previews - array of previewsImages
 */

export const modalTitle = (props: ModalTitle) => {
  const { activeSection, previews } = props;

  if (!previews.length) {
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
