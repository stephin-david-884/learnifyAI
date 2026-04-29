import React from "react";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  DollarSign,
  Settings,
  LogOut,
  X,
  Shield,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../../hooks/useAdminAuth";

type Props = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<Props> = ({
  isSidebarOpen,
  toggleSidebar,
}) => {
  const navigate = useNavigate();
  const { logout } = useAdminAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const navLinks = [
    { to: "/admin/dashboard", icon: LayoutDashboard, text: "Dashboard" },
    { to: "/admin/users", icon: Users, text: "Users" },
    { to: "/admin/subscriptions", icon: CreditCard, text: "Subscriptions" },
    { to: "/admin/payments", icon: DollarSign, text: "Payments" },
    { to: "/admin/system", icon: Settings, text: "System" },
  ];

  return (
    <>
      <div
        onClick={toggleSidebar}
        className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity
        ${isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r z-50 md:relative md:translate-x-0 transition-transform
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        
        <div className="flex items-center justify-between h-16 px-5 border-b">
          <div className="flex items-center gap-2">
            <Shield className="text-indigo-600" />
            <h1 className="font-bold">Admin Panel</h1>
          </div>

          <button onClick={toggleSidebar} className="md:hidden">
            <X />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition
                ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-slate-100 text-slate-700"
                }`
              }
            >
              <link.icon size={18} />
              {link.text}
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-3 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-xl"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;