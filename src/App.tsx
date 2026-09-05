import React, { useState, useEffect } from 'react';
import {
  ScreenType,
  TabType,
  UserProfile,
  LearningModule,
  IncidentReport,
} from './types';
import {
  INITIAL_USER,
  INITIAL_STUDENT_USER,
  INITIAL_ADMIN_USER,
  LEARNING_MODULES,
  INITIAL_REPORTS,
} from './data/mockData';

// Modular Components
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { SplashScreen } from './components/SplashScreen';
import { Onboarding } from './components/Onboarding';
import { LoginView } from './components/LoginView';
import { AdminDashboard } from './components/AdminDashboard';
import { HomeView } from './components/HomeView';
import { LearningHub } from './components/LearningHub';
import { LearningDetail } from './components/LearningDetail';
import { SimulationHub } from './components/SimulationHub';
import { SimulationScenario } from './components/SimulationScenario';
import { GameHub } from './components/GameHub';
import { AiChat } from './components/AiChat';
import { SituationCheck } from './components/SituationCheck';
import { SafeReport } from './components/SafeReport';
import { ReportSuccess } from './components/ReportSuccess';
import { ReportStatus } from './components/ReportStatus';
import { TemanSigap } from './components/TemanSigap';
import { ProfileView } from './components/ProfileView';
import { NotificationModal, addGlobalNotification } from './components/NotificationModal';
import { Sidebar } from './components/Sidebar';

const STORAGE_KEY_USER = 'sigap_auth_user_v2';
const STORAGE_KEY_REPORTS = 'sigap_reports_v2';

