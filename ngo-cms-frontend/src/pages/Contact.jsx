import SectionHeading from "../components/ui/SectionHeading";
import ContactForm from "../components/forms/ContactForm";
import { org } from "../data/content";

export default function Contact() {
  return (
    <>
      <section className="bg-indigo-deep text-ivory">
        <div className="container-page py-16 sm:py-20">
          <p className="eyebrow !text-marigold-light mb-3">Contact Us</p>
          <h1 className="text-4xl font-display font-semibold max-w-2xl text-ivory">Questions, press requests, or partnership ideas — we'd like to hear them.</h1>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20 grid lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3">
          <SectionHeading eyebrow="Send a message" title="Get in touch" />
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div>
            <p className="eyebrow mb-3">Our Office</p>
            <p className="text-ink/80">{org.address}</p>
            <p className="mt-2 text-ink/80"><a href={`tel:${org.phone}`} className="hover:text-madder">{org.phone}</a></p>
            <p className="text-ink/80"><a href={`mailto:${org.email}`} className="hover:text-madder">{org.email}</a></p>
          </div>

          <div className="aspect-[4/3] rounded-sm overflow-hidden border border-ink/10">
            <iframe
              title="Umang Foundation office location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=74.20%2C16.68%2C74.28%2C16.74&layer=mapnik"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>

          <div>
            <p className="eyebrow mb-3">Follow along</p>
            <div className="flex gap-4 text-sm">
              <a href={org.social.instagram} className="text-indigo hover:text-madder">Instagram</a>
              <a href={org.social.facebook} className="text-indigo hover:text-madder">Facebook</a>
              <a href={org.social.twitter} className="text-indigo hover:text-madder">Twitter</a>
              <a href={org.social.youtube} className="text-indigo hover:text-madder">YouTube</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
