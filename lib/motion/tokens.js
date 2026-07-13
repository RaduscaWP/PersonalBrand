export const motion = {
  duration: {
    instant: 0.16,
    micro: 0.24,
    control: 0.34,
    reveal: 0.72,
    hero: 1.05,
    route: 0.58,
  },
  ease: {
    out: 'power3.out',
    strongOut: 'expo.out',
    inOut: 'power2.inOut',
    brand: 'radusca-out',
    linear: 'none',
  },
  stagger: {
    chars: 0.012,
    words: 0.035,
    lines: 0.085,
    cards: 0.09,
  },
  distance: {
    micro: 6,
    reveal: 22,
    hero: 44,
  },
};

export const motionQueries = {
  desktop: '(min-width: 1024px) and (hover: hover) and (pointer: fine)',
  compact: '(max-width: 1023px), (hover: none), (pointer: coarse)',
  reduce: '(prefers-reduced-motion: reduce)',
};
