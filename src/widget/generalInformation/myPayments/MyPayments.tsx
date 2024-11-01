import React, { useMemo, useState } from 'react';

import { useGetMyPaymentsDataQuery } from '@/shared/api/device/paymentApi';
import { MySinglePayment } from '@/shared/api/device/paymentType';
import { PaginationWithSelect, SelectOptionsType } from '@/shared/ui';
import { UniversalTable } from '@/widget/generalInformation/myPayments/tanstackTable/UniversalTable';

import s from './MyPayments.module.scss';

export const MyPayments = () => {
  const { data: myPayments } = useGetMyPaymentsDataQuery();

  // Утилита для исключения свойств, заканчивающихся на 'id'
  type OmitIdProps<T> = {
    [K in keyof T as K extends `${infer Prefix}Id` ? never : K]: T[K];
  };

  // Создаем тип, на основе одного объекта из форматированного для таблицы массива
  // type MyPaymentsTableDataSingleObjType = (typeof myPaymentsTableData)[0];
  type MyPaymentsTableDataSingleObjType = OmitIdProps<MySinglePayment>;
  const formatPaymentType = (value: string) => {
    const types: Record<string, string> = { PAYPAL: 'PayPal', STRIPE: 'Stripe' };

    return types[value] || value;
  };

  const formatDate = (value: any) => new Date(value).toLocaleDateString('ru-RU');

  const formatSubscriptionType = (value: string) => {
    const types: Record<string, string> = { DAY: '1 day', MONTH: '1 month', WEEK: '7 days' };

    return types[value] || value;
  };

  const selectOptions = [
    { text: '10', value: '10' },
    { text: '20', value: '20' },
    { text: '30', value: '30' },
    { text: '50', value: '50' },
    { text: '100', value: '100' }
  ] as SelectOptionsType[];

  const myPaymentsTableData = useMemo(() => {
    return (myPayments || []).map((item) => {
      return Object.fromEntries(
        Object.entries(item)
          .filter(([key]) => !key.toLowerCase().endsWith('id'))
          .map(([key, value]) => {
            if (key.toLowerCase().includes('date')) {
              return [key, formatDate(value)];
            }
            if (key === 'paymentType') {
              return [key, formatPaymentType(value)];
            }
            if (key === 'subscriptionType') {
              return [key, formatSubscriptionType(value)];
            }

            return [key, value];
          })
      ) as MyPaymentsTableDataSingleObjType;
    });
  }, [myPayments]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(+selectOptions[0].value);

  // Рассчитываем данные для текущей страницы
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return myPaymentsTableData.slice(startIndex, endIndex);
  }, [myPaymentsTableData, currentPage, itemsPerPage]);

  return (
    <>
      {myPayments && (
        <>
          <div className={s.tableWrapper}>
            <UniversalTable<MyPaymentsTableDataSingleObjType>
              colsStyles={s.colsStyles}
              data={paginatedData}
              tHeadStyles={s.tHeadStyles}
            />
          </div>
          <PaginationWithSelect
            alignment={'left'}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            selectOptions={selectOptions}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={(value: number) => setItemsPerPage(value)}
            totalItems={myPaymentsTableData.length}
          />
        </>
      )}
    </>
  );
};
