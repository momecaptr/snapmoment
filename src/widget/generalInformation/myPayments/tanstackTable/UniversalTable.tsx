import React, { useMemo } from 'react';

import { Typography } from '@/shared/ui';
import { TableParts } from '@/shared/ui/tableParts';
import { clsx } from 'clsx';

import s from './UniversalTable.module.scss';

// Интерфейс для props компонента таблицы
interface UniversalTableProps<T> {
  colsStyles?: string; // стили всех колонок
  data: T[]; // массив данных любой структуры
  tHeadStyles?: string; // стили строки заголовка
}

// Функция для создания заголовка колонки таблицы на основе типа данных
const getHeader = (value: string) => {
  return value
    .replace(/([A-Z])/g, ' $1') // Добавление пробелов перед заглавными буквами
    .toLowerCase() // Приведение всей строки к нижнему регистру
    .replace(/^./, (str) => str.toUpperCase()); // Приведение первого символа строки к верхнему регистру;
};

/**
 * UniversalTable - универсальная таблица на основе Tanstack TableParts. Принимает любые данные.
 * * Generic T - Интерфейс для ОДНОГО ОБЪЕКТА из массива объектов таблицы
 * * data - массив данных любой структуры
 * * theadStyles - стили строки заголовка (например высота строки head, ширина колонок (nth-child)
 * @constructor
 */
// Универсальный компонент таблицы
export const UniversalTable = <T extends object>(props: UniversalTableProps<T>) => {
  const { colsStyles, data, tHeadStyles } = props;

  // Отредактируем данные для таблицы

  // Создаем колонки на основе ключей первого элемента данных
  const columns = useMemo(() => (data.length > 0 ? Object.keys(data[0]) : []), [data]);

  // Рендеринг таблицы
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
