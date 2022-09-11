export function getHumanReadableDate(dateInput: string) {
  const date = new Date(dateInput);
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return dateTimeFormat.format(date);
}
