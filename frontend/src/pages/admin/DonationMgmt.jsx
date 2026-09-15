import { useEffect, useState } from "react";
import { api } from "../../utils/apiClient";

function extractList(res) {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.results)) return res.results;
  if (Array.isArray(res?.data)) return res.data;
  return [];
}

export default function DonationMgmt() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.get("/donations/")
      .then((res) => { if (active) setItems(extractList(res)); })
      .catch(() => { if (active) setItems([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ivory">Donation management</h1>
      {loading ? (
        <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo border-t-transparent" /></div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-ivory/10">
          <table className="w-full text-sm">
            <thead className="bg-ink/40 text-ivory/70">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Donor</th>
                <th className="px-4 py-3 text-left font-medium">Amount</th>
                <th className="px-4 py-3 text-left font-medium">Project</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-left font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory/10">
              {items.map((d) => (
                <tr key={d.id}>
                  <td className="px-4 py-3 text-ivory">{d.donor_name}</td>
                  <td className="px-4 py-3 text-ivory">Rs. {Number(d.amount).toLocaleString()}</td>
                  <td className="px-4 py-3 text-ivory/70">{d.project?.title ?? d.project ?? "-"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-sm px-2 py-0.5 text-xs ${
                      d.status === "success" ? "bg-sage/20 text-sage" :
                      d.status === "pending" ? "bg-marigold/20 text-marigold" :
                      d.status === "failed" ? "bg-madder/20 text-madder" :
                      "bg-ink/40 text-ivory/60"
                    }`}>{d.status}</span>
                  </td>
                  <td className="px-4 py-3 text-ivory/70">{d.date ? new Date(d.date).toLocaleDateString() : "-"}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-ivory/40">No donations yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}