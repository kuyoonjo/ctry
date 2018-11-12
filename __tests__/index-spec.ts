import * as index from '../src/index';

test('Should export', () => {
  expect(index.ctry).toBeTruthy();
  expect(index.ERR_TIMEOUT).toBeTruthy();
});
