export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <span className="font-mono text-6xl font-bold text-madder">404</span>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink">Page not found</h1>
      <p className="mt-2 text-ink/60">The page you are looking for does not exist or has been moved.</p>
      <a href="/" className="mt-6 inline-block rounded-sm bg-madder px-5 py-2 text-sm font-semibold text-ivory hover:bg-madder/90">Back to home</a>
    </div>
  );
}