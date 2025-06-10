const ArrayUtils = require('../js/utils/array-utils');
// expose globally for random-utils
global.ArrayUtils = ArrayUtils;
const RandomUtils = require('../js/utils/random-utils');

describe('RandomUtils.getRandomElements', () => {
  test('returns the required number of elements from the array', () => {
    const base = [1, 2, 3, 4, 5];
    const result = RandomUtils.getRandomElements(base, 3);
    expect(result.length).toBe(3);
    // all result elements should come from base
    result.forEach(v => {
      expect(base.includes(v)).toBe(true);
    });
    // unique elements
    expect(new Set(result).size).toBe(result.length);
  });
});

describe('RandomUtils.getRandomLevel', () => {
  test('uses provided counts', () => {
    const level = RandomUtils.getRandomLevel(4, 4, { holes: 2, wumpus: 1, golds: 1 });
    expect(level.holes.length).toBe(2);
    expect(level.wumpus.length).toBe(1);
    expect(level.golds.length).toBe(1);
  });
});
