import { usePageContent, getSection } from "../../hooks/usePageContent";
import { missionVision, org } from "../../data/content";
import { SectionHeading, PhotoPlaceholder } from "../../components/ui";

export default function About() {
  const { content } = usePageContent("about", { missionVision, org });
  const heroTitle = getSection(content, "hero_title", "About Us");
  const heroText = getSection(content, "hero_text", "Umang Foundation works across education, healthcare and livelihood to build lasting opportunity for underprivileged children and communities across India.");
  const mission = getSection(content, "mission", missionVision.mission);
  const vision = getSection(content, "vision", missionVision.vision);
  const history = getSection(content, "history", missionVision.history);

  return (
    <div>
      <section className="bg-ink text-ivory py-16">
        <div className="container-page max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-marigold">Our story</p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{heroTitle}</h1>
          <p className="mt-5 text-lg text-ivory/75">{heroText}</p>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Mission" title="What we strive for" />
            <p className="mt-4 text-ink/75">{mission}</p>
          </div>
          <div>
            <SectionHeading eyebrow="Vision" title="What we imagine" />
            <p className="mt-4 text-ink/75">{vision}</p>
          </div>
        </div>
      </section>

      <section className="bg-sage/10 py-16">
        <div className="container-page">
          <SectionHeading eyebrow="Timeline" title="Our journey" />
          <ol className="mt-10 space-y-6">
            {history.map((h, i) => (
              <li key={i} className="flex gap-6">
                <span className="font-mono text-sm font-bold text-madder">{h.year}</span>
                <div className="rounded-lg border border-ink/10 bg-ivory p-4">
                  <p className="text-ink/80">{h.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-page py-16">
        <SectionHeading eyebrow="Leadership" title="Our team" />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {["Ravi Sharma", "Priya Deshmukh", "Anjali Kulkarni"].map((name) => (
            <div key={name} className="rounded-lg border border-ink/10 bg-ivory p-6 text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-indigo/10 text-xl font-bold text-indigo">
                {name.split(" ").map((n) => n[0]).join("")}
              </div>
              <h3 className="font-display font-bold text-ink">{name}</h3>
              <p className="text-sm text-ink/60">Board member</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}