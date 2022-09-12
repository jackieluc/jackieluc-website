export const DAY_AS_SECONDS = 60 * 60 * 24;
export const WEEK_AS_SECONDS = DAY_AS_SECONDS * 7;
export const MONTH_AS_SECONDS = WEEK_AS_SECONDS * 4;
export const MS_PER_DAY = DAY_AS_SECONDS * 1000;

/**
 * Generates the revalidation time based on the difference in days between today and the date input.
 * The bigger the difference, the longer the page is cached. Eg. if the most recent blog post is
 * published >= 30 days ago, then it will be revalidated after every month.
 *
 * @param dateInput Notion date
 * @returns time in seconds - how long the resource should be cached before revalidating it
 */
export default function getRevalidateTime(dateInput: string) {
  const publishedDate = new Date(dateInput).getTime();
  const now = Date.now();

  const dateDiffInDays = Math.floor((now - publishedDate) / MS_PER_DAY);

  if (dateDiffInDays >= 30) {
    return MONTH_AS_SECONDS;
  } else if (dateDiffInDays >= 7) {
    return WEEK_AS_SECONDS;
  }

  return DAY_AS_SECONDS;
}
