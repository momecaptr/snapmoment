export const addNumberDayMultiple = ({ date, day }: { date: Date; day: number }): Date => {
  const newDate = new Date(date);

  newDate.setDate(newDate.getDate() + day);

  return newDate;
};
