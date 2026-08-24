import React, { useState } from 'react';
import { ONBOARDING_SLIDES } from '../data/mockData';

interface OnboardingProps {
  onComplete: () => void;
}

export const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < ONBOARDING_SLIDES.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const slide = ONBOARDING_SLIDES[currentStep];

  return (
    <div
      id="onboarding-screen"
      className="min-h-screen bg-[#f6faff] md:bg-[#e8eff7] flex items-center justify-center p-0 md:p-6 selection:bg-[#2dbcfe] selection:text-white"
    >
      <main className="w-full max-w-[480px] md:max-w-[900px] min-h-screen md:min-h-[550px] md:h-auto bg-[#f6faff] shadow-[0px_10px_30px_rgba(26,43,72,0.08)] md:shadow-2xl relative flex flex-col overflow-hidden md:rounded-[32px]">
        {/* Subtle Background Glow */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#2dbcfe]/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/2 -right-32 w-80 h-80 bg-[#d7e2ff]/30 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Top Header Navigation */}
        <header className="flex justify-between items-center px-6 py-4 md:px-10 md:py-6 z-20 shrink-0">
          {currentStep > 0 ? (
            <button
              id="onboarding-back-btn"
              onClick={handleBack}
              className="w-10 h-10 rounded-full bg-white/70 backdrop-blur-md shadow-sm flex items-center justify-center text-[#44474d] hover:bg-white transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
          ) : (
            <div className="text-[24px] font-black text-[#00658d] tracking-tighter">
              SIGAP
            </div>
          )}

          <button
            id="onboarding-skip-btn"
            onClick={onComplete}
            className="text-[14px] font-semibold text-[#00658d] hover:text-[#031632] transition-colors px-2 py-1 cursor-pointer"
          >
            Lewati
          </button>
        </header>

        {/* Main Content Body */}
        <section className="flex-1 flex flex-col justify-center px-6 md:px-12 z-10 pb-8 h-full">
          {/* STEP 1: Kenali Bullying */}
          {currentStep === 0 && (
            <div className="animate-fadeIn flex flex-col md:flex-row items-center md:gap-12 w-full h-full">
              <div className="w-full md:w-1/2 aspect-square max-w-[320px] md:max-w-full mb-6 md:mb-0 relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-contain drop-shadow-xl rounded-2xl"
                />
                {/* Floating decor badges */}
                <div className="absolute top-6 left-6 md:top-10 md:-left-4 w-9 h-9 md:w-12 md:h-12 bg-white rounded-full shadow-[0px_4px_20px_rgba(26,43,72,0.1)] flex items-center justify-center animate-bounce">
                  <span className="material-symbols-outlined text-[#00658d] text-[18px] md:text-[24px] filled" style={{ fontVariationSettings: "'FILL' 1" }}>
                    favorite
                  </span>
                </div>
                <div className="absolute bottom-10 right-6 md:bottom-16 md:-right-2 w-11 h-11 md:w-14 md:h-14 bg-white rounded-full shadow-[0px_4px_20px_rgba(26,43,72,0.1)] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#031632] text-[22px] md:text-[28px]">
                    forum
                  </span>
                </div>
              </div>

              <div className="text-center md:text-left mb-6 md:mb-0 space-y-2 md:w-1/2 flex flex-col md:justify-center">
                <h1 className="text-[26px] md:text-[36px] font-bold text-[#031632] tracking-tight mb-2">
                  {slide.title}
                </h1>
                <p className="text-[15px] md:text-[17px] text-[#44474d] leading-relaxed max-w-[340px] md:max-w-none mx-auto md:mx-0">
                  {slide.description}
                </p>
              </div>
            </div>
          )}

          {/* STEP 2: Multi-perspective Hub */}
          {currentStep === 1 && (
            <div className="animate-fadeIn flex flex-col md:flex-row-reverse items-center md:gap-12 w-full h-full">
              <div className="w-full md:w-1/2 mb-6 md:mb-0 relative py-4">
                {/* Central Connection Hub */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-[#2dbcfe]/40 flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-[#00658d]/30 flex items-center justify-center shadow-[0_0_0_0_rgba(45,188,254,0.4)]">
                      <span className="material-symbols-outlined text-[#00658d] text-3xl md:text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        visibility
                      </span>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 border border-[#dce3eb] rounded-full -z-10"></div>
                </div>

                {/* Roles Grid */}
                <div className="relative z-10 grid grid-cols-2 gap-4 h-64 md:h-80">
                  {/* Korban */}
                  <div className="glass-panel rounded-2xl p-3 flex flex-col items-center justify-center self-start justify-self-start w-32 md:w-36 ml-2 md:ml-6 shadow-sm border border-white/60">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#d7e2ff] mb-2 overflow-hidden flex items-center justify-center shadow-sm">
                      <img
                        src={slide.avatars?.[0].img}
                        alt="Korban"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[13px] md:text-[14px] font-bold text-[#031632] tracking-wide">
                      KORBAN
                    </span>
                  </div>

                  {/* Pelaku */}
                  <div className="glass-panel rounded-2xl p-3 flex flex-col items-center justify-center self-start justify-self-end w-32 md:w-36 mr-2 md:mr-6 mt-8 md:mt-12 shadow-sm border border-white/60">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#ffdad6] mb-2 overflow-hidden flex items-center justify-center shadow-sm">
                      <img
                        src={slide.avatars?.[1].img}
                        alt="Pelaku"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[13px] md:text-[14px] font-bold text-[#031632] tracking-wide">
                      PELAKU
                    </span>
                  </div>

                  {/* Saksi */}
                  <div className="glass-panel rounded-2xl p-3 flex flex-col items-center justify-center col-span-2 place-self-center -mt-6 md:-mt-4 shadow-sm border border-white/60 w-32 md:w-36">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#c6e7ff] mb-2 overflow-hidden flex items-center justify-center shadow-sm">
                      <img
                        src={slide.avatars?.[2].img}
                        alt="Saksi"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-[13px] md:text-[14px] font-bold text-[#031632] tracking-wide">
                      SAKSI
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center md:text-left mb-6 md:mb-0 space-y-2 md:w-1/2 flex flex-col md:justify-center">
                <h1 className="text-[24px] md:text-[34px] font-bold text-[#031632] tracking-tight leading-tight mb-2">
                  Lihat dari Berbagai<br className="hidden md:block" /> Sudut Pandang
                </h1>
                <p className="text-[14px] md:text-[16px] text-[#44474d] leading-relaxed max-w-[320px] md:max-w-none mx-auto md:mx-0">
                  {slide.description}
                </p>
              </div>
            </div>
          )}

          {/* STEP 3: Berani Bertindak & AI Highlight */}
          {currentStep === 2 && (
            <div className="animate-fadeIn flex flex-col md:flex-row items-center md:gap-12 w-full h-full">
              <div className="w-full md:w-1/2 flex flex-col items-center mb-5 md:mb-0">
                <div className="w-full max-w-[300px] md:max-w-[360px] aspect-square rounded-[24px] md:rounded-[32px] overflow-hidden shadow-[0px_10px_30px_rgba(26,43,72,0.1)] relative bg-white border border-white/80">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute -top-2 -right-2 md:-top-4 md:-right-4 bg-white rounded-full p-2 md:p-3 shadow-md">
                    <span className="material-symbols-outlined text-[#2dbcfe] md:text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      shield
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -left-1 md:-bottom-2 md:-left-2 bg-white rounded-full p-2 md:p-3 shadow-md">
                    <span className="material-symbols-outlined text-[#2dbcfe] md:text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      smart_toy
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 text-center md:text-left flex flex-col md:justify-center space-y-4">
                <div className="space-y-1.5 md:space-y-3">
                  <h1 className="text-[26px] md:text-[36px] font-bold text-[#031632] tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-[14px] md:text-[16px] text-[#44474d] leading-relaxed max-w-[330px] md:max-w-none mx-auto md:mx-0">
                    {slide.description}
                  </p>
                </div>

                {/* Feature Highlight Card */}
                <div className="w-full glass-card rounded-2xl md:rounded-3xl p-3.5 md:p-5 flex items-center gap-3.5 md:gap-5 border border-[#2dbcfe]/30 shadow-sm mt-2">
                  <div className="bg-[#2dbcfe]/20 p-2.5 md:p-3.5 rounded-full text-[#00658d] shrink-0">
                    <span className="material-symbols-outlined text-[22px] md:text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      psychology
                    </span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[14px] md:text-[16px] font-bold text-[#031632]">
                      Didukung oleh SIGAP AI
                    </p>
                    <p className="text-[12px] md:text-[14px] text-[#44474d]">
                      Asisten personal untuk panduan aman.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Indicators & Action Button */}
          <div className="mt-auto md:mt-8 space-y-5 md:space-y-0 flex flex-col md:flex-row items-center md:justify-between w-full pt-4 md:pt-0">
            {/* Progress Dots */}
            <div className="flex items-center gap-2 md:gap-3">
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className={`h-2 md:h-2.5 rounded-full transition-all duration-300 ${
                    currentStep === idx
                      ? 'w-8 md:w-10 bg-[#00658d] shadow-[0_0_8px_rgba(45,188,254,0.4)]'
                      : 'w-2 md:w-2.5 bg-[#dce3eb]'
                  }`}
                />
              ))}
            </div>

            {/* CTA Button */}
            <button
              id="onboarding-next-btn"
              onClick={handleNext}
              className="w-full md:w-auto md:min-w-[200px] gradient-btn text-white py-4 md:py-3.5 px-8 md:px-10 rounded-xl md:rounded-2xl font-bold text-[15px] md:text-[16px] flex items-center justify-center gap-2 cursor-pointer active:scale-95 hover:shadow-lg transition-all"
            >
              {slide.buttonText}
              <span className="material-symbols-outlined text-[20px] md:text-[22px]">
                arrow_forward
              </span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};
