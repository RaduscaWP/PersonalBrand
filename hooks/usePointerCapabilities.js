'use client';

import useMediaQuery from './useMediaQuery';

export default function usePointerCapabilities() {
  const fine = useMediaQuery('(pointer: fine)');
  const hover = useMediaQuery('(hover: hover)');
  const coarse = useMediaQuery('(pointer: coarse)', true);

  return {
    fine,
    hover,
    coarse,
    enhanced: fine && hover && !coarse,
  };
}
