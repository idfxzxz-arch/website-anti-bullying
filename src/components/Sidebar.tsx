import React from 'react';
import { TabType, UserProfile } from '../types';

interface SidebarProps {
  user: UserProfile;
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onNavigateHome: () => void;
  onOpenProfile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  user,
  activeTab,
  onSelectTab,
  onNavigateHome,
  onOpenProfile,
}) => {
  const tabs: { key: TabType; label: string; icon: string }[] = [
    { key: 'home', label: 'Beranda', icon: 'home' },
    { key: 'game', label: 'SIGAP Game', icon: 'sports_esports' },
    { key: 'ai', label: 'Tanya AI', icon: 'smart_toy' },
    { key: 'lapor', label: 'Lapor Aman', icon: 'shield' },
    { key: 'saya', label: 'Profil Saya', icon: 'person' },
  ];

  return (
    <aside
      id="desktop-sidebar"
      className="hidden lg:flex flex-col w-[260px] h-screen bg-[#f6faff] shadow-[4px_0px_20px_rgba(26,43,72,0.06)] border-r border-[#e2e9f1]/60 fixed left-0 top-0 z-40 shrink-0"
    >
      {/* Brand & Logo */}
      <div className="p-6 pb-4">
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00658d] to-[#2dbcfe] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px]">
              local_police
            </span>
          </div>
          <span className="font-extrabold text-[26px] tracking-tight text-[#00658d]">
            SIGAP
          </span>
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-4 py-6 flex flex-col gap-2 overflow-y-auto">
        <h3 className="px-3 text-[12px] font-bold text-[#44474d] uppercase tracking-wider mb-2">
          Menu Utama
        </h3>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => onSelectTab(tab.key)}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 cursor-pointer w-full text-left ${
                isActive
                  ? 'bg-[#2dbcfe] text-white shadow-[0px_4px_14px_rgba(45,188,254,0.35)] font-bold'
                  : 'text-[#44474d] hover:bg-[#edf4fc] hover:text-[#031632]'
              }`}
            >
              <span
                className={`material-symbols-outlined text-[24px] ${
                  isActive ? 'filled' : ''
                }`}
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0",
                }}
              >
                {tab.icon}
              </span>
              <span className="text-[15px] font-semibold">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* User Profile Mini */}
      <div className="p-4 border-t border-[#e2e9f1]">
        <button
          onClick={onOpenProfile}
          className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-[#edf4fc] transition-colors cursor-pointer text-left"
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2dbcfe] shrink-0">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold text-[#031632] truncate">
              {user.name}
            </p>
            <p className="text-[11px] text-[#00658d] font-semibold truncate">
              Level {user.level} - {user.levelTitle}
            </p>
          </div>
        </button>
      </div>
    </aside>
  );
};
