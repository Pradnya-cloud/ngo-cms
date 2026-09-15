import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard" },
  { to: "/admin/content", label: "Content" },
  { to: "/admin/projects", label: "Projects" },
  { to: "/admin/donations", label: "Donations" },
  { to: "/admin/media", label: "Media" },
  { to: "/admin/events", label: "Events" },
  { to: "/admin/volunteers", label: "Volunteers" },
  { to: "/admin/blog", label: "Blog" },
  { to: "/admin/enquiries", label: "Enquiries" },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-ink text-ivory">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-ink/95 backdrop-blur transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-ivory/10 px-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-sm bg-madder text-ivory">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="M8 4h8M9 4v5.2L4.8 15.5A2 2 0 006.6 18h10.8a2 2 0 001.8-2.5L15 9.2V4M7 13h10" />
            </svg>
          </span>
          <span className="font-display text-lg font-bold">NGO CMS</span>
        </div>
        <nav className="px-4 py-6">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={`block rounded-sm px-3 py-2.5 text-sm font-medium transition-colors hover:bg-ivory/10 ${
                    location.pathname === item.to ? "bg-madder text-ivory" : "text-ivory/80"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="absolute bottom-0 left-0 right-0 border-t border-ivory/10 p-4">
          <p className="truncate text-sm text-ivory/60">{user?.email}</p>
          <button
            onClick={logout}
            className="mt-1 text-sm text-marigold hover:text-marigold/80"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex-1 lg:ml-64">
        <header className="flex h-16 items-center justify-between border-b border-ivory/10 bg-ink/50 px-6">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-sm p-2 text-ivory hover:bg-ivory/10 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="font-display text-lg font-semibold">
            {navItems.find((n) => n.to === location.pathname)?.label ?? "Admin"}
          </h1>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-ivory/60 sm:inline">{user?.name}</span>
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-madder text-xs font-semibold text-ivory">
              {(user?.name ?? "A").charAt(0).toUpperCase()}
            </span>
          </div>
        </header>
        <main className="p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}