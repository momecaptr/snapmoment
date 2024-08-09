import { useQueryParams } from '@/shared/lib';
import { SelectUI, Typography } from '@/shared/ui';

import s from './PaginationWithSelect.module.scss';

import { Pagination } from './paginationInitial/Pagination';

export type SelectOptionsType = {
  text: string;
  value: string;
};

type Props = {
  currentPage: number;
  disabled?: boolean;
  itemsPerPage: number;
  selectOptions: SelectOptionsType[];
  setCurrentPage: (value: number) => void;
  setItemsPerPage: (value: number) => void;
  totalItems: number;
};
export const PaginationWithSelect = ({
  currentPage,
  disabled,
  itemsPerPage,
  selectOptions,
  setCurrentPage,
  setItemsPerPage,
  totalItems
}: Props) => {
  disabled = totalItems <= Number(selectOptions[0].value);
  const { currentPageSearchParam } = useQueryParams();

  const totalPages =
    currentPageSearchParam === null && totalItems <= itemsPerPage ? 1 : Math.ceil(totalItems / itemsPerPage);
  const onValueChange = (count: string) => {
    setItemsPerPage(+count);
  };

  return (
    <div className={s.box}>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      <div className={s.boxItem}>
        {/*<Typography className={s.firstText}>{t('paginationWithSelect.show')} </Typography>*/}
        <Typography className={s.firstText}>Show </Typography>
        <SelectUI
          className={'select'}
          disabled={disabled}
          onValueChange={onValueChange}
          selectOptions={selectOptions}
          value={itemsPerPage.toString()}
        />
        {/*<Typography className={s.lastText}>{t('paginationWithSelect.onPage')}</Typography>*/}
        <Typography className={s.lastText}>on page</Typography>
      </div>
    </div>
  );
};
