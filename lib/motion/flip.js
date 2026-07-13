import { Flip } from './register';
import { motion } from './tokens';

export function flipLayout(targets, mutate, options = {}) {
  const state = Flip.getState(targets);
  mutate();
  return Flip.from(state, {
    duration: motion.duration.control,
    ease: motion.ease.out,
    absolute: false,
    nested: true,
    ...options,
  });
}
