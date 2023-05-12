import { useMemo } from 'react';
import useDeviceDimensions from './useDeviceDimensions';

type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

const gridBreakpoints = new Map<Breakpoint, number>([
  ['xs', 0],
  ['sm', 576],
  ['md', 768],
  ['lg', 992],
  ['xl', 1200],
  ['xxl', 1400]
]);

export default function useActiveBreakpoints() {
  const deviceDimensions = useDeviceDimensions();
  return useMemo(() => {
    const activeBreakpoints = new Set<Breakpoint>();
    for (const [k, v] of gridBreakpoints) {
      if (deviceDimensions.width >= v) {
        activeBreakpoints.add(k);
      }
    }
    return activeBreakpoints;
  }, [deviceDimensions]);
}
