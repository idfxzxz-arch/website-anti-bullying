import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Tidak butuh API karena chat sekarang bersifat rule-based lokal

// Health check endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "SIGAP Backend (Vercel Serverless)" });
});

// Tanya SIGAP AI Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { message, history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Pesan tidak boleh kosong." });
    }
    const text = message.toLowerCase();
    let replyText = "";

    // 1. Deteksi Salam
    if (text.match(/^(halo|hai|pagi|siang|sore|malam|assalamualaikum|hey|hy)/i)) {
      replyText = "Halo! 👋 Aku SIGAP, asisten yang siap mendengarkan cerita dan keluh kesahmu di sekolah. Ada yang bisa aku bantu hari ini? Jangan ragu untuk bercerita ya.";
    } 
    // 2. Deteksi Ancaman / Kekerasan Fisik
    else if (text.match(/(takut|dipukul|ditendang|diancam|dikroyok|ditampar|luka)/i)) {
      replyText = "Aku sangat sedih mendengar kamu mengalami ini, dan yang paling penting: **Ini bukan salahmu**. Keselamatan fisikmu adalah prioritas utama. Tolong secepatnya beri tahu orang dewasa yang kamu percaya (seperti orang tua, guru BK, atau wali kelas). Jika kamu merasa dalam bahaya sekarang, segera menyingkir ke tempat ramai atau ruang guru. Kamu juga bisa menggunakan fitur 'Lapor Aman' di aplikasi ini untuk merekam buktinya.";
    }
    // 3. Deteksi Bullying Verbal / Cyberbullying
    else if (text.match(/(diejek|dihina|dikatai|jelek|gendut|bodoh|cupu|sosmed|instagram|tiktok|dikucilkan|dijauhi|sendiri)/i)) {
      replyText = "Pasti rasanya sakit sekali diperlakukan seperti itu. Aku mengerti perasaanmu. Ingatlah bahwa kata-kata buruk mereka tidak mendefinisikan siapa dirimu. Cobalah untuk mengabaikan mereka atau jangan merespon jika itu di sosmed (jangan beri mereka 'panggung'). Jika ini terus berlanjut dan mengganggu pikiranmu, ceritakan ke teman dekat atau guru yang kamu percaya agar kamu tidak memendamnya sendirian.";
    }
    // 4. Deteksi Pertanyaan Bantuan / Fitur Lapor
    else if (text.match(/(lapor|bantuan|cara|tolong|sigap)/i)) {
      replyText = "Kamu bisa menggunakan fitur **Lapor Aman** di aplikasi SIGAP ini. Laporanmu akan diteruskan langsung ke Satgas Anti-Bullying di sekolah secara rahasia. Kamu bisa melampirkan foto/screenshot bukti dan kronologi kejadiannya. Jangan takut, identitasmu bisa disamarkan (anonim) jika kamu memilih opsi tersebut.";
    }
    // 5. Fallback Default
    else {
      replyText = "Terima kasih sudah berbagi denganku. Aku di sini untuk mendengarkan. Apakah kamu mau bercerita lebih detail tentang kejadiannya atau bagaimana perasaanmu saat ini? Ingat, kamu tidak harus menghadapi ini sendirian.";
    }

    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("Local Chat Error:", error);
    res.status(500).json({
      reply: `[SISTEM ERROR]: Gagal memproses pesan. Pastikan aplikasi berjalan normal.`,
    });
  }
});

