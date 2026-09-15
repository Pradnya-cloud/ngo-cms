import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks, org } from "../../data/content";

const socialLinks = [
  { label: "Instagram", href: org.social.instagram },
  { label: "Facebook", href: org.social.facebook },
  { label: "X", href: org.social.twitter },
  { label: "YouTube", href: org.social.youtube },
];

function MenuIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeWidth="1.8" d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export default function Layout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-ivory text-ink">
      <header className="border-b border-ink/10 bg-ivory/95 backdrop-blur">
        <div className="container-page flex h-20 items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3" aria-label={`${org.name} home`}>
            <span className="flex h-10 w-10 items-center justify-center rounded-sm bg-madder text-ivory shadow-sm" aria-hidden="true">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M8 4h8M9 4v5.2L4.8 15.5A2 2 0 006.6 18h10.8a2 2 0 001.8-2.5L15 9.2V4M7 13h10" />
              </svg>
            </span>
            <span>
              <span className="block font-display text-xl font-bold leading-none text-ink">{org.name}</span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-indigo">Community first</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `text-sm font-medium transition-colors hover:text-madder ${isActive ? "text-madder" : "text-ink/75"}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link to="/donate" className="btn-primary text-sm">Donate</Link>
          </div>

          <button
            type="button"
            className="flex items-center justify-center rounded-sm p-2 text-ink hover:bg-ink/5 lg:hidden"
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-ink/10 bg-ivory px-5 py-5 lg:hidden" aria-label="Mobile navigation">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `rounded-sm px-3 py-3 text-sm font-medium ${isActive ? "bg-indigo/10 text-madder" : "text-ink/80 hover:bg-ink/5"}`}
                >
                  {link.label}
                </NavLink>
              ))}
              <Link to="/donate" className="btn-primary mt-3 justify-center text-sm">Donate</Link>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-ink text-ivory">
        <div className="container-page grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-2xl font-bold">{org.name}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ivory/70">{org.tagline}</p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noreferrer" className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/20 text-sm text-ivory/80 transition-colors hover:border-marigold hover:text-marigold" aria-label={social.label}>
                  <span className="sr-only">{social.label}</span>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 6.3a3.4 3.4 0 01-1 2.4 3.4 3.4 0 01-1 2.4c.1.7.4 1.4 1 2a3.3 3.3 0 01-1 2.2 3.3 3.3 0 01-2.2 1c-.7.6-1.4.9-2.1 1a3.4 3.4 0 01-2.4-1 3.4 3.4 0 01-1-2.4c.1-.7.4-1.4 1-2a3.4 3.4 0 01-1-2.4 3.3 3.3 0 011-2.2c.7-.6 1.4-.9 2.1-1 .7-.6 1.4-.9 2.1-1a3.4 3.4 0 012.4 1 3.4 3.4 0 011 2z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-marigold">Explore</p>
            <ul className="mt-5 space-y-3 text-sm text-ivory/75">
              {navLinks.slice(0, 5).map((link) => <li key={link.to}><Link to={link.to} className="hover:text-marigold">{link.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-marigold">Take action</p>
            <ul className="mt-5 space-y-3 text-sm text-ivory/75">
              <li><Link to="/get-involved" className="hover:text-marigold">Volunteer</Link></li>
              <li><Link to="/donate" className="hover:text-marigold">Donate</Link></li>
              <li><Link to="/blog" className="hover:text-marigold">Stories</Link></li>
              <li><Link to="/contact" className="hover:text-marigold">Partner with us</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-marigold">Visit us</p>
            <address className="mt-5 text-sm not-italic leading-relaxed text-ivory/75">{org.address}<br />{org.phone}<br /><a href={`mailto:${org.email}`} className="hover:text-marigold">{org.email}</a></address>
          </div>
        </div>
        <div className="border-t border-ivory/10">
          <div className="container-page flex flex-col justify-between gap-3 py-5 text-xs text-ivory/55 sm:flex-row">
            <p>© {new Date().getFullYear()} {org.name}. All rights reserved.</p>
            <p>Stitched with care by our community.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
