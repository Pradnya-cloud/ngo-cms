import SectionHeading from "../components/ui/SectionHeading";
import PhotoPlaceholder from "../components/ui/PhotoPlaceholder";
import { pressMentions } from "../data/content";

const gallery = [
  { label: "Bridge school reading hour", palette: "indigo" },
  { label: "Health camp, Panhala", palette: "sage" },
  { label: "Stitching centre batch of 2026", palette: "marigold" },
  { label: "Monsoon relief distribution", palette: "madder" },
  { label: "Scholarship award ceremony", palette: "indigo" },
  { label: "Mobile clinic on the road", palette: "sage" },
];

export default function Media() {
  return (
    <>
      <section className="bg-indigo-deep text-ivory">
        <div className="container-page py-16 sm:py-20">
          <p className="eyebrow !text-marigold-light mb-3">Media</p>
          <h1 className="text-4xl font-display font-semibold max-w-2xl text-ivory">Photos, videos and press coverage.</h1>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading eyebrow="Photos & Videos" title="Moments from the field" />
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {gallery.map((g) => (
            <PhotoPlaceholder key={g.label} label={g.label} palette={g.palette} />
          ))}
        </div>
      </section>

      <section className="bg-ivory2 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Featured video" title="Inside the Livelihood Centre" />
          <div className="mt-8 max-w-3xl">
            <PhotoPlaceholder label="▶ Watch: Livelihood Centre documentary (4:12)" palette="madder" ratio="aspect-video" />
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading eyebrow="In the news" title="Press releases & media mentions" />
        <div className="mt-8 max-w-3xl divide-y divide-ink/10">
          {pressMentions.map((p) => (
            <a key={p.title} href={p.url} className="flex items-center justify-between gap-4 py-4 group">
              <div>
                <p className="font-medium text-indigo-deep group-hover:text-madder transition-colors">{p.title}</p>
                <p className="text-sm text-ink/60 mt-1">{p.outlet} · {p.year}</p>
              </div>
              <span className="text-ink/40 group-hover:text-madder transition-colors shrink-0">→</span>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
