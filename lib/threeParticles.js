import * as THREE from 'three';
import { canUseWebGL, reportWebGLFallback } from './motion/webgl';

export function initParticles(canvas) {
  if (!canvas || !canUseWebGL()) {
    reportWebGLFallback('capability-check');
    return () => {};
  }

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: 'low-power',
      failIfMajorPerformanceCaveat: true,
    });
  } catch {
    reportWebGLFallback('renderer-construction');
    return () => {};
  }

  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const count = 600;
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 1) pos[i] = (Math.random() - 0.5) * 18;
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));

  const mat = new THREE.PointsMaterial({
    color: 0x7c3aed,
    size: 0.02,
    transparent: true,
    opacity: 0.3,
    sizeAttenuation: true,
  });

  const points = new THREE.Points(geo, mat);
  scene.add(points);
  camera.position.z = 5;

  let raf = null;
  let inView = true;
  let disposed = false;

  const tick = () => {
    if (disposed || document.hidden || !inView) {
      raf = null;
      return;
    }
    raf = requestAnimationFrame(tick);
    points.rotation.y += 0.0002;
    points.rotation.x += 0.00007;
    renderer.render(scene, camera);
  };

  const start = () => {
    if (!disposed && !document.hidden && inView && raf === null) tick();
  };

  const stop = () => {
    if (raf !== null) cancelAnimationFrame(raf);
    raf = null;
  };

  const updateActivity = () => {
    if (document.hidden || !inView) stop();
    else start();
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      updateActivity();
    },
    { rootMargin: '120px' },
  );
  observer.observe(canvas);
  document.addEventListener('visibilitychange', updateActivity);

  const onResize = () => {
    const width = Math.max(1, canvas.clientWidth);
    const height = Math.max(1, canvas.clientHeight);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };

  const resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(canvas);

  const onContextLost = (event) => {
    event.preventDefault();
    stop();
    reportWebGLFallback('context-lost');
  };
  canvas.addEventListener('webglcontextlost', onContextLost, false);
  start();

  return () => {
    disposed = true;
    stop();
    observer.disconnect();
    resizeObserver.disconnect();
    document.removeEventListener('visibilitychange', updateActivity);
    canvas.removeEventListener('webglcontextlost', onContextLost);
    geo.dispose();
    mat.dispose();
    renderer.dispose();
    renderer.forceContextLoss?.();
  };
}
