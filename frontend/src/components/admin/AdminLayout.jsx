import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Dashboard", to: "/admin/dashboard", roles: ["admin", "editor"] },
  { label: "Image Slider", to: "/admin/banners", roles: ["admin"] },
  { label: "Vision & Mission", to: "/admin/vision-mission", roles: ["admin"] },
  { label: "Statistics", to: "/admin/statistics", roles: ["admin"] },
  { label: "Initiatives", to: "/admin/initiatives", roles: ["admin"] },
  { label: "Page Content", to: "/admin/content", roles: ["admin"] },
  { label: "Donations", to: "/admin/dashboard#donations", roles: ["admin"] },
  { label: "Users", to: "/admin/dashboard#users", roles: ["admin"] },
];

export default function AdminLayout() {
  const { user, role, logout } = useAuth();

  return (
    <div className="min-h-screen flex bg-ivory">
      <aside className="w-60 shrink-0 bg-indigo-deep text-ivory flex flex-col">
        <div className="px-6 py-6 border-b border-ivory/10">
          <p className="font-display font-semibold">Umang Foundation</p>
          <p className="text-xs text-ivory/60 mt-0.5">Admin Console</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems
            .filter((item) => item.roles.includes(role))
            .map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className="block px-3 py-2 rounded-sm text-sm font-medium text-ivory/80 hover:bg-ivory/10 hover:text-ivory transition-colors"
              >
                {item.label}
              </NavLink>
            ))}
        </nav>
        <div className="px-3 py-4 border-t border-ivory/10">
          <p className="px-3 text-xs text-ivory/50">Signed in as</p>
          <p className="px-3 text-sm font-medium truncate">{user?.name}</p>
          <p className="px-3 text-xs text-marigold-light capitalize">{role}</p>
          <button
            onClick={logout}
            className="mt-3 w-full text-left px-3 py-2 rounded-sm text-sm font-medium text-ivory/80 hover:bg-madder hover:text-ivory transition-colors"
          >
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
