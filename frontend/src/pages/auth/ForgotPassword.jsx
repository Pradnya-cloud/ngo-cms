import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink p-4">
      <div className="w-full max-w-sm text-center">
        <h1 className="mb-2 font-display text-2xl font-bold text-ivory">Forgot password</h1>
        <p className="mb-6 text-sm text-ivory/60">Password reset is not yet configured. Use the admin login with your existing credentials.</p>
        <Link to="/admin/login" className="inline-block rounded-sm bg-madder px-4 py-2 text-sm font-semibold text-ivory hover:bg-madder/90">
          Back to login
        </Link>
      </div>
    </div>
  );
}