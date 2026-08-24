import React from 'react';
import { UserProfile } from '../types';
import { SIMULATION_CASES } from '../data/mockData';

interface SimulationHubProps {
  user: UserProfile;
  onSelectSimulation: (simulationId: string) => void;
}

export const SimulationHub: React.FC<SimulationHubProps> = ({ user, onSelectSimulation }) => {
  return (
    <div id="simulation-hub-container" className="flex flex-col gap-5">
      {/* Header Introduction */}
      <section className="text-center">
        <h1 className="text-[24px] md:text-[28px] font-bold text-[#031632] mb-1.5">
          Simulasi Sudut Pandang
        </h1>
        <p className="text-[14px] text-[#44474d] max-w-[340px] mx-auto leading-relaxed">
          Pilih kasus simulasi untuk melatih empatimu dan mengambil keputusan dalam situasi nyata perundungan.
        </p>
      </section>

      {/* Perspective Selection Cards grouped by Level */}
      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4, 5].map((level) => {
          const levelCases = SIMULATION_CASES.filter((c) => c.requiredLevel === level);
          if (levelCases.length === 0) return null;
          
          const isLevelLocked = user.level < level;

          return (
            <div key={`level-${level}`} className="space-y-3">
              <h2 className="text-[16px] font-bold text-[#031632] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#00658d] text-white flex items-center justify-center text-[12px]">
                  {level}
                </span>
                Misi Level {level}
                {isLevelLocked && (
                  <span className="text-[11px] font-bold text-[#ba1a1a] bg-[#ffdad6] px-2 py-0.5 rounded-full ml-2">
                    Terkunci
                  </span>
                )}
              </h2>
              
              <div className="flex flex-col gap-4">
                {levelCases.map((simCase) => {
                  const isLocked = isLevelLocked;
                  const completedSims = user.completedSimulations || [];
                  const isCompleted = completedSims.includes(simCase.id);

                  // Set theme colors based on perspective type for visual variety
                  let badgeColor = 'bg-[#e2e9f1] text-[#44474d]';
                  if (simCase.perspective.toUpperCase() === 'KORBAN') badgeColor = 'bg-[#d7e2ff] text-[#00658d]';
                  if (simCase.perspective.toUpperCase() === 'SAKSI') badgeColor = 'bg-[#c6e7ff] text-[#004c6b]';
                  if (simCase.perspective.toUpperCase() === 'PELAKU') badgeColor = 'bg-[#ffdad6] text-[#93000a]';

                  return (
                    <div
                      key={simCase.id}
                      id={`simulation-card-${simCase.id}`}
                      onClick={() => {
                        if (!isLocked && !isCompleted) onSelectSimulation(simCase.id);
                      }}
                      className={`glass-card rounded-[24px] overflow-hidden shadow-[0px_6px_24px_rgba(26,43,72,0.06)] border border-white transition-all ${
                        isCompleted
                          ? 'opacity-70 bg-[#f6faff] cursor-not-allowed'
                          : isLocked
                          ? 'opacity-60 cursor-not-allowed grayscale-[30%]'
                          : 'hover:scale-[1.02] cursor-pointer group'
                      }`}
                    >
              <div className="flex flex-col sm:flex-row">
                {/* Image Banner */}
                <div className="sm:w-2/5 h-44 sm:h-auto relative overflow-hidden bg-[#edf4fc]">
                  <img
                    src={simCase.image}
                    alt={simCase.title}
                    className={`w-full h-full object-cover transition-transform duration-500 ${
                      isLocked ? '' : 'group-hover:scale-105'
                    }`}
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-extrabold tracking-wider uppercase shadow-xs ${badgeColor}`}
                    >
                      {simCase.perspective}
                    </span>
                    {isLocked && (
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#ba1a1a] text-white shadow-xs flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">lock</span>
                        Butuh Level {simCase.requiredLevel}
                      </span>
                    )}
                  </div>
                </div>

                {/* Text & Details */}
                <div className="p-5 sm:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-[12px] font-bold text-[#00658d] uppercase tracking-wide">
                        {simCase.caseNumber}
                      </span>
                      <span className="text-gray-300">•</span>
                      <span className="text-[13px] font-semibold text-[#44474d]">
                        {simCase.title}
                      </span>
                    </div>
                    <h3 className="text-[15px] font-extrabold text-[#031632] mb-1.5 leading-snug line-clamp-2">
                      {simCase.scenario}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#e8eff7] flex items-center justify-between">
                    <span className={`text-[12px] font-bold flex items-center gap-1 transition-transform ${isLocked || isCompleted ? 'text-[#75777e]' : 'text-[#00658d] group-hover:translate-x-1'}`}>
                      {isCompleted ? 'Selesai' : isLocked ? 'Terkunci' : 'Mulai Simulasi'}
                      <span className="material-symbols-outlined text-[16px]">
                        {isCompleted ? 'check_circle' : isLocked ? 'lock' : 'arrow_forward'}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
