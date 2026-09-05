import React from 'react';
import { UserProfile, ScreenType } from '../types';

interface HeaderProps {
  user: UserProfile;
  currentScreen: ScreenType;
  onBack?: () => void;
  onOpenNotifications: () => void;
  onNavigateHome: () => void;
  onOpenProfile: () => void;
  title?: string;
  showBack?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  currentScreen,
  onBack,
  onOpenNotifications,
  onNavigateHome,
  onOpenProfile,
  title,
  showBack = false,
}) => {
  // If in custom view with title & back button
  if (showBack) {
    return (
      <header
        id="app-header-sub"
        className="fixed top-0 w-full lg:w-[calc(100%-260px)] lg:left-[260px] z-50 bg-[#f6faff]/90 backdrop-blur-xl shadow-[0px_4px_20px_rgba(26,43,72,0.05)] transition-all"
      >
        <div className="flex justify-between items-center px-5 py-4 max-w-[480px] mx-auto md:max-w-[1024px] lg:max-w-[1200px]">
          <button
            id="header-back-btn"
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#edf4fc] text-[#44474d] hover:bg-[#e2e9f1] transition-colors active:scale-95 cursor-pointer"
            aria-label="Kembali"
          >
            <span className="material-symbols-outlined text-[22px]">arrow_back</span>
          </button>
          <div className="flex-1 text-center px-3 truncate">
            <h1 className="text-[18px] md:text-[20px] font-bold text-[#031632] truncate">
              {title || 'SIGAP'}
            </h1>
          </div>
          <button
            id="header-sub-notif-btn"
            onClick={onOpenNotifications}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#edf4fc] text-[#031632] hover:bg-[#e2e9f1] transition-colors active:scale-95 cursor-pointer relative"
            aria-label="Notifikasi"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
          </button>
        </div>
      </header>
    );
  }

  // Primary top bar
  return (
    <header
      id="app-header-main"
      className="fixed top-0 w-full lg:w-[calc(100%-260px)] lg:left-[260px] z-50 bg-[#f6faff]/90 backdrop-blur-xl shadow-[0px_4px_20px_rgba(26,43,72,0.05)] transition-all lg:border-b lg:border-[#e2e9f1]/60 lg:shadow-none"
    >
      <div className="flex justify-between items-center px-5 py-3.5 max-w-[480px] mx-auto md:max-w-[1024px] lg:max-w-[1200px]">
        {currentScreen === 'home' || currentScreen === 'admin_dashboard' ? (
          <button
            id="user-profile-header-btn"
            onClick={onOpenProfile}
            className="flex items-center gap-3 text-left group cursor-pointer"
          >
            {user.userRole === 'admin' ? (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00658d] to-[#2dbcfe] border-2 border-[#2dbcfe] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  admin_panel_settings
                </span>
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#2dbcfe] shadow-sm group-hover:scale-105 transition-transform shrink-0">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <h2 className="text-[15px] font-bold text-[#031632] flex items-center gap-1.5 leading-tight">
                Halo, {user.name.split(' ')[0]}! <span className="inline-block text-[14px]">👋</span>
              </h2>
              <p className="text-[11px] text-[#44474d] line-clamp-1">
                {user.userRole === 'admin' ? '🛡️ Satgas Anti-Bullying' : 'Siap buat sekolah lebih aman?'}
              </p>
            </div>
          </button>
        ) : (
          <button
            id="brand-logo-btn"
            onClick={onNavigateHome}
            className="flex items-center gap-2 cursor-pointer group"
          >
            {user.userRole === 'admin' ? (
              <div className="w-9 h-9 rounded-full bg-[#00658d] text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  admin_panel_settings
                </span>
              </div>
            ) : (
              <div className="w-9 h-9 rounded-full bg-[#edf4fc] overflow-hidden border border-[#2dbcfe]/30 flex items-center justify-center text-[#00658d] group-hover:scale-105 transition-transform">
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <span className="font-extrabold text-[22px] tracking-tight text-[#00658d]">
              SIGAP
            </span>
          </button>
        )}

        <div className="flex items-center gap-2">
          {user.userRole === 'admin' && (
            <span className="bg-[#00658d] text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
              ADMIN
            </span>
          )}
          {currentScreen === 'home' && (
            <span className="hidden sm:inline-block font-extrabold text-[20px] text-[#00658d] tracking-tight mr-1">
              SIGAP
            </span>
          )}
          <button
            id="header-notif-btn"
            onClick={onOpenNotifications}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-[#edf4fc] text-[#031632] hover:bg-[#e2e9f1] active:scale-95 transition-all cursor-pointer relative"
            aria-label="Notifikasi"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
