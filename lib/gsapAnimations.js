import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function revealItems(selector, { stagger = 0.1, y = 50, duration = 0.7, delay = 0 } = {}) {
  return gsap.from(selector, {
    scrollTrigger: { trigger: selector, start: 'top 82%', once: true },
    y,
    opacity: 0,
    stagger,
    duration,
    delay,
    ease: 'power3.out',
  });
}

export function animateCounter(el, target, suffix = '') {
  const obj = { val: 0 };
  return gsap.to(obj, {
    val: target,
    duration: 2.5,
    ease: 'power2.out',
    scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    onUpdate: () => {
      el.textContent = Math.round(obj.val) + suffix;
    },
  });
}
