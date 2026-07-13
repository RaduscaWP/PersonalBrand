'use client';

import { Component } from 'react';
import { reportWebGLFallback } from '@/lib/motion/webgl';

export default class WebGLFallbackBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    reportWebGLFallback('render-error');
  }

  render() {
    if (this.state.failed) return this.props.fallback ?? null;
    return this.props.children;
  }
}
