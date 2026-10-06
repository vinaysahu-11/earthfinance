import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Calendar,
  CreditCard,
  Building2,
  Image,
  Star,
  Quote,
  HelpCircle,
  BookOpen,
  Mail,
  Settings,
  Search,
  UserCheck,
  BarChart3,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const AdminSidebar: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();

  const links = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Leads CRM', path: '/admin/leads', icon: Users },
    { name: 'Appointments', path: '/admin/appointments', icon: Calendar },
    { name: 'Loan Products', path: '/admin/loans', icon: CreditCard },
    { name: 'Industries', path: '/admin/industries', icon: Building2 },
    { name: 'Banners & Campaigns', path: '/admin/banners', icon: Image },
    { name: 'Reviews Moderation', path: '/admin/reviews', icon: Star },
    { name: 'Testimonials', path: '/admin/testimonials', icon: Quote },
    { name: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
    { name: 'Blog Articles', path: '/admin/blog', icon: BookOpen },
    { name: 'Gallery Items', path: '/admin/gallery', icon: Image },
    { name: 'Contact Inquiries', path: '/admin/messages', icon: Mail },
    { name: 'Reports & Analytics', path: '/admin/reports', icon: BarChart3 },
    { name: 'Staff Management', path: '/admin/staff', icon: UserCheck, superAdminOnly: true },
    { name: 'SEO Management', path: '/admin/seo', icon: Search },
    { name: 'Website Settings', path: '/admin/settings', icon: Settings }
  ];

  const filteredLinks = links.filter((item) => {
    if (item.superAdminOnly && user?.role !== 'SUPER_ADMIN' && user?.role !== 'ADMIN') return false;
    return true;
  });

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#071B3A] text-white flex flex-col border-r border-slate-800 transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#F4C542] flex items-center justify-center font-bold text-[#071B3A]">
              EF
            </div>
            <div>
              <span className="font-bold text-sm tracking-wide block text-white leading-tight">EARTH FINANCE</span>
              <span className="text-[10px] text-[#F4C542] tracking-wider uppercase font-semibold">Admin CRM</span>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {filteredLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-white/10 text-[#F4C542]'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User profile & logout */}
        <div className="p-4 border-t border-white/10 bg-black/20">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.role || 'STAFF'}</p>
            </div>
            <button
              onClick={logout}
              title="Sign Out"
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-white/5 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
