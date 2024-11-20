import { c_sleep } from './sleep';

/**
 * ctry
 * @param ccheckFunc a function returns a promise
 * @param after do check after in ms
 * @param tries number of changes
 */
export async function check(
  checkFunc: CheckFunction,
  after: number = 5000,
  tries: number = 1
): Promise<boolean> {
  for (let t = 1; t <= tries; t++) {
    await c_sleep(after);
    const res = await checkFunc(t);
    if (res) return true;
  }
  return false;
}

export type CheckFunction = (challenge: number) => Promise<boolean>;
