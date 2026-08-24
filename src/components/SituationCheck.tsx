import React, { useState } from 'react';
import { SITUATION_QUESTIONS } from '../data/mockData';
import { ScreenType } from '../types';

interface SituationCheckProps {
  onNavigate: (screen: ScreenType) => void;
}

export const SituationCheck: React.FC<SituationCheckProps> = ({ onNavigate }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    verdict: string;
    explanation: string;
    recommendations: string[];
  } | null>(null);

  const currentQ = SITUATION_QUESTIONS[currentIdx];

  const handleAnswer = async (ans: boolean) => {
    const updatedAnswers = { ...answers, [currentQ.id]: ans };
    setAnswers(updatedAnswers);

    if (currentIdx < SITUATION_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Analyze results
      setAnalyzing(true);
      try {
        const res = await fetch('/api/analyze-situation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers: updatedAnswers }),
        });
        const data = await res.json();
        setResult(data);
      } catch (err) {
        console.error('Analysis error:', err);
        setResult({
          verdict: 'Terindikasi Perundungan (Bullying)',
          explanation:
            'Terdapat indikasi kuat ketidakseimbangan kekuasaan dan pengulangan tindakan yang merugikan.',
          recommendations: [
            'Simpan semua bukti pesan atau catat saksi kejadian.',
            'Bicarakan dengan Guru BK atau Wali Kelas.',
            'Kirimkan laporan resmi melalui fitur Lapor Aman SIGAP.',
          ],
        });
      } finally {
        setAnalyzing(false);
      }
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setAnswers({});
    setResult(null);
  };

  if (analyzing) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-6">
        <div className="w-20 h-20 rounded-full bg-[#2dbcfe]/20 flex items-center justify-center pulse-shield mb-4">
          <span className="material-symbols-outlined text-[40px] text-[#00658d] animate-spin">
            sync
          </span>
        </div>
        <h2 className="text-[20px] font-bold text-[#031632] mb-2">
          Menganalisis Situasi...
        </h2>
        <p className="text-[14px] text-[#44474d] max-w-[280px]">
          SIGAP AI sedang mengevaluasi parameter ketimpangan relasi kuasa dan frekuensi kejadian.
        </p>
      </div>
    );
  }

  if (result) {
    return (
      <div id="situation-result-card" className="flex flex-col gap-5 animate-fadeIn">
        <div className="bg-white rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#2dbcfe]/30 text-center">
          <div className="w-16 h-16 rounded-full bg-[#edf4fc] text-[#00658d] flex items-center justify-center mx-auto mb-3">
            <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              health_and_safety
            </span>
          </div>

          <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#00658d] bg-[#d7e2ff] px-3 py-1 rounded-full">
            Hasil Analisis
          </span>

          <h2 className="text-[22px] font-extrabold text-[#031632] mt-3 mb-2">
            {result.verdict}
          </h2>

          <p className="text-[14px] text-[#44474d] leading-relaxed mb-5">
            {result.explanation}
          </p>

          <div className="text-left bg-[#f6faff] p-4.5 rounded-2xl border border-[#e8eff7] mb-6">
            <h3 className="text-[14px] font-bold text-[#031632] mb-2.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[#00658d] text-[18px]">
                lightbulb
              </span>
              Langkah Rekomendasi:
            </h3>
            <ul className="space-y-2 text-[13px] text-[#031632]">
              {result.recommendations?.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#2dbcfe] font-bold">✓</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2.5">
            <button
              onClick={() => onNavigate('report')}
              className="w-full gradient-btn text-white py-3.5 rounded-xl font-bold text-[14px] cursor-pointer"
            >
              Lanjutkan ke Lapor Aman (Rahasia)
            </button>
            <button
              onClick={() => onNavigate('ai_chat')}
              className="w-full bg-[#edf4fc] text-[#00658d] py-3.5 rounded-xl font-bold text-[14px] hover:bg-[#e2e9f1] cursor-pointer transition-colors"
            >
              Konsultasi dengan SIGAP AI
            </button>
            <button
              onClick={handleReset}
              className="text-[12px] text-[#75777e] hover:text-[#031632] py-1 cursor-pointer"
            >
              Ulangi Penilaian
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="situation-check-wizard" className="flex flex-col gap-6">
      {/* Header & Step progress */}
      <div className="text-center">
        <h1 className="text-[24px] md:text-[28px] font-bold text-[#031632] mb-1">
          Cek Situasi
        </h1>
        <p className="text-[14px] text-[#44474d]">
          Apakah kejadian yang kamu alami atau saksikan tergolong bullying?
        </p>

        {/* Step dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {SITUATION_QUESTIONS.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIdx
                  ? 'w-7 bg-[#00658d]'
                  : idx < currentIdx
                  ? 'w-2.5 bg-[#2dbcfe]'
                  : 'w-2.5 bg-[#dce3eb]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Question Card with Glowing Pulse */}
      <div className="glass-card rounded-[28px] p-7 shadow-[0px_10px_30px_rgba(26,43,72,0.06)] border border-white relative overflow-hidden flex flex-col items-center text-center">
        {/* Animated Glowing Icon Ring */}
        <div className="w-20 h-20 rounded-full bg-[#2dbcfe]/20 flex items-center justify-center pulse-shield mb-5">
          <div className="w-14 h-14 rounded-full bg-[#2dbcfe] text-white flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[30px]">
              {currentQ.icon}
            </span>
          </div>
        </div>

        <span className="text-[12px] font-bold text-[#00658d] uppercase tracking-wider mb-2">
          Pertanyaan {currentIdx + 1} dari {SITUATION_QUESTIONS.length}
        </span>

        <h2 className="text-[20px] md:text-[22px] font-extrabold text-[#031632] leading-snug mb-3">
          {currentQ.question}
        </h2>

        <p className="text-[13.5px] text-[#44474d] leading-relaxed max-w-[320px] mb-8">
          {currentQ.helperText}
        </p>

        {/* Big tactile YA / TIDAK buttons */}
        <div className="grid grid-cols-2 gap-4 w-full">
          <button
            id="situation-ans-ya"
            onClick={() => handleAnswer(true)}
            className="w-full gradient-btn text-white py-4 rounded-2xl font-black text-[16px] tracking-wide active:scale-95 transition-all shadow-[0px_4px_16px_rgba(45,188,254,0.35)] cursor-pointer"
          >
            YA
          </button>
          <button
            id="situation-ans-tidak"
            onClick={() => handleAnswer(false)}
            className="w-full bg-[#edf4fc] text-[#031632] border border-[#dce3eb] hover:bg-[#e2e9f1] py-4 rounded-2xl font-black text-[16px] tracking-wide active:scale-95 transition-all cursor-pointer"
          >
            TIDAK
          </button>
        </div>
      </div>
    </div>
  );
};
