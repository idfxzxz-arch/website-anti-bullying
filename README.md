# 🛡️ SIGAP - Sistem Informasi & Gerakan Anti-Perundungan

SIGAP adalah platform edukasi, pelaporan, dan pendampingan krisis anti-perundungan (anti-bullying) berbasis web yang dirancang khusus dengan pendekatan psikologi remaja dan UI/UX yang sangat modern.

Aplikasi ini menggabungkan kecerdasan buatan (AI) yang suportif, sistem pelaporan responsif yang aman, dan pembelajaran interaktif berbasis *game* (Gamifikasi) untuk menghilangkan rasa takut siswa dalam bersuara.

## ✨ Fitur Utama

- **🛡️ Lapor Aman (Terintegrasi Discord)**: Sistem pelaporan perundungan anonim yang langsung terhubung secara *real-time* dengan *channel* Discord Satgas / Guru BK menggunakan Webhook. Mendukung unggahan lampiran foto sebagai barang bukti.
- **🤖 Tanya SIGAP AI**: Konselor pribadi 24/7 yang hangat, suportif, dan empatik. Dilengkapi kecerdasan buatan (*Prompt Engineering* khusus) untuk memvalidasi perasaan dan meredam kepanikan emosional siswa.
- **🎮 SIGAP Game & Simulasi**: Belajar edukasi *anti-bullying* melalui skenario *roleplay*, tebak cepat (*Quick Decision*), dan detektif kasus. Dilengkapi sistem XP (Experience Points), Leveling, dan Badges (Lencana).
- **📚 Modul Belajar Interaktif**: Materi edukasi modern mengenai berbagai jenis perundungan (Fisik, Verbal, *Cyberbullying*) dengan visual menarik.
- **🔔 Pusat Notifikasi Dinamis**: Pemberitahuan interaktif saat siswa mencapai *Level Up*, mendapatkan Lencana baru, atau ketika laporan telah sukses dikirim ke server.

## 🚀 Cara Menjalankan Aplikasi di Komputer Lokal

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/idfxzxz-arch/website-anti-bullying.git
   cd website-anti-bullying
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi Variabel Lingkungan (`.env`)**
   Buat file bernama `.env` di *root folder* proyek Anda dan isi dengan konfigurasi berikut:
   ```env
   # Endpoint AI Lokal
   LOCAL_API_KEY="isi_dengan_kunci_api_anda"
   LOCAL_MODEL_NAME="cx/gpt-5.5"

   # URL Aplikasi
   APP_URL="http://localhost:5173"
   
   # Webhook Integrasi
   DISCORD_WEBHOOK_URL="https://discord.com/api/webhooks/xxxx/xxxx"
   ```

4. **Jalankan Server Development:**
   ```bash
   npm run dev
   ```

## 🛠️ Stack Teknologi
- **Frontend**: React (Vite), TypeScript, Tailwind CSS, Google Material Symbols.
- **Backend**: Node.js, Express.js.
- **Integrasi**: Discord Webhooks API (Pusat Notifikasi Darurat).

---
*Dibangun dengan komitmen untuk menciptakan sekolah dan lingkungan belajar yang lebih aman bagi generasi masa depan.*
