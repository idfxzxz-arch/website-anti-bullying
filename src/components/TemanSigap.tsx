import React, { useState } from 'react';
import { PEER_SOLIDARITY_MESSAGES } from '../data/mockData';

interface TemanSigapProps {
  onAddXp: (amount: number, reason: string) => void;
  onUnlockBadge: (badgeId: string) => void;
}

export const TemanSigap: React.FC<TemanSigapProps> = ({
  onAddXp,
  onUnlockBadge,
}) => {
  const [messages, setMessages] = useState(PEER_SOLIDARITY_MESSAGES);
  const [inputMsg, setInputMsg] = useState('');
  const [hasPledged, setHasPledged] = useState(false);

  const handlePostMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      author: 'Kamu (Adit Pratama)',
      badge: 'SIGAP Upstander',
      text: inputMsg.trim(),
      likes: 1,
      time: 'Baru saja',
    };

    setMessages([newMsg, ...messages]);
    setInputMsg('');
    onAddXp(5, 'Pesan Solidaritas Teman SIGAP');
    onUnlockBadge('ally');
  };

  const handleLike = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
    );
  };

  return (
    <div id="teman-sigap-container" className="flex flex-col gap-5 pb-8">
      {/* Header Info */}
      <div className="text-center">
        <h1 className="text-[24px] md:text-[28px] font-bold text-[#031632] mb-1">
          💙 Teman SIGAP
        </h1>
        <p className="text-[14px] text-[#44474d] max-w-[340px] mx-auto leading-relaxed">
          Ruang dukungan sebaya, pesan kebaikan, dan komitmen bersama anti-perundungan.
        </p>
      </div>

      {/* Anti-Bully Pledge Card */}
      <div className="glass-card rounded-[24px] p-5 shadow-[0px_6px_24px_rgba(26,43,72,0.06)] border border-[#2dbcfe]/30 relative overflow-hidden">
        <div className="flex items-center gap-2 text-[#00658d] mb-2">
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            loyalty
          </span>
          <span className="text-[12px] font-bold uppercase tracking-wider">
            IKRAR SISWA SIGAP
          </span>
        </div>
        <p className="text-[14px] font-semibold text-[#031632] leading-relaxed mb-4">
          "Saya berjanji untuk tidak menjadi pelaku perundungan, tidak diam saat melihat teman disakiti, dan siap menjadi tempat yang aman bagi siapa saja."
        </p>

        {!hasPledged ? (
          <button
            onClick={() => {
              setHasPledged(true);
              onAddXp(10, 'Menandatangani Ikrar Anti-Bullying');
            }}
            className="w-full gradient-btn text-white py-3 rounded-xl font-bold text-[13.5px] cursor-pointer flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            Saya Ikut Berikrar (+10 XP)
          </button>
        ) : (
          <div className="p-3 bg-[#edf4fc] rounded-xl border border-[#00658d] text-[#00658d] text-[13px] font-bold text-center">
            ✨ Kamu Telah Menandatangani Ikrar Sahabat SIGAP!
          </div>
        )}
      </div>

      {/* Write Support Message */}
      <form onSubmit={handlePostMessage} className="bg-white rounded-[22px] p-4 shadow-sm border border-[#e8eff7]">
        <label className="block text-[13px] font-bold text-[#031632] mb-2">
          Tulis Pesan Dukungan Positif
        </label>
        <textarea
          rows={2}
          value={inputMsg}
          onChange={(e) => setInputMsg(e.target.value)}
          placeholder="Berikan kata semangat untuk teman-teman di sekolah..."
          className="w-full p-3 rounded-xl border border-[#dce3eb] bg-[#f6faff] text-[13.5px] text-[#031632] outline-none focus:border-[#00658d] placeholder:text-[#75777e] mb-3"
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!inputMsg.trim()}
            className="gradient-btn text-white text-[13px] font-bold py-2.5 px-5 rounded-xl disabled:opacity-50 cursor-pointer"
          >
            Kirim Pesan (+5 XP)
          </button>
        </div>
      </form>

      {/* Solidarity Message Wall */}
      <div className="space-y-3.5">
        <h3 className="text-[15px] font-bold text-[#031632] flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#00658d]">
            forum
          </span>
          Dinding Solidaritas Siswa
        </h3>

        {messages.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-[20px] p-4.5 shadow-[0px_4px_16px_rgba(26,43,72,0.04)] border border-[#2dbcfe]/20 space-y-2.5"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#edf4fc] text-[#00658d] flex items-center justify-center font-bold text-[12px]">
                  {item.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-[13.5px] font-bold text-[#031632]">
                    {item.author}
                  </h4>
                  <span className="text-[10px] font-bold text-[#00658d] bg-[#d7e2ff] px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                </div>
              </div>
              <span className="text-[11px] text-[#75777e]">{item.time}</span>
            </div>

            <p className="text-[13.5px] text-[#151c22] leading-relaxed">
              {item.text}
            </p>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => handleLike(item.id)}
                className="flex items-center gap-1.5 text-[12px] font-semibold text-[#44474d] hover:text-[#ba1a1a] transition-colors cursor-pointer bg-[#f6faff] px-3 py-1 rounded-full border border-[#e8eff7]"
              >
                <span className="material-symbols-outlined text-[16px] text-[#ba1a1a]">
                  favorite
                </span>
                <span>{item.likes} Dukungan</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
