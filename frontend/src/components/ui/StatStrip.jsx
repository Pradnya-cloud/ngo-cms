import { stats as staticStats } from "../../data/content";

export default function StatStrip({ stats: statProps }) {
  const stats = statProps ?? staticStats;
  return (
    <div className="bg-indigo-deep text-ivory">
      <div className="container-page py-10 grid grid-cols-2 sm:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center sm:text-left">
            <p className="font-mono text-3xl sm:text-4xl text-marigold-light font-medium">{s.value}</p>
            <p className="mt-1 text-sm text-ivory/70">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
