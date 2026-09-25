import { useState } from "react";
import { api } from "../../utils/apiClient";

const interests = ["Teaching", "Healthcare", "Livelihood Training", "Events & Fundraising", "Digital/Design Skills"];
const interestValues = {
  Teaching: "teaching",
  Healthcare: "healthcare",
  "Livelihood Training": "livelihood-training",
  "Events & Fundraising": "events-fundraising",
  "Digital/Design Skills": "digital-design",
};

export default function VolunteerForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: interests[0], message: "" });

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await api.post("/volunteers/", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        interest: interestValues[form.interest],
        message: form.message,
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
        <p className="font-display font-semibold text-sage-dark text-lg">Thank you, {form.name.split(" ")[0] || "friend"}.</p>
        <p className="mt-2 text-ink/70">Our volunteer coordinator will reach out within 3 working days.</p>
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
        <Field label="Full name" name="name" value={form.name} onChange={handleChange} required />
        <Field label="Phone" name="phone" value={form.phone} onChange={handleChange} type="tel" required />
      </div>
      <Field label="Email" name="email" value={form.email} onChange={handleChange} type="email" required />
      <div>
        <label className="text-sm font-medium text-ink/80" htmlFor="interest">Area of interest</label>
        <select
          id="interest"
          name="interest"
          value={form.interest}
          onChange={handleChange}
          className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
        >
          {interests.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="text-sm font-medium text-ink/80" htmlFor="message">Tell us a little about yourself</label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          rows={4}
          className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none resize-none"
        />
      </div>
      <button type="submit" disabled={loading} className="btn-primary disabled:opacity-60">
        {loading ? "Submitting…" : "Submit interest"}
      </button>
    </form>
  );
}

function Field({ label, name, value, onChange, type = "text", required }) {
  return (
    <div>
      <label className="text-sm font-medium text-ink/80" htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
      />
    </div>
  );
}
