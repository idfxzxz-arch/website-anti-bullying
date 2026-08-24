import React from 'react';
import { UserProfile, ScreenType } from '../types';

interface HomeViewProps {
  user: UserProfile;
  onNavigate: (screen: ScreenType) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ user, onNavigate }) => {
  const xpPercent = Math.round((user.currentXp / user.maxXp) * 100);

  const featureButtons = [
    {
      id: 'feature-simulasi',
      title: '🎭 SIMULASI',
      icon: 'theater_comedy',
      bgIcon: 'bg-[#c6e7ff]',
      textIcon: 'text-[#00658d]',
      screen: 'simulation' as ScreenType,
      border: 'border-[#2dbcfe]/20',
      containerBg: 'bg-white',
    },
    {
      id: 'feature-game',
      title: '🎮 SIGAP GAME',
      icon: 'sports_esports',
      bgIcon: 'bg-[#c6e7ff]',
      textIcon: 'text-[#00658d]',
      screen: 'game_hub' as ScreenType,
      border: 'border-[#2dbcfe]/20',
      containerBg: 'bg-white',
    },
    {
      id: 'feature-ai',
      title: '🤖 TANYA SIGAP AI',
      icon: 'smart_toy',
      bgIcon: 'bg-[#cae6ff]',
      textIcon: 'text-[#002e47]',
      screen: 'ai_chat' as ScreenType,
      border: 'border-[#2dbcfe]/20',
      containerBg: 'bg-white',
    },
    {
      id: 'feature-cek-situasi',
      title: '🔎 CEK SITUASI',
      icon: 'search',
      bgIcon: 'bg-[#d7e2ff]',
      textIcon: 'text-[#031632]',
      screen: 'situation_check' as ScreenType,
      border: 'border-[#2dbcfe]/20',
      containerBg: 'bg-white',
    },
    {
      id: 'feature-lapor',
      title: '🚨 LAPOR AMAN',
      icon: 'campaign',
      bgIcon: 'bg-[#ba1a1a]/15',
      textIcon: 'text-[#ba1a1a]',
      screen: 'report' as ScreenType,
      border: 'border-[#ba1a1a]/25',
      containerBg: 'bg-[#ffdad6]/70',
      titleColor: 'text-[#ba1a1a]',
    },
    {
      id: 'feature-teman',
      title: '💙 TEMAN SIGAP',
      icon: 'group',
      bgIcon: 'bg-[#c6e7ff]',
      textIcon: 'text-[#00658d]',
      screen: 'friends' as ScreenType,
      border: 'border-[#2dbcfe]/20',
      containerBg: 'bg-white',
    },
  ];

  return (
    <div id="home-view-container" className="flex flex-col gap-5">
      {/* Progress & Level Card */}
      <section
        id="home-level-card"
        className="glass-card rounded-[22px] p-5 relative overflow-hidden border border-white/80 shadow-[0px_4px_20px_rgba(26,43,72,0.05)]"
      >
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#2dbcfe]/20 rounded-full filter blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
        <div className="flex justify-between items-end mb-3">
          <div>
            <h2 className="text-[12px] font-bold text-[#00658d] uppercase tracking-wider mb-0.5">
              SIGAP LEVEL {user.level < 10 ? `0${user.level}` : user.level}
            </h2>
            <p className="text-[26px] md:text-[30px] font-extrabold text-[#031632] leading-tight">
              {user.points}{' '}
              <span className="text-[15px] font-semibold text-[#44474d]">
                SIGAP POINT
              </span>
            </p>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#2dbcfe] flex items-center justify-center text-white shadow-md">
            <span
              className="material-symbols-outlined text-[26px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              military_tech
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-2">
          <div className="h-3 w-full bg-[#e8eff7] rounded-full overflow-hidden p-0.5">
            <div
              className="h-full gradient-bg rounded-full relative transition-all duration-700 ease-out"
              style={{ width: `${xpPercent}%` }}
            >
              <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/60 blur-[1px] rounded-full mr-0.5"></div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center text-[11px] text-[#44474d]">
          <span>Rank: <strong className="text-[#00658d]">{user.levelTitle}</strong></span>
          <span>{Math.ceil((user.maxXp - user.currentXp) / 50)} misi lagi menuju Level {user.level + 1 < 10 ? `0${user.level + 1}` : user.level + 1}</span>
        </div>
      </section>

      {/* Main Feature Cards Grid */}
      <section
        id="home-feature-grid"
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5 lg:gap-5"
      >
        {featureButtons.map((btn) => (
          <button
            key={btn.id}
            id={btn.id}
            onClick={() => onNavigate(btn.screen)}
            className={`${btn.containerBg} rounded-[20px] p-4 shadow-[0px_4px_16px_rgba(26,43,72,0.05)] flex flex-col items-center justify-center gap-2.5 hover:-translate-y-1 hover:shadow-md transition-all duration-200 active:scale-95 border ${btn.border} cursor-pointer group`}
          >
            <div
              className={`w-13 h-13 rounded-full ${btn.bgIcon} ${btn.textIcon} flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}
            >
              <span className="material-symbols-outlined text-[28px]">
                {btn.icon}
              </span>
            </div>
            <span
              className={`text-[13px] font-bold text-center tracking-tight ${
                btn.titleColor || 'text-[#031632]'
              }`}
            >
              {btn.title}
            </span>
          </button>
        ))}
      </section>

      {/* Learn Anti-Bullying Quick Pathway Banner */}
      <section
        id="home-learning-banner"
        onClick={() => onNavigate('learning')}
        className="bg-white rounded-[22px] p-4.5 border border-[#2dbcfe]/20 shadow-[0px_4px_20px_rgba(26,43,72,0.04)] flex items-center justify-between gap-4 cursor-pointer hover:shadow-md transition-all group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#edf4fc] text-[#00658d] flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
            <span className="material-symbols-outlined text-[26px]">
              menu_book
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00658d] bg-[#cae6ff]/50 px-2 py-0.5 rounded-md">
              Modul Edukasi
            </span>
            <h4 className="text-[15px] font-bold text-[#031632] mt-1">
              Belajar Anti-Bullying
            </h4>
            <p className="text-[12px] text-[#44474d] line-clamp-1">
              6 modul interaktif untuk kenali & cegah perundungan
            </p>
          </div>
        </div>
        <div className="w-9 h-9 rounded-full bg-[#edf4fc] flex items-center justify-center text-[#00658d] group-hover:translate-x-1 transition-transform shrink-0">
          <span className="material-symbols-outlined text-[18px]">
            arrow_forward
          </span>
        </div>
      </section>

      {/* Daily Challenge Card */}
      <section
        id="home-daily-challenge-card"
        className="glass-card rounded-[24px] p-5 shadow-[0px_8px_24px_rgba(26,43,72,0.07)] border border-white/90"
      >
        <div className="flex items-center gap-2 mb-3">
          <span
            className="material-symbols-outlined text-[#00658d] text-[20px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            local_fire_department
          </span>
          <h3 className="text-[12px] font-bold text-[#00658d] uppercase tracking-wider">
            TANTANGAN HARI INI
          </h3>
        </div>
        <p className="text-[16px] md:text-[17px] font-bold text-[#031632] mb-4 leading-relaxed">
          "Jika kamu melihat temanmu diejek di depan kelas, apa yang akan kamu lakukan?"
        </p>
        <button
          id="home-start-challenge-btn"
          onClick={() => onNavigate('quick_decision')}
          className="w-full gradient-btn text-white font-bold text-[14px] py-3.5 px-6 rounded-xl shadow-[0px_4px_14px_rgba(45,188,254,0.35)] hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">play_arrow</span>
          Mulai Tantangan
        </button>
      </section>

      {/* Safe Quote & Emergency Box */}
      <div className="p-4 rounded-2xl bg-[#edf4fc] border border-[#dce3eb] flex items-start gap-3">
        <span className="material-symbols-outlined text-[#00658d] shrink-0 mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>
          shield
        </span>
        <div className="text-[12px] text-[#44474d] leading-relaxed">
          <p className="font-semibold text-[#031632] mb-0.5">
            Ruang Aman Bersama SIGAP
          </p>
          Kamu selalu bisa bercerita secara rahasia kepada Guru BK atau hubungi Hotline Sahabat Anak (129).
        </div>
      </div>
    </div>
  );
};
