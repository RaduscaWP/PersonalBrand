export default function Loading() {
  // Internal navigation is covered by the route curtain. Returning no generic
  // fallback keeps the previous route stable while the next segment resolves.
  return null;
}
