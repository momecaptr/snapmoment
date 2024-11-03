import React, { useMemo } from 'react';

import { TableParts, Typography } from '@/shared/ui';
import { clsx } from 'clsx';

import s from './UniversalTable.module.scss';

interface UniversalTableProps<T> {
  colsStyles?: string;
  data: T[];
  tHeadStyles?: string;
}

// Функция для создания заголовка колонки таблицы на основе типа данных. Добавление пробелов перед заглавными буквами,
const getHeader = (value: string) => {
  return value
    .replace(/([A-Z])/g, ' $1')
    .toLowerCase()
    .replace(/^./, (str) => str.toUpperCase());
};

/**
 * Принимает любые данные. Generic T - Интерфейс для ОДНОГО ОБЪЕКТА из массива объектов таблицы. На основе типа будут созданы заголовки колонок.
 * * data - массив данных любой структуры
 * * theadStyles - стили строки заголовка (например высота строки head, ширина колонок (nth-child)
 * @constructor
 */
// Универсальный компонент таблицы
export const UniversalTable = <T extends object>(props: UniversalTableProps<T>) => {
  const { colsStyles, data, tHeadStyles } = props;

  // Создаем колонки на основе ключей первого элемента данных
  const columns = useMemo(() => (data.length > 0 ? Object.keys(data[0]) : []), [JSON.stringify(data)]);

  return (
    <div className={s.tableContainer}>
      <TableParts.Root className={s.table}>
        <TableParts.Head className={clsx(tHeadStyles)}>
          <TableParts.Row>
            {columns.map((column) => (
              <TableParts.HeadCell className={colsStyles} key={column}>
                <Typography variant={'medium_text_14'}>{getHeader(column)}</Typography>
              </TableParts.HeadCell>
            ))}
          </TableParts.Row>
        </TableParts.Head>
        <TableParts.Body>
          {data.map((row, rowIndex) => (
            <TableParts.Row key={rowIndex}>
              {columns.map((column) => (
                <TableParts.Cell className={colsStyles} key={`${rowIndex}-${column}`}>
                  {/*{formatCellData(String(row[column as keyof T]))}*/}
                  {String(row[column as keyof T])}
                </TableParts.Cell>
              ))}
            </TableParts.Row>
          ))}
        </TableParts.Body>
      </TableParts.Root>
    </div>
  );
};
