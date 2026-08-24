import React, { useState } from 'react';
import { LearningModule } from '../types';

interface LearningDetailProps {
  module: LearningModule;
  onCompleteModule: (moduleId: number) => void;
  onBack: () => void;
}

export const LearningDetail: React.FC<LearningDetailProps> = ({
  module,
  onCompleteModule,
  onBack,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleQuizAnswer = (index: number) => {
    if (quizSubmitted) return;
    setSelectedOption(index);
  };

  const handleVerifyQuiz = () => {
    if (selectedOption === null) return;
    setQuizSubmitted(true);
    if (selectedOption === module.quiz.correctIndex) {
      onCompleteModule(module.id);
    }
  };

  return (
    <div id="learning-detail-container" className="flex flex-col gap-5 pb-8">
      {/* Banner / Header */}
      <div className="bg-white rounded-[24px] overflow-hidden shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#2dbcfe]/20">
        {module.image ? (
          <div className="w-full h-48 sm:h-56 relative bg-[#edf4fc]">
            <img
              src={module.image}
              alt={module.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[12px] font-bold text-[#00658d] flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              {module.duration}
            </div>
          </div>
        ) : (
          <div className="w-full h-36 bg-gradient-to-r from-[#edf4fc] to-[#cae6ff] flex items-center justify-center">
            <span className="material-symbols-outlined text-[64px] text-[#00658d]">
              {module.icon || 'menu_book'}
            </span>
          </div>
        )}

        <div className="p-6">
          <span className="inline-block px-3 py-1 bg-[#edf4fc] text-[#00658d] text-[12px] font-bold rounded-full mb-2">
            Modul Pembelajaran
          </span>
          <h1 className="text-[22px] md:text-[26px] font-extrabold text-[#031632] mb-2 leading-tight">
            {module.title}
          </h1>
          <p className="text-[14px] text-[#44474d] leading-relaxed">
            {module.description}
          </p>
        </div>
      </div>

      {/* Content Sections */}
      <div className="bg-white rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-white space-y-4">
        <h2 className="text-[17px] font-bold text-[#031632] flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00658d]">
            auto_stories
          </span>
          Materi Pembelajaran
        </h2>

        <div className="space-y-3.5 text-[14.5px] text-[#151c22] leading-relaxed">
          {module.content.map((paragraph, idx) => (
            <p key={idx} className="p-3.5 rounded-xl bg-[#f6faff] border border-[#e8eff7]">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Key Takeaways */}
        <div className="mt-4 p-4 rounded-2xl bg-[#edf4fc] border border-[#2dbcfe]/30">
          <h3 className="text-[14px] font-bold text-[#00658d] mb-2 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            Poin Penting (Key Takeaways):
          </h3>
          <ul className="space-y-1.5 text-[13px] text-[#031632]">
            {module.keyTakeaways.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-[#2dbcfe] font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Interactive Mini Quiz */}
      <div className="bg-white rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#2dbcfe]/30">
        <div className="flex items-center gap-2 mb-3">
          <span className="material-symbols-outlined text-[#00658d]" style={{ fontVariationSettings: "'FILL' 1" }}>
            quiz
          </span>
          <h2 className="text-[16px] font-bold text-[#031632]">
            Uji Pemahamanmu (Kuis Singkat)
          </h2>
        </div>

        <p className="text-[14px] font-semibold text-[#031632] mb-4">
          {module.quiz.question}
        </p>

        <div className="space-y-2.5 mb-5">
          {module.quiz.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === module.quiz.correctIndex;
            let btnStyle = 'bg-[#f6faff] border-[#e2e9f1] text-[#031632] hover:border-[#2dbcfe]';

            if (quizSubmitted) {
              if (isCorrect) {
                btnStyle = 'bg-[#edf4fc] border-[#00658d] text-[#00658d] font-bold';
              } else if (isSelected && !isCorrect) {
                btnStyle = 'bg-[#ffdad6] border-[#ba1a1a] text-[#ba1a1a]';
              }
            } else if (isSelected) {
              btnStyle = 'bg-[#c6e7ff] border-[#2dbcfe] text-[#004c6b] font-semibold shadow-sm';
            }

            return (
              <button
                key={idx}
                disabled={quizSubmitted}
                onClick={() => handleQuizAnswer(idx)}
                className={`w-full text-left p-3.5 rounded-xl border-2 transition-all flex items-start gap-3 cursor-pointer ${btnStyle}`}
              >
                <span className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[12px] font-bold shrink-0 shadow-xs">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-[13.5px] leading-snug flex-1">{option}</span>
              </button>
            );
          })}
        </div>

        {quizSubmitted && (
          <div
            className={`p-4 rounded-xl mb-4 text-[13px] leading-relaxed border ${
              selectedOption === module.quiz.correctIndex
                ? 'bg-[#edf4fc] border-[#00658d] text-[#00658d]'
                : 'bg-[#ffdad6] border-[#ba1a1a] text-[#93000a]'
            }`}
          >
            <p className="font-bold mb-1">
              {selectedOption === module.quiz.correctIndex
                ? '🎉 Jawabanmu Benar! +50 XP & Modul Selesai'
                : '💡 Ulasan Penjelasan:'}
            </p>
            <p>{module.quiz.explanation}</p>
          </div>
        )}

        {!quizSubmitted ? (
          <button
            disabled={selectedOption === null}
            onClick={handleVerifyQuiz}
            className="w-full gradient-btn text-white py-3.5 px-6 rounded-xl font-bold text-[14px] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Kirim Jawaban
          </button>
        ) : (
          <button
            onClick={onBack}
            className="w-full bg-[#edf4fc] text-[#00658d] hover:bg-[#e2e9f1] py-3.5 px-6 rounded-xl font-bold text-[14px] cursor-pointer transition-colors"
          >
            Kembali ke Daftar Modul
          </button>
        )}
      </div>
    </div>
  );
};
