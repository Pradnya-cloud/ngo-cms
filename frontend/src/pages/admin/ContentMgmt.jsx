import { useEffect, useState } from "react";
import { api } from "../../utils/apiClient";
import ContentForm from "../../components/admin/ContentForm";

function extractList(res) {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.results)) return res.results;
  if (Array.isArray(res?.data)) return res.data;
  return [];
}

export default function ContentMgmt() {
  const [blocks, setBlocks] = useState([]);
  const [pageType, setPageType] = useState("home");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);
    api.get(`/content/?page_type=${pageType}`)
      .then((res) => setBlocks(extractList(res)))
      .catch(() => setBlocks([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [pageType]);

  const handleSave = (initial) => {
    setModalOpen(true);
    setEditing(initial || null);
  };

  const handleFormSave = (initial) => {
    setModalOpen(false);
    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this content block?")) return;
    try {
      await api.delete(`/content/${id}/`);
      load();
    } catch { alert("Failed to delete"); }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-ivory">Content management</h1>
        <div className="flex items-center gap-3">
          <select value={pageType} onChange={(e) => setPageType(e.target.value)} className="rounded-sm border border-ivory/20 bg-ink/50 px-3 py-1.5 text-sm text-ivory">
            {["home", "about", "our_work", "contact", "get_involved", "donate", "media"].map((p) => <option key={p} value={p}>{p.replace("_", " ")}</option>)}
          </select>
          <button onClick={() => handleSave(null)} className="rounded-sm bg-madder px-4 py-2 text-sm font-semibold text-ivory hover:bg-madder/90">Add block</button>
        </div>
      </div>
      {loading ? <div className="flex justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo border-t-transparent" /></div> : (
        <div className="overflow-hidden rounded-lg border border-ivory/10">
          <table className="w-full text-sm">
            <thead className="bg-ink/40 text-ivory/70">
              <tr><th className="px-4 py-3 text-left font-medium">Section</th><th className="px-4 py-3 text-left font-medium">Title</th><th className="px-4 py-3 text-left font-medium">Status</th><th className="px-4 py-3 text-right font-medium">Actions</th></tr>
            </thead>
            <tbody className="divide-y divide-ivory/10">
              {blocks.map((b) => (
                <tr key={b.id}>
                  <td className="px-4 py-3 text-ivory/80">{b.section}</td>
                  <td className="px-4 py-3 text-ivory">{b.title || "-"}</td>
                  <td className="px-4 py-3"><span className={`rounded-sm px-2 py-0.5 text-xs ${b.status === "published" ? "bg-sage/20 text-sage" : "bg-ink/40 text-ivory/60"}`}>{b.status}</span></td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button onClick={() => handleSave(b)} className="text-marigold hover:underline">Edit</button>
                    <button onClick={() => handleDelete(b.id)} className="text-madder hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
              {blocks.length === 0 && <tr><td colSpan={4} className="px-4 py-8 text-center text-ivory/40">No content blocks for this page yet. Click "Add block" to create one.</td></tr>}
            </tbody>
          </table>
        </div>
      )}
      {modalOpen && <ContentForm initial={editing} onSave={handleFormSave} onClose={() => { setModalOpen(false); setEditing(null); }} />}
    </div>
  );
}