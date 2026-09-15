import { usePageContent, getSection } from "../../hooks/usePageContent";
import { org, stats, missionVision, programs } from "../../data/content";
import { StatStrip, SectionHeading, StitchDivider, PhotoPlaceholder } from "../../components/ui";

export default function Home() {
  const { content, loading } = usePageContent("home", { org, stats, missionVision, programs });

  const heroTitle = getSection(content, "hero_title", "Threads of change, stitched by community");
  const heroSubtitle = getSection(content, "hero_subtitle", org.shortDesc);
  const heroCta = getSection(content, "hero_cta", "Learn about our work");
  const missionText = getSection(content, "mission", missionVision.mission);
  const visionText = getSection(content, "vision", missionVision.vision);

  return (
    <div>
      <section className="relative overflow-hidden bg-ink text-ivory">
        <div className="container-page grid items-center gap-10 py-16 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-marigold">Since 2011</p>
            <h1 className="font-display text-4xl font-bold leading-tight sm:text-5xl">{heroTitle}</h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ivory/75">{heroSubtitle}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/our-work" className="inline-block rounded-sm bg-madder px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-madder/90">{heroCta}</a>
              <a href="/donate" className="inline-block rounded-sm border border-ivory/30 px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-ivory/10">Donate now</a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-lg bg-ink/40">
              <PhotoPlaceholder label="Community" />
            </div>
            <div className="absolute -bottom-4 -left-4 hidden w-40 rounded-lg border border-ivory/10 bg-ink/80 p-4 shadow-lg sm:block">
              <p className="font-mono text-2xl font-bold text-marigold">12,400+</p>
              <p className="text-xs text-ivory/60">Children in school</p>
            </div>
          </div>
        </div>
      </section>

      <StatStrip stats={stats} />

      <section className="container-page py-16">
        <SectionHeading eyebrow="Our mission" title="Why we do this work" />
        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-ink/10 bg-ivory p-8">
            <h3 className="font-display text-xl font-bold text-ink">Mission</h3>
            <p className="mt-3 text-ink/75">{missionText}</p>
          </div>
          <div className="rounded-lg border border-ink/10 bg-ivory p-8">
            <h3 className="font-display text-xl font-bold text-ink">Vision</h3>
            <p className="mt-3 text-ink/75">{visionText}</p>
          </div>
        </div>
      </section>

      <StitchDivider />

      <section className="container-page py-16">
        <SectionHeading eyebrow="What we do" title="Our programs" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((p) => (
            <div key={p.id} className="rounded-lg border border-ink/10 bg-ivory p-6 hover:shadow-md">
              <span className="font-mono text-xs uppercase tracking-wider text-indigo">{p.color}</span>
              <h3 className="mt-2 font-display text-xl font-bold text-ink">{p.title}</h3>
              <p className="mt-2 text-sm text-ink/70">{p.summary}</p>
              <p className="mt-4 text-sm font-medium text-madder">{p.impact}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sage/10 py-16">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="font-display text-3xl font-bold text-ink">Ready to make a difference?</h2>
          <p className="max-w-xl text-ink/75">Join our community of donors, volunteers, and partners.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/donate" className="rounded-sm bg-madder px-5 py-2.5 text-sm font-semibold text-ivory hover:bg-madder/90">Donate</a>
            <a href="/get-involved" className="rounded-sm border border-ink/20 px-5 py-2.5 text-sm font-semibold text-ink hover:bg-ink/5">Volunteer</a>
          </div>
        </div>
      </section>
    </div>
  );
}