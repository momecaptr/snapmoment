export const getNormalDateFormat = <
  T extends { [key: string]: any; dateOfPayment: string; endDateOfSubscription: string }
>(
  value: T
) => {
  const options: any = {
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    month: 'long',
    year: 'numeric'
  };
  const date = new Date(value.dateOfPayment);
  const formattedDate = date.toLocaleString('en-EN', options);
  const dateEnd = new Date(value.endDateOfSubscription);
  const formattedDateEnd = dateEnd.toLocaleString('en-EN', options);

  return { formattedDate, formattedDateEnd };
};
