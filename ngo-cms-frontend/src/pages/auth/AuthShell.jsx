import { Link } from "react-router-dom";
import StitchDivider from "../../components/ui/StitchDivider";

// Shared visual frame for every auth screen (login/register/forgot/reset).
export default function AuthShell({ eyebrow, title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-deep px-5 py-12">
      <div className="w-full max-w-md bg-ivory rounded-sm p-8 sm:p-10">
        <Link to="/" className="flex items-center gap-2 mb-8">
          <svg width="26" height="26" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="#2C4A6E" />
            <path d="M8 44 Q 20 28, 32 44 T 56 44" stroke="#E8A33D" strokeWidth="4" fill="none" strokeLinecap="round" strokeDasharray="2 6" />
            <circle cx="32" cy="20" r="6" fill="#B23A48" />
          </svg>
          <span className="font-display font-semibold text-indigo-deep">Umang Foundation</span>
        </Link>
        {eyebrow && <p className="eyebrow mb-2">{eyebrow}</p>}
        <h1 className="text-2xl font-display font-semibold text-indigo-deep">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-ink/65">{subtitle}</p>}
        <div className="mt-3 w-16"><StitchDivider /></div>
        <div className="mt-8">{children}</div>
        {footer && <div className="mt-6 text-sm text-center text-ink/60">{footer}</div>}
      </div>
    </div>
  );
}
