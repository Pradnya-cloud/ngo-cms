import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "./AuthShell";
import { apiForgotPassword } from "../../utils/authApi";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | sent

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    await apiForgotPassword({ email });
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <AuthShell eyebrow="Admin Console" title="Check your email">
        <p className="text-ink/70 leading-relaxed">
          If an account exists for <strong>{email}</strong>, a password reset link is on its way.
        </p>
        <Link to="/admin/login" className="btn-secondary mt-6 inline-flex">Back to login</Link>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Admin Console"
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <Link to="/admin/login" className="text-madder font-medium hover:underline">Back to login</Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-ink/80" htmlFor="email">Email</label>
          <input
            id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
          />
        </div>
        <button type="submit" disabled={status === "loading"} className="btn-primary w-full justify-center disabled:opacity-60">
          {status === "loading" ? "Sending…" : "Send reset link"}
        </button>
      </form>
    </AuthShell>
  );
}
