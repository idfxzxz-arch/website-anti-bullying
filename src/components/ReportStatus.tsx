import React from 'react';
import { IncidentReport, ScreenType } from '../types';

interface ReportStatusProps {
  reports: IncidentReport[];
  onNavigate: (screen: ScreenType) => void;
}

export const ReportStatus: React.FC<ReportStatusProps> = ({
  reports,
  onNavigate,
}) => {
  return (
    <div id="report-status-screen" className="flex flex-col gap-5 pb-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-[22px] font-bold text-[#031632]">
            Riwayat Laporan
          </h1>
          <p className="text-[13px] text-[#44474d]">
            Pantau status tindak lanjut pengaduanmu.
          </p>
        </div>
        <button
          onClick={() => onNavigate('report')}
          className="bg-[#2dbcfe] text-white text-[12px] font-bold px-3 py-2 rounded-xl shadow-xs hover:bg-[#00658d] transition-colors cursor-pointer"
        >
          + Buat Laporan Baru
        </button>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white rounded-[24px] p-8 text-center border border-[#e8eff7] shadow-xs">
          <span className="material-symbols-outlined text-[48px] text-[#c5c6ce] mb-2">
            folder_off
          </span>
          <p className="text-[14px] font-bold text-[#031632] mb-1">
            Belum Ada Laporan
          </p>
          <p className="text-[12.5px] text-[#75777e] mb-4">
            Semua laporan yang kamu kirimkan akan tersimpan secara terenkripsi di sini.
          </p>
          <button
            onClick={() => onNavigate('report')}
            className="gradient-btn text-white text-[13px] font-bold py-2.5 px-5 rounded-xl cursor-pointer"
          >
            Buat Laporan Sekarang
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-[22px] p-5 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#2dbcfe]/20 space-y-3.5"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[11px] font-bold font-mono text-[#00658d] bg-[#d7e2ff] px-2.5 py-0.5 rounded-full">
                    {item.id}
                  </span>
                  <h3 className="text-[15px] font-bold text-[#031632] mt-1.5">
                    {item.incidentType}
                  </h3>
                </div>
                <span
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    item.status === 'Selesai'
                      ? 'bg-[#d7e2ff] text-[#00658d]'
                      : 'bg-[#ffdad6] text-[#ba1a1a]'
                  }`}
                >
                  {item.status}
                </span>
              </div>

              <p className="text-[13px] text-[#44474d] bg-[#f6faff] p-3 rounded-xl line-clamp-2">
                "{item.description}"
              </p>

              <div className="grid grid-cols-2 gap-2 text-[12px] text-[#75777e] pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">location_on</span>
                  {item.location}
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px]">schedule</span>
                  {item.createdAt}
                </span>
              </div>

              {item.counselorNotes && (
                <div className="p-3 bg-[#edf4fc] rounded-xl border border-[#2dbcfe]/30">
                  <span className="text-[11px] font-bold text-[#00658d] block mb-0.5 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">support_agent</span>
                    Catatan Guru BK / Satgas:
                  </span>
                  <p className="text-[12px] text-[#031632] leading-relaxed">
                    {item.counselorNotes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
