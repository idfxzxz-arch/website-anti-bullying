import React, { useState, useEffect } from 'react';
import { UserProfile, BadgeItem } from '../types';
import { BADGES_LIST, QUICK_DECISION_CARDS, DETECTIVE_CASES } from '../data/mockData';

interface GameHubProps {
  user: UserProfile;
  onCompleteGame: (gameId: string, xpPoints: number, badgeId?: string) => void;
}

export const GameHub: React.FC<GameHubProps> = ({
  user,
  onCompleteGame,
}) => {
  const [activeMode, setActiveMode] = useState<'hub' | 'quick_list' | 'quick_play' | 'detective_list' | 'detective_play' | 'badges'>('hub');

  // Quick Decision State
  const [quickIndex, setQuickIndex] = useState(0); // Actually maps to index of QUICK_DECISION_CARDS
  const [timer, setTimer] = useState(10);
  const [quickResult, setQuickResult] = useState<{msg: string, isCorrect: boolean, pts: number} | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Detective State
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [selectedCaseAnswer, setSelectedCaseAnswer] = useState<number | null>(null);
  const [caseSolved, setCaseSolved] = useState(false);

  // Timer effect for quick decision
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeMode === 'quick_play' && isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      setQuickResult({
        msg: 'Waktu Habis! Tanggap cepat sangat penting dalam situasi darurat.',
        isCorrect: false,
        pts: 0
      });
    }
    return () => clearInterval(interval);
  }, [activeMode, isTimerRunning, timer]);

  const startQuickPlay = (idx: number) => {
    setQuickIndex(idx);
    setActiveMode('quick_play');
    setTimer(10);
    setQuickResult(null);
    setIsTimerRunning(true);
  };

  const startDetectivePlay = (idx: number) => {
    setSelectedCaseIndex(idx);
    setActiveMode('detective_play');
    setSelectedCaseAnswer(null);
    setCaseSolved(false);
  };

  const handleQuickAnswer = (isCorrect: boolean, pts: number) => {
    setIsTimerRunning(false);
    if (isCorrect) {
      setQuickResult({
        msg: `Benar! Respons cepat dan suportif menyelamatkan korban. (+${pts} XP)`,
        isCorrect: true,
        pts
      });
    } else {
      setQuickResult({
        msg: 'Kurang tepat. Coba pikirkan kembali dampak dari tindakan tersebut.',
        isCorrect: false,
        pts: 0
      });
    }
  };

  const handleFinishQuick = () => {
    if (quickResult?.isCorrect) {
      onCompleteGame(QUICK_DECISION_CARDS[quickIndex].id, quickResult.pts);
    }
    setActiveMode('quick_list');
  };

  const handleSolveDetective = () => {
    if (selectedCaseAnswer === null) return;
    
    const detectiveCase = DETECTIVE_CASES[selectedCaseIndex];
    if (selectedCaseAnswer === detectiveCase.correctIndex) {
      setCaseSolved(true);
      onCompleteGame(detectiveCase.id, detectiveCase.reward, 'detective_master');
    } else {
      alert("Pilihan kurang tepat, detektif! Coba pelajari petunjuknya lagi.");
    }
  };

  // Memoized shuffled choices for Quick Decision
  const shuffledQuickChoices = React.useMemo(() => {
    if (activeMode !== 'quick_play') return [];
    const currentQ = QUICK_DECISION_CARDS[quickIndex];
    if (!currentQ) return [];
    return [...currentQ.choices].sort(() => Math.random() - 0.5);
  }, [quickIndex, activeMode]);

  // Memoized shuffled choices for Detective
  const shuffledDetectiveChoices = React.useMemo(() => {
    if (activeMode !== 'detective_play') return [];
    const dCase = DETECTIVE_CASES[selectedCaseIndex];
    return dCase.options.map((opt, idx) => ({ text: opt, originalIndex: idx })).sort(() => Math.random() - 0.5);
  }, [selectedCaseIndex, activeMode]);

  // 1A. QUICK DECISION LIST
  if (activeMode === 'quick_list') {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveMode('hub')}
            className="flex items-center gap-1 text-[13px] font-bold text-[#00658d] bg-white px-3 py-1.5 rounded-full shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Keluar Game
          </button>
          <span className="text-[12px] font-bold text-[#00658d] bg-[#d7e2ff] px-3 py-1 rounded-full">
            Daftar Level
          </span>
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#2dbcfe]/30">
          <h2 className="text-[20px] font-bold text-[#031632] mb-1">⏱️ Quick Decision</h2>
          <p className="text-[13px] text-[#44474d] mb-5">Pilih skenario dan latih refleksmu!</p>

          <div className="flex flex-col gap-6">
            {[1, 2, 3, 4, 5].map((level) => {
              const levelCards = QUICK_DECISION_CARDS.map((c, i) => ({ ...c, originalIndex: i })).filter((c) => c.requiredLevel === level);
              if (levelCards.length === 0) return null;
              
              const isLevelLocked = user.level < level;

              return (
                <div key={`quick-level-${level}`} className="space-y-3">
                  <h3 className="text-[14px] font-bold text-[#031632] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#00658d] text-white flex items-center justify-center text-[11px]">
                      {level}
                    </span>
                    Tantangan Level {level}
                  </h3>
                  <div className="space-y-3">
                    {levelCards.map((card) => {
                      const completedGames = user.completedGames || [];
                      const isCompleted = completedGames.includes(card.id);
                      const isLocked = isLevelLocked;
                      return (
                        <button
                          key={card.id}
                          disabled={isCompleted || isLocked}
                          onClick={() => startQuickPlay(card.originalIndex)}
                          className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                            isCompleted
                              ? 'border-[#dce3eb] bg-[#f6faff] opacity-70 cursor-not-allowed'
                              : isLocked 
                              ? 'border-[#e8eff7] bg-[#f0f3f7] opacity-60 cursor-not-allowed'
                              : 'border-[#e8eff7] hover:border-[#00658d] hover:bg-[#edf4fc] cursor-pointer'
                          }`}
                        >
                          <div className="text-left flex-1">
                            <h3 className={`font-bold ${isCompleted || isLocked ? 'text-[#75777e]' : 'text-[#031632]'}`}>
                              Skenario {card.originalIndex + 1}
                            </h3>
                          </div>
                          {isCompleted ? (
                            <span className="text-[12px] font-bold text-[#00658d] flex items-center gap-1 bg-[#d7e2ff] px-2 py-1 rounded-lg">
                              <span className="material-symbols-outlined text-[16px]">check_circle</span>
                              Selesai
                            </span>
                          ) : isLocked ? (
                             <span className="text-[12px] font-bold text-[#ba1a1a] flex items-center gap-1 bg-[#ffdad6]/50 px-2 py-1 rounded-lg">
                              <span className="material-symbols-outlined text-[16px]">lock</span>
                              Terkunci
                            </span>
                          ) : (
                            <span className="material-symbols-outlined text-[#2dbcfe]">play_circle</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 1B. QUICK DECISION PLAY
  if (activeMode === 'quick_play') {
    const currentQ = QUICK_DECISION_CARDS[quickIndex];
    return (
      <div id="quick-decision-view" className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveMode('quick_list')}
            className="flex items-center gap-1 text-[13px] font-bold text-[#00658d] bg-white px-3 py-1.5 rounded-full shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-bold text-[#44474d]">
              Level {quickIndex + 1}
            </span>
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-[14px] shadow-sm transition-all ${
                timer <= 3
                  ? 'bg-[#ffdad6] text-[#ba1a1a] animate-ping'
                  : 'bg-[#2dbcfe] text-white'
              }`}
            >
              {timer}s
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#2dbcfe]/30">
          <h2 className="text-[18px] md:text-[20px] font-bold text-[#031632] leading-snug mb-6">
            {currentQ.scenario}
          </h2>

          <div className="space-y-3 mb-6">
            {shuffledQuickChoices.map((choice, idx) => (
              <button
                key={idx}
                disabled={!isTimerRunning}
                onClick={() => handleQuickAnswer(choice.correct, choice.pts)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all font-semibold text-[14px] ${
                  !isTimerRunning
                    ? (choice.correct ? 'border-[#00658d] bg-[#c6e7ff] text-[#004c6b]' : 'border-[#e8eff7] bg-[#f6faff] text-[#44474d] opacity-50')
                    : 'border-[#e8eff7] hover:border-[#00658d] hover:bg-[#edf4fc] text-[#031632] cursor-pointer'
                }`}
              >
                {choice.text}
              </button>
            ))}
          </div>

          {quickResult && (
            <div className={`p-4 rounded-2xl border mb-4 animate-fadeIn ${quickResult.isCorrect ? 'bg-[#edf4fc] border-[#2dbcfe]/40' : 'bg-[#ffdad6]/30 border-[#ba1a1a]/30'}`}>
              <p className={`text-[13.5px] font-bold mb-1 ${quickResult.isCorrect ? 'text-[#00658d]' : 'text-[#ba1a1a]'}`}>
                {quickResult.isCorrect ? 'Luar Biasa!' : 'Ops!'}
              </p>
              <p className="text-[13px] text-[#031632]">{quickResult.msg}</p>
            </div>
          )}

          {!isTimerRunning && (
            <button
              onClick={handleFinishQuick}
              className="w-full gradient-btn text-white py-3.5 rounded-xl font-bold text-[14px] cursor-pointer"
            >
              Kembali ke Daftar Level
            </button>
          )}
        </div>
      </div>
    );
  }

  // 2A. DETECTIVE LIST
  if (activeMode === 'detective_list') {
    return (
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveMode('hub')}
            className="flex items-center gap-1 text-[13px] font-bold text-[#00658d] bg-white px-3 py-1.5 rounded-full shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Keluar Game
          </button>
          <span className="text-[12px] font-bold text-[#00658d] bg-[#d7e2ff] px-3 py-1 rounded-full">
            Daftar Kasus
          </span>
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#2dbcfe]/30">
          <h2 className="text-[20px] font-bold text-[#031632] mb-1">🔍 SIGAP Detective</h2>
          <p className="text-[13px] text-[#44474d] mb-5">Pecahkan misteri dan temukan buktinya!</p>

          <div className="flex flex-col gap-6">
            {[1, 2, 3, 4, 5].map((level) => {
              const levelCases = DETECTIVE_CASES.map((c, i) => ({ ...c, originalIndex: i })).filter((c) => c.requiredLevel === level);
              if (levelCases.length === 0) return null;
              
              const isLevelLocked = user.level < level;

              return (
                <div key={`detective-level-${level}`} className="space-y-3">
                  <h3 className="text-[14px] font-bold text-[#031632] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#00658d] text-white flex items-center justify-center text-[11px]">
                      {level}
                    </span>
                    Kasus Level {level}
                  </h3>
                  <div className="space-y-3">
                    {levelCases.map((dCase) => {
                      const completedGames = user.completedGames || [];
                      const isCompleted = completedGames.includes(dCase.id);
                      const isLocked = isLevelLocked;
                      return (
                        <button
                          key={dCase.id}
                          disabled={isCompleted || isLocked}
                          onClick={() => startDetectivePlay(dCase.originalIndex)}
                          className={`w-full flex items-center justify-between p-4 rounded-2xl border-2 transition-all ${
                            isCompleted
                              ? 'border-[#dce3eb] bg-[#f6faff] opacity-70 cursor-not-allowed'
                              : isLocked 
                              ? 'border-[#e8eff7] bg-[#f0f3f7] opacity-60 cursor-not-allowed'
                              : 'border-[#e8eff7] hover:border-[#00658d] hover:bg-[#edf4fc] cursor-pointer'
                          }`}
                        >
                          <div className="text-left flex-1">
                            <h3 className={`font-bold text-[14px] ${isCompleted || isLocked ? 'text-[#75777e]' : 'text-[#031632]'}`}>
                              {dCase.title}
                            </h3>
                          </div>
                          {isCompleted ? (
                            <span className="text-[12px] font-bold text-[#00658d] flex items-center gap-1 bg-[#d7e2ff] px-2 py-1 rounded-lg">
                              <span className="material-symbols-outlined text-[16px]">check_circle</span>
                              Terpecahkan
                            </span>
                          ) : isLocked ? (
                             <span className="text-[12px] font-bold text-[#ba1a1a] flex items-center gap-1 bg-[#ffdad6]/50 px-2 py-1 rounded-lg">
                              <span className="material-symbols-outlined text-[16px]">lock</span>
                              Terkunci
                            </span>
                          ) : (
                            <span className="material-symbols-outlined text-[#2dbcfe]">search</span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 2B. DETECTIVE PLAY
  if (activeMode === 'detective_play') {
    const detectiveCase = DETECTIVE_CASES[selectedCaseIndex];
    return (
      <div id="detective-view" className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveMode('detective_list')}
            className="flex items-center gap-1 text-[13px] font-bold text-[#00658d] bg-white px-3 py-1.5 rounded-full shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali
          </button>
          <span className="text-[12px] font-bold text-[#00658d] bg-[#d7e2ff] px-3 py-1 rounded-full">
            Investigasi Kasus
          </span>
        </div>

        <div className="bg-white rounded-[24px] p-6 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#2dbcfe]/20">
          <h2 className="text-[18px] md:text-[20px] font-bold text-[#031632] mb-2">
            {detectiveCase.title}
          </h2>
          <p className="text-[14px] text-[#44474d] leading-relaxed mb-4">
            {detectiveCase.story}
          </p>

          <div className="p-4 rounded-2xl bg-[#edf4fc] border border-[#dce3eb] mb-5">
            <h3 className="text-[13px] font-bold text-[#00658d] mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px]">search</span>
              Petunjuk di Tempat Kejadian:
            </h3>
            <ul className="space-y-1.5 text-[13px] text-[#031632]">
              {detectiveCase.clues.map((clue, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#00658d] font-bold">🔍</span>
                  <span>{clue}</span>
                </li>
              ))}
            </ul>
          </div>

          <h3 className="text-[15px] font-bold text-[#031632] mb-3">
            {detectiveCase.question}
          </h3>

          <div className="space-y-2.5 mb-5">
            {shuffledDetectiveChoices.map((choice, idx) => (
              <button
                key={idx}
                disabled={caseSolved}
                onClick={() => setSelectedCaseAnswer(choice.originalIndex)}
                className={`w-full text-left p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                  selectedCaseAnswer === choice.originalIndex
                    ? 'border-[#00658d] bg-[#c6e7ff] font-semibold text-[#004c6b]'
                    : 'border-[#e8eff7] bg-white text-[#031632] hover:bg-[#f6faff]'
                }`}
              >
                {choice.text}
              </button>
            ))}
          </div>

          {caseSolved && (
            <div className="p-4 rounded-xl bg-[#edf4fc] border border-[#00658d] text-[#00658d] text-[13px] mb-4">
              <p className="font-bold mb-1">🎉 Kasus Terpecahkan! (+{detectiveCase.reward} XP)</p>
              <p>
                Bukti yang kamu kumpulkan sangat penting untuk menyelesaikan kasus perundungan ini dengan adil.
              </p>
            </div>
          )}

          {!caseSolved ? (
            <button
              disabled={selectedCaseAnswer === null}
              onClick={handleSolveDetective}
              className="w-full gradient-btn text-white py-3.5 rounded-xl font-bold text-[14px] disabled:opacity-50 cursor-pointer"
            >
              Pecahkan Kasus
            </button>
          ) : (
            <button
              onClick={() => setActiveMode('detective_list')}
              className="w-full bg-[#edf4fc] text-[#00658d] py-3.5 rounded-xl font-bold text-[14px] cursor-pointer hover:bg-[#dce3eb]"
            >
              Kembali ke Daftar Kasus
            </button>
          )}
        </div>
      </div>
    );
  }

  // 3. BADGES LIST
  if (activeMode === 'badges') {
    return (
      <div id="badges-collection-view" className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setActiveMode('hub')}
            className="flex items-center gap-1 text-[13px] font-bold text-[#00658d] bg-white px-3 py-1.5 rounded-full shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Kembali
          </button>
          <span className="text-[12px] font-bold text-[#00658d] bg-[#d7e2ff] px-3 py-1 rounded-full">
            Koleksi Lencana
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {BADGES_LIST.map((badge) => {
            const isUnlocked = user.earnedBadges.includes(badge.id);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border transition-all ${
                  isUnlocked
                    ? 'bg-white border-[#2dbcfe]/30 shadow-[0px_4px_16px_rgba(26,43,72,0.05)]'
                    : 'bg-[#edf4fc]/50 border-dashed border-[#c5c6ce] opacity-70'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center ${
                      isUnlocked
                        ? 'bg-[#2dbcfe] text-white shadow-sm'
                        : 'bg-[#dce3eb] text-[#75777e]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {badge.icon}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#031632]">
                      {badge.name}
                    </h4>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full ${
                        isUnlocked
                          ? 'bg-[#c6e7ff] text-[#004c6b]'
                          : 'bg-[#dce3eb] text-[#75777e]'
                      }`}
                    >
                      {isUnlocked ? 'Terbuka' : 'Terkunci'}
                    </span>
                  </div>
                </div>
                <p className="text-[12px] text-[#44474d] leading-relaxed">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 4. MAIN GAME HUB
  return (
    <div id="game-hub-main" className="flex flex-col gap-5">
      {/* Player Stats Bar */}
      <section className="glass-card rounded-[22px] p-5 border border-white shadow-[0px_4px_20px_rgba(26,43,72,0.05)]">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#00658d]">
              STATUS PEMAIN
            </span>
            <h2 className="text-[20px] font-extrabold text-[#031632]">
              {user.name}
            </h2>
          </div>
          <div className="text-right">
            <span className="text-[11px] text-[#44474d]">Total Skor</span>
            <p className="text-[18px] font-black text-[#00658d]">
              {user.points} XP
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2.5 pt-3 border-t border-[#e8eff7] text-center">
          <div className="p-2 bg-[#f6faff] rounded-xl">
            <span className="text-[11px] text-[#44474d]">Level</span>
            <p className="font-bold text-[#031632]">{user.level}</p>
          </div>
          <div className="p-2 bg-[#f6faff] rounded-xl">
            <span className="text-[11px] text-[#44474d]">Streak</span>
            <p className="font-bold text-[#00658d]">🔥 {user.streakDays} Hari</p>
          </div>
          <div
            onClick={() => setActiveMode('badges')}
            className="p-2 bg-[#edf4fc] rounded-xl cursor-pointer hover:bg-[#e2e9f1] transition-colors"
          >
            <span className="text-[11px] text-[#00658d] font-bold">Lencana</span>
            <p className="font-bold text-[#031632]">
              {user.earnedBadges.length}/{BADGES_LIST.length}
            </p>
          </div>
        </div>
      </section>

      {/* Game Modes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Quick Decision */}
        <div
          id="game-mode-quick"
          onClick={() => setActiveMode('quick_list')}
          className="bg-white rounded-[22px] p-5 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#2dbcfe]/20 hover:scale-[1.02] transition-all cursor-pointer group"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#c6e7ff] text-[#00658d] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[28px]">timer</span>
          </div>
          <h3 className="text-[17px] font-bold text-[#031632] mb-1">
            ⏱️ Quick Decision
          </h3>
          <p className="text-[13px] text-[#44474d] leading-relaxed mb-3">
            Uji kecepatan refleks dan empati dalam waktu 10 detik per skenario.
          </p>
          <div className="flex items-center justify-between mt-auto">
             <span className="text-[12px] font-bold text-[#00658d] flex items-center gap-1">
               Main Sekarang <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
             </span>
             <span className="text-[10px] bg-[#f6faff] text-[#44474d] px-2 py-1 rounded font-bold border">
               {QUICK_DECISION_CARDS.length} Level
             </span>
          </div>
        </div>

        {/* SIGAP Detective */}
        <div
          id="game-mode-detective"
          onClick={() => setActiveMode('detective_list')}
          className="bg-white rounded-[22px] p-5 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#2dbcfe]/20 hover:scale-[1.02] transition-all cursor-pointer group flex flex-col"
        >
          <div className="w-12 h-12 rounded-2xl bg-[#d7e2ff] text-[#031632] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
            <span className="material-symbols-outlined text-[28px]">search</span>
          </div>
          <h3 className="text-[17px] font-bold text-[#031632] mb-1">
            🔍 SIGAP Detective
          </h3>
          <p className="text-[13px] text-[#44474d] leading-relaxed mb-3">
            Analisis bukti dan temukan solusi adil untuk kasus misteri sekolah.
          </p>
          <div className="flex items-center justify-between mt-auto">
             <span className="text-[12px] font-bold text-[#00658d] flex items-center gap-1">
               Pecahkan Kasus <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
             </span>
             <span className="text-[10px] bg-[#f6faff] text-[#44474d] px-2 py-1 rounded font-bold border">
               {DETECTIVE_CASES.length} Kasus
             </span>
          </div>
        </div>
      </div>
    </div>
  );
};
