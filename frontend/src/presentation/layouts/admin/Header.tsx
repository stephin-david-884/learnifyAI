import React from "react";
import { Menu, Bell, User } from "lucide-react";
import { useAdminAuth } from "../../../hooks/useAdminAuth";

type Props = {
  toggleSidebar: () => void;
};

const Header: React.FC<Props> = ({ toggleSidebar }) => {
  const { admin } = useAdminAuth();

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
      <div className="flex items-center justify-between h-full px-6">
        {/* mobile menu */}
        <button
          onClick={toggleSidebar}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100"
        >
          <Menu size={22} />
        </button>

        <div className="hidden md:block" />

        <div className="flex items-center gap-3">
          <button className="relative w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-xl">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
          </button>

          <div className="flex items-center gap-3 pl-3 border-l">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white">
              <User size={18} />
            </div>

            <div>
              <p className="text-sm font-semibold">
                {admin?.name || "Admin"}
              </p>
              <p className="text-xs text-slate-500">
                {admin?.email || "admin@example.com"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;