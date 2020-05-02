import React from 'react';

export function usePrevDimension(
  dimension: string | number | undefined,
  computeFn: () => number
) {
  const prevDim = React.useRef<number>(0);
  React.useEffect(() => {
    const computed = computeFn();
    if (computed !== prevDim.current) {
      prevDim.current = computed;
    }
  }, [dimension]);

  return prevDim.current;
}
