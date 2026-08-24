import React from 'react';
import { LearningModule } from '../types';

interface LearningHubProps {
  modules: LearningModule[];
  onSelectModule: (module: LearningModule) => void;
}

export const LearningHub: React.FC<LearningHubProps> = ({
  modules,
  onSelectModule,
}) => {
  return (
    <div id="learning-hub-container" className="flex flex-col gap-5">
      {/* Header Section */}
      <section className="text-center">
        <h1 className="text-[24px] md:text-[28px] font-bold text-[#031632] mb-1">
          Belajar Anti-Bullying
        </h1>
        <p className="text-[14px] text-[#44474d]">
          Pelajari, pahami, dan kenali tanda-tandanya.
        </p>
      </section>

      {/* Learning Path Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {modules.map((item) => (
          <div
            key={item.id}
            id={`learning-card-${item.id}`}
            onClick={() => onSelectModule(item)}
            className="glass-card rounded-[22px] p-5 flex flex-col gap-3 hover:scale-[1.02] transition-all cursor-pointer relative overflow-hidden group border border-[#2dbcfe]/20 shadow-[0px_8px_24px_rgba(26,43,72,0.05)]"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#2dbcfe]/20 opacity-20 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>

            {/* Illustration / Icon Box */}
            <div className="h-32 rounded-xl overflow-hidden mb-1 relative bg-[#edf4fc] flex items-center justify-center">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <span className="material-symbols-outlined text-[48px] text-[#1a2b48] opacity-60">
                  {item.icon || 'menu_book'}
                </span>
              )}
              <div className="absolute top-2 right-2 bg-[#f6faff]/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-[15px] text-[#00658d]">
                  schedule
                </span>
                <span className="text-[11px] font-semibold text-[#031632]">
                  {item.duration}
                </span>
              </div>
            </div>

            <h3 className="text-[17px] font-bold text-[#031632] group-hover:text-[#00658d] transition-colors">
              {item.title}
            </h3>
            <p className="text-[13px] text-[#44474d] line-clamp-2 leading-relaxed">
              {item.description}
            </p>

            {/* Progress indicator */}
            <div className="mt-auto pt-2">
              <div className="flex justify-between items-center mb-1 text-[11px] font-semibold text-[#00658d]">
                <span>Progress</span>
                <span>{item.progress}%</span>
              </div>
              <div className="h-2.5 bg-[#e2e9f1] rounded-full overflow-hidden relative">
                <div
                  className="h-full bg-gradient-to-r from-[#2dbcfe] to-[#82cfff] rounded-full transition-all duration-500 relative flex justify-end items-center"
                  style={{ width: `${item.progress}%` }}
                >
                  {item.progress > 0 && (
                    <div className="w-1.5 h-1.5 bg-white rounded-full mr-0.5 shadow-sm"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
