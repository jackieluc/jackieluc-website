import { DAY_AS_SECONDS, WEEK_AS_SECONDS, MONTH_AS_SECONDS } from './../../../src/utils/blog/revalidate';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import getRevalidateTime from '@/utils/blog/revalidate';

describe('revalidate utils', () => {
  beforeEach(() => {
    vi.useFakeTimers();

    const mockDate = new Date('2022-09-30');
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the time in seconds for a month when input date is >= 30 days ago', () => {
    expect(getRevalidateTime('2022-07-14T00:00:00.000Z')).toEqual(MONTH_AS_SECONDS);
  });

  it('returns the time in seconds for a week when input date is >= 7 days ago and < 30 days', () => {
    expect(getRevalidateTime('2022-09-21T00:00:00.000Z')).toEqual(WEEK_AS_SECONDS);
  });

  it('returns the time in seconds for a day when when input date is < 7 days ago', () => {
    expect(getRevalidateTime('2022-09-28T00:00:00.000Z')).toEqual(DAY_AS_SECONDS);
  });
});
