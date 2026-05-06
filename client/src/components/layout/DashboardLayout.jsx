import { BarChart3, Building2, KeyRound, LogOut, Shield, Star, Store, UserRound } from "lucide-react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";

const links = {
  admin: [
    ["Dashboard", "/admin", BarChart3],
    ["Users", "/admin/users", UserRound],
    ["Stores", "/admin/stores", Building2],
    ["Password", "/change-password", KeyRound]
  ],
  user: [
    ["Stores", "/stores", Store],
    ["My Ratings", "/my-ratings", Star],
    ["Password", "/change-password", KeyRound]
  ],
  owner: [
    ["Dashboard", "/owner", BarChart3],
    ["Password", "/change-password", KeyRound]
  ]
};

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const navItems = links[user?.role] || [];

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 border-r border-slate-200 bg-white p-5 lg:block">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-md bg-brand-600 text-white">
            <Shield size={20} />
          </div>
          <div>
            <p className="font-bold text-ink">RateWise</p>
            <p className="text-xs capitalize text-slate-500">{user?.role} portal</p>
          </div>
        </div>
        <nav className="mt-8 space-y-1">
          {navItems.map(([label, path, Icon]) => (
            <NavLink
              key={path}
              to={path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium ${isActive ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50"}`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6">
            <div>
              <p className="text-sm font-semibold text-ink">{user?.name}</p>
              <p className="text-xs text-slate-500">{user?.email}</p>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              <LogOut size={16} />
              Logout
            </Button>
          </div>
          <nav className="flex gap-2 overflow-x-auto px-4 pb-3 lg:hidden">
            {navItems.map(([label, path, Icon]) => (
              <NavLink key={path} to={path} end className="flex shrink-0 items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                <Icon size={16} />
                {label}
              </NavLink>
            ))}
          </nav>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
