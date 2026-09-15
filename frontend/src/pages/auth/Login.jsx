import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { apiLogin } from "../../utils/authApi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated, login } = useAuth();

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login({ email, password });
    } catch (err) {
      setError(err.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="flex h-14 w-14 mx-auto items-center justify-center rounded-sm bg-madder text-ivory">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M8 4h8M9 4v5.2L4.8 15.5A2 2 0 006.6 18h10.8a2 2 0 001.8-2.5L15 9.2V4M7 13h10" />
            </svg>
          </span>
          <h1 className="mt-4 font-display text-2xl font-bold text-ivory">NGO CMS Admin</h1>
          <p className="mt-1 text-sm text-ivory/60">Sign in to manage content</p>
        </div>
        <form onSubmit={handleSubmit} className="rounded-lg border border-ivory/10 bg-ink/50 p-6">
          <label className="mb-1.5 block text-sm font-medium text-ivory/80">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4 w-full rounded-sm border border-ivory/20 bg-ink/50 px-3 py-2 text-sm text-ivory placeholder-ivory/40 focus:border-madder focus:outline-none focus:ring-1 focus:ring-madder"
            placeholder="admin@ngocms.org"
          />
          <label className="mb-1.5 block text-sm font-medium text-ivory/80">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-4 w-full rounded-sm border border-ivory/20 bg-ink/50 px-3 py-2 text-sm text-ivory placeholder-ivory/40 focus:border-madder focus:outline-none focus:ring-1 focus:ring-madder"
            placeholder="Enter your password"
          />
          {error && <p className="mb-3 text-sm text-madder">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-sm bg-madder px-4 py-2.5 text-sm font-semibold text-ivory transition-colors hover:bg-madder/90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-ivory/40">
          Demo credentials: admin@ngocms.org / admin123
        </p>
      </div>
    </div>
  );
}