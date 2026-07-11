'use client';

import Link from 'next/link';

export default function ErrorPage({ reset }) {
  return (
    <div className="route-state route-state--error" role="alert">
      <span className="page-kicker">Something went wrong</span>
      <h1>That page did not finish loading.</h1>
      <p>Your request is safe. Try the route again, or return to the homepage.</p>
      <div className="route-state__actions">
        <button type="button" onClick={reset}>
          Try again
        </button>
        <Link href="/">Back home</Link>
      </div>
    </div>
  );
}
