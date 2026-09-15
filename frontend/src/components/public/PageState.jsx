import { Link } from "react-router-dom";

export function PageLoading({ label = "Loading content" }) {
  return (
    <div className="container-page flex min-h-[55vh] items-center justify-center py-20" role="status" aria-live="polite">
      <div className="flex items-center gap-4 text-indigo">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-indigo/25 border-t-indigo" aria-hidden="true" />
        <span className="font-medium">{label}</span>
      </div>
    </div>
  );
}

export function PageError({ message = "We could not load this page." }) {
  return (
    <div className="container-page py-16" role="alert">
      <div className="border-l-4 border-madder bg-madder/5 p-5 sm:p-6">
        <p className="font-display text-xl text-ink">{message}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink/65">The latest update is temporarily unavailable. You can continue exploring the page using the latest saved content.</p>
        <Link to="/" className="btn-ghost mt-4 inline-flex text-sm">Return home</Link>
      </div>
    </div>
  );
}

export function PageNotice({ children }) {
  if (!children) return null;
  return (
    <div className="container-page -mt-3 pb-2 text-right">
      <p className="inline-flex items-center gap-2 text-xs font-medium text-madder">{children}</p>
    </div>
  );
}
