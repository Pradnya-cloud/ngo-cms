import { useEffect, useState } from "react";
import { api } from "../../utils/apiClient";

function extractList(res) {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.results)) return res.results;
  if (Array.isArray(res?.data)) return res.data;
  return [];
}

export default function VolunteerMgmt() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    api.get("/volunteers/").then((res) => { if (active) setItems(extractList(res)); }).catch(() => { if (active) setItems([]); }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  return (
    <div>
      <h1 className="mb-6 font-display text-2xl font-bold text-ivory">Volunteer management</h1>
      {loading ? <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo border-t-transparent" /></div> : (
        <div className="overflow-hidden rounded-lg border border-ivory/10">
          <table className="w-full text-sm">
            <thead className="bg-ink/40 text-ivory/70"><tr><th className="px-4 py-3 text-left font-medium">Name</th><th className="px-4 py-3 text-left font-medium">Email</th><th className="px-4 py-3 text-left font-medium">Status</th><th className="px-4 py-3 text-right font-medium">Actions</th></tr></thead>
            <tbody className="divide-y divide-ivory/10">
              {items.map((v) => <tr key={v.id}><td className="px-4 py-3 text-ivory">{v.name}</td><td className="px-4 py-3 text-ivory/70">{v.email}</td><td className="px-4 py-3"><span className={`rounded-sm px-2 py-0.5 text-xs ${v.status === "approved" ? "bg-sage/20 text-sage" : v.status === "rejected" ? "bg-madder/20 text-madder" : "bg-marigold/20 text-marigold"}`}>{v.status}</span></td><td className="px-4 py-3 text-right space-x-2"><button className="text-sage hover:underline">Approve</button><button className="text-madder hover:underline">Reject</button></td></tr>)}
              {items.length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-ivory/40">No volunteers yet.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}