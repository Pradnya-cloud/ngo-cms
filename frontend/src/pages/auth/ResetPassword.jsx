import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AuthShell from "./AuthShell";
import { apiResetPassword } from "../../utils/authApi";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirm: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirm) {
      setError("Passwords don't match.");
      return;
    }
    setStatus("loading");
    try {
      await apiResetPassword({ token, password: form.password });
      setStatus("done");
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <AuthShell eyebrow="Admin Console" title="Password reset">
        <p className="text-ink/70 leading-relaxed">Your password has been updated.</p>
        <button onClick={() => navigate("/admin/login")} className="btn-primary mt-6 w-full justify-center">
          Go to login
        </button>
      </AuthShell>
    );
  }

  return (
    <AuthShell eyebrow="Admin Console" title="Set a new password" footer={<Link to="/admin/login" className="text-madder font-medium hover:underline">Back to login</Link>}>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="bg-madder/10 border border-madder/30 text-madder-dark text-sm rounded-sm px-3 py-2.5">{error}</div>
        )}
        <div>
          <label className="text-sm font-medium text-ink/80" htmlFor="password">New password</label>
          <input
            id="password" type="password" required minLength={8}
            value={form.password} onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-ink/80" htmlFor="confirm">Confirm password</label>
          <input
            id="confirm" type="password" required minLength={8}
            value={form.confirm} onChange={(e) => setForm((f) => ({ ...f, confirm: e.target.value }))}
            className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
          />
        </div>
        <button type="submit" disabled={status === "loading"} className="btn-primary w-full justify-center disabled:opacity-60">
          {status === "loading" ? "Saving…" : "Reset password"}
        </button>
      </form>
    </AuthShell>
  );
}
