const ArrayUtils = require('../js/utils/array-utils');
// expose globally for environment and player
global.ArrayUtils = ArrayUtils;
const RandomUtils = require('../js/utils/random-utils');
global.RandomUtils = RandomUtils;
// stub resources
global.resources = { play: jest.fn() };
const Environment = require('../js/core/environment');
const Player = require('../js/core/player');

describe('Player.kill', () => {
  test('returns adjacent wumpus and consumes arrow', () => {
    const level = { holes: [], wumpus: [[1,0]], golds: [] };
    jest.spyOn(RandomUtils, 'getRandomLevel').mockReturnValue(level);
    const env = new Environment(2,2,1,1);
    const player = new Player(env, 0, 0);
    player.direction = 4; // FACING_TO_RIGHT
    player.arrow = 1;
    const keys = { space: true };
    const dead = player.kill(keys);
    expect(dead).toEqual([1,0]);
    expect(player.arrow).toBe(0);
    expect(keys.space).toBe(false);
    expect(global.resources.play).toHaveBeenCalledWith('arrow');
    RandomUtils.getRandomLevel.mockRestore();
    global.resources.play.mockClear();
  });

  test('does nothing when out of arrows', () => {
    const level = { holes: [], wumpus: [], golds: [] };
    jest.spyOn(RandomUtils, 'getRandomLevel').mockReturnValue(level);
    const env = new Environment(2,2,1,1);
    const player = new Player(env, 0, 0);
    player.arrow = 0;
    const keys = { space: true };
    const dead = player.kill(keys);
    expect(dead).toBe(false);
    RandomUtils.getRandomLevel.mockRestore();
  });
});

describe('Player.capture', () => {
  test('captures gold on current cell', () => {
    const level = { holes: [], wumpus: [], golds: [[0,0]] };
    jest.spyOn(RandomUtils, 'getRandomLevel').mockReturnValue(level);
    const env = new Environment(1,1,1,1);
    const player = new Player(env,0,0);
    const keys = { enter: true };
    const gold = player.capture(keys);
    expect(gold).toEqual([0,0]);
    expect(keys.enter).toBe(false);
    RandomUtils.getRandomLevel.mockRestore();
  });
});

describe('Player.update movement', () => {
  test('changes direction then moves and resets keys', () => {
    const level = { holes: [], wumpus: [], golds: [] };
    jest.spyOn(RandomUtils, 'getRandomLevel').mockReturnValue(level);
    const env = new Environment(2,2,1,1);
    const player = new Player(env,0,0);
    const keys = { right: true, up:false, down:false, left:false };
    // first call only changes direction
    let moved = player.update(keys);
    expect(moved).toBe(false);
    expect(player.direction).toBe(4); // right
    expect(player.x).toBe(0);
    // second call moves
    keys.right = true;
    moved = player.update(keys);
    expect(moved).toBe(true);
    expect(player.x).toBe(1);
    // keys reset
    expect(keys.right).toBe(false);
    RandomUtils.getRandomLevel.mockRestore();
  });
});
