import { usePageContent, getSection } from "../../hooks/usePageContent";
import { stats, programs } from "../../data/content";
import { SectionHeading, StatStrip } from "../../components/ui";

export default function OurWork() {
  const { content } = usePageContent("our_work", { stats, programs });
  const heroTitle = getSection(content, "hero_title", "Our Work & Impact");
  const heroText = getSection(content, "hero_text", "We run proven programs across education, healthcare, and livelihoods, reaching thousands of people every year.");

  return (
    <div>
      <section className="bg-ink text-ivory py-16">
        <div className="container-page max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-marigold">Impact</p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{heroTitle}</h1>
          <p className="mt-5 text-lg text-ivory/75">{heroText}</p>
        </div>
      </section>

      <StatStrip stats={stats} />

      <section className="container-page py-16">
        <SectionHeading eyebrow="Programs" title="How we help" />
        <div className="mt-10 space-y-8">
          {programs.map((p) => (
            <div key={p.id} className="grid items-center gap-6 lg:grid-cols-3">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-indigo">{p.color}</span>
                <h3 className="mt-1 font-display text-2xl font-bold text-ink">{p.title}</h3>
              </div>
              <div className="lg:col-span-2">
                <p className="text-ink/75">{p.summary}</p>
                <p className="mt-2 font-medium text-madder">{p.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}