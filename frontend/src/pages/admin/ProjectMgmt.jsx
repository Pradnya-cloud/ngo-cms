import { useEffect, useState } from "react";
import { api } from "../../utils/apiClient";

function extractList(res) {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.results)) return res.results;
  if (Array.isArray(res?.data)) return res.data;
  return [];
}

export default function ProjectMgmt() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.get("/projects/")
      .then((res) => { if (active) setItems(extractList(res)); })
      .catch(() => { if (active) setItems([]); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ivory">Project management</h1>
        <button className="rounded-sm bg-madder px-4 py-2 text-sm font-semibold text-ivory hover:bg-madder/90">Add project</button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo border-t-transparent" /></div>
      ) : (
        <div className="overflow-hidden rounded-lg border border-ivory/10">
          <table className="w-full text-sm">
            <thead className="bg-ink/40 text-ivory/70">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-left font-medium">Type</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ivory/10">
              {items.map((p) => (
                <tr key={p.id}>
                  <td className="px-4 py-3 text-ivory">{p.title}</td>
                  <td className="px-4 py-3 text-ivory/70">{p.project_type ?? "project"}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-sm px-2 py-0.5 text-xs ${
                      p.status === "published" ? "bg-sage/20 text-sage" :
                      p.status === "draft" ? "bg-ink/40 text-ivory/60" :
                      "bg-marigold/20 text-marigold"
                    }`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button className="text-marigold hover:underline">Edit</button>
                    <button className="text-madder hover:underline">Delete</button>
                  </td>
                  </tr>
              ))}
              {items.length === 0 && (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-ivory/40">No projects yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}