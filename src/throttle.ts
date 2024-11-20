export function c_throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number,
  trailing: boolean = false
): (...args: Parameters<T>) => void {
  if (trailing) return throttleWithTrailing(func, limit);
  let lastCall = 0;
  return (...args: Parameters<T>) => {
    const now = Date.now();

    if (now - lastCall >= limit) {
      lastCall = now;
      func(...args);
    }
  };
}

function throttleWithTrailing<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastCallTime = 0; // 上次调用时间
  let timeout: ReturnType<typeof setTimeout> | null = null; // 定时器
  let lastArgs: Parameters<T> | null = null; // 最后一次调用的参数

  return (...args: Parameters<T>) => {
    const now = Date.now();

    // 如果在时间间隔内，记录最后一次调用的参数
    if (now - lastCallTime < limit) {
      lastArgs = args;

      if (!timeout) {
        // 设置定时器，确保最后一次调用能被执行
        timeout = setTimeout(
          () => {
            timeout = null; // 清除定时器
            if (lastArgs) {
              func(...lastArgs); // 执行最后一次调用
              lastCallTime = Date.now(); // 更新调用时间
              lastArgs = null; // 清空最后的参数
            }
          },
          limit - (now - lastCallTime)
        );
      }
    } else {
      // 如果时间间隔已过，立即调用函数
      func(...args);
      lastCallTime = now;
    }
  };
}
