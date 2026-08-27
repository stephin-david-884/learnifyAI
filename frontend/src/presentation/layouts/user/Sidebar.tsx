import React from 'react';
import { useAuth } from '../../../hooks/useAuth';
import {
  LayoutDashboard,
  FileText,
  User,
  LogOut,
  BrainCircuit,
  BookOpen,
  X,
  Crown,
  CreditCard,
  ClipboardList,
  Mic
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import SubscriptionStatusCard from '../../components/subscription/SubscriptionStatusCard';

type SidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  toggleSidebar
}) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const navLinks = [
    { to: '/dashboard', icon: LayoutDashboard, text: 'Dashboard' },
    { to: '/documents', icon: FileText, text: 'Documents' },
    { to: '/quizzes', icon: ClipboardList, text: 'Quizzes' },
    { to: '/interviews', icon: Mic, text: 'Interviews' },
    { to: '/flashcards', icon: BookOpen, text: 'Flashcards' },
    { to: '/profile', icon: User, text: 'Profile' },
    {
      to: '/subscription/plans',
      icon: Crown,
      text: 'Subscription'
    },
    {
      to: '/subscription/payments',
      icon: CreditCard,
      text: 'Payments'
    }
  ];

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 md:hidden
          ${
            isSidebarOpen
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        onClick={toggleSidebar}
        aria-hidden="true"
      />

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-slate-200/60 bg-white/90 backdrop-blur-lg transition-transform duration-300 ease-in-out
          md:relative md:w-64 md:shrink-0 md:translate-x-0
          ${
            isSidebarOpen
              ? 'translate-x-0'
              : '-translate-x-full'
          }`}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200/60 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-rose-600 shadow-md shadow-red-500/20">
              <BrainCircuit
                className="text-white"
                size={20}
                strokeWidth={2.5}
              />
            </div>

            <h1 className="text-sm font-bold tracking-tight md:text-base">
              <span className="text-slate-900">Learnify</span>
              <span className="text-red-600">AI</span>
            </h1>
          </div>

          <button
            onClick={toggleSidebar}
            className="text-slate-500 hover:text-slate-800 md:hidden"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="min-h-0 flex-1 overflow-y-auto px-3 py-4 space-y-1.5">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={toggleSidebar}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200
                ${
                  isActive
                    ? 'bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <link.icon
                    size={18}
                    strokeWidth={2.5}
                    className={`transition-transform duration-200
                      ${
                        isActive
                          ? ''
                          : 'group-hover:scale-110'
                      }`}
                  />

                  {link.text}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Subscription Card */}
        <div className="shrink-0">
          <SubscriptionStatusCard />
        </div>

        {/* Logout */}
        <div className="shrink-0 border-t border-slate-200/60 px-3 py-4">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
          >
            <LogOut
              size={18}
              strokeWidth={2.5}
              className="transition-transform duration-200 group-hover:scale-110"
            />

            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;