import { useEffect, useMemo } from 'react';

export function debounce(callback) {
  return function (time) {
    let timer = null;

    const cancel = () => clearTimeout(timer);
    const wrapped = function (...args) {
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => callback(...args), time);
    };

    return [wrapped, cancel];
  };
}

export function useDebounce(time, callback) {
  const [debounceCallback, cancel] = useMemo(
    () => debounce(callback)(time),
    [],
  );
  useEffect(() => cancel, []);
  return debounceCallback;
}
