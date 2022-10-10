export function getHumanReadableDate(dateInput: string) {
  if (!dateInput) {
    return '[no date]';
  }

  const date = new Date(dateInput);
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return dateTimeFormat.format(date);
}
