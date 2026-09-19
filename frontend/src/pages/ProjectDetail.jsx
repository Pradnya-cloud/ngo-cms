import { useParams, Link, Navigate } from "react-router-dom";
import { projects } from "../data/content";
import PhotoPlaceholder from "../components/ui/PhotoPlaceholder";
import StitchDivider from "../components/ui/StitchDivider";
import Button from "../components/ui/Button";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id);

  if (!project) return <Navigate to="/projects" replace />;

  return (
    <>
      <section className="bg-indigo-deep text-ivory">
        <div className="container-page py-14 sm:py-16">
          <Link to="/projects" className="text-sm text-ivory/70 hover:text-marigold-light">← All projects</Link>
          <p className="eyebrow !text-marigold-light mt-4 mb-3">{project.sector}</p>
          <h1 className="text-4xl font-display font-semibold max-w-2xl text-ivory">{project.title}</h1>
        </div>
      </section>

      <section className="container-page py-16 grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <PhotoPlaceholder label={project.title} palette="indigo" ratio="aspect-[16/9]" />
          <div className="mt-6 w-24"><StitchDivider /></div>
          <p className="mt-6 text-lg text-ink/75 leading-relaxed">{project.summary}</p>
          <p className="mt-4 text-ink/70 leading-relaxed">
            This project is run in partnership with local schools, health workers, and community volunteers,
            with progress reviewed quarterly against enrollment, attendance, and outcome targets set with our
            program team.
          </p>
        </div>

        <aside className="border border-ink/10 rounded-sm p-6 bg-ivory2 h-fit">
          <dl className="space-y-4 text-sm">
            <div>
              <dt className="font-mono uppercase tracking-wide text-ink/50">Status</dt>
              <dd className="mt-1 font-medium text-indigo-deep">{project.status}</dd>
            </div>
            <div>
              <dt className="font-mono uppercase tracking-wide text-ink/50">Location</dt>
              <dd className="mt-1 font-medium text-indigo-deep">{project.location}</dd>
            </div>
            <div>
              <dt className="font-mono uppercase tracking-wide text-ink/50">Timeline</dt>
              <dd className="mt-1 font-medium text-indigo-deep">{project.timeline}</dd>
            </div>
            <div>
              <dt className="font-mono uppercase tracking-wide text-ink/50">Beneficiaries</dt>
              <dd className="mt-1 font-medium text-indigo-deep">{project.beneficiaries}</dd>
            </div>
          </dl>
          <div className="mt-6">
            <Button to="/donate" variant="primary" className="w-full justify-center">Support this project</Button>
          </div>
        </aside>
      </section>
    </>
  );
}
