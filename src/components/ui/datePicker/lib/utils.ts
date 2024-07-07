import { RangeDate } from '@/components/ui/datePicker/DatePicker';

export const daysOfTheWeek = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

const VISIBLE_CELLS_AMOUNT = 7 * 6;
const sundayWeekToMondayWeekDayMap: Record<number, number> = {
  0: 6,
  1: 0,
  2: 1,
  3: 2,
  4: 3,
  5: 4,
  6: 5
};

export interface DateCellItem {
  date: number;
  month: number;
  type: 'current' | 'next' | 'prev';
  year: number;
}

export const getDaysAmountInAMonth = (year: number, month: number) => {
  const nextMonthDate = new Date(year, month + 1, 1);

  nextMonthDate.setMinutes(-1);

  return nextMonthDate.getDate();
};

const getDayOfTheWeek = (date: Date) => {
  const day = date.getDay();

  return sundayWeekToMondayWeekDayMap[day];
};

export const getPreviousMonthDays = (year: number, month: number) => {
  const currentMonthFirstDay = new Date(year, month, 1);
  const prevMonthCellsAmount = getDayOfTheWeek(currentMonthFirstDay);

  const daysAmountInPrevMonth = getDaysAmountInAMonth(year, month - 1);

  const dateCells: DateCellItem[] = [];

  const [cellYear, cellMonth] = month === 0 ? [year - 1, 11] : [year, month - 1];

  for (let i = prevMonthCellsAmount - 1; i >= 0; i--) {
    dateCells.push({
      date: daysAmountInPrevMonth - i,
      month: cellMonth,
      type: 'prev',
      year: cellYear
    });
  }

  return dateCells;
};

export const getNextMonthDays = (year: number, month: number) => {
  const currentMonthFirstDay = new Date(year, month, 1);
  const prevMonthCellsAmount = getDayOfTheWeek(currentMonthFirstDay);

  const daysAmount = getDaysAmountInAMonth(year, month);

  const nextMonthDays = VISIBLE_CELLS_AMOUNT - daysAmount - prevMonthCellsAmount;

  const [cellYear, cellMonth] = month === 11 ? [year + 1, 0] : [year, month + 1];

  const dateCells: DateCellItem[] = [];

  for (let i = 1; i <= nextMonthDays; i++) {
    dateCells.push({
      date: i,
      month: cellMonth,
      type: 'next',
      year: cellYear
    });
  }

  return dateCells;
};

export const getCurrentMothDays = (year: number, month: number, numberOfDays: number) => {
  const dateCells: DateCellItem[] = [];

  for (let i = 1; i <= numberOfDays; i++) {
    dateCells.push({
      date: i,
      month,
      type: 'current',
      year
    });
  }

  return dateCells;
};

const addLeadingZeroIfNeeded = (value: number) => {
  if (value > 9) {
    return value.toString();
  }

  return `0${value}`;
};

export const getInputValueFromDate = (value: Date) => {
  const date = addLeadingZeroIfNeeded(value.getDate());
  const month = addLeadingZeroIfNeeded(value.getMonth() + 1);
  const year = value.getFullYear();

  return `${date}/${month}/${year}`;
};

export const getDateFromInputValue = (inputValue: string): RangeDate | undefined => {
  if (!isValidDateString(inputValue)) {
    return;
  }

  const match = inputValue.match(validValueRegex);

  if (match) {
    const [, startDay, startMonth, startYear, endDay, endMonth, endYear] = match;

    const startDate = new Date(Number(startYear), Number(startMonth) - 1, Number(startDay));
    const endDate = new Date(Number(endYear), Number(endMonth) - 1, Number(endDay));

    return { endDate, startDate };
  }
};

const validValueRegex = /(\d{2})\/(\d{2})\/(\d{4}) - (\d{2})\/(\d{2})\/(\d{4})/;

export const isValidDateString = (value: string) => {
  if (!validValueRegex.test(value)) {
    return false;
  }

  return true;
};

export function isToday(cell: DateCellItem, todayDate: Date) {
  return (
    todayDate.getFullYear() === cell.year && todayDate.getMonth() === cell.month && todayDate.getDate() === cell.date
  );
}

export function isInRange(value: Date, min?: Date, max?: Date) {
  if (min && max) {
    return isSmallerThanDate(value, max) && isBiggerThanDate(value, min);
  }

  if (min) {
    return isBiggerThanDate(value, min);
  }

  if (max) {
    return isSmallerThanDate(value, max);
  }

  return true;
}

function isBiggerThanDate(value: Date, date: Date) {
  const isValueFullYear = value.getFullYear();
  const isValueMonth = value.getMonth();
  const isValueDate = value.getDate();

  if (isValueFullYear > date.getFullYear()) {
    return true;
  }

  if (isValueFullYear < date.getFullYear()) {
    return false;
  }

  if (isValueMonth > date.getMonth()) {
    return true;
  }

  if (isValueMonth < date.getMonth()) {
    return false;
  }

  return isValueDate >= date.getDate();
}

function isSmallerThanDate(value: Date, date: Date) {
  const isValueFullYear = value.getFullYear();
  const isValueMonth = value.getMonth();
  const isValueDate = value.getDate();

  if (isValueFullYear > date.getFullYear()) {
    return false;
  }

  if (isValueFullYear < date.getFullYear()) {
    return true;
  }

  if (isValueMonth > date.getMonth()) {
    return false;
  }

  if (isValueMonth < date.getMonth()) {
    return true;
  }

  return isValueDate <= date.getDate();
}

export const removeOneDay = (date: Date): Date => {
  const newDate = new Date(date);

  newDate.setDate(newDate.getDate() - 1);

  return newDate;
};

export const addDay = (date: Date, day: number): Date => {
  const newDate = new Date(date);

  newDate.setDate(newDate.getDate() + day);

  return newDate;
};

export const findMiddleDate = (startDate: Date, endDate: Date): Date => {
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();

  const middleTime = (startTime + endTime) / 2;

  return new Date(middleTime);
};
