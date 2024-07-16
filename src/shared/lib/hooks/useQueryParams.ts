// 'use client'
// import { useDebounce } from '@/shared/lib/hooks/useDebounce';
// import { initCurrentPage, selectOptionPagination } from '@/shared/ui';
// import { useRouter } from 'next/router';
//
// export const useQueryParams = () => {
//   const router = useRouter();
//   const query = router.query;
//   // ddsdf
//
//   const itemsPerPage = Number(query.itemsPerPage) ?? Number(selectOptionPagination[0].value);
//   const currentPage = Number(query.currentPage) ?? Number(initCurrentPage);
//   const currentPageSearchParam = query.currentPage;
//   const search = query.search ?? '';
//   const currentOrderBy = query.orderBy ?? '';
//
//   const debouncedSearchValue = useDebounce(search);
//
//   const setSearchQuery = (searchQuery: string) => {
//     const newQuery = { ...query };
//
//     searchQuery === '' ? delete newQuery.search : (newQuery.search = searchQuery);
//     router.push({ pathname: router.pathname, query: newQuery });
//   };
//   const setCurrentPageQuery = (currentPageQuery: number) => {
//     const newQuery = { ...query };
//
//     currentPageQuery === Number(initCurrentPage)
//       ? delete newQuery.currentPage
//       : (newQuery.currentPage = currentPageQuery.toString());
//     router.push({ pathname: router.pathname, query: newQuery });
//   };
//
//   const setItemsPerPageQuery = (itemsPerPageQuery: number) => {
//     const newQuery = { ...query };
//
//     itemsPerPageQuery === Number(selectOptionPagination[0].value)
//       ? delete newQuery.itemsPerPage
//       : (newQuery.itemsPerPage = itemsPerPageQuery.toString());
//     router.push({ pathname: router.pathname, query: newQuery });
//   };
//
//   const setSortByQuery = (sortByQuery: string) => {
//     let newOrderBy;
//
//     switch (currentOrderBy) {
//       case `${sortByQuery}-asc`:
//         newOrderBy = `${sortByQuery}-desc`;
//         break;
//       case `${sortByQuery}-desc`:
//         newOrderBy = null;
//         break;
//       default:
//         newOrderBy = `${sortByQuery}-asc`;
//         break;
//     }
//
//     const newQuery = { ...query };
//
//     newOrderBy ? (newQuery.orderBy = newOrderBy) : delete newQuery.orderBy;
//     router.push({ pathname: router.pathname, query: newQuery });
//   };
//
//   const clearQuery = () => {
//     const itemsPerPageValue = query.itemsPerPage;
//     const newQuery: { itemsPerPage?: string | string[] } = {};
//
//     if (itemsPerPageValue) {
//       newQuery.itemsPerPage = Array.isArray(itemsPerPageValue) ? itemsPerPageValue : itemsPerPageValue;
//     }
//     router.push({ pathname: router.pathname, query: newQuery });
//   };
//
//   return {
//     clearQuery,
//     currentOrderBy,
//     currentPage,
//     currentPageSearchParam,
//     debouncedSearchValue,
//     itemsPerPage,
//     search,
//     setCurrentPageQuery,
//     setItemsPerPageQuery,
//     setSearchQuery,
//     setSortByQuery
//   };
// };

'use client';
import { useDebounce } from '@/shared/lib/hooks/useDebounce';
import { initCurrentPage, selectOptionPagination } from '@/shared/ui';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useQueryParams = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const query = Object.fromEntries(searchParams.entries());

  const itemsPerPage = Number(query.itemsPerPage) ?? Number(selectOptionPagination[0].value);
  const currentPage = Number(query.currentPage) ?? Number(initCurrentPage);
  const currentPageSearchParam = query.currentPage;
  const search = query.search ?? '';
  const currentOrderBy = query.orderBy ?? '';

  const debouncedSearchValue = useDebounce(search);

  const setSearchQuery = (searchQuery: string) => {
    const newQuery = new URLSearchParams(searchParams);

    searchQuery === '' ? newQuery.delete('search') : newQuery.set('search', searchQuery);
    router.push(`${pathname}?${newQuery.toString()}`);
  };

  const setCurrentPageQuery = (currentPageQuery: number) => {
    const newQuery = new URLSearchParams(searchParams);

    currentPageQuery === Number(initCurrentPage)
      ? newQuery.delete('currentPage')
      : newQuery.set('currentPage', currentPageQuery.toString());
    router.push(`${pathname}?${newQuery.toString()}`);
  };

  const setItemsPerPageQuery = (itemsPerPageQuery: number) => {
    const newQuery = new URLSearchParams(searchParams);

    itemsPerPageQuery === Number(selectOptionPagination[0].value)
      ? newQuery.delete('itemsPerPage')
      : newQuery.set('itemsPerPage', itemsPerPageQuery.toString());
    router.push(`${pathname}?${newQuery.toString()}`);
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

    const newQuery = new URLSearchParams(searchParams);

    newOrderBy ? newQuery.set('orderBy', newOrderBy) : newQuery.delete('orderBy');
    router.push(`${pathname}?${newQuery.toString()}`);
  };

  const clearQuery = () => {
    const itemsPerPageValue = query.itemsPerPage;
    const newQuery = new URLSearchParams(searchParams);

    if (itemsPerPageValue) {
      newQuery.set('itemsPerPage', Array.isArray(itemsPerPageValue) ? itemsPerPageValue.join(',') : itemsPerPageValue);
    } else {
      newQuery.delete('itemsPerPage');
    }
    router.push(`${pathname}?${newQuery.toString()}`);
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
    setSortByQuery
  };
};
