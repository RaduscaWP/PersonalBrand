import { motion } from './tokens';

export const revealPreset = {
  y: motion.distance.reveal,
  autoAlpha: 0,
  duration: motion.duration.reveal,
  ease: motion.ease.out,
};

export const heroRevealPreset = {
  y: motion.distance.hero,
  autoAlpha: 0,
  duration: motion.duration.hero,
  ease: motion.ease.strongOut,
};

export function revealFrom(direction = 'up', distance = motion.distance.reveal) {
  const axis = direction === 'left' || direction === 'right' ? 'x' : 'y';
  const negative = direction === 'down' || direction === 'right';

  return {
    [axis]: negative ? -distance : distance,
    autoAlpha: 0,
    duration: motion.duration.reveal,
    ease: motion.ease.out,
  };
}
