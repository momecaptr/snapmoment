import SvgArrowIosBack from '@/common/assets/components/ArrowIosBack';
import SvgArrowIosForward from '@/common/assets/components/ArrowIosForward';
import { usePagination } from '@/components/ui/pagination/lib/paginationLogic';
import { PageLink } from '@/components/ui/pagination/ui/pageLink/PageLink';

import s from './Pagination.module.scss';

type Props = {
  currentPage: number;
  // eslint-disable-next-line no-unused-vars
  setCurrentPage: (currentPage: number) => void;
  totalPages: number;
};

export const Pagination = ({ currentPage, setCurrentPage, totalPages }: Props) => {
  const pageNumbers = usePagination({
    currentPage,
    totalPages,
  });

  return (
    <div aria-label={'Pagination'} className={s.pagination}>
      <PageLink className={s.icon} disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
        <SvgArrowIosBack />
      </PageLink>
      {pageNumbers.map((pageNum, index) => {
        return (
          <PageLink
            active={pageNum === currentPage}
            disabled={isNaN(pageNum)}
            key={index}
            onClick={() => setCurrentPage(pageNum)}
          >
            {!isNaN(pageNum) ? pageNum.toString() : '...'}
          </PageLink>
        );
      })}
      <PageLink
        className={s.icon}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <SvgArrowIosForward />
      </PageLink>
    </div>
  );
};
