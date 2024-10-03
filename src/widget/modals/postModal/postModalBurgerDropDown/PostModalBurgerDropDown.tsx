// @flow
import * as React from 'react';

import Edit2Outline from '@/../public/assets/components/Edit2Outline';
import MoreActions from '@/../public/assets/components/MoreHorizontal';
import TrashOutline from '@/../public/assets/components/TrashOutline';
import { Button, CustomDropdownItem, CustomDropdownWrapper, Typography } from '@/shared/ui';

import s from './PostModalBurgerDropDown.module.scss';

type Props = {
  changeEditMode: () => void;
  className?: string;
  deleteModalHandler: () => void;
};

/**
 *
 * @param changeEditMode - функция для изменения режима редактирования поста из edit true в false
 * @param deleteModalHandler - функция для открытия модалки удаления поста
 */
export const PostModalBurgerDropDown = (props: Props) => {
  const { changeEditMode, className, deleteModalHandler } = props;

  return (
    <div>
      <CustomDropdownWrapper
        trigger={
          <div className={s.opener}>
            <MoreActions style={{ height: '24px', width: '24px' }} />
          </div>
        }
        align={'end'}
        classNameTriggerActive={s.activeTrigger}
      >
        <CustomDropdownItem className={s.content} onSelect={(event) => event.preventDefault()}>
          <div className={s.dropDownContentWrapper}>
            <div className={s.dropDownItem} onClick={changeEditMode}>
              <Button className={s.button} type={'button'} variant={'text'}>
                <Edit2Outline style={{ height: '24px', width: '24px' }} />
              </Button>
              <Typography className={s.text}>Edit Post</Typography>
            </div>
            <div className={s.dropDownItem} onClick={deleteModalHandler}>
              <Button className={s.button} type={'button'} variant={'text'}>
                <TrashOutline style={{ height: '24px', width: '24px' }} />
              </Button>
              <Typography className={s.text}>Delete Post</Typography>
            </div>
          </div>
        </CustomDropdownItem>
      </CustomDropdownWrapper>
    </div>
  );
};
