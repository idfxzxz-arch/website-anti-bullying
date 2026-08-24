import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ScreenType } from '../types';

interface AiChatProps {
  onNavigate: (screen: ScreenType) => void;
}

export const AiChat: React.FC<AiChatProps> = ({ onNavigate }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Halo! Aku SIGAP AI, teman amanmu untuk bercerita. Apapun yang kamu alami atau saksikan di sekolah, kamu bisa ceritakan di sini tanpa rasa takut. Percakapan ini aman dan privat. Ada yang bisa kubantu?',
      timestamp: 'Baru saja',
    },
  ]);
  const [inputVal, setInputVal] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Aku sering diejek nama orang tua',
    'Aku melihat teman dikucilkan di kelas',
    'Bagaimana cara hadapi cyberbullying?',
    'Merasa cemas untuk berangkat ke sekolah',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || inputVal.trim();
    if (!messageText || loading) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputVal('');
    setLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        text: m.text,
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: historyPayload,
        }),
      });

      const data = await res.json();
      const aiReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text:
          data.reply ||
          'Terima kasih sudah berbagi. Ingat bahwa kamu tidak sendirian dan apa yang kamu rasakan penting untuk didengar.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiReply]);
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackReply: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text:
          'Aku mendengarkanmu. Situasi yang kamu ceritakan memang membutuhkan ketenangan. Jika kamu merasa terancam, selalu hubungi Guru BK atau orang tua yang kamu percaya.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackReply]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="ai-chat-container" className="flex flex-col h-full max-w-full">
      {/* Safe Disclaimer Banner */}
      <div className="bg-[#edf4fc] p-3 rounded-2xl border border-[#2dbcfe]/30 flex items-center justify-between gap-2 mb-3 shrink-0">
        <div className="flex items-center gap-2 text-[12px] text-[#00658d]">
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            lock
          </span>
          <span className="font-semibold">
            Ruang Aman & Privat • Didukung oleh SIGAP AI
          </span>
        </div>
        <button
          onClick={() => onNavigate('report')}
          className="text-[11px] font-bold bg-white text-[#ba1a1a] px-2.5 py-1 rounded-lg border border-[#ffdad6] hover:bg-[#ffdad6]/40 transition-colors cursor-pointer"
        >
          Lapor Resmi
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 mb-3">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-[#2dbcfe] text-white flex items-center justify-center shrink-0 shadow-xs mt-1">
                  <span className="material-symbols-outlined text-[18px]">
                    smart_toy
                  </span>
                </div>
              )}
              <div
                className={`max-w-[82%] p-4 rounded-2xl text-[14px] leading-relaxed shadow-xs ${
                  isUser
                    ? 'bg-[#00658d] text-white rounded-tr-xs'
                    : 'glass-card text-[#031632] border border-white rounded-tl-xs'
                }`}
              >
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span
                  className={`block text-[10px] mt-1.5 ${
                    isUser ? 'text-blue-100 text-right' : 'text-[#75777e]'
                  }`}
                >
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}

        {loading && (
          <div className="flex gap-2.5 items-center">
            <div className="w-8 h-8 rounded-full bg-[#2dbcfe] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
            </div>
            <div className="glass-card p-3.5 rounded-2xl border border-white flex items-center gap-1.5 text-[#00658d] text-[13px]">
              <span className="animate-pulse font-medium">SIGAP AI sedang mengetik...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompt Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-2 thin-scrollbar shrink-0">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            className="text-[12px] whitespace-nowrap bg-white border border-[#2dbcfe]/30 text-[#00658d] hover:bg-[#edf4fc] font-medium px-3 py-1.5 rounded-full shadow-2xs transition-colors cursor-pointer shrink-0"
          >
            💬 {prompt}
          </button>
        ))}
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="glass-panel p-2 rounded-2xl flex items-center gap-2 border border-white/80 shrink-0"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Ketik ceritamu atau tanyakan sesuatu..."
          className="flex-1 bg-transparent px-3 py-2 text-[14px] text-[#031632] outline-none placeholder:text-[#75777e]"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || loading}
          className="w-10 h-10 rounded-xl gradient-btn text-white flex items-center justify-center disabled:opacity-40 transition-all cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">send</span>
        </button>
      </form>
    </div>
  );
};
