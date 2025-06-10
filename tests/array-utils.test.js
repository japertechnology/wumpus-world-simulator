// MIT License. See LICENSE in the project root for details.
const ArrayUtils = require('../js/utils/array-utils');

describe('ArrayUtils.removeByValues', () => {
  test('removes array values', () => {
    const result = ArrayUtils.removeByValues([[0,0],[1,1],[0,1]], [[0,1]]);
    expect(result).toEqual([[0,0],[1,1]]);
  });

  test('removes multiple array values', () => {
    const result = ArrayUtils.removeByValues([[0,0],[1,1],[0,1],[2,2]], [[0,1],[2,2]]);
    expect(result).toEqual([[0,0],[1,1]]);
  });
});
