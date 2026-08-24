import React from 'react';
import { IncidentReport, ScreenType } from '../types';

interface ReportSuccessProps {
  report: IncidentReport;
  onNavigate: (screen: ScreenType) => void;
}

export const ReportSuccess: React.FC<ReportSuccessProps> = ({
  report,
  onNavigate,
}) => {
  return (
    <div id="report-success-screen" className="flex flex-col items-center justify-center py-6 text-center animate-fadeIn">
      {/* Animated Shield Logo */}
      <div className="w-24 h-24 rounded-full bg-[#c6e7ff] flex items-center justify-center pulse-shield mb-5">
        <div className="w-16 h-16 rounded-full bg-[#00658d] text-white flex items-center justify-center shadow-lg">
          <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            verified_user
          </span>
        </div>
      </div>

      <span className="text-[12px] font-extrabold uppercase tracking-wider text-[#00658d] bg-[#d7e2ff] px-3.5 py-1 rounded-full mb-2">
        Terkirim Aman & Terenkripsi
      </span>

      <h1 className="text-[24px] md:text-[28px] font-black text-[#031632] mb-2">
        Laporan Berhasil Terkirim
      </h1>

      <p className="text-[14px] text-[#44474d] max-w-[320px] mb-6 leading-relaxed">
        Terima kasih atas keberanianmu. Laporanmu telah masuk ke antrean perlindungan sekolah.
      </p>

      {/* Ticket Card */}
      <div className="w-full bg-white rounded-[24px] p-6 shadow-[0px_6px_24px_rgba(26,43,72,0.06)] border border-[#2dbcfe]/30 mb-6 text-left space-y-3">
        <div className="flex justify-between items-center pb-3 border-b border-[#e8eff7]">
          <span className="text-[12px] text-[#75777e]">ID Laporan</span>
          <span className="text-[14px] font-mono font-bold text-[#00658d]">
            {report.id}
          </span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-[#e8eff7]">
          <span className="text-[12px] text-[#75777e]">Status Saat Ini</span>
          <span className="text-[12px] font-bold text-[#00658d] bg-[#edf4fc] px-2.5 py-0.5 rounded-full">
            {report.status}
          </span>
        </div>
        <div className="flex justify-between items-center pb-3 border-b border-[#e8eff7]">
          <span className="text-[12px] text-[#75777e]">Privasi</span>
          <span className="text-[12px] font-bold text-[#031632]">
            {report.isAnonymous ? '🔒 Anonim (Dirahasiakan)' : 'Nama Terverifikasi'}
          </span>
        </div>
        <div>
          <span className="text-[12px] text-[#75777e] block mb-1">Catatan Tim:</span>
          <p className="text-[12.5px] text-[#44474d] leading-relaxed bg-[#f6faff] p-3 rounded-xl">
            {report.counselorNotes}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 w-full">
        <button
          onClick={() => onNavigate('report_status')}
          className="w-full gradient-btn text-white py-4 rounded-xl font-bold text-[14px] cursor-pointer"
        >
          Lihat Status & Riwayat Laporan
        </button>
        <button
          onClick={() => onNavigate('home')}
          className="w-full bg-[#edf4fc] text-[#00658d] py-3.5 rounded-xl font-bold text-[14px] hover:bg-[#e2e9f1] cursor-pointer transition-colors"
        >
          Kembali ke Beranda
        </button>
      </div>
    </div>
  );
};
