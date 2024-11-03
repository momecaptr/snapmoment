import { SelectUI, Typography } from '@/shared/ui';
import { clsx } from 'clsx';

import s from './PaginationWithSelect.module.scss';

import { Pagination } from './paginationInitial/Pagination';

export type SelectOptionsType = {
  text: string;
  value: string;
};

type Props = {
  alignment?: 'center' | 'left' | 'right';
  currentPage: number;
  disabled?: boolean;
  itemsPerPage: number;
  selectOptions: SelectOptionsType[];
  setCurrentPage: (value: number) => void;
  setItemsPerPage: (value: number) => void;
  totalItems: number;
};
export const PaginationWithSelect = ({
  alignment = 'center',
  currentPage,
  disabled,
  itemsPerPage,
  selectOptions,
  setCurrentPage,
  setItemsPerPage,
  totalItems
}: Props) => {
  disabled = totalItems <= Number(selectOptions[0].value);
  // const { currentPageSearchParam } = useQueryParams();

  const totalPages = currentPage === null && totalItems <= itemsPerPage ? 1 : Math.ceil(totalItems / itemsPerPage);
  const onValueChange = (count: string) => {
    setItemsPerPage(+count);
  };

  const alignmentClass = () => {
    if (alignment === 'left') {
      return s.boxLeft;
    } else if (alignment === 'right') {
      return s.boxRight;
    } else {
      return '';
    }
  };

  return (
    <div className={clsx(s.box, alignmentClass())}>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      <div className={s.boxItem}>
        <Typography className={s.firstText}>Show </Typography>
        <SelectUI
          className={'select'}
          disabled={disabled}
          onValueChange={onValueChange}
          selectOptions={selectOptions}
          value={itemsPerPage.toString()}
        />
        <Typography className={s.lastText}>on page</Typography>
      </div>
    </div>
  );
};
