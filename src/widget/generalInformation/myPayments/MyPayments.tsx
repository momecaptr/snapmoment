import React, { useMemo } from 'react';

import { useGetMyPaymentsDataQuery } from '@/shared/api/device/paymentApi';
import { MySinglePayment } from '@/shared/api/device/paymentType';
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
  // Отредактируем данные для таблицы
  const myPaymentsTableData = useMemo(() => {
    if (myPayments) {
      return myPayments.map((item) => {
        const filteredItem = Object.fromEntries(
          Object.entries(item)
            // Удаляем свойства, которые заканчиваются на 'id'
            .filter(([key]) => !key.toLowerCase().endsWith('id'))
            // Изменяем даты на другой формат
            .map(([key, value]) => {
              if (key.toLowerCase().includes('date')) {
                return [
                  key,
                  new Date(value).toLocaleDateString('ru-RU') // Форматируем дату как `дд.мм.гггг`
                ];
              } else {
                return [key, value];
              }
            })
        ) as MyPaymentsTableDataSingleObjType; // Приведение типа

        return filteredItem;
      });
    } else {
      return [];
    }
  }, [myPayments]);

  return (
    <div>
      MyPayments111
      {myPayments?.map((item) => {
        return <p key={item.userId}>{JSON.stringify(item)}</p>;
      })}
      {myPayments && (
        <UniversalTable<MyPaymentsTableDataSingleObjType>
          colsStyles={s.colsStyles}
          data={myPaymentsTableData}
          theadStyles={s.theadStyles}
        />
      )}
      <p></p>
    </div>
  );
};
