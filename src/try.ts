/*
 * @Author: Yu Chen
 * @Date: 2018-11-12 17:44:56
 * @Last Modified by: Yu Chen
 * @Last Modified time: 2018-11-12 21:17:40
 */

import { c_sleep } from './sleep';

export const ERR_TIMEOUT = '__ERR_TIMEOUT__';

/**
 * c_try
 * @param ctryFunc a function returns a promise
 * @param timeout timeout in ms
 * @param tries number of changes
 */
export function c_try<T>(
  ctryFunc: CtryFunction<T>,
  timeout: number = 5000,
  tries: number = 1,
  retryAfter?: number
): Promise<T> {
  const tf = () =>
    new Promise<never>((_, reject) => {
      const id = setTimeout(() => {
        clearTimeout(id);
        reject(new Error(ERR_TIMEOUT));
      }, timeout);
    });

  const tryit = async (t = 1): Promise<T> => {
    const ts = Date.now();
    try {
      const res = await Promise.race([ctryFunc(t), tf()]);
      return res;
    } catch (e) {
      if (e instanceof Error && ERR_TIMEOUT === e.message && t < tries) {
        const elapsed = Date.now() - ts;
        if (retryAfter === undefined) retryAfter = timeout;
        const delay = retryAfter - elapsed;
        if (delay > 0) await c_sleep(delay);
        return tryit(t + 1);
      } else {
        throw e;
      }
    }
  };
  return tryit();
}

export type CtryFunction<T> = (challenge: number) => Promise<T>;
