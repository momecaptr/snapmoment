import { useState } from 'react';

import ImageOutline from '@/../public/assets/components/ImageOutline';
import { Button, Input, Modal, ModalProps } from '@/shared/ui';
import { Checkbox } from '@radix-ui/react-checkbox';
import { Meta, StoryFn } from '@storybook/react';

import s from './Stories.module.scss';

interface CustomArgs {
  footer?: string;
}

type StoryProps = CustomArgs & ModalProps;

const meta: Meta<StoryProps> = {
  argTypes: {
    open: { control: { type: 'boolean' } },
    title: { control: { type: 'text' } }
  },
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal'
};

export default meta;

const ToggleModal: StoryFn<StoryProps> = (args: StoryProps) => {
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} variant={'primary'}>
        Open Modal
      </Button>
      <Modal {...args} className={s.customClass} onOpenChange={() => setOpen(false)} open={open} title={'Add New Deck'}>
        <div className={s.body}>
          <Input className={s.input} label={'Name Pack'} placeholder={'Name'} />

          <Button className={s.uploadImg} variant={'secondary'} fullWidth>
            <ImageOutline className={s.icon} /> Upload Image
          </Button>
          <Checkbox checked={checked} className={s.checkbox} onCheckedChange={() => setChecked(!checked)} />
        </div>
        <div className={s.footer}>
          <Button onClick={() => setOpen(false)} variant={'secondary'}>
            Cancel
          </Button>
          <Button onClick={() => setOpen(false)} variant={'primary'}>
            Add New Pack
          </Button>
        </div>
      </Modal>
    </>
  );
};

export { ToggleModal };
