import { useTranslation } from 'react-i18next';

import { useQueryParams } from '@/common/hooks/useQueryParams';
import { Pagination } from '@/components/ui/pagination/ui/Pagination';

import s from './PaginationWithSelect.module.scss';
import { SelectUI, Typography } from '@/components/ui';

export type selectOptionsType = {
  text: string;
  value: string;
};

type Props = {
  currentPage: number;
  disabled?: boolean;
  itemsPerPage: number;
  selectOptions: selectOptionsType[];
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
  totalItems,
}: Props) => {
  disabled = totalItems <= Number(selectOptions[0].value);
  const { currentPageSearchParam } = useQueryParams();

  const totalPages =
    currentPageSearchParam === null && totalItems <= itemsPerPage ? 1 : Math.ceil(totalItems / itemsPerPage);
  const onValueChange = (count: string) => {
    setItemsPerPage(+count);
  };
  const { t } = useTranslation();

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
