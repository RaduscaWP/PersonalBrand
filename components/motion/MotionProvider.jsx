'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import usePointerCapabilities from '@/hooks/usePointerCapabilities';
import usePrefersReducedMotion from '@/hooks/usePrefersReducedMotion';
import { registerMotion } from '@/lib/motion/register';

const MotionContext = createContext({
  reduceMotion: false,
  pointer: { fine: false, hover: false, coarse: true, enhanced: false },
  saveData: false,
  introComplete: false,
  markIntroComplete: () => {},
});

export function useMotion() {
  return useContext(MotionContext);
}

export default function MotionProvider({ children }) {
  const reduceMotion = usePrefersReducedMotion();
  const pointer = usePointerCapabilities();
  const [saveData, setSaveData] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);
  const markIntroComplete = useCallback(() => setIntroComplete(true), []);

  useEffect(() => {
    registerMotion();
    setSaveData(Boolean(navigator.connection?.saveData));
    setIntroComplete(document.documentElement.dataset.intro !== 'pending');
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = reduceMotion ? 'reduced' : 'full';
  }, [reduceMotion]);

  const value = useMemo(
    () => ({
      reduceMotion,
      pointer,
      saveData,
      introComplete,
      markIntroComplete,
    }),
    [introComplete, markIntroComplete, pointer, reduceMotion, saveData],
  );

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
