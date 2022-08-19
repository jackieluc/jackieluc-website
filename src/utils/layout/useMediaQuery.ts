import { useState, useCallback, useEffect } from 'react';

export default function useMediaQuery(width: number) {
  const [breakpointReached, setbreakpointReached] = useState<boolean>(false);

  const updateTarget = useCallback((e) => {
    if (e.matches) {
      setbreakpointReached(true);
    } else {
      setbreakpointReached(false);
    }
  }, []);

  useEffect(() => {
    const media = window?.matchMedia(`(max-width: ${width}px)`);
    media.addEventListener('change', (e) => updateTarget(e));

    // check on mount
    if (media.matches) {
      setbreakpointReached(true);
    }

    return () => media.removeEventListener('change', (e) => updateTarget(e));
  });

  return breakpointReached;
}
