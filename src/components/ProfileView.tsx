import React, { useState } from 'react';
import { UserProfile, ScreenType } from '../types';
import { BADGES_LIST } from '../data/mockData';

interface ProfileViewProps {
  user: UserProfile;
  onNavigate: (screen: ScreenType) => void;
  onUpdateProfile?: (updates: Partial<UserProfile>) => void;
  onLogout?: () => void;
  onSwitchAccount?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onNavigate,
  onUpdateProfile,
  onLogout,
  onSwitchAccount,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editRole, setEditRole] = useState(user.role);
  const [editSchool, setEditSchool] = useState(user.school);

  const xpPercent = Math.round((user.currentXp / (user.maxXp || 350)) * 100);

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
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold mb-2 bg-[#edf4fc] text-[#00658d] border border-[#dce3eb]">
              <span className="material-symbols-outlined text-[15px]">
                {user.userRole === 'admin' ? 'admin_panel_settings' : 'school'}
              </span>
              <span>{user.userRole === 'admin' ? 'Akun Satgas / Admin' : 'Akun Siswa'}</span>
            </div>
            <h1 className="text-[20px] font-extrabold text-[#031632]">
              {user.name}
            </h1>
            <p className="text-[13px] font-semibold text-[#00658d] mb-0.5">
              {user.role} • {user.school}
            </p>
          </>
        )}

        {/* Level / XP info if student */}
        {user.userRole !== 'admin' ? (
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
        ) : (
          <div className="mt-5 p-4 rounded-2xl bg-[#edf4fc] border border-[#2dbcfe]/30 flex items-center justify-between">
            <div className="text-left">
              <span className="text-[11px] font-bold text-[#00658d] block">STATUS SATGAS</span>
              <p className="text-[13px] font-bold text-[#031632]">Aktif & Memiliki Akses Penuh</p>
            </div>
            <button
              onClick={() => onNavigate('admin_dashboard')}
              className="px-3 py-1.5 rounded-xl bg-[#00658d] text-white text-[12px] font-bold flex items-center gap-1 shadow-xs cursor-pointer hover:bg-[#004c6b]"
            >
              <span className="material-symbols-outlined text-[16px]">dashboard</span>
              Buka Panel
            </button>
          </div>
        )}
      </div>

      {/* Badges Section for students */}
      {user.userRole !== 'admin' && (
        <div className="bg-white rounded-[24px] p-5 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#e8eff7]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[15px] font-bold text-[#031632] flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00658d]">
                military_tech
              </span>
              Lencana Saya ({user.earnedBadges?.length || 0}/{BADGES_LIST.length})
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
              const isEarned = user.earnedBadges?.includes(badge.id);
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
      )}

      {/* Account Settings & Quick Navigation */}
      <div className="bg-white rounded-[24px] p-5 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#e8eff7] space-y-3">
        <h3 className="text-[14px] font-bold text-[#031632] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00658d]">manage_accounts</span>
          Pengaturan Akun & Akses
        </h3>

        <div className="space-y-2">
          {user.userRole === 'admin' ? (
            <button
              onClick={() => onNavigate('admin_dashboard')}
              className="w-full p-3 rounded-xl bg-[#f6faff] hover:bg-[#edf4fc] border border-[#dce3eb] flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#00658d] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#031632]">Panel Pengaduan & Laporan Satgas</p>
                  <p className="text-[11px] text-[#75777e]">Kelola dan tindak lanjuti laporan siswa</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#75777e]">chevron_right</span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('report_status')}
              className="w-full p-3 rounded-xl bg-[#f6faff] hover:bg-[#edf4fc] border border-[#dce3eb] flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2dbcfe] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">assignment_turned_in</span>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#031632]">Riwayat Laporan Saya</p>
                  <p className="text-[11px] text-[#75777e]">Pantau respons dari guru BK & Satgas</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#75777e]">chevron_right</span>
            </button>
          )}

          {onSwitchAccount && (
            <button
              onClick={onSwitchAccount}
              className="w-full p-3 rounded-xl bg-[#f6faff] hover:bg-[#edf4fc] border border-[#dce3eb] flex items-center justify-between text-left transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#58606e] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">switch_account</span>
                </div>
                <div>
                  <p className="text-[13px] font-bold text-[#031632]">Ganti Peran / Akun</p>
                  <p className="text-[11px] text-[#75777e]">Masuk dengan akun Siswa atau Admin lain</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px] text-[#75777e]">chevron_right</span>
            </button>
          )}

          {onLogout && (
            <button
              onClick={onLogout}
              className="w-full p-3 rounded-xl bg-[#fff5f5] hover:bg-[#ffdad6] border border-[#ffdad6] flex items-center justify-between text-left transition-colors cursor-pointer text-[#ba1a1a]"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#ba1a1a] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                </div>
                <div>
                  <p className="text-[13px] font-bold">Keluar dari Akun (Logout)</p>
                  <p className="text-[11px] text-[#ba1a1a]/80">Akhiri sesi di perangkat ini</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
          )}
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
              className="px-3 py-1.5 rounded-lg bg-[#c6e7ff] text-[#004c6b] font-bold text-[12px] flex items-center gap-1 cursor-pointer"
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
