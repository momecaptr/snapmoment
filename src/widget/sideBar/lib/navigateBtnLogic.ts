import { Sections } from '@/widget/sideBar/createPostModal/CreatePostModal';

interface NavigateBtnLogic {
  activeSection: Sections;
  direction: 'back' | 'next';
  setActiveSection: React.Dispatch<React.SetStateAction<Sections>>;
  setPreviews: React.Dispatch<React.SetStateAction<string[]>>;
}

/**
 * Function that navigates between sections of the modal
 * @param props.activeSection - current section
 * @param props.direction - 'back' | 'next'
 * @param props.setActiveSection - function that sets the current section
 * @param props.setPreviews - function that sets the previews
 */
export const navigateBtnLogic = (props: NavigateBtnLogic) => {
  const { activeSection, direction, setActiveSection, setPreviews } = props;

  switch (activeSection) {
    case 'Cropping':
      if (direction === 'back') {
        setPreviews([]);
      } else {
        setActiveSection('Filters');
      }
      break;
    case 'Filters':
      if (direction === 'back') {
        setActiveSection('Cropping');
      } else {
        setActiveSection('Publication');
      }
      break;
    case 'Publication':
      if (direction === 'back') {
        setActiveSection('Filters');
      } else {
        console.log('отправить');
      }
      break;
  }
};
