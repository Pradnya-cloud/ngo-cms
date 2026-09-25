import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "./AuthShell";
import { apiRegister } from "../../utils/authApi";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState("idle"); // idle | loading | done
  const [error, setError] = useState(null);

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setStatus("loading");
    try {
      await apiRegister(form);
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <AuthShell eyebrow="Admin Console" title="Check your email">
        <p className="text-ink/70 leading-relaxed">
          We've sent a verification link to <strong>{form.email}</strong>. Verify your address, then{" "}
          <Link to="/admin/login" className="text-madder font-medium hover:underline">log in</Link>.
        </p>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Admin Console"
      title="Create an account"
      subtitle="Requested by an existing admin, or self-registering as staff."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/admin/login" className="text-madder font-medium hover:underline">Log in</Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-madder/10 border border-madder/30 text-madder-dark text-sm rounded-sm px-3 py-2.5">
            {error}
          </div>
        )}
        <div>
          <label className="text-sm font-medium text-ink/80" htmlFor="name">Full name</label>
          <input
            id="name" name="name" required value={form.name} onChange={handleChange}
            className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink/80" htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email" required autoComplete="email" value={form.email} onChange={handleChange}
            className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink/80" htmlFor="password">Password</label>
          <input
            id="password" name="password" type="password" required minLength={8} autoComplete="new-password"
            value={form.password} onChange={handleChange}
            className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
          />
          <p className="mt-1 text-xs text-ink/45">At least 8 characters.</p>
        </div>
        <button type="submit" disabled={status === "loading"} className="btn-primary w-full justify-center disabled:opacity-60">
          {status === "loading" ? "Creating account…" : "Create account"}
        </button>
      </form>
    </AuthShell>
  );
}
