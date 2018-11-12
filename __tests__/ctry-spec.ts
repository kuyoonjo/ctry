import { ctry, ERR_TIMEOUT } from '../src/ctry';

test('Should resolve', async () => {
  const fn = () => Promise.resolve(1);
  const res = await ctry(_ => fn());
  expect(res).toBe(1);
});

test('Should reject', async () => {
  const fn = () => Promise.reject(1);
  try {
    await ctry(_ => fn(), 1000, 1);
  } catch (e) {
    expect(e).toBe(1);
  }
});

test('Should reject with timeout', async () => {
  const fn = () =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(1);
      }, 1000);
    });
  try {
    await ctry(_ => fn(), 100, 1);
  } catch (e) {
    expect(e.message).toBe(ERR_TIMEOUT);
  }
});

test('Should resolve with 3 tries', async () => {
  const p = new Promise(resolve => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
  const fn = () => p;
  const res = await ctry(_ => fn(), 400, 3);
  expect(res).toBe(1);
});

test('Should reject with 2 tries', async () => {
  const p = new Promise(resolve => {
    setTimeout(() => {
      resolve(1);
    }, 1000);
  });
  const fn = () => p;
  try {
    await ctry(_ => fn(), 400, 2);
  } catch (e) {
    expect(e.message).toBe(ERR_TIMEOUT);
  }
});
