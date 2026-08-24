import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const CUSTOM_ENDPOINT = "http://192.168.1.8:20128/v1/chat/completions";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "SIGAP Backend" });
  });

  // Tanya SIGAP AI Endpoint
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history = [] } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Pesan tidak boleh kosong." });
      }

      const systemInstruction = `Kamu adalah SIGAP AI, asisten pendamping dan konselor virtual yang hangat, suportif, empatik, tenang, dan aman untuk siswa sekolah (SMP/SMA) di Indonesia dalam menghadapi situasi perundungan/bullying (verbal, fisik, sosial/pengucilan, atau cyberbullying).

Pedoman Komunikasi:
1. Validasi perasaan pengguna dengan ramah, tidak menghakimi, dan menenangkan. Gunakan bahasa Indonesia santai namun sopan dan mudah dipahami anak muda ("kamu", "aku").
2. Berikan saran praktis langkah demi langkah yang aman (tidak membalas kekerasan dengan kekerasan).
3. Jika situasi berbahaya atau darurat, selalu ingatkan dengan lembut untuk memberitahu orang dewasa tepercaya (orang tua, wali kelas, guru BK, atau hotline anak 129).
4. Jangan terlalu panjang berbelit-belit; buat jawaban terstruktur, menenangkan, dan berikan opsi tindakan berikutnya.
5. BATASAN KETAT: Kamu HANYA BOLEH membahas topik seputar perundungan (bullying), masalah sekolah, pertemanan, kesehatan emosional, dan konseling remaja. Jika pengguna bertanya hal di luar topik ini (contoh: coding, matematika, politik, resep masakan, dll), tolak dengan sopan dan ingatkan bahwa kamu adalah AI khusus pendampingan krisis dan pertemanan sekolah.`;

      // Build context from history
      const formattedMessages = [
        { role: "system", content: systemInstruction },
        ...history.map((h: { role: string; text: string }) => ({
          role: h.role === "user" ? "user" : "assistant",
          content: h.text,
        })),
        { role: "user", content: message },
      ];

      const apiKey = process.env.LOCAL_API_KEY || "";
      const modelName = process.env.LOCAL_MODEL_NAME || "local-model";

      const response = await fetch(CUSTOM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelName,
          messages: formattedMessages,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Local API error: ${response.status}`);
      }

      const data = await response.json();
      const replyText =
        data.choices?.[0]?.message?.content ||
        "Aku di sini mendengarkanmu. Jangan ragu bercerita lebih lanjut ya.";

      res.json({ reply: replyText });
    } catch (error) {
      console.error("Local Chat Error:", error);
      res.status(500).json({
        reply:
          "Aku selalu siap mendengarkan. Terkadang situasi perundungan memang berat, tapi kamu berani untuk berbicara. Kamu bisa memilih untuk mencatat bukti, bercerita ke teman tepercaya, atau membuat laporan aman di SIGAP.",
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

      const prompt = `Analisis hasil kuis deteksi situasi perundungan siswa berikut:
Jawaban Kuis: ${JSON.stringify(answers)}

Tolong berikan penilaian singkat yang empatik apakah situasi ini tergolong perundungan (bullying), konflik sebaya biasa, atau situasi lainnya, beserta penjelasan ramah dan 3 langkah rekomendasi aman bagi siswa dalam format JSON. Balas hanya dengan objek JSON murni tanpa markdown, dengan struktur berikut:
{
  "verdict": "Potensi Perundungan (Bullying)",
  "explanation": "Penjelasan mengapa situasi ini terjadi.",
  "recommendations": ["Rekomendasi 1", "Rekomendasi 2", "Rekomendasi 3"]
}`;

      const apiKey = process.env.LOCAL_API_KEY || "";
      const modelName = process.env.LOCAL_MODEL_NAME || "local-model";

      const response = await fetch(CUSTOM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: modelName,
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        throw new Error(`Local API Error: ${response.status}`);
      }

      const data = await response.json();
      let replyText = data.choices?.[0]?.message?.content || "{}";

      // Bersihkan teks dari blok markdown jika ada
      replyText = replyText.replace(/```json/g, "").replace(/```/g, "").trim();

      const result = JSON.parse(replyText);
      res.json(result);
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

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`SIGAP Server running on http://localhost:${PORT}`);
  });
}

startServer();
