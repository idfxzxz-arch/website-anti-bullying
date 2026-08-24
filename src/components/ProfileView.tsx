import React, { useState } from 'react';
import { UserProfile, ScreenType } from '../types';
import { BADGES_LIST } from '../data/mockData';

interface ProfileViewProps {
  user: UserProfile;
  onNavigate: (screen: ScreenType) => void;
  onUpdateProfile?: (updates: Partial<UserProfile>) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onNavigate,
  onUpdateProfile,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editRole, setEditRole] = useState(user.role);
  const [editSchool, setEditSchool] = useState(user.school);

  const xpPercent = Math.round((user.currentXp / user.maxXp) * 100);

  const handleSave = () => {
    if (onUpdateProfile) {
      onUpdateProfile({
        name: editName,
        role: editRole,
        school: editSchool,
      });
    }
    setIsEditing(false);
  };

  return (
    <div id="profile-view-screen" className="flex flex-col gap-5 pb-8">
      {/* Profile Header Card */}
      <div className="bg-white rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#2dbcfe]/20 text-center relative overflow-hidden">
        {onUpdateProfile && (
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="absolute top-4 right-4 p-2 bg-[#f6faff] hover:bg-[#e8eff7] text-[#00658d] rounded-full transition-colors z-10 flex items-center justify-center cursor-pointer shadow-sm border border-[#dce3eb]"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isEditing ? 'check' : 'edit'}
            </span>
          </button>
        )}

        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-4 border-[#2dbcfe] shadow-md relative">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>

        {isEditing ? (
          <div className="space-y-3 mt-4 text-left max-w-sm mx-auto">
            <div>
              <label className="text-[12px] font-bold text-[#44474d] ml-1">Nama Lengkap</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-[#dce3eb] rounded-xl text-[14px] focus:outline-none focus:border-[#2dbcfe] bg-[#f6faff]"
              />
            </div>
            <div>
              <label className="text-[12px] font-bold text-[#44474d] ml-1">Peran / Kelas</label>
              <input
                type="text"
                value={editRole}
                onChange={(e) => setEditRole(e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-[#dce3eb] rounded-xl text-[14px] focus:outline-none focus:border-[#2dbcfe] bg-[#f6faff]"
              />
            </div>
            <div>
              <label className="text-[12px] font-bold text-[#44474d] ml-1">Asal Sekolah</label>
              <input
                type="text"
                value={editSchool}
                onChange={(e) => setEditSchool(e.target.value)}
                className="w-full px-4 py-2 mt-1 border border-[#dce3eb] rounded-xl text-[14px] focus:outline-none focus:border-[#2dbcfe] bg-[#f6faff]"
              />
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-[20px] font-extrabold text-[#031632]">
              {user.name}
            </h1>
            <p className="text-[13px] font-semibold text-[#00658d] mb-0.5">
              {user.role} • {user.school}
            </p>
          </>
        )}

        {/* Level / XP info */}
        <div className="mt-5 p-4 rounded-2xl bg-[#edf4fc] border border-[#dce3eb]">
          <div className="flex justify-between items-center mb-1.5 text-[12px] font-bold">
            <span className="text-[#00658d]">
              Level {user.level} ({user.levelTitle})
            </span>
            <span className="text-[#031632]">
              {user.currentXp}/{user.maxXp} XP
            </span>
          </div>
          <div className="h-2.5 bg-[#e2e9f1] rounded-full overflow-hidden">
            <div
              className="h-full gradient-bg rounded-full transition-all duration-500"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="bg-white rounded-[24px] p-5 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#e8eff7]">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-[15px] font-bold text-[#031632] flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#00658d]">
              military_tech
            </span>
            Lencana Saya ({user.earnedBadges.length}/{BADGES_LIST.length})
          </h3>
          <button
            onClick={() => onNavigate('game_hub')}
            className="text-[12px] font-bold text-[#00658d] hover:underline cursor-pointer"
          >
            Lihat Semua
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {BADGES_LIST.slice(0, 3).map((badge) => {
            const isEarned = user.earnedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1 ${
                  isEarned
                    ? 'bg-[#f6faff] border-[#2dbcfe]/40'
                    : 'bg-[#edf4fc]/40 border-dashed border-[#c5c6ce] opacity-50'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center ${
                    isEarned
                      ? 'bg-[#2dbcfe] text-white'
                      : 'bg-[#dce3eb] text-[#75777e]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {badge.icon}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#031632] truncate w-full">
                  {badge.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Emergency Hotlines Card */}
      <div className="bg-white rounded-[24px] p-5 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#ffdad6]">
        <div className="flex items-center gap-2 text-[#ba1a1a] mb-3">
          <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            emergency
          </span>
          <h3 className="text-[14px] font-bold uppercase tracking-wider">
            KONTAK DARURAT & BANTUAN
          </h3>
        </div>

        <div className="space-y-2.5 text-[13px]">
          <div className="p-3 rounded-xl bg-[#f6faff] border border-[#e8eff7] flex justify-between items-center">
            <div>
              <p className="font-bold text-[#031632]">Layanan SAPA 129</p>
              <p className="text-[11px] text-[#75777e]">KemenPPPA RI</p>
            </div>
            <a
              href="tel:129"
              className="px-3 py-1.5 rounded-lg bg-[#edf4fc] text-[#00658d] font-bold text-[12px] flex items-center gap-1 hover:bg-[#e2e9f1]"
            >
              <span className="material-symbols-outlined text-[16px]">call</span>
              129
            </a>
          </div>

          <div className="p-3 rounded-xl bg-[#f6faff] border border-[#e8eff7] flex justify-between items-center">
            <div>
              <p className="font-bold text-[#031632]">Guru BK & Konselor Sekolah</p>
              <p className="text-[11px] text-[#75777e]">Ruang BK Gedung A</p>
            </div>
            <button
              onClick={() => onNavigate('ai_chat')}
              className="px-3 py-1.5 rounded-lg bg-[#c6e7ff] text-[#004c6b] font-bold text-[12px] flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">chat</span>
              Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
