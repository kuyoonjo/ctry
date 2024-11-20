import * as index from '../src/index';

test('Should export', () => {
  expect(index.c_try).toBeTruthy();
  expect(index.ERR_TIMEOUT).toBeTruthy();
});
