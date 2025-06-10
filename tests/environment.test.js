const ArrayUtils = require('../js/utils/array-utils');
// expose globally for environment
global.ArrayUtils = ArrayUtils;
const RandomUtils = require('../js/utils/random-utils');
// expose globally for environment
global.RandomUtils = RandomUtils;
const Environment = require('../js/core/environment');

describe('Environment.randomInitialization', () => {
  test('initializes level and copies structures', () => {
    const stubLevel = { holes: [[1,1]], wumpus: [[0,2]], golds: [[2,0]] };
    jest.spyOn(RandomUtils, 'getRandomLevel').mockReturnValue(stubLevel);
    const env = new Environment(3,3,1,1);
    expect(env.level).toEqual(stubLevel);
    expect(env.holes).toEqual(stubLevel.holes);
    expect(env.wumpus).toEqual(stubLevel.wumpus);
    expect(env.golds).toEqual(stubLevel.golds);
    expect(env.visible[0][0]).toBe(1);
    RandomUtils.getRandomLevel.mockRestore();
  });
});

describe('Environment.restart', () => {
  test('restores from level data', () => {
    const stubLevel = { holes: [[1,0]], wumpus: [[0,1]], golds: [[0,0]] };
    jest.spyOn(RandomUtils, 'getRandomLevel').mockReturnValue(stubLevel);
    const env = new Environment(2,2,1,1);
    env.holes = [[9,9]];
    env.wumpus = [[8,8]];
    env.golds = [[7,7]];
    env.visible[0][0] = 0;
    env.restart();
    expect(env.holes).toEqual(stubLevel.holes);
    expect(env.wumpus).toEqual(stubLevel.wumpus);
    expect(env.golds).toEqual(stubLevel.golds);
    expect(env.visible[0][0]).toBe(1);
    RandomUtils.getRandomLevel.mockRestore();
  });
});

describe('Environment.removeWumpus and removeGold', () => {
  test('removes wumpus and gold properly', () => {
    const stubLevel = { holes: [], wumpus: [[0,1]], golds: [[1,0]] };
    jest.spyOn(RandomUtils, 'getRandomLevel').mockReturnValue(stubLevel);
    const env = new Environment(2,2,1,1);
    env.removeWumpus([0,1]);
    expect(env.wumpus).toEqual([]);
    expect(env.visible[0][1]).toBe(1);
    env.removeGold([1,0]);
    expect(env.golds).toEqual([]);
    RandomUtils.getRandomLevel.mockRestore();
  });
});
