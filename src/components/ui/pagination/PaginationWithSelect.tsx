import { useTranslation } from 'react-i18next';

import { useQueryParams } from '@/common/hooks/useQueryParams';
import { Pagination } from '@/components/ui/pagination/ui/Pagination';
import SelectUI from '@/components/ui/select/Select';
import Typography from '@/components/ui/typography/Typography';

import s from './PaginationWithSelect.module.scss';

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
  // placeholder,
  selectOptions,
  setCurrentPage,
  setItemsPerPage,
  totalItems,
}: Props) => {
  disabled = totalItems <= Number(selectOptions[0].value);
  // const [currentPage, setCurrentPage] = useState<number>(1)
  // const [itemsPerPage, setItemsPerPage] = useState<number>(10)
  // const placeholderText = placeholder || selectOptions[0].text
  const { currentPageSearchParam } = useQueryParams();

  const totalPages =
    currentPageSearchParam === null && totalItems <= itemsPerPage ? 1 : Math.ceil(totalItems / itemsPerPage);
  // const totalPages = Math.ceil(totalItems / itemsPerPage)
  // disabled =
  // const totalPages: number = Math.ceil(totalItems / itemsPerPage) // Is this comes from, server???
  // const {} = useGetDecksQuery({
  //   currentPage,
  //   itemsPerPage,
  // })
  // const totalPages: number | undefined = data?.pagination.totalPages // Is this comes from, server???
  const onValueChange = (count: string) => {
    setItemsPerPage(+count);
  };
  const { t } = useTranslation();

  return (
    <div className={s.box}>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
      <div className={s.boxItem}>
        <Typography className={s.firstText}>{t('paginationWithSelect.show')} </Typography>
        <SelectUI
          className={'select'}
          disabled={disabled}
          onValueChange={onValueChange}
          selectOptions={selectOptions}
          value={itemsPerPage.toString()}
        />
        <Typography className={s.lastText}>{t('paginationWithSelect.onPage')}</Typography>
      </div>
    </div>
  );
};
