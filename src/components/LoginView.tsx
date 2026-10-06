import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { DEMO_ACCOUNTS, INITIAL_STUDENT_USER, INITIAL_ADMIN_USER } from '../data/mockData';
import { supabase } from '../lib/supabase';

interface LoginViewProps {
  onLoginSuccess: (user: UserProfile) => void;
  onOpenOnboarding?: () => void;
  onContinueAsGuest?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onOpenOnboarding,
  onContinueAsGuest,
}) => {
  const [activeRole, setActiveRole] = useState<UserRole>('student');
  const [isRegisterMode, setIsRegisterMode] = useState(false);

  // Form Fields
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [schoolName, setSchoolName] = useState('SMP Harapan Bangsa');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Switch role tab
  const handleSelectRole = (role: UserRole) => {
    setActiveRole(role);
    setErrorMessage(null);
    if (role === 'admin') {
      setIsRegisterMode(false);
      setUsernameOrEmail('admin');
      setPassword('admin123');
    } else {
      setUsernameOrEmail('siswa');
      setPassword('siswa123');
    }
  };

  // Quick Demo Login
  const handleQuickDemoLogin = async (role: UserRole) => {
    setIsLoading(true);
    setErrorMessage(null);
    
    try {
      const demoUsername = role === 'admin' ? 'admin' : 'siswa';
      const demoPassword = role === 'admin' ? 'admin123' : 'siswa123';
      
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', demoUsername)
        .eq('password', demoPassword)
        .single();
        
      if (!error && data) {
        const mappedUser: UserProfile = {
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email,
          userRole: data.user_role as UserRole,
          avatar: data.avatar,
          role: data.role,
          school: data.school,
          adminTitle: data.admin_title,
          level: data.level,
          levelTitle: data.level_title,
          currentXp: data.current_xp,
          maxXp: data.max_xp,
          points: data.points,
          streakDays: data.streak_days,
          completedModules: data.completed_modules,
          completedGames: data.completed_games,
          completedSimulations: data.completed_simulations,
          earnedBadges: data.earned_badges,
        };
        onLoginSuccess(mappedUser);
      } else {
        alert("Gagal koneksi ke database Supabase: " + (error?.message || "User tidak ditemukan."));
        // Fallback to mock data if database is not set up
        if (role === 'admin') {
          onLoginSuccess(INITIAL_ADMIN_USER);
        } else {
          onLoginSuccess(INITIAL_STUDENT_USER);
        }
      }
    } catch (err: any) {
      alert("Error: " + err.message);
      if (role === 'admin') onLoginSuccess(INITIAL_ADMIN_USER);
      else onLoginSuccess(INITIAL_STUDENT_USER);
    } finally {
      setIsLoading(false);
    }
  };

  // Submit Login/Register
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!usernameOrEmail.trim() || !password.trim()) {
      setErrorMessage('Harap isi username/email dan password.');
      return;
    }

    setIsLoading(true);

    try {
      if (isRegisterMode) {
        // Register new student
        const newStudentUser = {
          name: fullName.trim() || 'Siswa SIGAP Baru',
          username: usernameOrEmail.trim().toLowerCase(),
          email: usernameOrEmail.includes('@') ? usernameOrEmail.trim() : `${usernameOrEmail.trim()}@sigap.sch.id`,
          password: password, // In production, hash this!
          user_role: 'student',
          avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCLchvyawcVsmD3JoG55Xi8PzI-ebjb_bEvDq3sRaWh2_jW4YDBdRi4OKvSwKRzlUSVL6Vwxes_XK5IKUjsBXiDszygEjomD7eIkqryziVO-XFG0zr5487TEyPKCO7F8CynZZXeRQ6O08bmbhSKZmFAYwueCgX99-_tuXYjQcjL__47xVWShf0wuYAaqmhH9O1Du7qFa3zemT8DCnmloLVFbW3jnsT6GTw3Qet5v5XZ-FGIf1_rig',
          role: 'Siswa Baru',
          school: schoolName.trim() || 'SMP Harapan Bangsa',
          level: 1,
          level_title: 'Observer',
          current_xp: 0,
          max_xp: 350,
          points: 0,
          streak_days: 1,
          completed_modules: [],
          completed_games: [],
          completed_simulations: [],
          earned_badges: [],
        };
        
        const { data, error } = await supabase
          .from('users')
          .insert([newStudentUser])
          .select()
          .single();
          
        if (error) throw error;
        
        // Map snake_case to camelCase
        const mappedUser: UserProfile = {
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email,
          userRole: data.user_role as UserRole,
          avatar: data.avatar,
          role: data.role,
          school: data.school,
          adminTitle: data.admin_title,
          level: data.level,
          levelTitle: data.level_title,
          currentXp: data.current_xp,
          maxXp: data.max_xp,
          points: data.points,
          streakDays: data.streak_days,
          completedModules: data.completed_modules,
          completedGames: data.completed_games,
          completedSimulations: data.completed_simulations,
          earnedBadges: data.earned_badges,
        };
        
        onLoginSuccess(mappedUser);
        setIsLoading(false);
        return;
      }

      // Login
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .or(`username.eq.${usernameOrEmail.trim()},email.eq.${usernameOrEmail.trim()}`)
        .eq('password', password)
        .eq('user_role', activeRole)
        .single();
        
      if (error || !data) {
         // Fallback to demo check for easy testing if no supabase connection yet
         const matched = DEMO_ACCOUNTS.find(
          (acc) =>
            acc.role === activeRole &&
            (acc.username.toLowerCase() === usernameOrEmail.trim().toLowerCase() ||
              acc.email.toLowerCase() === usernameOrEmail.trim().toLowerCase()) &&
            acc.password === password
         );
  
         if (matched) {
           onLoginSuccess(matched.user);
         } else {
            setErrorMessage('Kredensial tidak valid. Silakan periksa kembali.');
         }
      } else {
        const mappedUser: UserProfile = {
          id: data.id,
          name: data.name,
          username: data.username,
          email: data.email,
          userRole: data.user_role as UserRole,
          avatar: data.avatar,
          role: data.role,
          school: data.school,
          adminTitle: data.admin_title,
          level: data.level,
          levelTitle: data.level_title,
          currentXp: data.current_xp,
          maxXp: data.max_xp,
          points: data.points,
          streakDays: data.streak_days,
          completedModules: data.completed_modules,
          completedGames: data.completed_games,
          completedSimulations: data.completed_simulations,
          earnedBadges: data.earned_badges,
        };
        onLoginSuccess(mappedUser);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || 'Terjadi kesalahan saat login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="login-screen"
      className="min-h-screen bg-[#F0F7FF] flex items-center justify-center p-4 sm:p-6 selection:bg-[#2dbcfe] selection:text-white relative overflow-hidden"
    >
      {/* Decorative ambient background blur lights */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#2dbcfe]/20 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 bg-[#00658d]/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-80 h-80 bg-[#c6e7ff]/30 rounded-full blur-[100px] pointer-events-none" />

      <main className="w-full max-w-[460px] md:max-w-[500px] bg-white/90 backdrop-blur-2xl rounded-[32px] shadow-[0px_16px_48px_rgba(26,43,72,0.1)] border border-white/80 p-6 sm:p-8 relative z-10 flex flex-col gap-5">
        
        {/* Logo and Brand Header */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00658d] to-[#2dbcfe] flex items-center justify-center text-white mx-auto shadow-[0px_6px_20px_rgba(45,188,254,0.4)] mb-3">
            <span className="material-symbols-outlined text-[30px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              shield_person
            </span>
          </div>
          <h1 className="text-[26px] font-black text-[#031632] tracking-tight">
            SIGAP Portal
          </h1>
          <p className="text-[13px] text-[#44474d] font-medium mt-0.5">
            Sistem Informasi & Edukasi Anti-Bullying Sekolah
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="bg-[#edf4fc] p-1.5 rounded-2xl flex gap-1.5 border border-[#dce3eb]">
          <button
            id="role-tab-student"
            type="button"
            onClick={() => handleSelectRole('student')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeRole === 'student'
                ? 'bg-white text-[#00658d] shadow-[0px_2px_8px_rgba(26,43,72,0.08)] border border-white'
                : 'text-[#58606e] hover:text-[#031632]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              school
            </span>
            Siswa / Pelajar
          </button>

          <button
            id="role-tab-admin"
            type="button"
            onClick={() => handleSelectRole('admin')}
            className={`flex-1 py-2.5 px-3 rounded-xl text-[13px] font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeRole === 'admin'
                ? 'bg-[#00658d] text-white shadow-[0px_4px_12px_rgba(0,101,141,0.3)]'
                : 'text-[#58606e] hover:text-[#031632]'
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              admin_panel_settings
            </span>
            Admin / Satgas BK
          </button>
        </div>

        {/* Quick Demo Login Preset Banner */}
        <div className="p-3.5 rounded-2xl bg-[#edf4fc]/80 border border-[#2dbcfe]/30 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 text-left w-full sm:w-auto">
            <div className="w-8 h-8 rounded-full bg-[#2dbcfe]/20 text-[#00658d] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </div>
            <div>
              <p className="text-[12px] font-bold text-[#031632]">
                Masuk Cepat Demo {activeRole === 'admin' ? 'Admin' : 'Siswa'}
              </p>
              <p className="text-[11px] text-[#44474d] font-mono">
                {activeRole === 'admin' ? 'admin / admin123' : 'siswa / siswa123'}
              </p>
            </div>
          </div>
          <button
            id="quick-demo-login-btn"
            type="button"
            onClick={() => handleQuickDemoLogin(activeRole)}
            disabled={isLoading}
            className="w-full sm:w-auto text-[12px] font-bold bg-[#2dbcfe] hover:bg-[#00658d] text-white px-3.5 py-2 rounded-xl transition-colors shrink-0 flex items-center justify-center gap-1 shadow-xs cursor-pointer"
          >
            Masuk Instan
            <span className="material-symbols-outlined text-[16px]">login</span>
          </button>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="p-3 bg-[#ffdad6]/80 border border-[#ba1a1a]/30 rounded-xl text-[#ba1a1a] text-[12.5px] font-semibold flex items-center gap-2 animate-shake">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegisterMode && activeRole === 'student' && (
            <>
              <div>
                <label className="block text-[12px] font-bold text-[#031632] mb-1">
                  Nama Lengkap Siswa
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-[#75777e]">
                    badge
                  </span>
                  <input
                    id="register-fullname-input"
                    type="text"
                    required
                    placeholder="Contoh: Budi Pratama"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#dce3eb] bg-[#f6faff] text-[13.5px] text-[#031632] placeholder-[#8a92a0] focus:outline-none focus:border-[#2dbcfe] focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-[#031632] mb-1">
                  Nama Sekolah
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-[#75777e]">
                    apartment
                  </span>
                  <input
                    id="register-school-input"
                    type="text"
                    placeholder="Contoh: SMP Harapan Bangsa"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#dce3eb] bg-[#f6faff] text-[13.5px] text-[#031632] placeholder-[#8a92a0] focus:outline-none focus:border-[#2dbcfe] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-[12px] font-bold text-[#031632] mb-1">
              {isRegisterMode ? 'Username / NISN' : activeRole === 'admin' ? 'Username Admin / Email' : 'Username / Email Siswa'}
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-[#75777e]">
                person
              </span>
              <input
                id="login-username-input"
                type="text"
                required
                placeholder={activeRole === 'admin' ? 'admin' : 'siswa'}
                value={usernameOrEmail}
                onChange={(e) => setUsernameOrEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#dce3eb] bg-[#f6faff] text-[13.5px] text-[#031632] placeholder-[#8a92a0] focus:outline-none focus:border-[#2dbcfe] focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[12px] font-bold text-[#031632] mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-[#75777e]">
                lock
              </span>
              <input
                id="login-password-input"
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-2.5 rounded-xl border border-[#dce3eb] bg-[#f6faff] text-[13.5px] text-[#031632] placeholder-[#8a92a0] focus:outline-none focus:border-[#2dbcfe] focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#75777e] hover:text-[#031632] cursor-pointer"
                aria-label="Toggle password"
              >
                <span className="material-symbols-outlined text-[19px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Action Button */}
          <button
            id="login-submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-xl font-bold text-[14.5px] text-white gradient-btn flex items-center justify-center gap-2 cursor-pointer shadow-md active:scale-98 transition-all mt-2"
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>{isRegisterMode ? 'Daftar Akun Baru' : `Masuk sebagai ${activeRole === 'admin' ? 'Admin' : 'Siswa'}`}</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </>
            )}
          </button>
        </form>

        {/* Register / Mode Switch for Student */}
        {activeRole === 'student' ? (
          <div className="text-center pt-1 border-t border-[#e2e9f1]">
            <p className="text-[12.5px] text-[#58606e]">
              {isRegisterMode ? 'Sudah punya akun?' : 'Belum memiliki akun siswa?'}
              <button
                id="toggle-register-btn"
                type="button"
                onClick={() => {
                  setIsRegisterMode(!isRegisterMode);
                  setErrorMessage(null);
                }}
                className="ml-1.5 font-bold text-[#00658d] hover:underline cursor-pointer"
              >
                {isRegisterMode ? 'Masuk di sini' : 'Daftar Sekarang'}
              </button>
            </p>
          </div>
        ) : (
          <div className="text-center pt-1 border-t border-[#e2e9f1]">
            <p className="text-[11.5px] text-[#58606e]">
              Akses khusus Satgas Anti-Bullying (TPPK) & Guru Bimbingan Konseling Sekolah.
            </p>
          </div>
        )}

        {/* Onboarding Guide Link */}
        {onOpenOnboarding && (
          <div className="text-center pt-0.5">
            <button
              id="btn-view-onboarding"
              type="button"
              onClick={onOpenOnboarding}
              className="text-[12px] font-semibold text-[#00658d] hover:text-[#031632] hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">menu_book</span>
              Lihat Panduan & Pengenalan SIGAP
            </button>
          </div>
        )}

        {/* Security badge footer */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#75777e] mt-0.5">
          <span className="material-symbols-outlined text-[14px] text-[#00658d]" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified_user
          </span>
          <span>Data terlindungi dan terenkripsi aman • SIGAP 2026</span>
        </div>
      </main>
    </div>
  );
};
