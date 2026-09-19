export default function EventCard({ event }) {
  const d = new Date(event.date);
  const day = d.toLocaleDateString("en-IN", { day: "2-digit" });
  const month = d.toLocaleDateString("en-IN", { month: "short" });
  return (
    <div className="flex gap-4 items-start border border-ink/10 rounded-sm p-4 bg-white/60">
      <div className="shrink-0 w-14 text-center border-2 border-indigo rounded-sm py-2">
        <p className="font-mono text-lg font-semibold text-indigo leading-none">{day}</p>
        <p className="font-mono text-[10px] uppercase tracking-wide text-indigo/70 mt-1">{month}</p>
      </div>
      <div>
        <h4 className="font-display font-semibold text-indigo-deep">{event.title}</h4>
        <p className="text-sm text-ink/60 mt-1">{event.location}</p>
      </div>
    </div>
  );
}
