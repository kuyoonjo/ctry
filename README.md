[![Build Status](https://travis-ci.org/kuyoonjo/ctry.svg?branch=master)](https://travis-ci.org/kuyoonjo/ctry.svg?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/kuyoonjo/ctry/badge.svg?branch=master)](https://coveralls.io/github/kuyoonjo/ctry?branch=master)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# Intro

`ctry` tries to resolve a promise with `timeout` and `chance` configurations.

```ts
/**
 * ctry
 * @param ctryFunc a function returns a promise
 * @param timeout timeout in ms
 * @param tries number of changes
 */
function ctry<T>(
  ctryFunc: CtryFunction<T>,
  timeout: number = 5000,
  tries: number = 1,
): Promise<T>;
```

> Q: When shoul you use it?
> A: Trying to do sth. with timeout, and/or give it more than one chance.

eg. Trying validate a web server whether it is reachable. The codes use `HEAD` method to do a request, and try 3 times.

```ts
import axios from 'axios';
import { ctry } from 'ctry';

(async () => {
  try {
    await ctry(() => axios.head('https://example.com'), 5000, 3);
  } catch (e) {
    console.error(e);
  }
})();
```