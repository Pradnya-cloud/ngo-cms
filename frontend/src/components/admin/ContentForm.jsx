import { useState } from "react";
import { api } from "../../utils/apiClient";

export default function ContentForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(
    initial || { page_type: "home", section: "", title: "", content: "", image: "", sort_order: 0, status: "published" }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === "sort_order" ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (initial?.id) {
        await api.patch(`/content/${initial.id}/`, form);
      } else {
        await api.post("/content/", form);
      }
      onSave();
    } catch (err) {
      setError(err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-lg border border-ivory/10 bg-ink p-6">
        <h2 className="font-display text-xl font-bold text-ivory">{initial?.id ? "Edit content" : "Add content"}</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-ivory/60 mb-1">Page type</label>
              <select name="page_type" value={form.page_type} onChange={handleChange} className="w-full rounded-sm border border-ivory/20 bg-ink/50 px-3 py-2 text-sm text-ivory">
                {["home", "about", "our_work", "contact", "get_involved", "donate", "media"].map((p) => <option key={p} value={p}>{p.replace("_", " ")}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-ivory/60 mb-1">Section</label>
              <input name="section" value={form.section} onChange={handleChange} required className="w-full rounded-sm border border-ivory/20 bg-ink/50 px-3 py-2 text-sm text-ivory focus:border-madder focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-ivory/60 mb-1">Title</label>
            <input name="title" value={form.title} onChange={handleChange} className="w-full rounded-sm border border-ivory/20 bg-ink/50 px-3 py-2 text-sm text-ivory focus:border-madder focus:outline-none" />
          </div>
          <div>
            <label className="block text-xs text-ivory/60 mb-1">Content</label>
            <textarea name="content" value={form.content} onChange={handleChange} rows={4} className="w-full rounded-sm border border-ivory/20 bg-ink/50 px-3 py-2 text-sm text-ivory focus:border-madder focus:outline-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-ivory/60 mb-1">Image URL</label>
              <input name="image" value={form.image} onChange={handleChange} className="w-full rounded-sm border border-ivory/20 bg-ink/50 px-3 py-2 text-sm text-ivory focus:border-madder focus:outline-none" />
            </div>
            <div>
              <label className="block text-xs text-ivory/60 mb-1">Sort order</label>
              <input type="number" name="sort_order" value={form.sort_order} onChange={handleChange} className="w-full rounded-sm border border-ivory/20 bg-ink/50 px-3 py-2 text-sm text-ivory focus:border-madder focus:outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-xs text-ivory/60 mb-1">Status</label>
            <select name="status" value={form.status} onChange={handleChange} className="w-full rounded-sm border border-ivory/20 bg-ink/50 px-3 py-2 text-sm text-ivory">
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
          {error && <p className="text-sm text-madder">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="rounded-sm border border-ivory/20 px-4 py-2 text-sm text-ivory hover:bg-ivory/10">Cancel</button>
            <button type="submit" disabled={loading} className="rounded-sm bg-madder px-4 py-2 text-sm font-semibold text-ivory hover:bg-madder/90 disabled:opacity-50">{loading ? "Saving..." : "Save"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}