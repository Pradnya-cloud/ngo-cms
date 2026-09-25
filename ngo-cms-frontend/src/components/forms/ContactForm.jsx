import { useState } from "react";
import { api } from "../../utils/apiClient";

const reasons = ["General Inquiry", "Media Request", "Partnership Proposal", "Volunteer Question", "Other"];
const reasonValues = {
  "General Inquiry": "general-inquiry",
  "Media Request": "media-request",
  "Partnership Proposal": "partnership-proposal",
  "Volunteer Question": "volunteer-question",
  Other: "other",
};

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", reason: reasons[0], message: "" });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post("/enquiries/", {
        name: form.name,
        email: form.email,
        phone: "",
        subject: "",
        message: form.message,
        enquiry_type: reasonValues[form.reason],
      });
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="border-2 border-sage bg-sage/10 rounded-sm p-6">
        <p className="font-display font-semibold text-sage-dark text-lg">Message sent.</p>
        <p className="mt-2 text-ink/70">We typically reply within 2 working days.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-madder/10 border border-madder/30 text-madder-dark text-sm rounded-sm px-3 py-2.5">
          {error}
        </div>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-ink/80" htmlFor="name">Full name</label>
          <input
            id="name" name="name" value={form.name} onChange={handleChange} required
            className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink/80" htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email" value={form.email} onChange={handleChange} required
            className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-medium text-ink/80" htmlFor="reason">Reason for contact</label>
        <select
          id="reason" name="reason" value={form.reason} onChange={handleChange}
          className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
        >
          {reasons.map((r) => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-ink/80" htmlFor="message">Message</label>
        <textarea
          id="message" name="message" value={form.message} onChange={handleChange} rows={5} required
          className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none resize-none"
        />
      </div>
      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
        {loading ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
