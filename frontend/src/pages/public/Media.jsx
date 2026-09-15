import { useState } from "react";
import { usePageContent, getSection } from "../../hooks/usePageContent";
import { pressMentions } from "../../data/content";
import { SectionHeading, PhotoPlaceholder } from "../../components/ui";

export default function Media() {
  const { content } = usePageContent("media", { pressMentions });
  const [filter, setFilter] = useState("all");
  const heroTitle = getSection(content, "hero_title", "Media & Press");
  const heroText = getSection(content, "hero_text", "Photos, videos, and press coverage from our work on the ground.");

  return (
    <div>
      <section className="bg-ink text-ivory py-16">
        <div className="container-page max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-marigold">In the news</p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{heroTitle}</h1>
          <p className="mt-5 text-lg text-ivory/75">{heroText}</p>
        </div>
      </section>

      <section className="container-page py-10">
        <div className="flex flex-wrap gap-2">
          {["all", "image", "video", "press_release"].map((t) => (
            <button key={t} onClick={() => setFilter(t)} className={`rounded-sm px-4 py-1.5 text-sm font-medium capitalize ${filter === t ? "bg-madder text-ivory" : "bg-ivory border border-ink/10 text-ink hover:bg-ink/5"}`}>
              {t.replace("_", " ")}
            </button>
          ))}
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg border border-ink/10 bg-ivory">
              <div className="aspect-[4/3] bg-ink/5">
                <PhotoPlaceholder label={`Media ${i + 1}`} />
              </div>
              <div className="p-5">
                <span className="font-mono text-xs uppercase tracking-wider text-indigo">{filter === "all" ? ["image", "video", "press_release"][i % 3] : filter}</span>
                <h3 className="mt-1 font-display font-bold text-ink">Media item {i + 1}</h3>
                <p className="mt-2 text-sm text-ink/70">Description of this media item will appear here once content is added through the admin panel.</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <SectionHeading eyebrow="Press" title="In the news" />
          <div className="mt-6 space-y-4">
            {pressMentions.map((pm, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-ink/10 bg-ivory p-5">
                <div>
                  <p className="font-medium text-ink">{pm.title}</p>
                  <p className="text-sm text-ink/60">{pm.outlet} - {pm.year}</p>
                </div>
                <a href={pm.url} className="text-sm text-madder hover:underline">Read</a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}