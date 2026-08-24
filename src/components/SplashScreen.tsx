import React, { useEffect, useState } from 'react';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div
      id="splash-screen-container"
      className="fixed inset-0 z-50 bg-[#f6faff] md:bg-[#e8eff7] flex items-center justify-center p-0 md:p-6 overflow-hidden"
    >
      {/* Main Container */}
      <main className="relative w-full max-w-[480px] md:max-w-[800px] min-h-screen md:min-h-[600px] md:h-[80vh] bg-[#f6faff] md:shadow-2xl md:rounded-[32px] px-6 flex flex-col items-center justify-center text-center overflow-hidden">
        
        {/* Background Ambient Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#2dbcfe]/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#d7e2ff]/30 rounded-full blur-[100px] pointer-events-none"></div>

        {/* Logo Area */}
        <div className="relative mb-8 z-10">
          {/* Shield Pulse Effect */}
          <div className="absolute inset-0 bg-[#2dbcfe]/30 rounded-full pulse-shield blur-md scale-110"></div>

          {/* Core Logo */}
          <div className="relative w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-[#00AEEF] to-[#00658d] rounded-[32px] shadow-[0px_10px_30px_rgba(26,43,72,0.15)] flex items-center justify-center rotate-45 transform hover:scale-105 transition-transform duration-500">
            <div className="-rotate-45 flex items-center justify-center relative w-full h-full">
              {/* Custom SVG Logo: Shield + Community */}
              <svg
                className="text-white drop-shadow-md"
                fill="none"
                height="56"
                viewBox="0 0 64 64"
                width="56"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32 4C32 4 14 9.5 14 26C14 42.5 32 58 32 58C32 58 50 42.5 50 26C50 9.5 32 4 32 4Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                />
                <circle cx="32" cy="24" fill="currentColor" r="5" />
                <path
                  d="M22 40C22 35 27 33 32 33C37 33 42 35 42 40"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="4"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Typography Area */}
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="text-[40px] md:text-[48px] font-black text-[#031632] tracking-tight leading-none">
            SIGAP
          </h1>
          <p className="text-[17px] md:text-[19px] font-semibold text-[#44474d] max-w-[280px] mx-auto leading-snug">
            Sistem Interaktif Gerakan Anti-Perundungan
          </p>
        </div>

        {/* Tagline Banner */}
        <div className="glass-panel px-6 py-2 rounded-full shadow-[0px_4px_20px_rgba(26,43,72,0.05)] mb-8">
          <p className="text-[12px] md:text-[13px] font-bold text-[#00658d] uppercase tracking-wider">
            Kenali. Pahami. Berani Bertindak.
          </p>
        </div>

        {/* Progress / Loading Indicator */}
        <div className="w-52 h-2 bg-[#e2e9f1] rounded-full overflow-hidden relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#2dbcfe] to-[#00658d] rounded-full transition-all duration-100 ease-out relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/70 blur-[1px] rounded-full"></div>
          </div>
        </div>

        <button
          id="splash-skip-btn"
          onClick={onComplete}
          className="mt-6 text-[12px] text-[#75777e] hover:text-[#031632] transition-colors underline cursor-pointer"
        >
          Lewati Memuat
        </button>
      </main>
    </div>
  );
};
