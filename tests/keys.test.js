const Keys = require('../js/core/keys');

describe('Keys.onKeyDown', () => {
  let keys;
  beforeEach(() => {
    global.isAlive = true;
    global.isFinished = false;
    keys = new Keys();
  });

  test('left arrow sets left flag', () => {
    keys.onKeyDown({ keyCode: 37 });
    expect(keys.left).toBe(true);
  });

  test('up arrow sets up flag', () => {
    keys.onKeyDown({ keyCode: 38 });
    expect(keys.up).toBe(true);
  });

  test('right arrow sets right flag', () => {
    keys.onKeyDown({ keyCode: 39 });
    expect(keys.right).toBe(true);
  });

  test('down arrow sets down flag', () => {
    keys.onKeyDown({ keyCode: 40 });
    expect(keys.down).toBe(true);
  });

  test('space sets space flag', () => {
    keys.onKeyDown({ keyCode: 32 });
    expect(keys.space).toBe(true);
  });

  test('enter sets enter flag', () => {
    keys.onKeyDown({ keyCode: 13 });
    expect(keys.enter).toBe(true);
  });
});
