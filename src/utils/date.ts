export function getHumanReadableDate(dateAsString: string) {
  const date = new Date(dateAsString);
  const dateTimeFormat = new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return dateTimeFormat.format(date);
}
