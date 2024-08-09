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
  return value > 9 ? value.toString() : `0${value}`;
};

export const getInputValueFromDate = (date: Date): string => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const dayString = addLeadingZeroIfNeeded(day);
  const monthString = addLeadingZeroIfNeeded(month);

  return `${dayString}.${monthString}.${year}`;
};

export const getDateFromInputValue = (dateString: string): Date | null => {
  const datePattern = /^(\d{2})\.(\d{2})\.(\d{4})$/;
  const match = dateString.match(datePattern);

  if (!match) {
    return null;
  }

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const year = parseInt(match[3], 10);
  const date = new Date(year, month, day);

  if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
    return null;
  }

  return date;
};

export function isToday(cell: DateCellItem, todayDate: Date) {
  return (
    todayDate.getFullYear() === cell.year && todayDate.getMonth() === cell.month && todayDate.getDate() === cell.date
  );
}

export function isInRange(value: Date, startDate?: Date, endDate?: Date): boolean {
  if (startDate && !isBiggerThanDate(value, startDate)) {
    return false;
  }

  if (endDate && !isSmallerThanDate(value, endDate)) {
    return false;
  }

  return true;
}

function isBiggerThanDate(value: Date, date: Date): boolean {
  return (
    value.getFullYear() > date.getFullYear() ||
    (value.getFullYear() === date.getFullYear() &&
      (value.getMonth() > date.getMonth() ||
        (value.getMonth() === date.getMonth() && value.getDate() >= date.getDate())))
  );
}

function isSmallerThanDate(value: Date, date: Date): boolean {
  return (
    value.getFullYear() < date.getFullYear() ||
    (value.getFullYear() === date.getFullYear() &&
      (value.getMonth() < date.getMonth() ||
        (value.getMonth() === date.getMonth() && value.getDate() <= date.getDate())))
  );
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
