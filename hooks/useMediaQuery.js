'use client';

import { useSyncExternalStore } from 'react';

function subscribe(query, callback) {
  const media = window.matchMedia(query);
  media.addEventListener?.('change', callback);
  return () => media.removeEventListener?.('change', callback);
}

export default function useMediaQuery(query, serverValue = false) {
  return useSyncExternalStore(
    (callback) => subscribe(query, callback),
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
