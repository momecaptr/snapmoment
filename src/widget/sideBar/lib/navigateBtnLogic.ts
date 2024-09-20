import { useAppDispatch } from '@/shared/lib';
import { Sections } from '@/widget/sideBar/createPostModal/CreatePostModal';
import { createPostActions } from '@/widget/sideBar/createPostModal/createPostSlice';

interface NavigateBtnLogic {
  activeSection: Sections;
  setActiveSection: React.Dispatch<React.SetStateAction<Sections>>;
}

/**
 * Function that navigates between sections of the modal
 * @param props.activeSection - current section
 * @param props.direction - 'back' | 'next'
 * @param props.setActiveSection - function that sets the current section
 * @param props.setPreviews - function that sets the previews
 */

export const useNavigateBtnLogic = (props: NavigateBtnLogic) => {
  const { activeSection, setActiveSection } = props;

  const dispatch = useAppDispatch();

  const navigateBtnLogic = (direction: 'back' | 'next') => {
    switch (activeSection) {
      case 'Cropping':
        if (direction === 'back') {
          dispatch(createPostActions.setAllPostImgs({ images: [] }));
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

  return { navigateBtnLogic };
};

// export const useNavigateBtnLogic = (props: NavigateBtnLogic) => {
//   const { activeSection, direction, setActiveSection, setPreviews } = props;
//
//   const dispatch = useAppDispatch();
//   const allPostImages = useAppSelector(createPostSelectors.allPostImages);
//
//   const navigateBtnLogic = (direction: 'back' | 'next') => {
//
//   }
//
//   switch (activeSection) {
//     case 'Cropping':
//       if (direction === 'back') {
//         dispatch(createPostActions.setAllPostImgs({images: []}));
//       } else {
//         setActiveSection('Filters');
//       }
//       break;
//     case 'Filters':
//       if (direction === 'back') {
//         setActiveSection('Cropping');
//       } else {
//         setActiveSection('Publication');
//       }
//       break;
//     case 'Publication':
//       if (direction === 'back') {
//         setActiveSection('Filters');
//       } else {
//         console.log('отправить');
//       }
//       break;
//   }
//
//   return { navigateBtnLogic }
// };
