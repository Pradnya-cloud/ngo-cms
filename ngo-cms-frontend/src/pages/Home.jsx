import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import SectionHeading from "../components/ui/SectionHeading";
import StatStrip from "../components/ui/StatStrip";
import StitchDivider from "../components/ui/StitchDivider";
import PhotoPlaceholder from "../components/ui/PhotoPlaceholder";
import ProgramCard from "../components/cards/ProgramCard";
import BlogCard from "../components/cards/BlogCard";
import EventCard from "../components/cards/EventCard";
import useHomeContent from "../hooks/useHomeContent";
import {
  programs as staticPrograms,
  blogPosts,
  projects,
  events,
  pressMentions,
  org,
  stats as staticStats,
  missionVision as staticMissionVision,
} from "../data/content";

const featuredCampaign = {
  title: "Keep the Bridge School Open Through the School Year",
  goal: 600000,
  raised: 412500,
};

function toPrograms(initiatives) {
  return initiatives.map((i) => ({
    id: i.id,
    title: i.title,
    summary: i.description,
    impact: "",
    color: "indigo",
    image_url: i.image_url || "",
  }));
}

function BannerSlider({ banners }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (!banners || banners.length <= 1) return undefined;
    const t = setInterval(() => setIdx((i) => (i + 1) % banners.length), 5000);
    return () => clearInterval(t);
  }, [banners]);

  if (!banners || banners.length === 0) return null;
  const b = banners[idx];

  return (
    <div className="relative rounded-sm overflow-hidden aspect-[16/9]">
      <img src={b.image_url} alt={b.title} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute bottom-0 p-4 text-ivory">
        <p className="font-display text-xl font-semibold">{b.title}</p>
        {b.description && (
          <p className="text-sm text-ivory/85 mt-1 line-clamp-2">{b.description}</p>
        )}
      </div>
      {banners.length > 1 && (
        <div className="absolute bottom-3 right-3 flex gap-1.5">
          {banners.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`banner ${i + 1}`}
              className={`w-2 h-2 rounded-full ${
                i === idx ? "bg-madder" : "bg-ivory/40"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const { data: home } = useHomeContent();

  const statistics = home?.statistics?.length ? home.statistics : staticStats;
  const programs =
    home?.initiatives?.length ? toPrograms(home.initiatives) : staticPrograms;
  const banners = home?.banners?.filter((b) => b.status) ?? [];
  const missionText =
    home?.vision_mission?.mission_description || staticMissionVision.mission;
  const visionText =
    home?.vision_mission?.vision_description || staticMissionVision.vision;

  const pct = Math.round((featuredCampaign.raised / featuredCampaign.goal) * 100);
  const upcomingEvents = events
    .filter((e) => new Date(e.date) >= new Date())
    .slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-indigo-deep text-ivory">
        <div className="container-page py-20 sm:py-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="eyebrow !text-marigold-light mb-4">
              {org.name} · Since 2011
            </p>
            <h1 className="text-4xl sm:text-5xl font-display font-semibold leading-tight text-ivory">
              Every stitch is a promise kept to a child.
            </h1>
            <div className="mt-5 w-32">
              <StitchDivider />
            </div>
            <p className="mt-6 text-ivory/80 text-lg leading-relaxed max-w-lg">
              {org.shortDesc}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/donate" variant="primary">
                Donate now
              </Button>
              <Button
                to="/get-involved"
                variant="secondary"
                className="!border-ivory !text-ivory hover:!bg-ivory hover:!text-indigo-deep"
              >
                Get involved
              </Button>
            </div>
          </div>
          <div className="w-full">
            <BannerSlider banners={banners} />
            {banners.length === 0 && (
              <div className="grid grid-cols-2 gap-4">
                <PhotoPlaceholder
                  label="Bridge school, Kolhapur"
                  palette="marigold"
                  className="col-span-2"
                  ratio="aspect-[16/9]"
                />
                <PhotoPlaceholder label="Mobile health unit" palette="sage" />
                <PhotoPlaceholder label="Stitching centre" palette="madder" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mission & Vision (admin-managed via CMS) */}
      <section className="container-page py-16 sm:py-20 grid lg:grid-cols-2 gap-12">
        <div className="border-l-4 border-marigold pl-6">
          <p className="eyebrow mb-2">Our Mission</p>
          <p className="text-lg text-ink/80 leading-relaxed">{missionText}</p>
        </div>
        <div className="border-l-4 border-sage pl-6">
          <p className="eyebrow mb-2">Our Vision</p>
          <p className="text-lg text-ink/80 leading-relaxed">{visionText}</p>
        </div>
      </section>

      <StatStrip stats={statistics} />

      {/* Featured campaign */}
      <section className="container-page py-16 sm:py-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center bg-ivory2 border border-ink/10 rounded-sm p-8 sm:p-10">
          <div>
            <p className="eyebrow mb-3">Featured Campaign</p>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-indigo-deep">
              {featuredCampaign.title}
            </h2>
            <p className="mt-3 text-ink/70 leading-relaxed">
              Monsoon repairs and a second classroom are needed to keep 1,800
              children learning without interruption this year.
            </p>
            <div className="mt-6">
              <div className="flex justify-between text-sm font-mono mb-2">
                <span className="text-indigo font-medium">
                  ₹{featuredCampaign.raised.toLocaleString("en-IN")} raised
                </span>
                <span className="text-ink/50">
                  of ₹{featuredCampaign.goal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="h-2.5 bg-ink/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-madder rounded-full"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            <div className="mt-6">
              <Button to="/donate" variant="primary">
                Support this campaign
              </Button>
            </div>
          </div>
          <PhotoPlaceholder
            label="Classroom under repair"
            palette="indigo"
            ratio="aspect-[4/3]"
          />
        </div>
      </section>

      {/* Programs / Initiatives (admin-managed via CMS) */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="What we do"
          title="Three programs, one goal: lasting independence"
          description="From a child's first classroom to a mother's first paycheque, our work follows families through every stage of building a better life."
        />
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((p) => (
            <ProgramCard key={p.id} program={p} />
          ))}
        </div>
        <div className="mt-8">
          <Link to="/our-work" className="btn-ghost">
            Explore our work in detail →
          </Link>
        </div>
      </section>

      {/* Current projects teaser */}
      <section className="bg-ivory2 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading eyebrow="On the ground" title="Projects currently underway" />
          <div className="mt-10 grid sm:grid-cols-3 gap-5">
            {projects
              .filter((p) => p.status === "Ongoing")
              .slice(0, 3)
              .map((p) => (
                <div
                  key={p.id}
                  className="bg-white/70 border border-ink/10 rounded-sm p-5"
                >
                  <span className="eyebrow">{p.sector}</span>
                  <h3 className="mt-2 font-display font-semibold text-indigo-deep">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink/65">{p.beneficiaries}</p>
                </div>
              ))}
          </div>
          <div className="mt-8">
            <Link to="/projects" className="btn-ghost">
              See all projects →
            </Link>
          </div>
        </div>
      </section>

      {/* Stories / blog teaser */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading eyebrow="From the field" title="Recent stories" />
        <div className="mt-6 max-w-3xl">
          {blogPosts.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <div className="mt-6">
          <Link to="/blog" className="btn-ghost">
            Read more on the blog →
          </Link>
        </div>
      </section>

      {/* Upcoming events */}
      <section className="container-page py-16 sm:py-20">
        <SectionHeading
          eyebrow="Coming up"
          title="Upcoming events"
          description="In-person and online ways to join us — from health camps to our annual fundraiser."
        />
        {upcomingEvents.length === 0 ? (
          <p className="mt-8 text-ink/60">
            No upcoming events right now — check back soon.
          </p>
        ) : (
          <>
            <div className="mt-10 grid sm:grid-cols-2 gap-5">
              {upcomingEvents.map((e) => (
                <EventCard key={e.id} event={e} />
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button to="/get-involved" variant="primary">
                Join an event
              </Button>
              <Link to="/media" className="btn-ghost">
                View the full calendar →
              </Link>
            </div>
          </>
        )}
      </section>

      {/* Partners & supporters */}
      <section className="bg-ivory2 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="In the news"
            title="Partners &amp; supporters"
            description="Thank you to the publications and partners who help amplify stories of change."
          />
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pressMentions.map((p) => (
              <a
                key={p.outlet}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-5 border border-ink/10 rounded-sm bg-white/60 hover:border-marigold/40 hover:bg-white transition-colors"
              >
                <p className="font-display font-semibold text-indigo-deep">
                  {p.outlet}
                </p>
                <p className="mt-1 text-sm text-ink/60 leading-relaxed">
                  {p.title}
                </p>
                <p className="mt-2 font-mono text-xs text-ink/50">{p.year}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-madder text-ivory">
        <div className="container-page py-14 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-display font-semibold text-ivory">
              Ready to stitch your support in?
            </h2>
            <p className="mt-2 text-ivory/85">
              ₹500 covers a month of school supplies for one child.
            </p>
          </div>
          <Button
            to="/donate"
            variant="secondary"
            className="!border-ivory !text-ivory hover:!bg-ivory hover:!text-madder shrink-0"
          >
            Donate now
          </Button>
        </div>
      </section>
    </>
  );
}
