import React, { useState, useEffect } from 'react';
import { IncidentReport, UserProfile, ScreenType } from '../types';
import { supabase } from '../lib/supabase';

interface AdminDashboardProps {
  adminUser: UserProfile;
  reports: IncidentReport[];
  onUpdateReport: (updatedReport: IncidentReport) => void;
  onNavigate: (screen: ScreenType) => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  adminUser,
  reports,
  onUpdateReport,
  onNavigate,
  onLogout,
}) => {
  // State for filtering & searching
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('all');
  const [selectedRoleFilter, setSelectedRoleFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Selected Report for Management Modal
  const [activeReportModal, setActiveReportModal] = useState<IncidentReport | null>(null);
  const [modalStatus, setModalStatus] = useState<IncidentReport['status']>('Sedang Ditinjau');
  const [modalCounselorNotes, setModalCounselorNotes] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccessAlert, setSavedSuccessAlert] = useState(false);

  // Active view tab in admin panel
  const [adminTab, setAdminTab] = useState<'reports' | 'analytics' | 'users'>('reports');
  const [usersList, setUsersList] = useState<UserProfile[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  // Fetch users when tab is 'users'
  useEffect(() => {
    if (adminTab === 'users') {
      const fetchUsers = async () => {
        setIsLoadingUsers(true);
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('user_role', 'student')
          .order('points', { ascending: false });
          
        if (!error && data) {
          const mapped = data.map((d: any) => ({
            id: d.id,
            name: d.name,
            username: d.username,
            email: d.email,
            userRole: d.user_role,
            avatar: d.avatar,
            role: d.role,
            school: d.school,
            level: d.level,
            levelTitle: d.level_title,
            currentXp: d.current_xp,
            maxXp: d.max_xp,
            points: d.points,
            streakDays: d.streak_days,
            completedModules: d.completed_modules || [],
            completedGames: d.completed_games || [],
            completedSimulations: d.completed_simulations || [],
            earnedBadges: d.earned_badges || [],
          }));
          setUsersList(mapped);
        }
        setIsLoadingUsers(false);
      };
      fetchUsers();
    }
  }, [adminTab]);

  // Open detail modal
  const handleOpenModal = (report: IncidentReport) => {
    setActiveReportModal(report);
    setModalStatus(report.status);
    setModalCounselorNotes(report.counselorNotes || '');
    setSavedSuccessAlert(false);
  };

  // Save changes
  const handleSaveChanges = () => {
    if (!activeReportModal) return;
    setIsSaving(true);

    const updated: IncidentReport = {
      ...activeReportModal,
      status: modalStatus,
      counselorNotes: modalCounselorNotes.trim(),
    };

    setTimeout(() => {
      onUpdateReport(updated);
      setActiveReportModal(updated);
      setIsSaving(false);
      setSavedSuccessAlert(true);
      setTimeout(() => setSavedSuccessAlert(false), 2500);
    }, 300);
  };

  // Filtered reports
  const filteredReports = reports.filter((item) => {
    const matchesStatus =
      selectedStatusFilter === 'all' || item.status === selectedStatusFilter;
    const matchesRole =
      selectedRoleFilter === 'all' || item.role === selectedRoleFilter;
    const matchesSearch =
      searchQuery === '' ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.incidentType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesRole && matchesSearch;
  });

  // Calculate Statistics
  const totalReportsCount = reports.length;
  const pendingCount = reports.filter((r) => r.status === 'Sedang Ditinjau').length;
  const inProgressCount = reports.filter((r) => r.status === 'Dalam Penanganan').length;
  const resolvedCount = reports.filter((r) => r.status === 'Selesai').length;

  // Category counts for analytics
  const categoriesCount: { [key: string]: number } = {};
  reports.forEach((r) => {
    const cat = r.incidentType || 'Lainnya';
    categoriesCount[cat] = (categoriesCount[cat] || 0) + 1;
  });

  return (
    <div id="admin-dashboard-container" className="flex flex-col gap-6 pb-12">
      {/* Top Banner / Satgas Header */}
      <div className="bg-gradient-to-r from-[#004c6b] via-[#00658d] to-[#2dbcfe] rounded-[28px] p-6 text-white shadow-[0px_8px_30px_rgba(0,101,141,0.25)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Glow */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-4 z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border-2 border-white/80 shadow-md flex items-center justify-center text-white shrink-0">
            <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              admin_panel_settings
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wider uppercase border border-white/30">
                🛡️ Panel Satgas TPPK
              </span>
              <span className="text-white/80 text-[12px]">• {adminUser.school || 'SMP Harapan Bangsa'}</span>
            </div>
            <h1 className="text-[20px] md:text-[24px] font-black leading-tight mt-1">
              Admin
            </h1>
            <p className="text-[13px] text-white/90 font-medium">
              Satgas Anti-Bullying (TPPK)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 z-10 flex-wrap">
          <button
            id="admin-preview-student-btn"
            onClick={() => onNavigate('home')}
            className="px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold text-[13px] transition-all backdrop-blur-md border border-white/30 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">
              visibility
            </span>
            Pratinjau Siswa
          </button>

          <button
            id="admin-logout-btn"
            onClick={onLogout}
            className="px-4 py-2.5 rounded-xl bg-[#ba1a1a]/80 hover:bg-[#ba1a1a] text-white font-bold text-[13px] transition-all border border-white/20 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <span className="material-symbols-outlined text-[18px]">
              logout
            </span>
            Keluar
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="bg-white rounded-2xl p-4 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#e2e9f1] flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#edf4fc] text-[#00658d] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[26px]">
              folder_open
            </span>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#58606e]">Total Laporan</p>
            <h3 className="text-[22px] font-black text-[#031632]">
              {totalReportsCount}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#ffdad6]/60 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              error
            </span>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#ba1a1a]">Perlu Ditinjau</p>
            <h3 className="text-[22px] font-black text-[#ba1a1a]">
              {pendingCount}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#c6e7ff]/60 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#c6e7ff] text-[#00658d] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[26px]">
              pending_actions
            </span>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#00658d]">Dalam Penanganan</p>
            <h3 className="text-[22px] font-black text-[#00658d]">
              {inProgressCount}
            </h3>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#d2e8d4]/60 flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#d2e8d4] text-[#196b24] flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              task_alt
            </span>
          </div>
          <div>
            <p className="text-[12px] font-semibold text-[#196b24]">Kasus Selesai</p>
            <h3 className="text-[22px] font-black text-[#196b24]">
              {resolvedCount}
            </h3>
          </div>
        </div>
      </div>

      {/* Main Section Navigation Switcher */}
      <div className="flex items-center justify-between gap-3 border-b border-[#dce3eb] pb-3 overflow-x-auto hide-scrollbar">
        <div className="flex gap-2 min-w-max">
          <button
            id="tab-manage-reports"
            onClick={() => setAdminTab('reports')}
            className={`px-4 py-2 rounded-xl font-bold text-[13.5px] transition-all cursor-pointer flex items-center gap-2 ${
              adminTab === 'reports'
                ? 'bg-[#00658d] text-white shadow-sm'
                : 'bg-white text-[#58606e] hover:bg-[#edf4fc]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">assignment</span>
            Daftar Pengaduan Siswa ({filteredReports.length})
          </button>

          <button
            id="tab-admin-analytics"
            onClick={() => setAdminTab('analytics')}
            className={`px-4 py-2 rounded-xl font-bold text-[13.5px] transition-all cursor-pointer flex items-center gap-2 ${
              adminTab === 'analytics'
                ? 'bg-[#00658d] text-white shadow-sm'
                : 'bg-white text-[#58606e] hover:bg-[#edf4fc]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">insights</span>
            Statistik & Analisis Kasus
          </button>

          <button
            id="tab-admin-users"
            onClick={() => setAdminTab('users')}
            className={`px-4 py-2 rounded-xl font-bold text-[13.5px] transition-all cursor-pointer flex items-center gap-2 ${
              adminTab === 'users'
                ? 'bg-[#00658d] text-white shadow-sm'
                : 'bg-white text-[#58606e] hover:bg-[#edf4fc]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">group</span>
            Aktivitas Siswa
          </button>
        </div>
      </div>

      {/* VIEW 1: REPORTS LIST & MANAGEMENT */}
      {adminTab === 'reports' && (
        <div className="space-y-4">
          {/* Filters and Search toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-[#e2e9f1] shadow-[0px_4px_20px_rgba(26,43,72,0.03)] flex flex-col md:flex-row gap-3 items-center justify-between">
            {/* Search Input */}
            <div className="w-full md:w-80 relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-[#75777e]">
                search
              </span>
              <input
                id="admin-search-reports-input"
                type="text"
                placeholder="Cari ID, jenis kejadian, lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-[13px] rounded-xl border border-[#dce3eb] bg-[#f6faff] focus:outline-none focus:border-[#2dbcfe] focus:bg-white"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex items-center gap-2.5 w-full md:w-auto flex-wrap">
              {/* Status Filter */}
              <div className="flex items-center gap-1.5 text-[12.5px]">
                <span className="font-semibold text-[#58606e]">Status:</span>
                <select
                  id="admin-status-filter-select"
                  value={selectedStatusFilter}
                  onChange={(e) => setSelectedStatusFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-[#dce3eb] bg-[#f6faff] text-[12.5px] font-bold text-[#031632] focus:outline-none"
                >
                  <option value="all">Semua Status</option>
                  <option value="Sedang Ditinjau">Sedang Ditinjau</option>
                  <option value="Dalam Penanganan">Dalam Penanganan</option>
                  <option value="Selesai">Selesai</option>
                </select>
              </div>

              {/* Role Filter */}
              <div className="flex items-center gap-1.5 text-[12.5px]">
                <span className="font-semibold text-[#58606e]">Pelapor:</span>
                <select
                  id="admin-role-filter-select"
                  value={selectedRoleFilter}
                  onChange={(e) => setSelectedRoleFilter(e.target.value)}
                  className="px-3 py-1.5 rounded-lg border border-[#dce3eb] bg-[#f6faff] text-[12.5px] font-bold text-[#031632] focus:outline-none"
                >
                  <option value="all">Semua Peran</option>
                  <option value="victim">Korban Langsung</option>
                  <option value="witness">Saksi Kejadian</option>
                  <option value="helper">Membantu Teman</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reports Grid/List */}
          {filteredReports.length === 0 ? (
            <div className="bg-white rounded-2xl p-10 text-center border border-[#e2e9f1]">
              <span className="material-symbols-outlined text-[48px] text-[#c5c6ce] mb-2">
                find_in_page
              </span>
              <p className="text-[15px] font-bold text-[#031632]">
                Tidak Ada Laporan yang Cocok
              </p>
              <p className="text-[13px] text-[#75777e] mt-1">
                Ubah kata kunci pencarian atau sesuaikan filter di atas.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredReports.map((report) => (
                <div
                  key={report.id}
                  className="bg-white rounded-[22px] p-5 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#dce3eb] hover:border-[#2dbcfe]/60 transition-all flex flex-col justify-between gap-3.5"
                >
                  {/* Top row */}
                  <div>
                    <div className="flex justify-between items-start gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold font-mono text-[#00658d] bg-[#d7e2ff] px-2.5 py-0.5 rounded-md">
                          {report.id}
                        </span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#edf4fc] text-[#44474d]">
                          {report.role === 'victim' ? '👤 Korban' : report.role === 'witness' ? '👁️ Saksi' : '🤝 Bantu Teman'}
                        </span>
                        {report.isAnonymous && (
                          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-[#333] text-white">
                            🕵️ Anonim
                          </span>
                        )}
                      </div>

                      <span
                        className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                          report.status === 'Selesai'
                            ? 'bg-[#d2e8d4] text-[#196b24]'
                            : report.status === 'Dalam Penanganan'
                            ? 'bg-[#c6e7ff] text-[#00658d]'
                            : 'bg-[#ffdad6] text-[#ba1a1a]'
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>

                    <h3 className="text-[16px] font-bold text-[#031632] mt-2.5">
                      {report.incidentType}
                    </h3>

                    <p className="text-[13px] text-[#44474d] bg-[#f6faff] p-3 rounded-xl mt-2 line-clamp-3">
                      "{report.description}"
                    </p>
                  </div>

                  {/* Metadata & Counselor note preview */}
                  <div className="space-y-2 pt-1 border-t border-[#f0f4f9]">
                    <div className="flex items-center justify-between text-[11.5px] text-[#75777e]">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">location_on</span>
                        {report.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[15px]">schedule</span>
                        {report.datetime || report.createdAt}
                      </span>
                    </div>

                    {report.counselorNotes && (
                      <div className="p-2.5 bg-[#edf4fc] rounded-lg text-[11.5px] text-[#00658d] border border-[#2dbcfe]/20 line-clamp-2">
                        <span className="font-bold block">Tindak Lanjut Satgas:</span>
                        {report.counselorNotes}
                      </div>
                    )}

                    {/* Action Button */}
                    <button
                      id={`btn-manage-report-${report.id}`}
                      onClick={() => handleOpenModal(report)}
                      className="w-full py-2.5 rounded-xl bg-[#00658d] hover:bg-[#004c6b] text-white font-bold text-[13px] flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        edit_document
                      </span>
                      Tinjau & Tindak Lanjut
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: ANALYTICS & INSIGHTS */}
      {adminTab === 'analytics' && (
        <div className="space-y-5">
          <div className="bg-white p-6 rounded-[24px] border border-[#e2e9f1] shadow-[0px_4px_20px_rgba(26,43,72,0.05)]">
            <h2 className="text-[17px] font-bold text-[#031632] flex items-center gap-2 mb-1">
              <span className="material-symbols-outlined text-[#00658d]">bar_chart</span>
              Distribusi Kategori Perundungan
            </h2>
            <p className="text-[13px] text-[#58606e] mb-6">
              Data laporan yang masuk ke sistem SIGAP untuk pemetaan intervensi preventif sekolah.
            </p>

            <div className="space-y-4">
              {Object.entries(categoriesCount).map(([category, count]) => {
                const percent = Math.round((count / (totalReportsCount || 1)) * 100);
                return (
                  <div key={category} className="space-y-1.5">
                    <div className="flex justify-between text-[13px] font-bold">
                      <span className="text-[#031632]">{category}</span>
                      <span className="text-[#00658d]">{count} Kasus ({percent}%)</span>
                    </div>
                    <div className="h-3 bg-[#edf4fc] rounded-full overflow-hidden">
                      <div
                        className="h-full gradient-bg rounded-full transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-[22px] border border-[#e2e9f1] shadow-xs">
              <h3 className="text-[15px] font-bold text-[#031632] mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#196b24]">check_circle</span>
                Tingkat Penyelesaian
              </h3>
              <p className="text-[13px] text-[#58606e] mb-4">
                Persentase kasus yang telah diselesaikan oleh tim konselor BK.
              </p>
              <div className="text-[32px] font-black text-[#196b24]">
                {Math.round((resolvedCount / (totalReportsCount || 1)) * 100)}%
              </div>
              <p className="text-[12px] text-[#75777e] mt-1">
                {resolvedCount} dari {totalReportsCount} laporan terselesaikan secara damai.
              </p>
            </div>

            <div className="bg-white p-5 rounded-[22px] border border-[#e2e9f1] shadow-xs">
              <h3 className="text-[15px] font-bold text-[#031632] mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00658d]">support</span>
                Protokol Penanganan Cepat
              </h3>
              <p className="text-[12.5px] text-[#44474d] leading-relaxed">
                1. <strong>Identifikasi Bukti:</strong> Periksa lampiran & kronologi.<br />
                2. <strong>Mediasi Tertutup:</strong> Panggil pihak terkait tanpa membuka identitas pelapor anonim.<br />
                3. <strong>Perbarui Status:</strong> Tulis catatan tindak lanjut agar korban/wali murid merasa aman.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: USERS LIST & ACTIVITY */}
      {adminTab === 'users' && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-[20px] border border-[#e2e9f1] shadow-[0px_4px_20px_rgba(26,43,72,0.03)] flex flex-col md:flex-row gap-3 justify-between items-center">
            <div>
              <h2 className="text-[16px] font-bold text-[#031632] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#00658d]">group</span>
                Daftar Aktivitas Siswa
              </h2>
              <p className="text-[13px] text-[#58606e] mt-1">
                Pantau perkembangan XP, poin, lencana, dan partisipasi edukasi siswa di platform.
              </p>
            </div>
            <div className="text-[12.5px] font-bold text-[#00658d] bg-[#edf4fc] px-4 py-2 rounded-xl border border-[#c6e7ff] whitespace-nowrap">
              Total: {usersList.length} Siswa Terdaftar
            </div>
          </div>
          
          {isLoadingUsers ? (
            <div className="flex justify-center items-center p-12 bg-white rounded-[22px] border border-[#e2e9f1]">
              <div className="flex flex-col items-center gap-3">
                <span className="inline-block w-8 h-8 border-[3px] border-[#2dbcfe] border-t-transparent rounded-full animate-spin"></span>
                <span className="text-[13px] font-bold text-[#58606e]">Memuat data siswa...</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {usersList.length === 0 ? (
                <div className="col-span-full bg-white rounded-2xl p-10 text-center border border-[#e2e9f1]">
                  <span className="material-symbols-outlined text-[48px] text-[#c5c6ce] mb-2">group_off</span>
                  <p className="text-[15px] font-bold text-[#031632]">Belum Ada Data Siswa</p>
                </div>
              ) : usersList.map(u => (
                <div key={u.id} className="bg-white rounded-[22px] p-5 border border-[#e2e9f1] shadow-[0px_4px_20px_rgba(26,43,72,0.02)] hover:border-[#2dbcfe]/50 hover:shadow-md transition-all flex flex-col gap-4 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#2dbcfe]/10 to-transparent rounded-bl-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-center gap-3.5 border-b border-[#f0f4f9] pb-4">
                    <div className="relative">
                      <img src={u.avatar} alt="avatar" className="w-[52px] h-[52px] rounded-[16px] bg-[#f6faff] border border-[#dce3eb] shadow-sm object-cover" />
                      <div className="absolute -bottom-2 -right-2 bg-[#031632] text-white text-[10px] font-black px-1.5 py-0.5 rounded-md border border-white/20 shadow-sm">
                        Lvl {u.level}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-[15.5px] font-bold text-[#031632] leading-tight">{u.name}</h3>
                      <p className="text-[12.5px] text-[#58606e] font-medium mt-0.5">@{u.username}</p>
                    </div>
                    <div className="ml-auto text-right bg-[#edf4fc] p-2.5 rounded-xl border border-[#dce3eb]">
                      <div className="text-[18px] font-black text-[#00658d] leading-none mb-1">{u.points}</div>
                      <div className="text-[10px] font-black text-[#58606e] uppercase tracking-wider">XP Poin</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2.5 text-[12.5px]">
                    <div className="bg-[#f6faff] p-3 rounded-xl border border-[#e8eff7] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#00658d]">workspace_premium</span>
                      <div>
                        <span className="block text-[#75777e] text-[10.5px] font-bold mb-0.5 leading-none">Rank Status</span>
                        <span className="font-bold text-[#031632] leading-none block">{u.levelTitle}</span>
                      </div>
                    </div>
                    <div className="bg-[#f6faff] p-3 rounded-xl border border-[#e8eff7] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#f59e0b]">military_tech</span>
                      <div>
                        <span className="block text-[#75777e] text-[10.5px] font-bold mb-0.5 leading-none">Total Lencana</span>
                        <span className="font-bold text-[#031632] leading-none block">{u.earnedBadges?.length || 0} Terkumpul</span>
                      </div>
                    </div>
                    <div className="bg-[#f6faff] p-3 rounded-xl border border-[#e8eff7] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#10b981]">menu_book</span>
                      <div>
                        <span className="block text-[#75777e] text-[10.5px] font-bold mb-0.5 leading-none">Modul Selesai</span>
                        <span className="font-bold text-[#031632] leading-none block">{u.completedModules?.length || 0} Materi</span>
                      </div>
                    </div>
                    <div className="bg-[#f6faff] p-3 rounded-xl border border-[#e8eff7] flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#8b5cf6]">sports_esports</span>
                      <div>
                        <span className="block text-[#75777e] text-[10.5px] font-bold mb-0.5 leading-none">Misi & Simulasi</span>
                        <span className="font-bold text-[#031632] leading-none block">{(u.completedGames?.length || 0) + (u.completedSimulations?.length || 0)} Misi</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* DETAIL & MANAGEMENT MODAL */}
      {activeReportModal && (
        <div
          id="admin-report-detail-modal"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div className="bg-white rounded-[28px] max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-white/80 space-y-5 my-auto max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-start border-b border-[#e2e9f1] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-bold font-mono text-[#00658d] bg-[#d7e2ff] px-2.5 py-1 rounded-md">
                    {activeReportModal.id}
                  </span>
                  <span className="text-[12px] font-bold px-2 py-0.5 rounded-md bg-[#edf4fc] text-[#44474d]">
                    Peran: {activeReportModal.role === 'victim' ? 'Korban' : activeReportModal.role === 'witness' ? 'Saksi' : 'Membantu Teman'}
                  </span>
                </div>
                <h2 className="text-[20px] font-bold text-[#031632] mt-1.5">
                  {activeReportModal.incidentType}
                </h2>
              </div>
              <button
                onClick={() => setActiveReportModal(null)}
                className="w-9 h-9 rounded-full bg-[#edf4fc] text-[#58606e] hover:bg-[#e2e9f1] flex items-center justify-center cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Success alert */}
            {savedSuccessAlert && (
              <div className="p-3 bg-[#d2e8d4] text-[#196b24] rounded-xl text-[13px] font-bold flex items-center gap-2 animate-bounce">
                <span className="material-symbols-outlined text-[18px]">check_circle</span>
                Pembaruan status laporan dan catatan berhasil disimpan!
              </div>
            )}

            {/* Case Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-[13px] bg-[#f6faff] p-4 rounded-2xl border border-[#e8eff7]">
              <div>
                <span className="text-[#75777e] block text-[11px] font-semibold">Waktu Kejadian</span>
                <span className="font-bold text-[#031632]">{activeReportModal.datetime || activeReportModal.createdAt}</span>
              </div>
              <div>
                <span className="text-[#75777e] block text-[11px] font-semibold">Lokasi Kejadian</span>
                <span className="font-bold text-[#031632]">{activeReportModal.location}</span>
              </div>
              <div>
                <span className="text-[#75777e] block text-[11px] font-semibold">Status Privasi</span>
                <span className="font-bold text-[#031632]">
                  {activeReportModal.isAnonymous ? '🕵️ Pelapor Anonim' : '👤 Identitas Terbuka'}
                </span>
              </div>
              <div>
                <span className="text-[#75777e] block text-[11px] font-semibold">Dibuat Pada</span>
                <span className="font-bold text-[#031632]">{activeReportModal.createdAt}</span>
              </div>
            </div>

            {/* Kronologi */}
            <div>
              <h4 className="text-[13px] font-bold text-[#031632] mb-1">
                Kronologi Kejadian:
              </h4>
              <div className="p-4 bg-[#f6faff] rounded-xl text-[13.5px] text-[#333] leading-relaxed border border-[#e8eff7]">
                {activeReportModal.description}
              </div>
            </div>

            {/* Attachment preview if any */}
            {activeReportModal.hasAttachment && (
              <div>
                <h4 className="text-[13px] font-bold text-[#031632] mb-1.5 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#00658d]">attach_file</span>
                  Bukti Lampiran Foto / Tangkapan Layar:
                </h4>
                {activeReportModal.fileBase64 ? (
                  <div className="rounded-xl overflow-hidden border border-[#dce3eb] max-h-64 max-w-md bg-black/5 flex items-center justify-center">
                    <img
                      src={activeReportModal.fileBase64}
                      alt="Bukti Lampiran"
                      className="max-h-64 w-auto object-contain"
                    />
                  </div>
                ) : (
                  <p className="text-[12px] text-[#75777e] italic">
                    File: {activeReportModal.fileName || 'attachment.png'} (Tersimpan di server)
                  </p>
                )}
              </div>
            )}

            {/* Management Controls: Status & Counselor Notes */}
            <div className="space-y-3 pt-2 border-t border-[#e2e9f1]">
              <div>
                <label className="block text-[13px] font-bold text-[#031632] mb-1.5">
                  Ubah Status Tindak Lanjut:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Sedang Ditinjau', 'Dalam Penanganan', 'Selesai'] as IncidentReport['status'][]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setModalStatus(st)}
                      className={`py-2 px-3 rounded-xl text-[12.5px] font-bold border transition-all cursor-pointer ${
                        modalStatus === st
                          ? st === 'Selesai'
                            ? 'bg-[#d2e8d4] text-[#196b24] border-[#196b24]'
                            : st === 'Dalam Penanganan'
                            ? 'bg-[#c6e7ff] text-[#00658d] border-[#00658d]'
                            : 'bg-[#ffdad6] text-[#ba1a1a] border-[#ba1a1a]'
                          : 'bg-[#f6faff] text-[#58606e] border-[#dce3eb]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[13px] font-bold text-[#031632] mb-1">
                  Catatan Satgas TPPK / Guru BK:
                </label>
                <textarea
                  id="admin-counselor-notes-input"
                  rows={3}
                  value={modalCounselorNotes}
                  onChange={(e) => setModalCounselorNotes(e.target.value)}
                  placeholder="Tuliskan catatan tindak lanjut, rencana mediasi, atau hasil penanganan kasus yang dapat dipantau oleh pelapor..."
                  className="w-full p-3 text-[13px] rounded-xl border border-[#dce3eb] bg-[#f6faff] text-[#031632] focus:outline-none focus:border-[#2dbcfe] focus:bg-white resize-none"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setActiveReportModal(null)}
                className="px-4 py-2.5 rounded-xl border border-[#dce3eb] text-[#58606e] font-bold text-[13px] hover:bg-[#f0f4f9] cursor-pointer"
              >
                Tutup
              </button>
              <button
                id="admin-save-report-btn"
                type="button"
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="px-6 py-2.5 rounded-xl bg-[#00658d] hover:bg-[#004c6b] text-white font-bold text-[13px] flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
              >
                {isSaving ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    Simpan Pembaruan
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
