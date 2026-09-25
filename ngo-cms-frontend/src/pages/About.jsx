import SectionHeading from "../components/ui/SectionHeading";
import PhotoPlaceholder from "../components/ui/PhotoPlaceholder";
import { missionVision } from "../data/content";

export default function About() {
  return (
    <>
      <section className="bg-indigo-deep text-ivory">
        <div className="container-page py-16 sm:py-20">
          <p className="eyebrow !text-marigold-light mb-3">About Us</p>
          <h1 className="text-4xl font-display font-semibold max-w-2xl text-ivory">
            Fifteen years of stitching opportunity into everyday life.
          </h1>
        </div>
      </section>

      <section className="container-page py-16 grid lg:grid-cols-2 gap-12">
        <div className="border-l-4 border-marigold pl-6">
          <p className="eyebrow mb-2">Our Mission</p>
          <p className="text-lg text-ink/80 leading-relaxed">{missionVision.mission}</p>
        </div>
        <div className="border-l-4 border-sage pl-6">
          <p className="eyebrow mb-2">Our Vision</p>
          <p className="text-lg text-ink/80 leading-relaxed">{missionVision.vision}</p>
        </div>
      </section>

      <section className="bg-ivory2 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="Our Journey" title="Milestones since 2011" />
          <div className="mt-10 relative pl-6 border-l-2 border-dashed border-indigo/30 space-y-8 max-w-2xl">
            {missionVision.history.map((h) => (
              <div key={h.year} className="relative">
                <span className="absolute -left-[31px] top-0.5 w-3.5 h-3.5 rounded-full bg-madder border-2 border-ivory2" />
                <p className="font-mono text-sm text-madder font-semibold">{h.year}</p>
                <p className="mt-1 text-ink/75 leading-relaxed">{h.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <SectionHeading eyebrow="Who We Serve" title="Donors, volunteers, beneficiaries, and partners" description="Everyone who touches our work — from a first-time monthly donor to a district health officer — is part of the same thread." />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: "Donors", text: "Individuals and CSR partners funding programs one contribution at a time." },
            { title: "Volunteers", text: "Teachers, medical staff, and skilled professionals giving their time on the ground." },
            { title: "Beneficiaries", text: "Children, mothers, and youth across 186 partner villages." },
            { title: "Partner Organizations", text: "District hospitals, schools, and local self-help groups we work alongside." },
          ].map((a) => (
            <div key={a.title} className="p-5 border border-ink/10 rounded-sm bg-white/60">
              <h3 className="font-display font-semibold text-indigo-deep">{a.title}</h3>
              <p className="mt-2 text-sm text-ink/70 leading-relaxed">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="container-page pb-20">
        <div className="grid sm:grid-cols-3 gap-5">
          <PhotoPlaceholder label="Founding team, 2011" palette="indigo" />
          <PhotoPlaceholder label="First health camp" palette="sage" />
          <PhotoPlaceholder label="Livelihood Centre opening" palette="marigold" />
        </div>
      </section>
    </>
  );
}
