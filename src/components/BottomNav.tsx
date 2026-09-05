import React from 'react';
import { TabType, UserRole } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  userRole?: UserRole;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  userRole = 'student',
}) => {
  const studentTabs: { key: TabType; label: string; icon: string }[] = [
    { key: 'home', label: 'Home', icon: 'home' },
    { key: 'game', label: 'Game', icon: 'sports_esports' },
    { key: 'ai', label: 'AI', icon: 'smart_toy' },
    { key: 'lapor', label: 'Lapor', icon: 'shield' },
    { key: 'saya', label: 'Saya', icon: 'person' },
  ];

  const adminTabs: { key: TabType; label: string; icon: string }[] = [
    { key: 'admin', label: 'Satgas', icon: 'admin_panel_settings' },
    { key: 'home', label: 'Siswa', icon: 'visibility' },
    { key: 'ai', label: 'AI', icon: 'smart_toy' },
    { key: 'saya', label: 'Saya', icon: 'person' },
  ];

  const tabs = userRole === 'admin' ? adminTabs : studentTabs;

  return (
    <nav
      id="bottom-navigation-bar"
      className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-[#f6faff]/95 backdrop-blur-xl shadow-[0px_-4px_20px_rgba(26,43,72,0.06)] border-t border-[#e2e9f1]/60 lg:hidden"
    >
      <div className="max-w-[480px] md:max-w-[800px] mx-auto flex justify-around items-center px-3 py-1.5 pb-safe">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              id={`nav-tab-${tab.key}`}
              onClick={() => onSelectTab(tab.key)}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 cursor-pointer min-w-[56px] ${
                isActive
                  ? 'bg-[#2dbcfe] text-white shadow-[0px_4px_12px_rgba(45,188,254,0.4)] scale-105 font-bold'
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
              <span className="text-[10px] md:text-[11px] mt-0.5 tracking-tight font-medium">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
