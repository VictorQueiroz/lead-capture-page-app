import { useCallback, useEffect, useMemo, useRef } from 'react';

export default function useDebounce(ms: number) {
  const timeoutIdRef = useRef<number | null>(null);
  const clear = useCallback(() => {
    if (timeoutIdRef.current !== null) {
      clearTimeout(timeoutIdRef.current);
      timeoutIdRef.current = null;
    }
  }, []);
  const run = useCallback(
    (fn: () => void) => {
      clear();
      timeoutIdRef.current = setTimeout(fn, ms);
    },
    [ms, clear]
  );
  useEffect(
    () => () => {
      clear();
    },
    [clear]
  );
  return useMemo(
    () => ({
      run,
      clear
    }),
    [run, clear]
  );
}