// Discord Report Endpoint
app.post("/api/submit-report", async (req, res) => {
  try {
    const report = req.body;
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

    if (!webhookUrl) {
      console.warn("Discord Webhook URL belum disetting di .env. Laporan hanya disimpan lokal.");
      return res.json({ success: true, message: "Laporan lokal." });
    }

    const discordPayload: any = {
      username: "SIGAP Reporter",
      avatar_url: "https://cdn-icons-png.flaticon.com/512/3273/3273403.png",
      embeds: [
        {
          title: "🚨 Laporan Perundungan Masuk (SIGAP) 🚨",
          description: "Sistem menerima laporan baru dari aplikasi SIGAP yang memerlukan peninjauan Satgas.",
          color: 15158332, // Red color
          fields: [
            { name: "ID Laporan", value: `\`${report.id}\``, inline: true },
            { name: "Peran Pelapor", value: report.role === 'victim' ? '👤 Korban' : report.role === 'witness' ? '👁️ Saksi' : '🤝 Bantu Teman', inline: true },
            { name: "Status Identitas", value: report.isAnonymous ? "🕵️ Anonim" : "Terbuka", inline: true },
            { name: "Kategori Kejadian", value: report.incidentType, inline: false },
            { name: "Lokasi", value: report.location, inline: true },
            { name: "Waktu Kejadian", value: report.datetime, inline: true },
            { name: "Kronologi Kejadian", value: `> ${report.description}`, inline: false },
            { name: "Bukti Lampiran", value: report.hasAttachment ? `📎 ${report.fileName}` : "Tidak ada file lampiran", inline: false }
          ],
          footer: {
            text: `Dikirim pada: ${report.createdAt} | SIGAP System`
          }
        }
      ]
    };

    const formData = new FormData();
    
    if (report.fileBase64) {
      const matches = report.fileBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (matches && matches.length === 3) {
        const type = matches[1];
        const buffer = Buffer.from(matches[2], 'base64');
        const blob = new Blob([buffer], { type });
        const actualFileName = report.fileName || "attachment.png";
        
        formData.append("file", blob, actualFileName);
        discordPayload.embeds[0].image = { url: `attachment://${actualFileName}` };
      }
    }

    formData.append("payload_json", JSON.stringify(discordPayload));

    const response = await fetch(webhookUrl, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Discord Webhook Error: ${response.status} - ${errText}`);
    }

    res.json({ success: true, message: "Terkirim ke Discord" });
  } catch (err) {
    console.error("Gagal mengirim ke Discord:", err);
    // Tetap kembalikan 200 agar frontend tidak error, laporan tetap diproses
    res.json({ success: false, error: "Gagal mengirim Discord" });
  }
});

// Situation analysis endpoint
app.post("/api/analyze-situation", async (req, res) => {
  try {
    const { answers } = req.body;
    let score = 0;
    const values = Object.values(answers) as string[];
    
    // Simple scoring mechanism based on typical bullying answers
    values.forEach((ans) => {
      const lowerAns = ans.toLowerCase();
      if (lowerAns.includes("sering") || lowerAns.includes("selalu") || lowerAns.includes("sengaja") || lowerAns.includes("banyak orang") || lowerAns.includes("fisik") || lowerAns.includes("sosmed")) {
        score += 3;
      } else if (lowerAns.includes("kadang") || lowerAns.includes("bercanda") || lowerAns.includes("teman")) {
        score += 1;
      }
    });

    let verdict = "";
    let explanation = "";
    let recommendations: string[] = [];

    if (score >= 6) {
      verdict = "Potensi Perundungan (Bullying) Tinggi";
      explanation = "Berdasarkan jawabanmu, situasi yang kamu alami menunjukkan pola perundungan yang serius, disengaja, dan berulang.";
      recommendations = [
        "Segera laporkan kejadian ini ke Guru BK atau Wali Kelas.",
        "Gunakan fitur 'Lapor Aman' di aplikasi ini agar satgas sekolah bisa turun tangan.",
        "Jangan berada di tempat sepi sendirian, selalu cari teman yang bisa dipercaya."
      ];
    } else if (score >= 3) {
      verdict = "Potensi Konflik Sebaya / Perundungan Ringan";
      explanation = "Situasi ini membuatmu tidak nyaman, namun mungkin berawal dari konflik antar teman atau candaan yang kelewatan batas.";
      recommendations = [
        "Sampaikan dengan tegas ke temanmu bahwa kamu tidak suka diperlakukan seperti itu.",
        "Abaikan mereka yang mencari perhatian negatif darimu.",
        "Jika berlanjut, jangan ragu untuk bercerita kepada guru."
      ];
    } else {
      verdict = "Situasi Aman / Interaksi Normal";
      explanation = "Dari ceritamu, sepertinya situasi di sekitarmu masih tergolong normal dan terkendali. Tidak ada tanda bahaya bullying yang kuat.";
      recommendations = [
        "Tetap jaga pertemanan yang sehat dan positif.",
        "Jadilah *upstander*, bantu temanmu jika kamu melihat mereka di-bully.",
        "Simpan aplikasi SIGAP untuk berjaga-jaga jika kamu atau temanmu butuh bantuan kelak."
      ];
    }

    res.json({
      verdict,
      explanation,
      recommendations
    });
  } catch (err) {
    console.error("Situation Analysis Error:", err);
    res.json({
      verdict: "Perlu Perhatian & Tindakan",
      explanation:
        "Berdasarkan informasi yang kamu bagikan, ini adalah situasi yang membuat tidak nyaman dan kamu berhak mendapatkan rasa aman.",
      recommendations: [
        "Bercerita kepada orang dewasa yang dipercaya.",
        "Gunakan fitur Lapor Aman untuk mencatat bukti.",
        "Cari teman suportif di sekolah.",
      ],
    });
  }
});

export default app;
