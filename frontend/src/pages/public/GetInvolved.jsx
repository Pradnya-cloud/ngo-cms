import { Link } from "react-router-dom";
import { usePageContent, getSection } from "../../hooks/usePageContent";
import { events as fallbackEvents } from "../../data/content";
import { SectionHeading, PhotoPlaceholder } from "../../components/ui";

export default function GetInvolved() {
  const { content } = usePageContent("get_involved", { events: fallbackEvents });
  const heroTitle = getSection(content, "hero_title", "Get Involved");
  const heroText = getSection(content, "hero_text", "There are many ways to help - volunteer your time, donate, or partner with us.");

  return (
    <div>
      <section className="bg-ink text-ivory py-16">
        <div className="container-page max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-marigold">Join us</p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{heroTitle}</h1>
          <p className="mt-5 text-lg text-ivory/75">{heroText}</p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-ink/10 bg-ivory p-8">
            <h2 className="font-display text-2xl font-bold text-ink">Volunteer</h2>
            <p className="mt-2 text-ink/75">Share your skills and time with our community programs.</p>
            <form className="mt-6 space-y-4">
              <input placeholder="Full name" className="w-full rounded-sm border border-ink/10 px-3 py-2 text-sm focus:border-madder focus:outline-none" />
              <input placeholder="Email" type="email" className="w-full rounded-sm border border-ink/10 px-3 py-2 text-sm focus:border-madder focus:outline-none" />
              <input placeholder="Phone" className="w-full rounded-sm border border-ink/10 px-3 py-2 text-sm focus:border-madder focus:outline-none" />
              <textarea placeholder="Why do you want to volunteer?" rows={3} className="w-full rounded-sm border border-ink/10 px-3 py-2 text-sm focus:border-madder focus:outline-none" />
              <button type="submit" className="rounded-sm bg-madder px-5 py-2 text-sm font-semibold text-ivory hover:bg-madder/90">Submit application</button>
            </form>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold text-ink">Upcoming events</h2>
            <div className="mt-6 space-y-4">
              {fallbackEvents.map((e) => (
                <div key={e.id} className="rounded-lg border border-ink/10 bg-ivory p-5">
                  <p className="font-mono text-xs text-indigo">{new Date(e.date).toLocaleDateString()}</p>
                  <h3 className="mt-1 font-display font-bold text-ink">{e.title}</h3>
                  <p className="text-sm text-ink/60">{e.location}</p>
                  <button className="mt-3 rounded-sm border border-ink/20 px-4 py-1.5 text-xs font-medium text-ink hover:bg-ink/5">Register</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}