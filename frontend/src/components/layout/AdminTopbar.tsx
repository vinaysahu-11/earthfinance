import React from 'react';
import { Menu, Bell, ExternalLink, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

export const AdminTopbar: React.FC<{ onMenuClick: () => void }> = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-[#071B3A] hover:bg-slate-100"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#168B45] hidden sm:block" />
          <span className="text-sm font-semibold text-[#071B3A]">
            Earth Finance Operations Console
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[#071B3A] bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors"
        >
          <span>Live Site</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>

        <div className="relative p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer">
          <Bell className="w-5 h-5" />
        </div>

        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-[#071B3A] text-white flex items-center justify-center font-bold text-xs">
            {user?.name ? user.name[0].toUpperCase() : 'A'}
          </div>
          <div className="hidden md:block text-left">
            <span className="text-xs font-semibold text-[#101828] block leading-none">{user?.name}</span>
            <span className="text-[10px] text-[#667085] leading-none">{user?.email}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
