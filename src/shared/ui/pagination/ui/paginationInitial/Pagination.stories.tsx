import type { Meta } from '@storybook/react';

import { useState } from 'react';

import { Pagination } from './Pagination';

const meta = {
  argTypes: {},
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination'
} satisfies Meta<typeof Pagination>;

export default meta;

export const Default = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />;
};
