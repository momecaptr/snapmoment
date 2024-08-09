import SvgArrowIosBack from '@/../public/assets/components/ArrowIosBack';
import SvgArrowIosForward from '@/../public/assets/components/ArrowIosForward';

import s from './Pagination.module.scss';

import { usePagination } from '../../lib/paginationLogic';
import { PageLink } from './pageLink/PageLink';

type Props = {
  currentPage: number;
  // eslint-disable-next-line no-unused-vars
  setCurrentPage: (currentPage: number) => void;
  totalPages: number;
};

export const Pagination = ({ currentPage, setCurrentPage, totalPages }: Props) => {
  const pageNumbers = usePagination({
    currentPage,
    totalPages
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
