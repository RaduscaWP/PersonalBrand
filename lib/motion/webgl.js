let failureReported = false;

export function canUseWebGL() {
  if (typeof document === 'undefined') return false;

  try {
    const canvas = document.createElement('canvas');
    const options = { failIfMajorPerformanceCaveat: true };
    const context =
      canvas.getContext('webgl2', options) ?? canvas.getContext('webgl', options);
    const available = Boolean(context);

    context?.getExtension('WEBGL_lose_context')?.loseContext();
    return available;
  } catch {
    return false;
  }
}

export function reportWebGLFallback(reason = 'unavailable') {
  if (failureReported || typeof window === 'undefined') return;
  failureReported = true;
  document.documentElement.dataset.webgl = 'fallback';
  window.dispatchEvent(
    new CustomEvent('radusca:webgl-fallback', { detail: { reason } }),
  );
}
