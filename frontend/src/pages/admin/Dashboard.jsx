import { useEffect, useState } from "react";
import { api } from "../../utils/apiClient";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.get("/dashboard/stats/")
      .then((res) => { if (active) setStats(res); })
      .catch(() => { if (active) setStats(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  if (loading) {
    return <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo border-t-transparent" /></div>;
  }

  if (!stats) {
    return <div className="rounded-lg border border-ivory/10 bg-ink/50 p-6 text-ivory/60">Unable to load dashboard stats.</div>;
  }

  const cards = [
    { label: "Total donations", value: `Rs. ${stats.donations.total_amount.toLocaleString()}`, sub: `${stats.donations.total_count} success, ${stats.donations.pending_count} pending`, color: "madder" },
    { label: "Volunteers", value: stats.volunteers.total, sub: `${stats.volunteers.pending} pending approval`, color: "indigo" },
    { label: "Projects", value: stats.projects.total, sub: `${stats.projects.published} published, ${stats.projects.campaigns} campaigns`, color: "sage" },
    { label: "Enquiries", value: stats.enquiries.total, sub: `${stats.enquiries.new} new`, color: "marigold" },
  ];

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ivory">Dashboard</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-lg border border-ivory/10 bg-ink/50 p-6">
            <p className="text-sm text-ivory/60">{c.label}</p>
            <p className="mt-2 font-mono text-2xl font-bold text-ivory">{c.value}</p>
            <p className="mt-1 text-xs text-ivory/50">{c.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-ivory/10 bg-ink/50 p-6">
          <h2 className="font-display text-lg font-bold text-ivory">Recent donations</h2>
          <ul className="mt-4 space-y-3">
            {stats.recent_donations?.map((d) => (
              <li key={d.id} className="flex items-center justify-between border-b border-ivory/5 pb-2">
                <span className="text-sm text-ivory/80">{d.donor_name}</span>
                <span className="font-mono text-sm text-marigold">Rs. {Number(d.amount).toLocaleString()}</span>
              </li>
            ))}
            {(!stats.recent_donations || stats.recent_donations.length === 0) && (
              <p className="text-sm text-ivory/40">No donations yet.</p>
            )}
          </ul>
        </div>
        <div className="rounded-lg border border-ivory/10 bg-ink/50 p-6">
          <h2 className="font-display text-lg font-bold text-ivory">Recent volunteers</h2>
          <ul className="mt-4 space-y-3">
            {stats.recent_volunteers?.map((v) => (
              <li key={v.id} className="flex items-center justify-between border-b border-ivory/5 pb-2">
                <span className="text-sm text-ivory/80">{v.name}</span>
                <span className="text-xs text-ivory/50">{v.status}</span>
              </li>
            ))}
            {(!stats.recent_volunteers || stats.recent_volunteers.length === 0) && (
              <p className="text-sm text-ivory/40">No volunteers yet.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}