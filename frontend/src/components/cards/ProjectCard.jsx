import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block border border-ink/10 bg-white/60 rounded-sm p-6 hover:border-madder transition-colors"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="eyebrow">{project.sector}</span>
        <span
          className={`text-xs font-mono px-2 py-0.5 rounded-sm ${
            project.status === "Ongoing" ? "bg-sage/15 text-sage-dark" : "bg-ink/10 text-ink/60"
          }`}
        >
          {project.status}
        </span>
      </div>
      <h3 className="mt-3 font-display text-lg font-semibold text-indigo-deep group-hover:text-madder transition-colors">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-ink/70 leading-relaxed">{project.summary}</p>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-xs text-ink/60">
        <div>
          <dt className="font-mono uppercase tracking-wide">Location</dt>
          <dd>{project.location}</dd>
        </div>
        <div>
          <dt className="font-mono uppercase tracking-wide">Reach</dt>
          <dd>{project.beneficiaries}</dd>
        </div>
      </dl>
    </Link>
  );
}
