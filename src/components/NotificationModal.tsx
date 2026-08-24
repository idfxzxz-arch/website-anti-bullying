import React, { useEffect, useState } from 'react';

export const addGlobalNotification = (title: string, desc: string, icon: string, color: string) => {
  const stored = sessionStorage.getItem('sigap_notifications');
  let notifs = [];
  if (stored) {
    notifs = JSON.parse(stored);
  } else {
    notifs = [
      {
        id: 1,
        title: 'Pengingat Ruang Aman',
        desc: 'SIGAP AI siap mendengarkan cerita dan keluh kesahmu 24/7.',
        time: 'Sistem',
        icon: 'smart_toy',
        color: 'bg-[#edf4fc] text-[#00658d]',
      },
    ];
  }

  notifs.unshift({
    id: Date.now(),
    title,
    desc,
    time: 'Baru saja',
    icon,
    color,
  });

  sessionStorage.setItem('sigap_notifications', JSON.stringify(notifs));
};

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (isOpen) {
      const stored = sessionStorage.getItem('sigap_notifications');
      if (stored) {
        setNotifications(JSON.parse(stored));
      } else {
        const defaultNotifs = [
          {
            id: 1,
            title: 'Pengingat Ruang Aman',
            desc: 'SIGAP AI siap mendengarkan cerita dan keluh kesahmu 24/7.',
            time: 'Sistem',
            icon: 'smart_toy',
            color: 'bg-[#edf4fc] text-[#00658d]',
          },
        ];
        setNotifications(defaultNotifs);
        sessionStorage.setItem('sigap_notifications', JSON.stringify(defaultNotifs));
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      id="notification-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-start justify-center pt-16 px-4"
      onClick={onClose}
    >
      <div
        id="notification-modal-content"
        className="w-full max-w-[420px] bg-white rounded-[24px] p-5 shadow-[0px_10px_30px_rgba(26,43,72,0.15)] border border-[#e8eff7] animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center pb-3 border-b border-[#e8eff7] mb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00658d]">
              notifications
            </span>
            <h3 className="text-[16px] font-bold text-[#031632]">
              Pusat Notifikasi
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f6faff] flex items-center justify-center text-[#75777e] hover:bg-[#edf4fc] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="p-3.5 rounded-2xl bg-[#f6faff] border border-[#e8eff7] flex items-start gap-3"
            >
              <div
                className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.color}`}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {n.icon}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="text-[13.5px] font-bold text-[#031632]">
                  {n.title}
                </h4>
                <p className="text-[12px] text-[#44474d] leading-relaxed mt-0.5">
                  {n.desc}
                </p>
                <span className="text-[10px] text-[#75777e] mt-1 block">
                  {n.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
