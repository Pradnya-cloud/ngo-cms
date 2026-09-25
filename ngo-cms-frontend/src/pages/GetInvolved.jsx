import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SectionHeading from "../components/ui/SectionHeading";
import Button from "../components/ui/Button";
import VolunteerForm from "../components/forms/VolunteerForm";
import NewsletterForm from "../components/forms/NewsletterForm";
import { events } from "../data/content";
import EventCard from "../components/cards/EventCard";

const tabs = [
  { id: "volunteer", label: "Volunteer" },
  { id: "partner", label: "Partner with Us" },
  { id: "fundraise", label: "Fundraise" },
  { id: "campaigns", label: "Campaigns" },
  { id: "community", label: "Join the Community" },
];

export default function GetInvolved() {
  const { hash } = useLocation();
  const [active, setActive] = useState(tabs[0].id);

  useEffect(() => {
    const id = hash?.replace("#", "");
    if (id && tabs.some((t) => t.id === id)) setActive(id);
  }, [hash]);

  return (
    <>
      <section className="bg-indigo-deep text-ivory">
        <div className="container-page py-16 sm:py-20">
          <p className="eyebrow !text-marigold-light mb-3">Get Involved</p>
          <h1 className="text-4xl font-display font-semibold max-w-2xl text-ivory">
            There's a place for you in this work — pick where you'd like to start.
          </h1>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <div className="flex flex-wrap gap-2 border-b border-ink/10 pb-4" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={active === t.id}
              onClick={() => setActive(t.id)}
              className={`px-4 py-2 text-sm font-medium rounded-sm transition-colors ${
                active === t.id ? "bg-indigo text-ivory" : "text-ink/70 hover:bg-ink/5"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-10">
          {active === "volunteer" && (
            <div id="volunteer" className="grid lg:grid-cols-2 gap-12">
              <div>
                <SectionHeading eyebrow="Volunteer" title="Give your time where it's needed most" description="From weekend reading circles to health-camp support, most roles need no special background — just a few consistent hours." />
                <div className="mt-8">
                  <p className="font-mono text-xs uppercase tracking-wide text-ink/50 mb-3">Upcoming events</p>
                  <div className="space-y-3">
                    {events.slice(0, 2).map((e) => <EventCard key={e.id} event={e} />)}
                  </div>
                </div>
              </div>
              <div className="bg-ivory2 border border-ink/10 rounded-sm p-6 sm:p-8">
                <VolunteerForm />
              </div>
            </div>
          )}

          {active === "partner" && (
            <div id="partner">
              <SectionHeading eyebrow="Partner with Us" title="Corporate partnerships & sponsorships" description="We work with companies on CSR programs, employee volunteering days, and in-kind support — structured around your goals and our audited impact reporting." />
              <div className="mt-8 grid sm:grid-cols-3 gap-5">
                {["CSR Program Partnerships", "Event & Product Sponsorship", "Employee Volunteering Days"].map((t) => (
                  <div key={t} className="border border-ink/10 rounded-sm p-5 bg-white/60">
                    <h3 className="font-display font-semibold text-indigo-deep">{t}</h3>
                    <p className="mt-2 text-sm text-ink/70">Tailored to your CSR mandate and reporting needs.</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button href="mailto:connect@umangfoundation.org" variant="primary">Email our partnerships team</Button>
              </div>
            </div>
          )}

          {active === "fundraise" && (
            <div id="fundraise">
              <SectionHeading eyebrow="Fundraise" title="Start your own campaign" description="Run a birthday fundraiser, a marathon page, or a school drive in support of our programs — we provide the toolkit and track your progress publicly." />
              <ol className="mt-8 space-y-4 max-w-xl">
                {[
                  "Tell us which program you'd like to support",
                  "We set up a trackable fundraising page for you",
                  "Share your page — donations flow straight to the program",
                ].map((step, i) => (
                  <li key={step} className="flex gap-4 items-start">
                    <span className="font-mono text-sm text-madder font-semibold w-6 shrink-0">{i + 1}.</span>
                    <span className="text-ink/75">{step}</span>
                  </li>
                ))}
              </ol>
              <div className="mt-8">
                <Button href="mailto:connect@umangfoundation.org" variant="primary">Start a fundraiser</Button>
              </div>
            </div>
          )}

          {active === "campaigns" && (
            <div id="campaigns">
              <SectionHeading eyebrow="Campaigns" title="Ongoing advocacy campaigns" description="Beyond donations, these campaigns need your voice — sharing, signing, and showing up." />
              <div className="mt-8 grid sm:grid-cols-2 gap-5">
                {[
                  { t: "Every Child in School", d: "Advocating for transport support to the nearest government school." },
                  { t: "Clean Water, Every Village", d: "Pushing for borewell maintenance funding across our health-camp circuit." },
                ].map((c) => (
                  <div key={c.t} className="border border-ink/10 rounded-sm p-5 bg-white/60">
                    <h3 className="font-display font-semibold text-indigo-deep">{c.t}</h3>
                    <p className="mt-2 text-sm text-ink/70">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "community" && (
            <div id="community" className="max-w-xl">
              <SectionHeading eyebrow="Join the Community" title="Stay close to the work" description="Subscribe for monthly updates from the field, or follow along on social media." />
              <div className="mt-8">
                <NewsletterForm />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
