import { useDebounce } from '@/common/hooks/useDebounce';
import { initCurrentPage, selectOptionPagination } from '@/common/consts/globalVariables';
import { useRouter } from 'next/router';

export const useQueryParams = () => {
  const router = useRouter();
  const query = router.query;

  const itemsPerPage = Number(query.itemsPerPage) ?? Number(selectOptionPagination[0].value);
  const currentPage = Number(query.currentPage) ?? Number(initCurrentPage);
  const currentPageSearchParam = query.currentPage;
  const search = query.search ?? '';
  const currentOrderBy = query.orderBy ?? '';

  const debouncedSearchValue = useDebounce(search);

  const setSearchQuery = (searchQuery: string) => {
    const newQuery = { ...query };
    searchQuery === '' ? delete newQuery.search : (newQuery.search = searchQuery);
    router.push({ pathname: router.pathname, query: newQuery });
  };
  const setCurrentPageQuery = (currentPageQuery: number) => {
    const newQuery = { ...query };
    currentPageQuery === Number(initCurrentPage)
      ? delete newQuery.currentPage
      : (newQuery.currentPage = currentPageQuery.toString());
    router.push({ pathname: router.pathname, query: newQuery });
  };

  const setItemsPerPageQuery = (itemsPerPageQuery: number) => {
    const newQuery = { ...query };
    itemsPerPageQuery === Number(selectOptionPagination[0].value)
      ? delete newQuery.itemsPerPage
      : (newQuery.itemsPerPage = itemsPerPageQuery.toString());
    router.push({ pathname: router.pathname, query: newQuery });
  };

  const setSortByQuery = (sortByQuery: string) => {
    let newOrderBy;

    switch (currentOrderBy) {
      case `${sortByQuery}-asc`:
        newOrderBy = `${sortByQuery}-desc`;
        break;
      case `${sortByQuery}-desc`:
        newOrderBy = null;
        break;
      default:
        newOrderBy = `${sortByQuery}-asc`;
        break;
    }

    const newQuery = { ...query };
    newOrderBy ? (newQuery.orderBy = newOrderBy) : delete newQuery.orderBy;
    router.push({ pathname: router.pathname, query: newQuery });
  };

  const clearQuery = () => {
    const itemsPerPageValue = query.itemsPerPage;
    const newQuery: { itemsPerPage?: string | string[] } = {};

    if (itemsPerPageValue) {
      newQuery.itemsPerPage = Array.isArray(itemsPerPageValue) ? itemsPerPageValue : itemsPerPageValue;
    }
    router.push({ pathname: router.pathname, query: newQuery });
  };

  return {
    clearQuery,
    currentOrderBy,
    currentPage,
    currentPageSearchParam,
    debouncedSearchValue,
    itemsPerPage,
    search,
    setCurrentPageQuery,
    setItemsPerPageQuery,
    setSearchQuery,
    setSortByQuery,
  };
};
