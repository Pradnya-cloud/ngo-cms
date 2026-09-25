import { useState, useMemo } from "react";
import SectionHeading from "../components/ui/SectionHeading";
import ProjectCard from "../components/cards/ProjectCard";
import { projects } from "../data/content";

const sectors = ["All", "Education", "Healthcare", "Livelihood"];

export default function Projects() {
  const [sector, setSector] = useState("All");

  const filtered = useMemo(
    () => (sector === "All" ? projects : projects.filter((p) => p.sector === sector)),
    [sector]
  );

  return (
    <>
      <section className="bg-indigo-deep text-ivory">
        <div className="container-page py-16 sm:py-20">
          <p className="eyebrow !text-marigold-light mb-3">Projects</p>
          <h1 className="text-4xl font-display font-semibold max-w-2xl text-ivory">
            Ongoing and completed initiatives across education, health, and livelihood.
          </h1>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading eyebrow="Browse by sector" title="Every project, one place" />

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter projects by sector">
          {sectors.map((s) => (
            <button
              key={s}
              onClick={() => setSector(s)}
              aria-pressed={sector === s}
              className={`px-4 py-2 text-sm font-medium rounded-sm border transition-colors ${
                sector === s
                  ? "bg-indigo text-ivory border-indigo"
                  : "border-ink/15 text-ink/70 hover:border-indigo"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
        {filtered.length === 0 && (
          <p className="mt-10 text-ink/60">No projects in this sector yet — check back soon.</p>
        )}
      </section>
    </>
  );
}
