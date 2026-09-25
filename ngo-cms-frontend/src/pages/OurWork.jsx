import SectionHeading from "../components/ui/SectionHeading";
import PhotoPlaceholder from "../components/ui/PhotoPlaceholder";
import Button from "../components/ui/Button";
import { programs } from "../data/content";

const details = {
  education: {
    points: [
      "Bridge classes for first-generation learners who are behind grade level",
      "Scholarship pipeline supporting students through secondary and higher education",
      "Digital classrooms with solar-powered tablets in schools without reliable power",
    ],
    palette: "indigo",
  },
  healthcare: {
    points: [
      "Mobile health units visiting rotating village circuits every week",
      "Free health camps for general check-ups, eye care, and dental screening",
      "Maternal and infant care outreach with district hospital referral support",
    ],
    palette: "sage",
  },
  livelihood: {
    points: [
      "Six-month vocational training in tailoring and textile work",
      "Digital skills and spoken English bootcamps for job-ready youth",
      "Seed capital and placement support for graduates starting home businesses",
    ],
    palette: "marigold",
  },
};

export default function OurWork() {
  return (
    <>
      <section className="bg-indigo-deep text-ivory">
        <div className="container-page py-16 sm:py-20">
          <p className="eyebrow !text-marigold-light mb-3">Our Work</p>
          <h1 className="text-4xl font-display font-semibold max-w-2xl text-ivory">
            Three programs built around the way families actually move out of poverty.
          </h1>
        </div>
      </section>

      {programs.map((program, i) => {
        const d = details[program.id];
        const reverse = i % 2 === 1;
        return (
          <section key={program.id} className={i % 2 === 0 ? "bg-ivory" : "bg-ivory2"}>
            <div className="container-page py-16 sm:py-20 grid lg:grid-cols-2 gap-12 items-center">
              <div className={reverse ? "lg:order-2" : ""}>
                <SectionHeading eyebrow={`0${i + 1} — ${program.title}`} title={program.summary} />
                <ul className="mt-6 space-y-3">
                  {d.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-ink/75 leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-madder shrink-0" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 font-mono text-sm text-madder">{program.impact}</p>
                <div className="mt-6">
                  <Button to="/projects" variant="secondary">See related projects</Button>
                </div>
              </div>
              <div className={`grid grid-cols-2 gap-4 ${reverse ? "lg:order-1" : ""}`}>
                <PhotoPlaceholder label={`${program.title} — field visit`} palette={d.palette} className="col-span-2" ratio="aspect-[16/9]" />
                <PhotoPlaceholder label="Community session" palette={d.palette} />
                <PhotoPlaceholder label="Impact story" palette={d.palette} />
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
