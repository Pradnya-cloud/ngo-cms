import { useState } from "react";
import { usePageContent, getSection } from "../../hooks/usePageContent";
import { org } from "../../data/content";
import { api } from "../../utils/apiClient";
import { SectionHeading } from "../../components/ui";

export default function Contact() {
  const { content } = usePageContent("contact", { org });
  const heroTitle = getSection(content, "hero_title", "Contact us");
  const heroText = getSection(content, "hero_text", "Have a question or want to partner with us? Get in touch.");
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/enquiries/", { ...form, enquiry_type: "contact" });
      setDone(true);
    } catch (err) {
      setError(err.message || "Failed to send message");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="container-page py-24 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage/20 text-sage">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="font-display text-2xl font-bold text-ink">Thank you</h2>
        <p className="mt-2 text-ink/70">We will get back to you shortly.</p>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-ink text-ivory py-16">
        <div className="container-page max-w-3xl">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-marigold">Get in touch</p>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">{heroTitle}</h1>
          <p className="mt-5 text-lg text-ivory/75">{heroText}</p>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <h2 className="font-display text-xl font-bold text-ink">Visit us</h2>
            <address className="mt-3 text-ink/75 not-italic">{org.address}</address>
            <p className="mt-2 text-ink/75">{org.phone}</p>
            <a href={`mailto:${org.email}`} className="text-madder hover:underline">{org.email}</a>
          </div>
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-lg border border-ink/10 bg-ivory p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Name" required className="rounded-sm border border-ink/10 px-3 py-2 text-sm focus:border-madder focus:outline-none" />
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" placeholder="Email" required className="rounded-sm border border-ink/10 px-3 py-2 text-sm focus:border-madder focus:outline-none" />
                <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" className="rounded-sm border border-ink/10 px-3 py-2 text-sm focus:border-madder focus:outline-none" />
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="Subject" required className="rounded-sm border border-ink/10 px-3 py-2 text-sm focus:border-madder focus:outline-none" />
              </div>
              <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Message" rows={5} required className="mt-4 w-full rounded-sm border border-ink/10 px-3 py-2 text-sm focus:border-madder focus:outline-none" />
              {error && <p className="mt-3 text-sm text-madder">{error}</p>}
              <button type="submit" disabled={loading} className="mt-4 rounded-sm bg-madder px-5 py-2 text-sm font-semibold text-ivory hover:bg-madder/90 disabled:opacity-50">
                {loading ? "Sending..." : "Send message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}