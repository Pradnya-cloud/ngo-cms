import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../utils/apiClient";
import { getResourceConfig } from "../../config/adminContent";
import SectionHeading from "../ui/SectionHeading";
import Button from "../ui/Button";

function fieldDefaults(fields) {
  return Object.fromEntries(
    fields.map((f) => [
      f.name,
      f.default ?? (f.type === "checkbox" ? false : f.type === "number" ? 0 : ""),
    ])
  );
}

function renderField(field, value, onChange) {
  const common = {
    id: field.name,
    name: field.name,
    required: field.required,
    className:
      "mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none",
  };
  switch (field.type) {
    case "textarea":
      return (
        <textarea
          {...common}
          rows={3}
          value={value ?? ""}
          onChange={onChange}
        />
      );
    case "number":
      return (
        <input
          {...common}
          type="number"
          value={value ?? 0}
          onChange={onChange}
        />
      );
    case "checkbox":
      return (
        <input
          id={field.name}
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange({ target: { name: field.name, value: e.target.checked } })}
        />
      );
    default:
      return (
        <input
          {...common}
          type={field.type === "url" ? "url" : "text"}
          value={value ?? ""}
          onChange={onChange}
        />
      );
  }
}

export default function AdminContentManager({ resource, title }) {
  const cfg = getResourceConfig(resource);
  const { accessToken } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [values, setValues] = useState({});

  const authOpts = { accessToken };

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.get(cfg.endpoint, authOpts);
      const list = Array.isArray(data) ? data : [data];
      setItems(list);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resource]);

  const openCreate = () => {
    setEditing(null);
    setValues(fieldDefaults(cfg.fields));
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setValues({ ...item });
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setEditing(null);
    setValues({});
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({
      ...v,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      if (editing) {
        await api.patch(`${cfg.endpoint}${editing.id}/`, values, authOpts);
      } else {
        await api.post(cfg.endpoint, values, authOpts);
      }
      closeForm();
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async (item) => {
    // eslint-disable-next-line no-alert
    if (!window.confirm(`Delete ${cfg.label.toLowerCase()} "${displayValue(item)}"?`)) return;
    try {
      await api.delete(`${cfg.endpoint}${item.id}/`, authOpts);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  function displayValue(item) {
    const col = (cfg.columns && cfg.columns[0]) || "id";
    return item[col] ?? item.id;
  }

  const canAdd = !cfg.singular || items.length === 0;

  return (
    <div>
      <div className="flex items-center justify-between">
        <SectionHeading eyebrow={cfg.label} title={title || cfg.label} />
        {canAdd && (
          <Button variant="primary" onClick={openCreate}>
            Add {cfg.singular ? cfg.label : "new " + cfg.label.slice(0, -1)}
          </Button>
        )}
      </div>

      {error && (
        <div className="mt-4 bg-madder/10 border border-madder/30 text-madder-dark text-sm rounded-sm px-3 py-2.5">
          {error}
        </div>
      )}

      {loading ? (
        <div className="mt-8 text-ink/60">Loading…</div>
      ) : items.length === 0 ? (
        <p className="mt-8 text-ink/60">No entries yet. Add your first one above.</p>
      ) : (
        <div
          id="content-form"
          className={`mt-6 overflow-x-auto ${formOpen ? "" : "border border-ink/10 rounded-sm"}`}
        >
          <table className="min-w-full text-sm">
            <thead className="bg-ivory2 text-ink/70">
              <tr>
                {(cfg.columns || ["id"]).map((col) => (
                  <th key={col} className="text-left font-mono uppercase text-xs py-2.5 px-3">
                    {col.replace(/_/g, " ")}
                  </th>
                ))}
                <th className="text-right py-2.5 px-3 font-mono text-xs uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {items.map((item) => (
                <tr key={item.id}>
                  {(cfg.columns || ["id"]).map((col) => (
                    <td key={col} className="py-2.5 px-3 text-ink/80 align-top">
                      {String(item[col] ?? "")}
                    </td>
                  ))}
                  <td className="py-2.5 px-3 text-right space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => openEdit(item)}
                      className="text-xs font-medium text-indigo hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => remove(item)}
                      className="text-xs font-medium text-madder hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {formOpen && (
        <form
          onSubmit={submit}
          className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50"
          onClick={(e) => e.target === e.currentTarget && closeForm()}
        >
          <div className="bg-ivory2 rounded-sm w-full max-w-2xl p-6 border border-ink/10">
            <h3 className="font-display text-xl font-semibold text-indigo-deep mb-4">
              {editing ? "Edit" : cfg.singular ? "Add" : "Add"} {cfg.label.toLowerCase()}
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {cfg.fields.map((field) => (
                <div key={field.name} className={field.type === "textarea" || field.type === "checkbox" ? "sm:col-span-2" : ""}>
                  <label className="text-sm font-medium text-ink/80" htmlFor={field.name}>
                    {field.label}
                  </label>
                  {renderField(field, values[field.name], handleChange)}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary" onClick={closeForm}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                {editing ? "Save changes" : "Create"}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
