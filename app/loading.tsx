export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink bg-circuit">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-line border-t-signal"></div>
        <p className="text-sm font-semibold tracking-wide text-mist animate-pulse">LOADING...</p>
      </div>
    </div>
  );
}
