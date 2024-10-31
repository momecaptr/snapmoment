import React, { useMemo } from 'react';

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { clsx } from 'clsx';

import s from './UniversalTable.module.scss';

// Интерфейс для props компонента таблицы
interface UniversalTableProps<TData> {
  colsStyles?: string; // стили всех колонок
  data: TData[]; // массив данных любой структуры
  theadStyles?: string; // стили строки заголовка
}

// Функция для создания заголовка колонки таблицы на основе типа данных
const getHeader = (value: string) => {
  return value
    .replace(/([A-Z])/g, ' $1') // Добавление пробелов перед заглавными буквами
    .toLowerCase() // Приведение всей строки к нижнему регистру
    .replace(/^./, (str) => str.toUpperCase()); // Приведение первого символа строки к верхнему регистру;
};

/**
 * UniversalTable - универсальная таблица на основе Tanstack Table. Принимает любые данные.
 * * Generic TData - Интерфейс для ОДНОГО ОБЪЕКТА из массива объектов таблицы
 * * data - массив данных любой структуры
 * * theadStyles - стили строки заголовка (например высота строки head, ширина колонок (nth-child)
 * @constructor
 */
// Универсальный компонент таблицы
export const UniversalTable = <TData extends object>(props: UniversalTableProps<TData>) => {
  const { colsStyles, data, theadStyles } = props;
  // Создаем колонки на основе ключей первого элемента данных
  const columns = useMemo<ColumnDef<TData>[]>(
    () =>
      data.length > 0
        ? Object.keys(data[0]).map((key) => ({
            accessorKey: key,
            header: getHeader(key)
          }))
        : [],
    [data]
  );

  // ЕСЛИ ХОЧЕТСЯ ИЗМЕНИТЬ РАЗМЕР ОТДЕЛЬНОГО СТОЛБЦА, ТО В columns ДЛЯ КОНКРЕТНОГО СТОЛБЦА НУЖНО ДОБАВИТЬ СВОЙСТВО size
  // Но думаю этот вариант гавно
  // columns[0].size = columnSizes.first;

  // Создаем таблицу с использованием TanStack Table
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel()
  });

  // Рендеринг таблицы
  return (
    <div className={s.tableContainer}>
      <table className={s.table}>
        <thead className={clsx(theadStyles)} style={{ width: table.getTotalSize() }}>
          {/*<thead className={clsx(headerRowStyles)}>*/}
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                // <th key={header.id} style={{ width: header.getSize() }}>
                <th className={colsStyles} key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody style={{ width: table.getTotalSize() }}>
          {/*<tbody>*/}
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} style={{ width: cell.column.getSize() }}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
