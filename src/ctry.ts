/*
 * @Author: Yu Chen
 * @Date: 2018-11-12 17:44:56
 * @Last Modified by: Yu Chen
 * @Last Modified time: 2018-11-12 21:17:40
 */

export const ERR_TIMEOUT = 'ERR_TIMEOUT';

/**
 * ctry
 * @param ctryFunc a function returns a promise
 * @param timeout timeout in ms
 * @param tries number of changes
 */
export function ctry<T>(
  ctryFunc: CtryFunction<T>,
  timeout: number = 5000,
  tries: number = 1
): Promise<T> {
  const tf = () =>
    new Promise<never>((_, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject(new Error(ERR_TIMEOUT));
      }, timeout);
    });

  const tryit = async (t = 1): Promise<T> => {
    try {
      const res = await Promise.race([ctryFunc(t), tf()]);
      return res;
    } catch (e) {
      if (ERR_TIMEOUT === e.message && t < tries) {
        return tryit(t + 1);
      } else {
        throw e;
      }
    }
  };
  return tryit();
}

export type CtryFunction<T> = (challenge: number) => Promise<T>;
