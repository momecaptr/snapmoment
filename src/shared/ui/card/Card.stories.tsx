import { Card, Input, Typography } from '@/shared/ui';
import { StoryProps } from '@storybook/blocks';
import { Meta, StoryFn } from '@storybook/react';

import s from './CardStories.module.scss';

const meta = {
  argTypes: {},
  component: Card,
  parameters: {
    layout: 'center'
  },
  tags: ['autodocs'],
  title: 'Components/Card'
} satisfies Meta<typeof Card>;

export default meta;

export const Default: StoryFn<StoryProps> = (_: StoryProps) => {
  return <Card style={{ height: '100px', width: '420px' }}></Card>;
};

export const WithContent: StoryFn<StoryProps> = (_: StoryProps) => {
  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        padding: '35px 24px',
        width: '420px'
      }}
    >
      <Typography as={'h2'} variant={'h2'}>
        Card
      </Typography>
      <Input className={s.input} label={'Uncontrolled text field'} type={'text'} />
      <Input className={s.input} label={'Uncontrolled search'} type={'search'} />
      <Input className={s.input} label={'Uncontrolled password'} type={'password'} />
    </Card>
  );
};
