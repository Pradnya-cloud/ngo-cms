import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthShell from "./AuthShell";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const { login, loading, error, clearError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });

  const redirectTo = location.state?.from?.pathname || "/admin/dashboard";

  async function handleSubmit(e) {
    e.preventDefault();
    clearError();
    try {
      await login(form);
      navigate(redirectTo, { replace: true });
    } catch {
      // error is already surfaced via context
    }
  }

  return (
    <AuthShell
      eyebrow="Admin Console"
      title="Log in to your account"
      subtitle="Manage content, projects, and donations for Umang Foundation."
      footer={
        <>
          Don't have an account?{" "}
          <Link to="/admin/register" className="text-madder font-medium hover:underline">Register</Link>
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
          <label className="text-sm font-medium text-ink/80" htmlFor="email">Email</label>
          <input
            id="email" type="email" required autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
          />
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-ink/80" htmlFor="password">Password</label>
            <Link to="/admin/forgot-password" className="text-xs text-madder hover:underline">Forgot password?</Link>
          </div>
          <input
            id="password" type="password" required autoComplete="current-password"
            value={form.password}
            onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
            className="mt-1.5 w-full border border-ink/20 rounded-sm px-3 py-2.5 bg-white focus:border-indigo outline-none"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
          {loading ? "Logging in…" : "Log in"}
        </button>
          <p className="text-xs text-ink/40 text-center">
            Demo credentials: admin@ngocms.org / admin123
          </p>
      </form>
    </AuthShell>
  );
}
