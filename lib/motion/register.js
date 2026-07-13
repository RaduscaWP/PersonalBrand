'use client';

import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { Flip } from 'gsap/Flip';
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

let registered = false;

export function registerMotion() {
  if (registered || typeof window === 'undefined') return;

  gsap.registerPlugin(
    useGSAP,
    ScrollTrigger,
    SplitText,
    Flip,
    CustomEase,
    ScrambleTextPlugin,
  );
  CustomEase.create('radusca-out', '0.16, 1, 0.3, 1');
  registered = true;
}

registerMotion();

export {
  CustomEase,
  Flip,
  ScrambleTextPlugin,
  ScrollTrigger,
  SplitText,
  gsap,
  useGSAP,
};
