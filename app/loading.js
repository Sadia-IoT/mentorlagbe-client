export default function Loading() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4">
      <div className="text-center">
        <div className="relative mx-auto h-14 w-14">
          <span className="absolute inset-0 rounded-full border-2 border-line" />
          <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-brand" />
          <span className="absolute inset-[18px] rounded-full bg-brand/15" />
        </div>
        <p className="mt-5 font-display text-lg">Opening the register…</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted">
          MentorLagbe
        </p>
      </div>
    </div>
  );
}
