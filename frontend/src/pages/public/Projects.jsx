import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../utils/apiClient";
import { projects as fallbackProjects } from "../../data/content";
import { PhotoPlaceholder } from "../../components/ui";

function extractList(res) {
  if (Array.isArray(res)) return res;
  if (Array.isArray(res?.results)) return res.results;
  if (Array.isArray(res?.data)) return res.data;
  return [];
}

export default function Projects() {
  const [type, setType] = useState("all");
  const [items, setItems] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.get("/projects/")
      .then((res) => {
        if (!active) return;
        const list = extractList(res);
        if (list.length) setItems(list);
      })
      .catch(() => {})
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const filtered = type === "all" ? items : items.filter((p) => (p.project_type ?? p.type) === type);

  return (
    <div>
      <section className="bg-ink text-ivory py-16">
        <div className="container-page max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-marigold">Our work</p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Projects & Campaigns</h1>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="flex flex-wrap gap-2">
          {["all", "project", "campaign"].map((t) => (
            <button key={t} onClick={() => setType(t)} className={`rounded-sm px-4 py-1.5 text-sm font-medium capitalize ${type === t ? "bg-madder text-ivory" : "bg-ivory border border-ink/10 text-ink hover:bg-ink/5"}`}>
              {t}
            </button>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        {loading && items.length === 0 ? (
          <div className="flex items-center justify-center py-20"><div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo border-t-transparent" /></div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <a key={p.id ?? i} href={`/projects/${p.id ?? p.slug ?? i}`} className="group overflow-hidden rounded-lg border border-ink/10 bg-ivory transition-shadow hover:shadow-md">
                <div className="aspect-[4/3] bg-ink/5">
                  <PhotoPlaceholder label={p.title} />
                </div>
                <div className="p-5">
                  <span className="font-mono text-xs uppercase tracking-wider text-indigo">{p.project_type ?? p.type ?? "project"}</span>
                  <h3 className="mt-1 font-display text-lg font-bold text-ink group-hover:text-madder">{p.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-ink/70">{p.short_description ?? p.summary ?? ""}</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}