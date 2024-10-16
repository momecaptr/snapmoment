import type { Meta, StoryObj } from '@storybook/react';

import editIconOutlineWhite from '@/../public/assets/edit-2-outline-white.svg';
import groupIconWhite from '@/../public/assets/group-icon-white.svg';
import logoutIconWhite from '@/../public/assets/log-out-outline-white.svg';
import personIconOutlineWhite from '@/../public/assets/person-outline-white.svg';
import trashIconOutlineWhite from '@/../public/assets/trash-outline-white.svg';
// import defaultAvatar from '@/../public/question-avatar.png';
import defaultAvatar from '@/../public/question-avatar.png';

import { DropDownItem } from './DropDownItem';
import { DropDownWrapper } from './DropDownWrapper';

const meta = {
  component: DropDownWrapper,
  tags: ['autodocs'],
  title: 'Components/DropDown'
} satisfies Meta<typeof DropDownWrapper>;

export default meta;

type Story = StoryObj<typeof DropDownWrapper>;

export const DropDownHeader: Story = {
  render: () => (
    <DropDownWrapper icon={defaultAvatar} type={'head'}>
      <DropDownItem icon={personIconOutlineWhite} text={'My Profile'} />
      <DropDownItem icon={logoutIconWhite} text={'My Profile'} />
    </DropDownWrapper>
  )
};

export const DropDownMenu: Story = {
  render: () => (
    <DropDownWrapper icon={groupIconWhite} type={'menu'}>
      <DropDownItem icon={trashIconOutlineWhite} text={'My Profile'} />
      <DropDownItem icon={personIconOutlineWhite} text={'My Profile'} />
      <DropDownItem icon={editIconOutlineWhite} text={'My Profile'} />
    </DropDownWrapper>
  )
};
