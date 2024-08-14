import type { Meta, StoryObj } from '@storybook/react';

import { useState } from 'react';

import { SelectOptionsType } from '@/shared/ui';

import { PaginationWithSelect } from './PaginationWithSelect';

const meta = {
  argTypes: {},
  component: PaginationWithSelect,
  tags: ['autodocs'],
  title: 'Components/PaginationWithSelect'
} satisfies Meta<typeof PaginationWithSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

const Template = (args: any) => {
  const [currentPage, setCurrentPage] = useState<number>(args.currentPage);
  const [itemsPerPage, setItemsPerPage] = useState<number>(args.itemsPerPage);

  return (
    <PaginationWithSelect
      {...args}
      setItemsPerPage={(value: number) => {
        setItemsPerPage(value);
      }}
      currentPage={currentPage}
      itemsPerPage={itemsPerPage}
      setCurrentPage={setCurrentPage}
    />
  );
};

export const Default: Story = {
  args: {
    currentPage: 1,
    disabled: false,
    itemsPerPage: 10,
    selectOptions: [
      { text: '10', value: '10' },
      { text: '20', value: '20' },
      { text: '30', value: '30' },
      { text: '50', value: '50' },
      { text: '100', value: '100' }
    ] as SelectOptionsType[],
    setCurrentPage: () => {},
    setItemsPerPage: () => {},
    totalItems: 300
  },
  render: (args) => <Template {...args} />
};
