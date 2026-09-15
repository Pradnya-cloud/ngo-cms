import { useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../utils/apiClient";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await api.post("/auth/register/", { full_name: name, email, password });
      setDone(true);
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink p-4">
        <div className="w-full max-w-sm text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-sage/20 text-sage">
            <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-xl font-bold text-ivory">Account created</h2>
          <p className="mt-2 text-sm text-ivory/60">You can now sign in.</p>
          <Link to="/admin/login" className="mt-4 inline-block rounded-sm bg-madder px-4 py-2 text-sm font-semibold text-ivory">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink p-4">
      <div className="w-full max-w-sm">
        <h1 className="mb-6 text-center font-display text-2xl font-bold text-ivory">Create admin account</h1>
        <form onSubmit={handleSubmit} className="rounded-lg border border-ivory/10 bg-ink/50 p-6">
          <label className="mb-1.5 block text-sm font-medium text-ivory/80">Full name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} required className="mb-4 w-full rounded-sm border border-ivory/20 bg-ink/50 px-3 py-2 text-sm text-ivory focus:border-madder focus:outline-none focus:ring-1 focus:ring-madder" />
          <label className="mb-1.5 block text-sm font-medium text-ivory/80">Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mb-4 w-full rounded-sm border border-ivory/20 bg-ink/50 px-3 py-2 text-sm text-ivory focus:border-madder focus:outline-none focus:ring-1 focus:ring-madder" />
          <label className="mb-1.5 block text-sm font-medium text-ivory/80">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} className="mb-4 w-full rounded-sm border border-ivory/20 bg-ink/50 px-3 py-2 text-sm text-ivory focus:border-madder focus:outline-none focus:ring-1 focus:ring-madder" />
          <label className="mb-1.5 block text-sm font-medium text-ivory/80">Confirm password</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required className="mb-4 w-full rounded-sm border border-ivory/20 bg-ink/50 px-3 py-2 text-sm text-ivory focus:border-madder focus:outline-none focus:ring-1 focus:ring-madder" />
          {error && <p className="mb-3 text-sm text-madder">{error}</p>}
          <button type="submit" disabled={loading} className="w-full rounded-sm bg-madder px-4 py-2.5 text-sm font-semibold text-ivory hover:bg-madder/90 disabled:opacity-50">
            {loading ? "Creating..." : "Create account"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-ivory/60">
          Already have an account? <Link to="/admin/login" className="text-marigold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}