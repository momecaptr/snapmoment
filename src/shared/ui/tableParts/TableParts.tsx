import { ComponentPropsWithRef, forwardRef } from 'react';

import { clsx } from 'clsx';

import s from './TableParts.module.scss';

export type RootProps = ComponentPropsWithRef<'table'>;

export const Root = forwardRef<HTMLTableElement, RootProps>(({ className, ...rest }, ref) => {
  const classNames = {
    table: clsx(s.table, className)
  };

  return <table className={classNames.table} ref={ref} {...rest} />;
});

export type HeadProps = ComponentPropsWithRef<'thead'>;

export const Head = forwardRef<HTMLTableSectionElement, HeadProps>(({ className, ...props }: HeadProps, ref) => {
  const classNames = {
    thead: clsx(s.thead, className)
  };

  return <thead className={classNames.thead} {...props} ref={ref} />;
});
export type BodyProps = ComponentPropsWithRef<'tbody'>;

export const Body = forwardRef<HTMLTableSectionElement, BodyProps>(({ className, ...props }: BodyProps, ref) => {
  const classNames = {
    tbody: clsx(s.tbody, className)
  };

  return <tbody className={classNames.tbody} {...props} ref={ref} />;
});
export type RowProps = ComponentPropsWithRef<'tr'>;

export const Row = forwardRef<HTMLTableRowElement, RowProps>(({ className, ...props }: RowProps, ref) => {
  const classNames = {
    row: clsx(s.row, className)
  };

  return <tr className={classNames.row} {...props} ref={ref} />;
});
export type HeadCellProps = ComponentPropsWithRef<'th'>;

export const HeadCell = forwardRef<HTMLTableCellElement, HeadCellProps>(
  ({ className, ...rest }: HeadCellProps, ref) => {
    const classNames = {
      headCell: clsx(s.headCell, className)
    };

    return <th className={classNames.headCell} {...rest} ref={ref} />;
  }
);

export type CellProps = ComponentPropsWithRef<'td'>;

export const Cell = forwardRef<HTMLTableCellElement, CellProps>(({ className, ...rest }: CellProps, ref) => {
  const classNames = {
    cell: clsx(s.cell, className)
  };

  return <td className={classNames.cell} {...rest} ref={ref} />;
});
export const TableParts = {
  Body,
  Cell,
  Head,
  HeadCell,
  Root,
  Row
};
