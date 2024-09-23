import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { modalSection } from '@/widget/sideBar/createPostModal/CreatePostModal';
import { createPostActions, createPostSelectors } from '@/widget/sideBar/createPostModal/createPostSlice';

// interface NavigateBtnLogic {
//   activeSection: CreatePostModalSections;
// }

/**
 * HookFunction that returns function to navigate between sections of the modal
 */

export const useNavigateBtnLogic = () => {
  // const { activeSection } = props;
  // const setActiveSection = (section: CreatePostModalSections) => {
  //   dispatch(createPostActions.setActiveSection({ section }));
  // };
  const activeSection = useAppSelector(createPostSelectors.activeSection);

  const dispatch = useAppDispatch();

  const navigateBtnLogic = (direction: 'back' | 'next') => {
    switch (activeSection) {
      case modalSection.cropping:
        if (direction === 'back') {
          dispatch(createPostActions.setAllPostImgs({ images: [] }));
        } else {
          dispatch(createPostActions.setActiveSection({ section: modalSection.filters }));
        }
        break;
      case modalSection.filters:
        if (direction === 'back') {
          dispatch(createPostActions.setActiveSection({ section: modalSection.cropping }));
        } else {
          dispatch(createPostActions.setActiveSection({ section: modalSection.publication }));
        }
        break;
      case modalSection.publication:
        if (direction === 'back') {
          dispatch(createPostActions.setActiveSection({ section: modalSection.filters }));
        } else {
          console.log('отправить');
        }
        break;
    }
  };

  return { navigateBtnLogic };
};
