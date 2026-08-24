import React, { useState } from 'react';
import { SIMULATION_CASES } from '../data/mockData';

interface SimulationScenarioProps {
  simulationId: string;
  onComplete: (points: number, badgeId?: string) => void;
  onBack: () => void;
}

export const SimulationScenario: React.FC<SimulationScenarioProps> = ({
  simulationId,
  onComplete,
  onBack,
}) => {
  const caseData = SIMULATION_CASES.find((s) => s.id === simulationId);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [isReflected, setIsReflected] = useState(false);

  if (!caseData) return null;

  const handleChoice = (key: string) => {
    setSelectedKey(key);
  };

  const handleFinishChoice = (pts: number) => {
    // Determine badge based on perspective
    let badgeId: string | undefined;
    if (caseData.perspective.toUpperCase() === 'SAKSI') badgeId = 'defender';
    if (caseData.perspective.toUpperCase() === 'PELAKU') badgeId = 'empath';
    onComplete(pts, badgeId);
  };

  // --- EMOTION TYPE SCENARIO (Pelaku / Empathy Training) ---
  if (caseData.type === 'emotion') {
    return (
      <div id="simulation-emotion-view" className="flex flex-col md:flex-row items-stretch gap-5 pb-8 h-full min-h-[400px]">
        {/* Scenario Header Card */}
        <div className="bg-white rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#ffdad6] md:w-1/2 flex flex-col">
          <div className="flex items-center justify-between mb-3 shrink-0">
            <span className="text-[12px] font-bold text-[#ba1a1a] uppercase tracking-wider bg-[#ffdad6] px-3 py-1 rounded-full">
              {caseData.caseNumber}
            </span>
            <span className="text-[12px] font-bold text-[#44474d]">
              Perspektif {caseData.perspective}
            </span>
          </div>

          <p className="text-[15.5px] text-[#031632] leading-relaxed font-medium mb-4 shrink-0">
            {caseData.scenario}
          </p>

          <div className="w-full rounded-2xl overflow-hidden mb-0 bg-[#edf4fc] flex-1 min-h-[150px]">
            <img
              src={caseData.image}
              alt={caseData.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Emotion Question & Selector */}
        <div className="glass-card rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-white md:w-1/2 flex flex-col justify-center overflow-y-auto">
          <h3 className="text-[16px] font-bold text-[#031632] mb-4 shrink-0">
            {caseData.question}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {caseData.emotions?.map((item) => {
              const isSelected = selectedEmotion === item.id;
              return (
                <button
                  key={item.id}
                  id={`emotion-btn-${item.id}`}
                  onClick={() => setSelectedEmotion(item.id)}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#00658d] bg-[#c6e7ff] text-[#004c6b] scale-105 shadow-sm'
                      : 'border-[#e8eff7] bg-white text-[#44474d] hover:bg-[#f6faff]'
                  }`}
                >
                  <span className="text-3xl mb-1.5">{item.emoji}</span>
                  <span className="text-[13px] font-bold">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Impact Breakdown */}
          <div className="space-y-3 mb-6">
            {caseData.impacts?.map((impact, idx) => (
              <div
                key={idx}
                className="bg-[#f6faff] p-4 rounded-2xl border border-[#e2e9f1] flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-[#edf4fc] text-[#00658d] flex items-center justify-center shrink-0 mt-0.5">
                  <span className="material-symbols-outlined text-[18px]">
                    {impact.icon}
                  </span>
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#031632] mb-0.5">
                    {impact.target}
                  </h4>
                  <p className="text-[12.5px] text-[#44474d] leading-relaxed">
                    {impact.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {!isReflected ? (
            <button
              id="refleksi-tindakan-btn"
              disabled={!selectedEmotion}
              onClick={() => {
                setIsReflected(true);
                handleFinishChoice(50);
              }}
              className="w-full gradient-btn text-white py-4 px-6 rounded-xl font-bold text-[14px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              Refleksikan Tindakan & Sadari Dampak (+50 XP)
            </button>
          ) : (
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-[#edf4fc] border border-[#00658d] text-[#00658d] text-[13.5px]">
                <p className="font-bold mb-1">🌱 Refleksi Diri Berhasil Disimpan</p>
                <p>
                  Mengakui kesalahan dan meminta maaf secara tulus adalah bukti kedewasaan dan keberanian yang sejati.
                </p>
              </div>
              <button
                onClick={onBack}
                className="w-full bg-[#edf4fc] text-[#00658d] py-3.5 rounded-xl font-bold text-[14px] hover:bg-[#e2e9f1] cursor-pointer"
              >
                Kembali ke Daftar Simulasi
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- STANDARD TYPE SCENARIO (Korban / Saksi / Standard Choices) ---
  const currentSelected = caseData.choices?.find((c) => c.key === selectedKey);

  // Determine header color based on perspective
  let headerColor = 'bg-[#e2e9f1] text-[#44474d]';
  if (caseData.perspective.toUpperCase() === 'KORBAN') headerColor = 'bg-[#d7e2ff] text-[#00658d]';
  if (caseData.perspective.toUpperCase() === 'SAKSI') headerColor = 'bg-[#c6e7ff] text-[#004c6b]';

  return (
    <div id={`simulation-standard-view`} className="flex flex-col md:flex-row items-stretch gap-5 pb-8 h-full min-h-[400px]">
      {/* Header Case Description */}
      <div className="bg-white rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#2dbcfe]/20 md:w-1/2 flex flex-col">
        <div className="flex items-center justify-between mb-3 shrink-0">
          <span className={`text-[12px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${headerColor}`}>
            {caseData.caseNumber}
          </span>
          <span className="text-[12px] font-bold text-[#44474d]">
            {caseData.title}
          </span>
        </div>

        <p className="text-[15.5px] text-[#031632] leading-relaxed font-medium mb-4 shrink-0">
          {caseData.scenario}
        </p>

        <div className="w-full rounded-2xl overflow-hidden mb-0 bg-[#edf4fc] flex-1 min-h-[150px]">
          <img
            src={caseData.image}
            alt={caseData.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Question & Options */}
      <div className="glass-card rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-white md:w-1/2 flex flex-col overflow-y-auto">
        <h3 className="text-[16px] font-bold text-[#031632] mb-4 shrink-0">
          {caseData.question}
        </h3>

        <div className="space-y-3 mb-5">
          {caseData.choices?.map((choice) => {
            const isChosen = selectedKey === choice.key;
            return (
              <button
                key={choice.key}
                id={`choice-btn-${choice.key}`}
                onClick={() => handleChoice(choice.key)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                  isChosen
                    ? 'border-[#00658d] bg-[#c6e7ff] shadow-sm'
                    : 'border-[#e8eff7] bg-white hover:bg-[#f6faff]'
                }`}
              >
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[13px] shrink-0 ${
                    isChosen
                      ? 'bg-[#00658d] text-white'
                      : 'bg-[#edf4fc] text-[#031632]'
                  }`}
                >
                  {choice.key}
                </span>
                <span
                  className={`text-[14px] leading-snug flex-1 font-medium ${
                    isChosen ? 'text-[#004c6b] font-bold' : 'text-[#031632]'
                  }`}
                >
                  {choice.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Feedback Card */}
        {currentSelected && (
          <div className="mb-5 animate-fadeIn">
            <div
              className={`p-4.5 rounded-2xl border ${
                currentSelected.isRecommended
                  ? 'bg-[#edf4fc] border-[#00658d] text-[#00658d]'
                  : 'bg-[#ffdad6]/70 border-[#ba1a1a]/30 text-[#93000a]'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1 text-[14px]">
                <span className="material-symbols-outlined text-[20px]">
                  {currentSelected.isRecommended ? 'verified' : 'info'}
                </span>
                <span>
                  {currentSelected.isRecommended
                    ? `Langkah Bijak! (+${currentSelected.points} XP)`
                    : `Evaluasi Respon (+${currentSelected.points} XP)`}
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-[#031632]">
                {currentSelected.feedback}
              </p>
            </div>
          </div>
        )}

        {selectedKey ? (
          <button
            id="simulation-finish-btn"
            onClick={() => {
              if (currentSelected?.isRecommended) {
                 handleFinishChoice(currentSelected.points);
              } else {
                 setSelectedKey(null); // Reset so they can try again
              }
            }}
            className="w-full gradient-btn text-white py-4 px-6 rounded-xl font-bold text-[14px] cursor-pointer"
          >
            {currentSelected?.isRecommended ? 'Selesaikan Simulasi' : 'Coba Lagi'}
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-[#e2e9f1] text-[#75777e] py-4 px-6 rounded-xl font-bold text-[14px] cursor-not-allowed"
          >
            Pilih Satu Respon
          </button>
        )}
      </div>
    </div>
  );
};
