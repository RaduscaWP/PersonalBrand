export default function Loading() {
  return (
    <div className="route-state" role="status" aria-live="polite">
      <span className="route-state__pulse" aria-hidden="true" />
      <span>Loading page</span>
    </div>
  );
}