export function App() {
  // Navigation & Screen state (Defaults to 'login' for new users)
  const [currentScreen, setCurrentScreen] = useState<ScreenType>(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        return parsed.userRole === 'admin' ? 'admin_dashboard' : 'home';
      }
    } catch (e) {
      console.error('Failed to parse saved user from localStorage', e);
    }
    return 'login';
  });

  const [activeTab, setActiveTab] = useState<TabType>(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        return parsed.userRole === 'admin' ? 'admin' : 'home';
      }
    } catch {}
    return 'home';
  });
  
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Application Data States (with LocalStorage initializers)
  const [user, setUserState] = useState<UserProfile>(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUser) {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.error('Failed to parse saved user from localStorage', e);
    }
    return INITIAL_STUDENT_USER;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    try {
      return !!localStorage.getItem(STORAGE_KEY_USER);
    } catch {
      return false;
    }
  });

  const [modules, setModules] = useState<LearningModule[]>(LEARNING_MODULES);
  const [selectedModule, setSelectedModule] = useState<LearningModule | null>(null);
  
  const [reports, setReports] = useState<IncidentReport[]>(() => {
    try {
      const savedReports = localStorage.getItem(STORAGE_KEY_REPORTS);
      if (savedReports) {
        return JSON.parse(savedReports);
      }
    } catch (e) {
      console.error('Failed to parse saved reports from localStorage', e);
    }
    return INITIAL_REPORTS;
  });

  const [lastSubmittedReport, setLastSubmittedReport] = useState<IncidentReport | null>(null);

  // Active Simulation
  const [activeSimulationId, setActiveSimulationId] = useState<string>('');

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Persist user and reports whenever they change
  useEffect(() => {
    if (isLoggedIn && user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    }
  }, [user, isLoggedIn]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(reports));
  }, [reports]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const setUser = (updater: UserProfile | ((prev: UserProfile) => UserProfile)) => {
    setUserState((prev) => {
      const updated = typeof updater === 'function' ? updater(prev) : updater;
      return updated;
    });
  };

  const handleUpdateProfile = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
    showToast('Profil berhasil diperbarui!');
  };

  // Auth Handlers
  const handleLoginSuccess = (authenticatedUser: UserProfile) => {
    setUser(authenticatedUser);
    setIsLoggedIn(true);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(authenticatedUser));
    
    if (authenticatedUser.userRole === 'admin') {
      setCurrentScreen('admin_dashboard');
      setActiveTab('admin');
      showToast(`Selamat datang, ${authenticatedUser.name}! (Mode Admin Aktif)`);
      addGlobalNotification(
        'Sesi Admin Dimulai',
        `Masuk sebagai Satgas TPPK / Guru BK: ${authenticatedUser.name}.`,
        'admin_panel_settings',
        'bg-[#00658d] text-white'
      );
    } else {
      setCurrentScreen('home');
      setActiveTab('home');
      showToast(`Selamat datang, ${authenticatedUser.name}!`);
      addGlobalNotification(
        'Selamat Datang di SIGAP',
        'Aplikasi pelaporan & edukasi anti-bullying siap digunakan.',
        'shield',
        'bg-[#c6e7ff] text-[#00658d]'
      );
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY_USER);
    setIsLoggedIn(false);
    setUser(INITIAL_STUDENT_USER);
    setCurrentScreen('login');
    setActiveTab('home');
    showToast('Anda telah keluar dari akun.');
  };

  const handleSwitchAccount = () => {
    setCurrentScreen('login');
  };

  // Gamification & Progress Handlers
  const handleAddXp = (amount: number, reason: string) => {
    let newXp = user.currentXp + amount;
    let newLevel = user.level;
    let currentMaxXp = user.maxXp || 350; 
    let didLevelUp = false;

    while (newXp >= currentMaxXp) {
      newXp -= currentMaxXp;
      newLevel += 1;
      didLevelUp = true;
    }

    let newTitle = 'Observer';
    if (newLevel >= 2) newTitle = 'Supporter';
    if (newLevel >= 3) newTitle = 'Seeker';
    if (newLevel >= 5) newTitle = 'Defender';
    if (newLevel >= 7) newTitle = 'Guardian';
    if (newLevel >= 10) newTitle = 'SIGAP Hero';

    if (didLevelUp) {
      showToast(`🎉 Level Up! Kamu mencapai Level ${newLevel} (${newTitle})!`);
      addGlobalNotification(`Level Up: ${newLevel}!`, `Selamat! Kamu telah mencapai Rank ${newTitle}.`, 'grade', 'bg-[#c6e7ff] text-[#00658d]');
    } else {
      showToast(`+${amount} XP: ${reason}`);
    }

    setUser((prev) => ({
      ...prev,
      points: prev.points + amount,
      currentXp: newXp,
      maxXp: currentMaxXp,
      level: newLevel,
      levelTitle: newTitle,
    }));
  };

  const handleUnlockBadge = (badgeId: string) => {
    if (user.earnedBadges?.includes(badgeId)) return;
    
    showToast(`🏆 Lencana Baru Terbuka!`);
    addGlobalNotification(`Lencana Terbuka!`, `Selamat! Kamu telah mendapatkan lencana baru.`, 'military_tech', 'bg-[#d7e2ff] text-[#031632]');
    
    setUser((prev) => ({
      ...prev,
      earnedBadges: [...(prev.earnedBadges || []), badgeId],
    }));
  };

  const handleCompleteModule = (moduleId: number) => {
    if (user.completedModules?.includes(moduleId)) return;
    
    setModules((prev) =>
      prev.map((m) => (m.id === moduleId ? { ...m, progress: 100 } : m))
    );
    
    handleAddXp(50, 'Menyelesaikan Modul Belajar');
    handleUnlockBadge('first_steps');
    addGlobalNotification('Modul Diselesaikan', 'Berhasil menyelesaikan satu materi pembelajaran SIGAP (+50 XP).', 'menu_book', 'bg-[#c6e7ff] text-[#00658d]');

    setUser((prev) => ({
      ...prev,
      completedModules: [...(prev.completedModules || []), moduleId],
    }));
  };

  const handleCompleteGame = (gameId: string, xpPoints: number, badgeId?: string) => {
    if (user.completedGames?.includes(gameId)) return;
    
    handleAddXp(xpPoints, 'Menyelesaikan Game SIGAP');
    if (badgeId) {
      handleUnlockBadge(badgeId);
    }
    addGlobalNotification('Game Selesai', `Tantangan SIGAP Game berhasil diselesaikan (+${xpPoints} XP).`, 'sports_esports', 'bg-[#c6e7ff] text-[#00658d]');

    setUser((prev) => ({
      ...prev,
      completedGames: [...(prev.completedGames || []), gameId]
    }));
  };

  const handleCompleteSimulation = (simId: string, xpPoints: number, badgeId?: string) => {
    if (user.completedSimulations?.includes(simId)) return;
    
    handleAddXp(xpPoints, 'Menyelesaikan Simulasi Kasus');
    if (badgeId) {
      handleUnlockBadge(badgeId);
    }
    addGlobalNotification('Simulasi Selesai', `Skenario kasus telah berhasil dipecahkan (+${xpPoints} XP).`, 'psychology', 'bg-[#edf4fc] text-[#00658d]');

    setUser((prev) => ({
      ...prev,
      completedSimulations: [...(prev.completedSimulations || []), simId]
    }));
  };

  // Screen Navigation Handlers
  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === 'admin') setCurrentScreen('admin_dashboard');
    else if (tab === 'home') setCurrentScreen('home');
    else if (tab === 'game') setCurrentScreen('game_hub');
    else if (tab === 'ai') setCurrentScreen('ai_chat');
    else if (tab === 'lapor') setCurrentScreen('report');
    else if (tab === 'saya') setCurrentScreen('profile');
  };

  const handleNavigate = (screen: ScreenType) => {
    setCurrentScreen(screen);
    if (screen === 'admin_dashboard') setActiveTab('admin');
    else if (screen === 'home') setActiveTab('home');
    else if (screen === 'game_hub' || screen === 'quick_decision' || screen === 'detective') setActiveTab('game');
    else if (screen === 'ai_chat') setActiveTab('ai');
    else if (screen === 'report' || screen === 'report_status') setActiveTab('lapor');
    else if (screen === 'profile') setActiveTab('saya');
  };

  const handleSelectSimulation = (simId: string) => {
    setActiveSimulationId(simId);
    setCurrentScreen('simulation_play');
  };

  const handleSubmitNewReport = (report: IncidentReport) => {
    setReports((prev) => [report, ...prev]);
    setLastSubmittedReport(report);
    setCurrentScreen('report_success');
    handleAddXp(50, 'Mengirim Laporan Aman');
    addGlobalNotification('Laporan Terkirim', 'Terima kasih, laporanmu telah diamankan di sistem.', 'verified_user', 'bg-[#c6e7ff] text-[#00658d]');
  };

  const handleUpdateReportFromAdmin = (updatedReport: IncidentReport) => {
    setReports((prev) =>
      prev.map((r) => (r.id === updatedReport.id ? updatedReport : r))
    );
    showToast(`Laporan ${updatedReport.id} berhasil diperbarui!`);
    addGlobalNotification(
      'Status Laporan Diperbarui',
      `Laporan ${updatedReport.id} diubah statusnya menjadi ${updatedReport.status}.`,
      'edit_note',
      'bg-[#edf4fc] text-[#00658d]'
    );
  };

  // 1. Splash Screen
  if (currentScreen === 'splash') {
    return (
      <SplashScreen
        onComplete={() => {
          if (isLoggedIn && user) {
            setCurrentScreen(user.userRole === 'admin' ? 'admin_dashboard' : 'home');
          } else {
            setCurrentScreen('onboarding');
          }
        }}
      />
    );
  }

  // 2. Onboarding Screen
  if (currentScreen === 'onboarding') {
    return <Onboarding onComplete={() => setCurrentScreen('login')} />;
  }

  // 3. Login / Register Screen
  if (currentScreen === 'login') {
    return (
      <LoginView
        onLoginSuccess={handleLoginSuccess}
        onOpenOnboarding={() => setCurrentScreen('onboarding')}
      />
    );
  }

  // Sub-screens header helper
  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'admin_dashboard':
        return 'Panel Satgas TPPK';
      case 'learning':
        return 'Belajar Anti-Bullying';
      case 'learning_detail':
        return selectedModule?.title || 'Detail Modul';
      case 'simulation':
        return 'Simulasi Sudut Pandang';
      case 'simulation_play':
        return 'Simulasi Kasus';
      case 'situation_check':
        return 'Cek Situasi';
      case 'report':
        return 'Lapor Aman';
      case 'report_success':
        return 'Laporan Terkirim';
      case 'report_status':
        return 'Riwayat Laporan';
      case 'friends':
        return 'Teman SIGAP';
      case 'profile':
        return 'Profil Saya';
      case 'ai_chat':
        return 'Tanya SIGAP AI';
      case 'game_hub':
      case 'quick_decision':
      case 'detective':
        return 'SIGAP Game';
      default:
        return undefined;
    }
  };

  const showBackButton = [
    'learning',
    'learning_detail',
    'simulation',
    'simulation_play',
    'situation_check',
    'report_success',
    'report_status',
    'friends',
    'quick_decision',
    'detective',
  ].includes(currentScreen);

  const handleBackNavigation = () => {
    if (currentScreen === 'learning_detail') {
      setCurrentScreen('learning');
    } else if (currentScreen === 'simulation_play') {
      setCurrentScreen('simulation');
    } else if (currentScreen === 'quick_decision' || currentScreen === 'detective') {
      setCurrentScreen('game_hub');
    } else {
      if (user.userRole === 'admin') {
        setCurrentScreen('admin_dashboard');
        setActiveTab('admin');
      } else {
        setCurrentScreen('home');
        setActiveTab('home');
      }
    }
  };

  return (
    <div className="h-[100dvh] w-full overflow-hidden bg-[#F0F7FF] flex justify-center lg:pl-[260px] selection:bg-[#2dbcfe] selection:text-white relative">
      <Sidebar
        user={user}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
        onNavigateHome={() => handleNavigate(user.userRole === 'admin' ? 'admin_dashboard' : 'home')}
        onOpenProfile={() => handleNavigate('profile')}
        onLogout={handleLogout}
      />
      <div className="w-full max-w-[480px] md:max-w-[760px] lg:max-w-[1200px] h-full bg-[#f6faff] shadow-[0px_4px_30px_rgba(26,43,72,0.06)] relative flex flex-col transition-all">
        {/* Fixed Header */}
        <Header
          user={user}
          currentScreen={currentScreen}
          title={getScreenTitle()}
          showBack={showBackButton}
          onBack={handleBackNavigation}
          onOpenNotifications={() => setIsNotifOpen(true)}
          onNavigateHome={() => handleNavigate(user.userRole === 'admin' ? 'admin_dashboard' : 'home')}
          onOpenProfile={() => handleNavigate('profile')}
        />

        {/* Main View Body */}
        <main className="flex-1 overflow-y-auto hide-scrollbar px-4 sm:px-6 lg:px-8 pt-20 pb-24 lg:pb-12 flex flex-col">
          {currentScreen === 'admin_dashboard' && (
            <AdminDashboard
              adminUser={user}
              reports={reports}
              onUpdateReport={handleUpdateReportFromAdmin}
              onNavigate={handleNavigate}
              onLogout={handleLogout}
            />
          )}

          {currentScreen === 'home' && (
            <HomeView user={user} onNavigate={handleNavigate} />
          )}

          {currentScreen === 'learning' && (
            <LearningHub
              modules={modules}
              onSelectModule={(mod) => {
                setSelectedModule(mod);
                setCurrentScreen('learning_detail');
              }}
            />
          )}

          {currentScreen === 'learning_detail' && selectedModule && (
            <LearningDetail
              module={selectedModule}
              onCompleteModule={handleCompleteModule}
              onBack={() => setCurrentScreen('learning')}
            />
          )}

          {currentScreen === 'simulation' && (
            <SimulationHub user={user} onSelectSimulation={handleSelectSimulation} />
          )}

          {currentScreen === 'simulation_play' && activeSimulationId && (
            <SimulationScenario
              simulationId={activeSimulationId}
              onComplete={(points, badgeId) => {
                handleCompleteSimulation(activeSimulationId, points, badgeId);
                setCurrentScreen('simulation');
              }}
              onBack={() => setCurrentScreen('simulation')}
            />
          )}

          {(currentScreen === 'game_hub' ||
            currentScreen === 'quick_decision' ||
            currentScreen === 'detective') && (
            <GameHub
              user={user}
              onCompleteGame={handleCompleteGame}
            />
          )}

          {currentScreen === 'ai_chat' && <AiChat onNavigate={handleNavigate} />}

          {currentScreen === 'situation_check' && (
            <SituationCheck onNavigate={handleNavigate} />
          )}

          {currentScreen === 'report' && (
            <SafeReport
              onSubmitReport={handleSubmitNewReport}
              onNavigate={handleNavigate}
            />
          )}

          {currentScreen === 'report_success' && lastSubmittedReport && (
            <ReportSuccess
              report={lastSubmittedReport}
              onNavigate={handleNavigate}
            />
          )}

          {currentScreen === 'report_status' && (
            <ReportStatus reports={reports} onNavigate={handleNavigate} />
          )}

          {currentScreen === 'friends' && (
            <TemanSigap onAddXp={handleAddXp} onUnlockBadge={handleUnlockBadge} />
          )}

          {currentScreen === 'profile' && (
            <ProfileView
              user={user}
              onNavigate={handleNavigate}
              onUpdateProfile={handleUpdateProfile}
              onLogout={handleLogout}
              onSwitchAccount={handleSwitchAccount}
            />
          )}
        </main>

        {/* Global Toast Feedback */}
        {toastMessage && (
          <div
            id="global-toast-notification"
            className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-[#031632] text-white px-4 py-2.5 rounded-full shadow-[0px_8px_24px_rgba(3,22,50,0.25)] border border-[#2dbcfe]/40 text-[13px] font-bold flex items-center gap-2 animate-bounce"
          >
            <span className="material-symbols-outlined text-[18px] text-[#2dbcfe]">
              stars
            </span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Bottom Navigation */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          userRole={user.userRole}
        />

        {/* Notification Modal */}
        <NotificationModal
          isOpen={isNotifOpen}
          onClose={() => setIsNotifOpen(false)}
        />
      </div>
    </div>
  );
}

export default App;
