import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../../utils/apiClient";
import { projects as fallbackProjects } from "../../data/content";
import { PhotoPlaceholder } from "../../components/ui";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const fallback = fallbackProjects.find((p) => p.id === id);
    if (fallback) setProject(fallback);
    api.get(`/projects/${id}/`)
      .then((res) => { if (active) setProject(res); })
      .catch(() => {})
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);

  if (loading && !project) {
    return <div className="container-page py-20 text-center"><div className="h-8 w-8 animate-spin rounded-full border-2 border-indigo border-t-transparent mx-auto" /></div>;
  }

  if (!project) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="font-display text-2xl font-bold text-ink">Project not found</h1>
        <Link to="/projects" className="mt-4 inline-block text-madder hover:underline">Back to projects</Link>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-ink text-ivory py-16">
        <div className="container-page max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-marigold">{project.project_type ?? project.type ?? "project"}</p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{project.title}</h1>
          {project.location && <p className="mt-3 text-ivory/70">{project.location}</p>}
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="aspect-[16/9] overflow-hidden rounded-lg bg-ink/5">
              <PhotoPlaceholder label={project.title} />
            </div>
            <div className="mt-6">
              <h2 className="font-display text-xl font-bold text-ink">About this project</h2>
              <p className="mt-2 text-ink/75">{project.description ?? project.summary ?? "No description available."}</p>
            </div>
          </div>
          <aside className="space-y-4">
            {project.target_amount && (
              <div className="rounded-lg border border-ink/10 bg-ivory p-5">
                <p className="text-sm text-ink/60">Target</p>
                <p className="font-mono text-xl font-bold text-ink">Rs. {Number(project.target_amount).toLocaleString()}</p>
                {project.raised_amount && (
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-ink/10">
                    <div className="h-full bg-madder" style={{ width: `${Math.min(100, (Number(project.raised_amount) / Number(project.target_amount)) * 100)}%` }} />
                  </div>
                )}
              </div>
            )}
            {project.status && (
              <div className="rounded-lg border border-ink/10 bg-ivory p-5">
                <p className="text-sm text-ink/60">Status</p>
                <p className="font-medium text-ink capitalize">{project.status}</p>
              </div>
            )}
            {project.timeline && (
              <div className="rounded-lg border border-ink/10 bg-ivory p-5">
                <p className="text-sm text-ink/60">Timeline</p>
                <p className="font-medium text-ink">{project.timeline}</p>
              </div>
            )}
            {project.beneficiaries && (
              <div className="rounded-lg border border-ink/10 bg-ivory p-5">
                <p className="text-sm text-ink/60">Beneficiaries</p>
                <p className="font-medium text-ink">{project.beneficiaries}</p>
              </div>
            )}
            <a href="/donate" className="block w-full rounded-sm bg-madder py-2.5 text-center text-sm font-semibold text-ivory hover:bg-madder/90">Support this project</a>
          </aside>
        </div>
      </section>
    </div>
  );
}