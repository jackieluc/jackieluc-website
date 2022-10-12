import { getHumanReadableDate } from '@/utils/date';

describe('date utils', () => {
  it('gets the correct readable date', () => {
    expect(getHumanReadableDate('2022-08-14T00:00:00.000Z')).toEqual('Aug 13, 2022');
  });

  it('returns no date when date is not provided', () => {
    expect(getHumanReadableDate('')).toEqual('[no date]');
  });
});
