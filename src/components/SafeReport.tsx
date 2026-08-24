import React, { useState } from 'react';
import { IncidentReport, ScreenType } from '../types';

interface SafeReportProps {
  onSubmitReport: (report: IncidentReport) => void;
  onNavigate: (screen: ScreenType) => void;
}

export const SafeReport: React.FC<SafeReportProps> = ({
  onSubmitReport,
  onNavigate,
}) => {
  const [role, setRole] = useState<'victim' | 'witness' | 'helper'>('victim');
  const [description, setDescription] = useState('');
  const [datetime, setDatetime] = useState(
    new Date().toISOString().slice(0, 16)
  );
  const [location, setLocation] = useState('');
  const [incidentType, setIncidentType] = useState('Verbal (Ejekan / Julukan)');
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const incidentTypes = [
    'Verbal (Ejekan / Julukan / Hinaan)',
    'Sosial (Pengucilan / Penyebaran Rumor)',
    'Cyberbullying (Media Sosial / Chat)',
    'Fisik (Mendorong / Memukul / Merusak Barang)',
    'Pemalakan / Pemerasan Finansial',
    'Lainnya',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFileName(selectedFile.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setFileBase64(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !location.trim()) return;

    setIsSubmitting(true);

    const newReport: IncidentReport = {
      id: `SIGAP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      createdAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
      role,
      description,
      datetime,
      location,
      incidentType,
      hasAttachment: !!fileName,
      fileName: fileName || undefined,
      fileBase64: fileBase64 || undefined,
      isAnonymous,
      status: 'Sedang Ditinjau',
      counselorNotes:
        'Laporan telah terenkripsi dan diterima oleh Tim Satgas PPKSP (Pencegahan & Penanganan Kekerasan Satuan Pendidikan).',
    };

    try {
      await fetch('/api/submit-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReport),
      });
    } catch (err) {
      console.error('Gagal memproses pengiriman Telegram:', err);
    }

    setIsSubmitting(false);
    onSubmitReport(newReport);
  };

  return (
    <div id="safe-report-container" className="flex flex-col gap-5 pb-8">
      {/* Header Info */}
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#ffdad6] text-[#93000a] text-[11px] font-extrabold rounded-full uppercase tracking-wider mb-2">
          <span className="material-symbols-outlined text-[15px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            shield
          </span>
          Layanan Rahasia & Terlindungi
        </div>
        <h1 className="text-[24px] md:text-[28px] font-bold text-[#031632] mb-1">
          Lapor Aman
        </h1>
        <p className="text-[13.5px] text-[#44474d] max-w-[340px] mx-auto">
          Laporkan perundungan untuk dirimu atau temanmu tanpa rasa takut.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4.5">
        {/* 1. Role Selection */}
        <div className="bg-white rounded-[22px] p-5 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#e8eff7]">
          <label className="block text-[14px] font-bold text-[#031632] mb-3">
            Siapa kamu dalam kejadian ini?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'victim', label: 'Saya Mengalami', icon: 'person' },
              { id: 'witness', label: 'Saya Melihat', icon: 'visibility' },
              { id: 'helper', label: 'Bantu Teman', icon: 'volunteer_activism' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                id={`report-role-${item.id}`}
                onClick={() => setRole(item.id as 'victim' | 'witness' | 'helper')}
                className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                  role === item.id
                    ? 'border-[#00658d] bg-[#c6e7ff] text-[#004c6b] font-bold shadow-xs'
                    : 'border-[#e8eff7] bg-[#f6faff] text-[#44474d]'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">
                  {item.icon}
                </span>
                <span className="text-[11.5px] text-center leading-tight">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Incident Details */}
        <div className="bg-white rounded-[22px] p-5 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#e8eff7] space-y-4">
          <div>
            <label className="block text-[13.5px] font-bold text-[#031632] mb-1.5">
              Jenis Perundungan
            </label>
            <select
              value={incidentType}
              onChange={(e) => setIncidentType(e.target.value)}
              className="w-full p-3.5 rounded-xl border border-[#dce3eb] bg-[#f6faff] text-[13.5px] text-[#031632] outline-none focus:border-[#00658d]"
            >
              {incidentTypes.map((t, idx) => (
                <option key={idx} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[13.5px] font-bold text-[#031632] mb-1.5">
              Ceritakan Apa yang Terjadi *
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Jelaskan kronologi kejadian secara singkat, siapa yang terlibat, dan kata/tindakan apa yang dilakukan..."
              className="w-full p-3.5 rounded-xl border border-[#dce3eb] bg-[#f6faff] text-[13.5px] text-[#031632] outline-none focus:border-[#00658d] placeholder:text-[#75777e]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[13px] font-bold text-[#031632] mb-1">
                Lokasi Kejadian *
              </label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Cth: Belakang Kantin, Kelas 8A"
                className="w-full p-3 rounded-xl border border-[#dce3eb] bg-[#f6faff] text-[13px] text-[#031632] outline-none focus:border-[#00658d]"
              />
            </div>
            <div>
              <label className="block text-[13px] font-bold text-[#031632] mb-1">
                Waktu Perkiraan
              </label>
              <input
                type="datetime-local"
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
                className="w-full p-3 rounded-xl border border-[#dce3eb] bg-[#f6faff] text-[13px] text-[#031632] outline-none focus:border-[#00658d]"
              />
            </div>
          </div>
        </div>

        {/* 3. Evidence / File Upload */}
        <div className="bg-white rounded-[22px] p-5 shadow-[0px_4px_20px_rgba(26,43,72,0.05)] border border-[#e8eff7]">
          <label className="block text-[13.5px] font-bold text-[#031632] mb-2">
            Bukti Pendukung (Opsional)
          </label>
          <label className="border-2 border-dashed border-[#2dbcfe]/50 bg-[#edf4fc] rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-[#e2e9f1] transition-colors">
            <span className="material-symbols-outlined text-[28px] text-[#00658d]">
              cloud_upload
            </span>
            <span className="text-[13px] font-bold text-[#00658d]">
              {fileName ? `File: ${fileName}` : 'Unggah Tangkapan Layar / Foto Bukti'}
            </span>
            <span className="text-[11px] text-[#75777e]">
              Format JPG, PNG, atau PDF (Maks. 10MB)
            </span>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>

        {/* 4. Privacy Anonymous Toggle */}
        <div className="glass-card rounded-[22px] p-4.5 border border-white flex items-center justify-between shadow-[0px_4px_16px_rgba(26,43,72,0.05)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#d7e2ff] text-[#00658d] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">
                visibility_off
              </span>
            </div>
            <div>
              <p className="text-[13.5px] font-bold text-[#031632]">
                Kirim sebagai Anonim
              </p>
              <p className="text-[11.5px] text-[#44474d]">
                Identitas dan nama aslimu akan disembunyikan.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`w-12 h-6.5 rounded-full p-1 transition-colors cursor-pointer ${
              isAnonymous ? 'bg-[#00658d]' : 'bg-[#dce3eb]'
            }`}
          >
            <div
              className={`w-4.5 h-4.5 bg-white rounded-full transition-transform ${
                isAnonymous ? 'translate-x-5.5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          id="submit-report-btn"
          className="w-full gradient-btn text-white py-4 px-6 rounded-2xl font-black text-[15px] shadow-[0px_6px_20px_rgba(45,188,254,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <span className="material-symbols-outlined text-[20px]">
              verified_user
            </span>
          )}
          {isSubmitting ? 'Mengamankan Laporan...' : 'Kirim Laporan dengan Aman'}
        </button>

        {/* View Submitted Reports button */}
        <button
          type="button"
          onClick={() => onNavigate('report_status')}
          className="text-center text-[13px] font-bold text-[#00658d] hover:underline cursor-pointer py-1"
        >
          Lihat Riwayat Laporan Saya →
        </button>
      </form>
    </div>
  );
};
