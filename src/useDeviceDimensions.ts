import { useCallback, useEffect, useState } from 'react';
import useDebounce from './useDebounce';

export interface IDeviceDimensions {
  width: number;
  height: number;
}

export default function useDeviceDimensions() {
  const getWindowDimensions = useCallback(
    () => ({
      width: window.innerWidth,
      height: window.innerHeight
    }),
    []
  );
  const [deviceDimensions, setDeviceDimensions] = useState<IDeviceDimensions>(
    getWindowDimensions()
  );
  const debounce = useDebounce(100);
  const onResize = useCallback(() => {
    debounce.run(() => {
      setDeviceDimensions(getWindowDimensions);
    });
  }, [debounce, getWindowDimensions, setDeviceDimensions]);
  useEffect(() => {
    window.addEventListener('resize', onResize, {
      passive: true,
      capture: true
    });
    return () => {
      window.removeEventListener('resize', onResize, {
        capture: true
      });
    };
  }, [onResize]);
  return deviceDimensions;
}
