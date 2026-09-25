import { useState } from "react";
import { NavLink } from "react-router-dom";
import { navLinks, org } from "../../data/content";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-ivory/95 backdrop-blur border-b border-ink/10">
      <div className="container-page flex items-center justify-between h-16">
        <NavLink to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <svg width="30" height="30" viewBox="0 0 64 64" aria-hidden="true">
            <rect width="64" height="64" rx="14" fill="#2C4A6E" />
            <path
              d="M8 44 Q 20 28, 32 44 T 56 44"
              stroke="#E8A33D"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="2 6"
            />
            <circle cx="32" cy="20" r="6" fill="#B23A48" />
          </svg>
          <span className="font-display font-semibold text-lg text-indigo-deep">{org.name}</span>
        </NavLink>

        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-madder" : "text-ink/75 hover:text-indigo"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:block">
          <NavLink to="/donate" className="btn-primary text-sm px-5 py-2.5">
            Donate
          </NavLink>
        </div>

        <button
          className="lg:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle navigation menu"
        >
          <span className="sr-only">Menu</span>
          <div className="w-6 h-0.5 bg-indigo-deep mb-1.5" />
          <div className="w-6 h-0.5 bg-indigo-deep mb-1.5" />
          <div className="w-6 h-0.5 bg-indigo-deep" />
        </button>
      </div>

      {open && (
        <nav className="lg:hidden border-t border-ink/10 bg-ivory">
          <div className="container-page py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-2.5 text-sm font-medium border-b border-ink/5 ${
                    isActive ? "text-madder" : "text-ink/75"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/donate" onClick={() => setOpen(false)} className="btn-primary text-sm mt-3 justify-center">
              Donate
            </NavLink>
          </div>
        </nav>
      )}
    </header>
  );
}
