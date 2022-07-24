import { describe, it, expect } from 'vitest';
import { add } from '@/utils/addTwoNumbers';

// The two tests marked with concurrent will be run in parallel
describe('utils', () => {
  it('add two numbers', () => {
    expect(add(1, 2)).toEqual(3);
  });
});
