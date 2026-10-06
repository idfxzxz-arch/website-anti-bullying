import {
  UserProfile,
  LearningModule,
  SimulationCase,
  BadgeItem,
  IncidentReport,
  SituationQuestion,
} from "../types";

export const INITIAL_STUDENT_USER: UserProfile = {
  id: "usr_student_01",
  name: "Siswa SIGAP",
  username: "siswa",
  email: "siswa@sigap.sch.id",
  userRole: "student",
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLchvyawcVsmD3JoG55Xi8PzI-ebjb_bEvDq3sRaWh2_jW4YDBdRi4OKvSwKRzlUSVL6Vwxes_XK5IKUjsBXiDszygEjomD7eIkqryziVO-XFG0zr5487TEyPKCO7F8CynZZXeRQ6O08bmbhSKZmFAYwueCgX99-_tuXYjQcjL__47xVWShf0wuYAaqmhH9O1Du7qFa3zemT8DCnmloLVFbW3jnsT6GTw3Qet5v5XZ-FGIf1_rig",
  role: "Siswa Kelas 8B",
  school: "SMP Harapan Bangsa",
  level: 1,
  levelTitle: "Observer",
  currentXp: 0,
  maxXp: 350,
  points: 0,
  streakDays: 1,
  completedModules: [],
  completedGames: [],
  completedSimulations: [],
  earnedBadges: [],
};

export const INITIAL_ADMIN_USER: UserProfile = {
  id: "usr_admin_01",
  name: "Admin",
  username: "admin",
  email: "admin@sigap.sch.id",
  userRole: "admin",
  avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=256&auto=format&fit=crop",
  role: "Administrator Satgas",
  adminTitle: "Tim Satgas Anti-Bullying (TPPK)",
  school: "SMP Harapan Bangsa",
  level: 1,
  levelTitle: "Administrator",
  currentXp: 0,
  maxXp: 1500,
  points: 0,
  streakDays: 1,
  completedModules: [],
  completedGames: [],
  completedSimulations: [],
  earnedBadges: [],
};

export const INITIAL_USER: UserProfile = INITIAL_STUDENT_USER;

export const DEMO_ACCOUNTS = [
  {
    username: "siswa",
    email: "siswa@sigap.sch.id",
    password: "siswa123",
    role: "student" as const,
    user: INITIAL_STUDENT_USER,
  },
  {
    username: "admin",
    email: "admin@sigap.sch.id",
    password: "admin123",
    role: "admin" as const,
    user: INITIAL_ADMIN_USER,
  },
];

export const ONBOARDING_SLIDES = [
  {
    step: 1,
    title: "Kenali Bullying",
    description:
      "Tidak semua bullying terlihat sebagai kekerasan. Kenali ejekan, pengucilan, tekanan sosial, dan cyberbullying.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDvFhf-mGopRwq0H5M3OJv2JlpBqBLmgoD0fb7hJgNF6q60iIlCuwBS0BM5kFBSZkjiIcgayc3Vmvdaf_c-5zRz8ukWjh5-HrU_qcvwXPZSOiEICVfkPm43ngZHcsvFIE72M_9rIyLW304DmxiVyOmCTc57dBxfXgpAeSuVijnM7Uxxo_bnIeRALeNWxbbe78cWPucir2fIov-IThqQ2xTLR1CkZ95bc9Ul8ZQLj1kNHQOOEfSIwA",
    buttonText: "Berikutnya",
  },
  {
    step: 2,
    title: "Lihat dari Berbagai Sudut Pandang",
    description:
      "Memahami satu kejadian dari sudut pandang yang berbeda membantu kita membangun empati dan mengambil keputusan yang lebih baik.",
    avatars: [
      {
        role: "KORBAN",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzTcvVuIwd175r6j48NVGwIv66vS42CjZsQNZ5ioDRjJNVh32Ztng6QEv-0EAJGHR8hgHynw44kwy2yy9cDYzEPH16VxJzIaIxVWxttvLhyrm8jJUKRFYAHakNK8KgQMFjnYKrGVGkSIdJzb2keGvYpNZ0P3Gxm8HU7w8J9gclruyPAFMEStYI9W4f6t1KS4kqklhXj_0A7wPUaAOBAck__W7n0vBV8udBUPER1iikdMEHBZFF8w",
        bg: "bg-primary-fixed",
      },
      {
        role: "PELAKU",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCT2yeYoAfahajU850TybjZPepHJ-poXsCs5BOn5Vgc0RzZyY9quFLFV1EzmfIzGMIg0Swtge-WoFiiIDf5gMGHF5Bt_2DGeeu04lsihv_b_hqevsOs1LM2UxFs9LvNj6QcRhF042S6hh7qBF5z4e2jgYB4IitVp6Ms7eGacJISvZOpQRmRnNMmqzFaCPYV4iHRSfWSJFnKSJ1PKRk2zrRILuyk2NBj-fTIXLVKoaa0YdKL4wftsQ",
        bg: "bg-error-container",
      },
      {
        role: "SAKSI",
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAC7DpYewLTCXofvTRQcNHbxEVg_km5jtTAcrD4Vmk02keForWg4_jyXX1k2kE-JElUbCvl1ocKPvNohWJFE8-mDvwQnL2zhKF4o_QL31RGZhPxdSHRqpmPc8m35knhapbNBDZL2uytVmu2T-Fjr_5VwEnIBUIayN36ReT9MNcE0HpPANuNpB7ZsTy9aWeuLNRVfpXsUcQLyaNVzGfEybwVNhv1ARBrfBAWyyeVkixUBhYRmoIvNw",
        bg: "bg-secondary-fixed",
      },
    ],
    buttonText: "Berikutnya",
  },
  {
    step: 3,
    title: "Berani Bertindak",
    description:
      "Belajar mengenali situasi, menentukan tindakan yang aman, berkonsultasi dengan SIGAP AI, dan mencari bantuan ketika dibutuhkan.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCNFcEXVaP3R58Ju6PIWSDecWR5Cv8BSIe6OUbifqSKMikWj6AqKep-G7yxSI59w1QLT7LzX3YnLeSUUc_bdwaXlqw7sK5C1LMfeBN3S8_DnFKHP0oY1ogV06sUZXKklwKg02msUFj-r2IYfMD08xbJvuRpjct5meFpjpzk1ORcHpgOpQY3HerFaXJvTZW-rePM_N-1H1rTrz5iGnSXUAC2Fz-Xoqck8zZxwr6baZiA6bM2FxXVHg",
    cardHighlight: {
      title: "Didukung oleh SIGAP AI",
      desc: "Asisten personal untuk panduan aman.",
    },
    buttonText: "Mulai Bersama SIGAP",
  },
];

export const LEARNING_MODULES: LearningModule[] = [
  {
    id: 1,
    title: "1. Apa Itu Bullying?",
    description:
      "Pahami definisi dasar dan bentuk-bentuk perundungan di lingkungan sekitar.",
    duration: "5 menit",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCrQXUmKWqUWl-vs_9O7-Q8f1TUOgwMFUAW7908mUd9A_DN5X3Il8HP5-ViASTuBB81YZwN0qDOlPsG2qDBPl8uAHWz-lqypaenZo43L8Zs6IE0bYfPZASqaGt-fi09VlLBlIW_6Qn97B4SxdgkUQ-rfwBfRB7vAIhZDX1_zP_eLdfrmPQXf1bbKHYQEBtFr1jiHBtuncLlvZbzJ0PxWlPvZgTk5-COcKfrtGTOPVdB-g6BqsWG9Q",
    progress: 100,
    content: [
      "Perundungan (Bullying) adalah perilaku agresif yang disengaja, dilakukan secara berulang, dan melibatkan ketidakseimbangan kekuasaan atau kekuatan antara pelaku dan korban.",
      "Tiga unsur utama bullying: (1) Niat menyakiti, (2) Berulang dari waktu ke waktu, dan (3) Adanya ketimpangan relasi kuasa atau kekuatan fisik/sosial.",
      "Bercanda menjadi bullying saat salah satu pihak merasa tertekan, takut, atau meminta berhenti namun terus dilanjutkan.",
    ],
    keyTakeaways: [
      "Bullying bukan sekadar konflik biasa; ada ketimpangan kuasa.",
      "Candaan yang menyakiti dan terus diulang adalah perundungan.",
      "Setiap siswa berhak merasa aman di lingkungan sekolah.",
    ],
    quiz: {
      question:
        "Apa perbedaan utama antara candaan biasa dan perundungan (bullying)?",
      options: [
        "Bullying hanya terjadi di luar sekolah",
        "Bullying melibatkan ketidakseimbangan kuasa dan terjadi berulang dengan niat menyakiti",
        "Candaan selalu menggunakan kata-kata kasar",
        "Bullying hanya berupa kekerasan fisik",
      ],
      correctIndex: 1,
      explanation:
        "Tepat! Bullying ditandai oleh ketidakseimbangan kuasa, sifat yang berulang, dan dampak yang merugikan korban.",
    },
  },
  {
    id: 2,
    title: "2. Jenis-Jenis Bullying",
    description:
      "Pelajari berbagai jenis perundungan mulai dari verbal, fisik, hingga relasional.",
    duration: "8 menit",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAmQU_mA-UGebp5JBP4WJf967C6UVfhuRpJ0aqRuecG9YEG25doZVNSY00Ru4TH1iUMTdM0l0VQZ92st9l0YHG5dtOXF9VsciTRi9Nyc5JN55zLjlQEo5R0S3N3phf06NXCiA8DRtL-wwhrfO0I2PQU0y2niFm1DD7TbSCWC6xD41tqZfa8AFdH0L4inARm5nNzIzOP2ANq1qJhopKjM43tzt3sBDMoSR2D69W86Ui9To8Zvns5VA",
    progress: 60,
    content: [
      "1. Bullying Verbal: Memanggil dengan julukan merendahkan, mengejek fisik (body shaming), menyebarkan fitnah, atau mengancam.",
      "2. Bullying Fisik: Memukul, mendorong, menendang, merusak barang milik orang lain, atau memalak uang saku.",
      "3. Bullying Sosial / Relasional: Mengucilkan dari pergaulan, menyebarkan rumor jahat, menghasut orang lain agar memusuhi korban.",
      "4. Cyberbullying: Mengunggah foto memalukan tanpa izin, mengirim komentar kebencian, doxxing, atau membuat akun palsu untuk merundung.",
    ],
    keyTakeaways: [
      "Bullying tidak hanya fisik, luka emosional dari verbal dan relasional sama berbahayanya.",
      "Pengucilan sengaja termasuk dalam perundungan sosial.",
    ],
    quiz: {
      question:
        "Menyebarkan rumor bohong dan menghasut teman sekelas agar tidak mau berbicara dengan seseorang termasuk jenis bullying...",
      options: ["Fisik", "Sosial / Relasional", "Teknologi", "Biasa"],
      correctIndex: 1,
      explanation:
        "Benar! Mengucilkan dan merusak reputasi sosial seseorang adalah bentuk bullying relasional.",
    },
  },
  {
    id: 3,
    title: "3. Cyberbullying",
    description:
      "Kenali ancaman di dunia maya dan cara melindungi diri secara digital.",
    duration: "10 menit",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzhL_R7Hj5byQqlJJzcm9F7vTdItDOngdNn8qCDea32ENH2mZZ515BoOiVEW6urXqccsfGqqbbood5V5i-_Vo5Fq94MjY-d_YhjEQwqI_FsjlZja8wRo9ZGSuf3-xIC3tuSaXtZtlYiHGsOjSIncqTWG0IDduu2b8g2JRgEa9HCvvWw_fBxdG0GJBt9e7nYYgRnlO0cBZ3PdLYZkgwnb-RpFKv1Fjic9GnxnAbLYjMyLV1Q3JdWw",
    progress: 0,
    content: [
      "Cyberbullying adalah perundungan menggunakan perangkat digital seperti media sosial, aplikasi pesan instan, atau game online.",
      "Ciri cyberbullying: Dapat terjadi 24/7 di mana saja, jejak digital sulit dihapus, dan pelaku sering kali bersembunyi di balik anonimitas.",
      "Langkah perlindungan diri: (1) Jangan membalas dengan emosi, (2) Ambil tangkapan layar (screenshot) sebagai bukti, (3) Blokir akun pelaku, (4) Laporkan ke orang dewasa atau platform terkait.",
    ],
    keyTakeaways: [
      "Simpan screenshot sebagai bukti resmi.",
      "Blokir pelaku dan laporkan akunnya.",
      "Privat akun sosial mediamu dari orang tak dikenal.",
    ],
    quiz: {
      question:
        "Apa langkah pertama yang paling bijak saat menerima pesan perundungan di media sosial?",
      options: [
        "Membalas dengan kata-kata yang lebih kasar",
        "Menghapus aplikasi dan tidak memberitahu siapa-siapa",
        "Mengambil tangkapan layar (screenshot) bukti lalu memblokir pelaku",
        "Menyebarkan nomor telepon pelaku ke semua teman",
      ],
      correctIndex: 2,
      explanation:
        "Tepat! Dokumentasikan bukti penting sebelum memblokir dan melaporkan.",
    },
  },
  {
    id: 4,
    title: "4. Kenali Tanda-Tandanya",
    description:
      "Bagaimana cara mengenali jika seseorang atau dirimu menjadi korban.",
    duration: "7 menit",
    icon: "visibility",
    progress: 0,
    content: [
      "Tanda fisik: Pakaian rusak, luka/memar tanpa alasan jelas, kehilangan barang-barang sekolah secara mencurigakan.",
      "Tanda emosional: Menjadi pendiam, cemas, mudah menangis, enggan berangkat ke sekolah (school refusal), atau penurunan drastis nilai akademik.",
      "Tanda perilaku: Menghindari interaksi sosial, sering menyendiri saat jam istirahat, atau perubahan drastis pada pola makan dan tidur.",
    ],
    keyTakeaways: [
      "Perubahan perilaku tiba-tiba sering kali merupakan sinyal minta tolong.",
      "Peka terhadap teman yang tampak cemas atau sering menyendiri.",
    ],
    quiz: {
      question: "Manakah yang merupakan tanda emosional korban perundungan?",
      options: [
        "Sangat bersemangat memimpin kelompok",
        "Tiba-tiba takut atau enggan berangkat ke sekolah",
        "Nilai akademik melonjak tinggi",
        "Mendapat banyak teman baru",
      ],
      correctIndex: 1,
      explanation:
        "Benar! Rasa takut ke sekolah (school refusal) adalah salah satu tanda umum perundungan.",
    },
  },
  {
    id: 5,
    title: "5. Dampak Bullying",
    description:
      "Memahami efek jangka pendek dan panjang secara psikologis.",
    duration: "6 menit",
    icon: "psychology",
    progress: 0,
    content: [
      "Dampak pada Korban: Trauma psikologis, depresi, gangguan kecemasan, hilangnya rasa percaya diri, hingga ide menyakiti diri sendiri.",
      "Dampak pada Pelaku: Berisiko mengembangkan perilaku agresif, kesulitan membina hubungan sehat, dan potensi sanksi hukum/disiplin.",
      "Dampak pada Saksi/Lingkungan: Timbulnya atmosfer ketakutan di kelas, hilangnya rasa saling percaya, dan normalisasi budaya kekerasan.",
    ],
    keyTakeaways: [
      "Bullying merugikan semua pihak, termasuk pelaku dan saksi.",
      "Mencegah bullying menciptakan suasana belajar yang aman bagi semua orang.",
    ],
    quiz: {
      question: "Apakah saksi yang hanya menonton bullying juga terpengaruh?",
      options: [
        "Tidak sama sekali karena mereka tidak disentuh",
        "Ya, saksi bisa merasa cemas, bersalah, dan takut menjadi korban berikutnya",
        "Saksi selalu merasa puas",
        "Hanya guru yang terpengaruh",
      ],
      correctIndex: 1,
      explanation:
        "Tepat! Saksi sering mengalami beban moral, rasa bersalah, dan kecemasan lingkungan.",
    },
  },
  {
    id: 6,
    title: "6. Apa yang Harus Dilakukan?",
    description: "Langkah praktis melaporkan dan mencari bantuan yang aman.",
    duration: "12 menit",
    icon: "health_and_safety",
    progress: 0,
    content: [
      "Strategi 3 Langkah SIGAP:",
      "1. S - Sadari: Kenali apakah tindakan tersebut perundungan.",
      "2. I - Ikut Ambil Sikap: Jika aman, tegur pelaku atau dukung korban untuk menjauh.",
      "3. GAP - Gandeng Pihak Berwenang: Laporkan ke Wali Kelas, Guru BK, orang tua, atau gunakan sistem Lapor Aman SIGAP.",
      "Hotline Darurat Anak: Layanan SAPA 129 KemenPPPA atau Polsek terdekat.",
    ],
    keyTakeaways: [
      "Jangan pernah merasa bersalah saat meminta pertolongan.",
      "Menjadi Upstander (pembela) bukan berarti harus berkelahi, tapi berani melapor.",
    ],
    quiz: {
      question:
        "Apa tindakan terbaik seorang Upstander (saksi yang peduli) saat melihat teman dirundung?",
      options: [
        "Merekam video dan mengunggahnya ke TikTok untuk viral",
        "Menemani korban dan segera memberitahu guru atau konselor",
        "Membantu pelaku agar tidak dimusuhi",
        "Pura-pura tidak melihat",
      ],
      correctIndex: 1,
      explanation:
"Luar biasa! Memberikan dukungan pada korban dan melapor adalah tindakan terpuji seorang Upstander.",
    },
  },
];

export const SIMULATION_CASES: SimulationCase[] = [
  // --- LEVEL 1 (5 Kasus) ---
  {
    id: "sim_1", requiredLevel: 1, type: "standard", perspective: "KORBAN", caseNumber: "KASUS 01",
    title: "Candaan di Kelas",
    scenario: "Kamu sedang presentasi di depan kelas. Beberapa teman di belakang terus menertawakan logat bicaramu dan meniru-nirukannya dengan nada mengejek. Seisi kelas mulai ikut tertawa.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW-bmeljYXBA-IfssGstBr7soT0VugEGaTKw-1mmWruQ27m5TBbuUJeC7aJzUWDkWoNYZQzTNvwNS-xxBUe61A-bamTvjO5ive1oQyc_J27oX-DPWOaMc62gMYITEik0OS1_SsfwbNuc2Slbn9qhebwqlBmwghBZMDGeR-S4IvWIf4xzzodPfRkL1zzP8QWq7S5riXK0KE-btKkJU5B7UtMEQ50awmVWRDHIT0QbHuWGWDSkhufQ",
    question: "Apa tindakan pertamamu saat berada di depan kelas?",
    choices: [
      { key: "A", label: "Diam menahan malu dan segera lari keluar kelas", feedback: "Melarikan diri memang wajar saat tertekan, tapi ini membuat mereka merasa menang.", isRecommended: false, points: 0 },
      { key: "B", label: "Berhenti bicara sejenak, tatap mereka, lalu minta guru untuk menertibkan", feedback: "Bagus! Kamu berani membela dirimu sendiri dengan cara yang tepat dan melibatkan otoritas yang ada (guru).", isRecommended: true, points: 50 },
      { key: "C", label: "Ikut tertawa agar tidak terlihat baper (bawa perasaan)", feedback: "Tertawa bersama mereka mungkin meredakan ketegangan sesaat, tapi secara jangka panjang kamu membenarkan perbuatan mereka.", isRecommended: false, points: 0 },
    ],
  },
  {
    id: "sim_2", requiredLevel: 1, type: "standard", perspective: "SAKSI", caseNumber: "KASUS 02",
    title: "Teman yang Dikucilkan",
    scenario: "Saat pembagian kelompok tugas, tidak ada satu pun kelompok yang mau menerima Bima. Beberapa siswa bahkan terang-terangan berkata tidak ingin sekelompok dengannya.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCB-TnQnLB1P6sNjXaAl5YbaA2p1YSdq31Z2Yy1AJ3pz-scVyl8v9Y8HqLn16oeV4M1-Nanl5lUNOR2OTLYgKEdzL2UW0_JArrYdEmIMVA8Jr_BpwsHtHqBLk4DiPEE9tkZ-W7LW0gdtTwgWR4oVdDiMQhC9E8eMiJi_rcNI3kW65fPPX-bRFx0__OyCCEvSrXWs7shSXEFFficDXzO3dQ0W8_qFKaty8YwEnSv1b6yMsjzabBY3g",
    question: "Sebagai teman sekelas, apa yang bisa kamu lakukan?",
    choices: [
      { key: "A", label: "Diam saja karena kelompokmu sudah penuh", feedback: "Diam berarti kamu menjadi saksi pasif (bystander). Bima akan merasa sangat sendirian.", isRecommended: false, points: 0 },
      { key: "B", label: "Mengajak Bima bergabung ke kelompokmu tanpa ragu", feedback: "Sangat suportif! Tindakan sederhanamu ini mengubah situasi 180 derajat bagi Bima.", isRecommended: true, points: 50 },
      { key: "C", label: "Membisikkan ke teman lain betapa kasihannya Bima", feedback: "Rasa kasihan saja tidak membantu. Bima butuh tindakan nyata.", isRecommended: false, points: 0 },
    ],
  },
  {
    id: "sim_3", requiredLevel: 1, type: "emotion", perspective: "PELAKU", caseNumber: "KASUS 03",
    title: "Foto Aib di Grup",
    scenario: "Kamu iseng memotret temanmu yang sedang tidur menganga di kelas, lalu mengeditnya menjadi stiker lucu dan membagikannya ke grup WA angkatan.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoDcKyHWE8_Cwt_rfuJqR3EPDA8_nLq_UcJeDiDAcbifqtdurKraxnrVi_HM4Zbj6SL6cS0ea565ujp1FcwFxtEQzMC7JcOJeWDAS8gEtqQPfCeHo9t1DPooRkPsP6mZwgfkUvm7LwohDVaufY5kgGWEQQNMsa0MENxBSviaIOUZ4dtNk-icYwP0fD9JdyJhIitb6uLpSaPE6z-qqVOpHyFhZZLVE9fJR_xgCcg0_3CQy16l40EA",
    question: "Bagaimana perasaan temanmu saat melihat stiker itu menyebar?",
    emotions: [
      { id: "e1", emoji: "😂", label: "Ikut Senang" },
      { id: "e2", emoji: "😭", label: "Malu & Hancur" },
      { id: "e3", emoji: "😡", label: "Sangat Marah" },
      { id: "e4", emoji: "😐", label: "Biasa Saja" },
    ],
    impacts: [
      { target: "Dampak Psikis", description: "Korban tidak berani masuk sekolah karena takut ditertawakan.", icon: "mood_bad", color: "text-[#ba1a1a]" },
      { target: "Jejak Digital", description: "Stiker itu mungkin tidak akan pernah bisa dihapus sepenuhnya dari internet.", icon: "public", color: "text-[#00658d]" },
    ],
  },
  {
    id: "sim_4", requiredLevel: 1, type: "standard", perspective: "SAKSI", caseNumber: "KASUS 04",
    title: "Tas yang Disembunyikan",
    scenario: "Kamu melihat sekelompok siswa menyembunyikan tas milik adik kelas di atas lemari yang tidak terjangkau. Adik kelas itu kebingungan mencari tasnya.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDvFhf-mGopRwq0H5M3OJv2JlpBqBLmgoD0fb7hJgNF6q60iIlCuwBS0BM5kFBSZkjiIcgayc3Vmvdaf_c-5zRz8ukWjh5-HrU_qcvwXPZSOiEICVfkPm43ngZHcsvFIE72M_9rIyLW304DmxiVyOmCTc57dBxfXgpAeSuVijnM7Uxxo_bnIeRALeNWxbbe78cWPucir2fIov-IThqQ2xTLR1CkZ95bc9Ul8ZQLj1kNHQOOEfSIwA",
    question: "Apa tindakan terbaik yang harus kamu lakukan?",
    choices: [
      { key: "A", label: "Beri tahu adik kelas itu di mana tasnya secara diam-diam", feedback: "Tindakan yang baik! Kamu membantu korban tanpa memicu konfrontasi berbahaya.", isRecommended: true, points: 50 },
      { key: "B", label: "Menonton saja karena lucu", feedback: "Ini mendukung perilaku perundungan secara pasif.", isRecommended: false, points: 0 },
      { key: "C", label: "Memarahi kelompok siswa itu sendirian", feedback: "Berbahaya. Kamu bisa menjadi target berikutnya jika melawan kelompok sendirian.", isRecommended: false, points: 10 },
    ],
  },
  {
    id: "sim_5", requiredLevel: 1, type: "standard", perspective: "KORBAN", caseNumber: "KASUS 05",
    title: "Rumor Medsos",
    scenario: "Seseorang membuat gosip di Instagram bahwa kamu mencontek saat ujian Matematika, padahal kamu belajar keras untuk itu.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzhL_R7Hj5byQqlJJzcm9F7vTdItDOngdNn8qCDea32ENH2mZZ515BoOiVEW6urXqccsfGqqbbood5V5i-_Vo5Fq94MjY-d_YhjEQwqI_FsjlZja8wRo9ZGSuf3-xIC3tuSaXtZtlYiHGsOjSIncqTWG0IDduu2b8g2JRgEa9HCvvWw_fBxdG0GJBt9e7nYYgRnlO0cBZ3PdLYZkgwnb-RpFKv1Fjic9GnxnAbLYjMyLV1Q3JdWw",
    question: "Bagaimana cara terbaik menghadapinya?",
    choices: [
      { key: "A", label: "Melabrak pembuat rumor di kolom komentar", feedback: "Melabrak di ruang publik medsos hanya akan memperbesar masalah dan drama.", isRecommended: false, points: 0 },
      { key: "B", label: "Screenshot buktinya, laporkan akun tersebut, lalu lapor guru BK", feedback: "Cerdas! Selalu simpan bukti digital sebelum bertindak lewat otoritas.", isRecommended: true, points: 50 },
      { key: "C", label: "Menonaktifkan akun IG dan menangis", feedback: "Menghindar tidak menyelesaikan rumor, meskipun melindungi mentalmu sejenak.", isRecommended: false, points: 10 },
    ],
  },

  // --- LEVEL 2 (4 Kasus) ---
  {
    id: "sim_6", requiredLevel: 2, type: "standard", perspective: "SAKSI", caseNumber: "KASUS 06",
    title: "Pemalakan Berkedok Pinjam",
    scenario: "Kamu melihat teman sekelasmu sering dimintai 'pinjaman uang' oleh siswa senior yang tidak pernah dikembalikan. Temanmu terlihat sangat tertekan.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmQU_mA-UGebp5JBP4WJf967C6UVfhuRpJ0aqRuecG9YEG25doZVNSY00Ru4TH1iUMTdM0l0VQZ92st9l0YHG5dtOXF9VsciTRi9Nyc5JN55zLjlQEo5R0S3N3phf06NXCiA8DRtL-wwhrfO0I2PQU0y2niFm1DD7TbSCWC6xD41tqZfa8AFdH0L4inARm5nNzIzOP2ANq1qJhopKjM43tzt3sBDMoSR2D69W86Ui9To8Zvns5VA",
    question: "Apa tindakan teraman yang bisa kamu lakukan?",
    choices: [
      { key: "A", label: "Menarik temanmu menjauh saat senior datang", feedback: "Langkah ini bagus untuk jangka pendek, mencegah pemalakan saat itu terjadi.", isRecommended: true, points: 50 },
      { key: "B", label: "Menantang senior itu untuk berkelahi", feedback: "Kekerasan tidak akan menyelesaikan masalah dan malah membahayakanmu.", isRecommended: false, points: 0 },
      { key: "C", label: "Menyarankan temanmu untuk melawan", feedback: "Korban mungkin tidak memiliki keberanian atau kekuatan, menekan korban justru membuatnya makin tertekan.", isRecommended: false, points: 0 },
    ],
  },
  {
    id: "sim_7", requiredLevel: 2, type: "emotion", perspective: "PELAKU", caseNumber: "KASUS 07",
    title: "Geng Eksklusif",
    scenario: "Kamu dan gengmu membuat peraturan bahwa siapa pun yang tidak memakai sepatu merek tertentu tidak boleh makan siang di meja kalian.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoDcKyHWE8_Cwt_rfuJqR3EPDA8_nLq_UcJeDiDAcbifqtdurKraxnrVi_HM4Zbj6SL6cS0ea565ujp1FcwFxtEQzMC7JcOJeWDAS8gEtqQPfCeHo9t1DPooRkPsP6mZwgfkUvm7LwohDVaufY5kgGWEQQNMsa0MENxBSviaIOUZ4dtNk-icYwP0fD9JdyJhIitb6uLpSaPE6z-qqVOpHyFhZZLVE9fJR_xgCcg0_3CQy16l40EA",
    question: "Bagaimana perasaan siswa lain yang dijauhi gengmu?",
    emotions: [
      { id: "e1", emoji: "😢", label: "Merasa Tidak Berharga" },
      { id: "e2", emoji: "😎", label: "Merasa Keren" },
      { id: "e3", emoji: "😆", label: "Gembira" },
      { id: "e4", emoji: "🤔", label: "Bingung" },
    ],
    impacts: [
      { target: "Harga Diri", description: "Pengucilan membuat siswa lain merasa miskin dan kehilangan percaya diri.", icon: "trending_down", color: "text-[#ba1a1a]" },
      { target: "Iklim Sekolah", description: "Menciptakan lingkungan yang toksik dan mementingkan status sosial.", icon: "warning", color: "text-[#00658d]" },
    ],
  },
  {
    id: "sim_8", requiredLevel: 2, type: "standard", perspective: "KORBAN", caseNumber: "KASUS 08",
    title: "Julukan Menyakitkan",
    scenario: "Setiap kali kamu lewat, geng kakak kelas memanggilmu dengan sebutan nama hewan. Mereka merasa itu hanya candaan keakraban.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCW-bmeljYXBA-IfssGstBr7soT0VugEGaTKw-1mmWruQ27m5TBbuUJeC7aJzUWDkWoNYZQzTNvwNS-xxBUe61A-bamTvjO5ive1oQyc_J27oX-DPWOaMc62gMYITEik0OS1_SsfwbNuc2Slbn9qhebwqlBmwghBZMDGeR-S4IvWIf4xzzodPfRkL1zzP8QWq7S5riXK0KE-btKkJU5B7UtMEQ50awmVWRDHIT0QbHuWGWDSkhufQ",
    question: "Bagaimana cara merespons hal ini?",
    choices: [
      { key: "A", label: "Mengatakan tegas: 'Saya tidak suka dipanggil begitu, tolong panggil nama saya.'", feedback: "Tegas menetapkan batasan (boundaries) adalah langkah berani yang penting.", isRecommended: true, points: 50 },
      { key: "B", label: "Diam saja sambil menunduk saat lewat", feedback: "Diam membuat mereka mengira kamu pasrah dan akan terus melanjutkannya.", isRecommended: false, points: 10 },
      { key: "C", label: "Memanggil mereka dengan nama hewan juga", feedback: "Membalas dengan hal yang sama hanya akan memicu perkelahian.", isRecommended: false, points: 0 },
    ],
  },
  {
    id: "sim_9", requiredLevel: 2, type: "standard", perspective: "SAKSI", caseNumber: "KASUS 09",
    title: "Komentar Toksik di Game",
    scenario: "Saat mabar (main bareng) game online, teman sekelasmu terus-menerus memaki satu anggota tim kalian karena mainnya kurang jago, sampai anggota tersebut offline dan nangis.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzhL_R7Hj5byQqlJJzcm9F7vTdItDOngdNn8qCDea32ENH2mZZ515BoOiVEW6urXqccsfGqqbbood5V5i-_Vo5Fq94MjY-d_YhjEQwqI_FsjlZja8wRo9ZGSuf3-xIC3tuSaXtZtlYiHGsOjSIncqTWG0IDduu2b8g2JRgEa9HCvvWw_fBxdG0GJBt9e7nYYgRnlO0cBZ3PdLYZkgwnb-RpFKv1Fjic9GnxnAbLYjMyLV1Q3JdWw",
    question: "Apa tindakanmu saat itu terjadi?",
    choices: [
      { key: "A", label: "Ikut memaki karena memang dia beban tim", feedback: "Kamu baru saja ikut menjadi pelaku cyberbullying.", isRecommended: false, points: 0 },
      { key: "B", label: "Menyalakan mic dan meminta pelaku berhenti toxic karena ini cuma game", feedback: "Luar biasa! Kamu menggunakan suaramu untuk melindungi orang lain di dunia maya.", isRecommended: true, points: 50 },
      { key: "C", label: "Mute semua pemain agar tenang", feedback: "Mute membuatmu nyaman, tapi tidak menghentikan perundungan yang terjadi pada korban.", isRecommended: false, points: 10 },
    ],
  },

  // --- LEVEL 3 (3 Kasus) ---
  {
    id: "sim_10", requiredLevel: 3, type: "standard", perspective: "KORBAN", caseNumber: "KASUS 10",
    title: "Ancaman Fisik",
    scenario: "Seorang siswa di sekolah sering menghadangmu di gerbang saat pulang sekolah, mengancam akan memukul jika kamu tidak mengerjakan PR-nya.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmQU_mA-UGebp5JBP4WJf967C6UVfhuRpJ0aqRuecG9YEG25doZVNSY00Ru4TH1iUMTdM0l0VQZ92st9l0YHG5dtOXF9VsciTRi9Nyc5JN55zLjlQEo5R0S3N3phf06NXCiA8DRtL-wwhrfO0I2PQU0y2niFm1DD7TbSCWC6xD41tqZfa8AFdH0L4inARm5nNzIzOP2ANq1qJhopKjM43tzt3sBDMoSR2D69W86Ui9To8Zvns5VA",
    question: "Apa tindakan terbaik yang menjamin keselamatanmu?",
    choices: [
      { key: "A", label: "Mengerjakan PR-nya agar aman", feedback: "Menuruti ancaman tidak menghentikannya, malah membuatnya ketagihan mengancammu.", isRecommended: false, points: 0 },
      { key: "B", label: "Minta tolong ke orang tua atau guru agar dijemput/dikawal saat pulang", feedback: "Langkah terbaik! Melibatkan orang dewasa sangat penting jika ada ancaman kekerasan fisik.", isRecommended: true, points: 50 },
      { key: "C", label: "Membawa senjata tajam untuk jaga-jaga", feedback: "Sangat berbahaya dan melanggar hukum! Ini bukan solusi yang dibenarkan.", isRecommended: false, points: 0 },
    ],
  },
  {
    id: "sim_11", requiredLevel: 3, type: "emotion", perspective: "PELAKU", caseNumber: "KASUS 11",
    title: "Penyebaran Rahasia",
    scenario: "Kamu tidak sengaja mengetahui rahasia keluarga temanmu, lalu menjadikannya bahan gosip di kelas agar kamu terlihat gaul dan tahu segalanya.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoDcKyHWE8_Cwt_rfuJqR3EPDA8_nLq_UcJeDiDAcbifqtdurKraxnrVi_HM4Zbj6SL6cS0ea565ujp1FcwFxtEQzMC7JcOJeWDAS8gEtqQPfCeHo9t1DPooRkPsP6mZwgfkUvm7LwohDVaufY5kgGWEQQNMsa0MENxBSviaIOUZ4dtNk-icYwP0fD9JdyJhIitb6uLpSaPE6z-qqVOpHyFhZZLVE9fJR_xgCcg0_3CQy16l40EA",
    question: "Bagaimana perasaan korban yang rahasianya dibongkar?",
    emotions: [
      { id: "e1", emoji: "😱", label: "Sangat Ketakutan & Malu" },
      { id: "e2", emoji: "😊", label: "Bangga Dikenal" },
      { id: "e3", emoji: "😑", label: "Tidak Peduli" },
      { id: "e4", emoji: "😆", label: "Gembira" },
    ],
    impacts: [
      { target: "Kepercayaan (Trust Issue)", description: "Korban akan kesulitan mempercayai siapa pun seumur hidupnya.", icon: "heart_broken", color: "text-[#ba1a1a]" },
      { target: "Reputasi Sosial", description: "Bukan hanya korban yang hancur, kamu juga akan dicap sebagai pengkhianat oleh siswa lain.", icon: "warning", color: "text-[#00658d]" },
    ],
  },
  {
    id: "sim_12", requiredLevel: 3, type: "standard", perspective: "SAKSI", caseNumber: "KASUS 12",
    title: "Serangan Grup (Mobbing)",
    scenario: "Satu kelas sepakat memboikot seorang siswi. Mereka diam serentak saat ia bicara, dan menjauh setiap kali ia mendekat.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCB-TnQnLB1P6sNjXaAl5YbaA2p1YSdq31Z2Yy1AJ3pz-scVyl8v9Y8HqLn16oeV4M1-Nanl5lUNOR2OTLYgKEdzL2UW0_JArrYdEmIMVA8Jr_BpwsHtHqBLk4DiPEE9tkZ-W7LW0gdtTwgWR4oVdDiMQhC9E8eMiJi_rcNI3kW65fPPX-bRFx0__OyCCEvSrXWs7shSXEFFficDXzO3dQ0W8_qFKaty8YwEnSv1b6yMsjzabBY3g",
    question: "Sebagai siswa di kelas itu, tindakan apa yang harus kamu ambil?",
    choices: [
      { key: "A", label: "Diam-diam mengiriminya pesan semangat lewat WA, lalu melapor ke wali kelas", feedback: "Pilihan terbaik. Memberi dukungan privat menjaga keselamatanmu sambil tetap menindaklanjutinya ke guru.", isRecommended: true, points: 50 },
      { key: "B", label: "Menegur seluruh kelas saat itu juga", feedback: "Meskipun heroik, melawan *mobbing* (perundungan massal) secara langsung bisa membuatmu ikut diboikot.", isRecommended: false, points: 10 },
      { key: "C", label: "Ikut memboikot agar aman", feedback: "Rasa aman sementaramu dibayar dengan penderitaan orang lain.", isRecommended: false, points: 0 },
    ],
  },

  // --- LEVEL 4 (2 Kasus) ---
  {
    id: "sim_13", requiredLevel: 4, type: "standard", perspective: "KORBAN", caseNumber: "KASUS 13",
    title: "Doxxing Medsos",
    scenario: "Seseorang menyebarkan informasi pribadi (alamat rumah, nomor telepon orang tuamu) di internet dengan narasi palsu agar orang-orang menyerangmu.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzhL_R7Hj5byQqlJJzcm9F7vTdItDOngdNn8qCDea32ENH2mZZ515BoOiVEW6urXqccsfGqqbbood5V5i-_Vo5Fq94MjY-d_YhjEQwqI_FsjlZja8wRo9ZGSuf3-xIC3tuSaXtZtlYiHGsOjSIncqTWG0IDduu2b8g2JRgEa9HCvvWw_fBxdG0GJBt9e7nYYgRnlO0cBZ3PdLYZkgwnb-RpFKv1Fjic9GnxnAbLYjMyLV1Q3JdWw",
    question: "Apa langkah paling darurat yang harus diambil?",
    choices: [
      { key: "A", label: "Membalas dengan membocorkan data pribadinya juga", feedback: "Tindakan ini ilegal dan hanya akan memperparah siklus kekerasan.", isRecommended: false, points: 0 },
      { key: "B", label: "Melapor ke orang tua, memprivasi akun, dan melaporkan ke polisi/Cybercrime", feedback: "Tepat sekali. Kasus Doxxing adalah tindakan kriminal yang butuh penanganan pihak berwajib.", isRecommended: true, points: 50 },
      { key: "C", label: "Membantah rumor tersebut satu per satu di komentar", feedback: "Berdebat dengan orang asing di internet yang sudah termakan hoaks hanya membuang energi.", isRecommended: false, points: 10 },
    ],
  },
  {
    id: "sim_14", requiredLevel: 4, type: "emotion", perspective: "PELAKU", caseNumber: "KASUS 14",
    title: "Fitnah Akademik",
    scenario: "Karena takut tersaingi, kamu menyebarkan rumor ke guru bahwa temanmu yang juara satu selalu mencontek dan mencuri soal ujian.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoDcKyHWE8_Cwt_rfuJqR3EPDA8_nLq_UcJeDiDAcbifqtdurKraxnrVi_HM4Zbj6SL6cS0ea565ujp1FcwFxtEQzMC7JcOJeWDAS8gEtqQPfCeHo9t1DPooRkPsP6mZwgfkUvm7LwohDVaufY5kgGWEQQNMsa0MENxBSviaIOUZ4dtNk-icYwP0fD9JdyJhIitb6uLpSaPE6z-qqVOpHyFhZZLVE9fJR_xgCcg0_3CQy16l40EA",
    question: "Bagaimana dampak kebohonganmu terhadap masa depan temanmu?",
    emotions: [
      { id: "e1", emoji: "💔", label: "Karirnya Bisa Hancur" },
      { id: "e2", emoji: "😂", label: "Lucu Saja" },
      { id: "e3", emoji: "🤔", label: "Tidak Berpengaruh" },
      { id: "e4", emoji: "😡", label: "Biar Kapok" },
    ],
    impacts: [
      { target: "Kerugian Masa Depan", description: "Beasiswa atau masa depannya terancam gagal karena reputasi palsu.", icon: "school", color: "text-[#ba1a1a]" },
      { target: "Tuntutan Hukum", description: "Fitnah merupakan tindakan yang bisa dilaporkan secara hukum.", icon: "gavel", color: "text-[#00658d]" },
    ],
  },

  // --- LEVEL 5 (1 Kasus) ---
  {
    id: "sim_15", requiredLevel: 5, type: "standard", perspective: "SAKSI", caseNumber: "KASUS 15",
    title: "Kasus Kekerasan Berantai",
    scenario: "Kamu diam-diam menemukan bukti video bahwa kelompok terkuat di sekolah sering memukuli siswa baru di area parkir belakang. Tak ada yang berani melapor.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAmQU_mA-UGebp5JBP4WJf967C6UVfhuRpJ0aqRuecG9YEG25doZVNSY00Ru4TH1iUMTdM0l0VQZ92st9l0YHG5dtOXF9VsciTRi9Nyc5JN55zLjlQEo5R0S3N3phf06NXCiA8DRtL-wwhrfO0I2PQU0y2niFm1DD7TbSCWC6xD41tqZfa8AFdH0L4inARm5nNzIzOP2ANq1qJhopKjM43tzt3sBDMoSR2D69W86Ui9To8Zvns5VA",
    question: "Sebagai siswa paling senior (Level 5), tindakan apa yang paling bijak?",
    choices: [
      { key: "A", label: "Menyerahkan video tersebut ke kepala sekolah atau melalui Lapor Aman secara anonim", feedback: "Luar biasa. Kamu membela kebenaran dengan aman menggunakan fasilitas sistem pelaporan sekolah.", isRecommended: true, points: 50 },
      { key: "B", label: "Menyebarkannya ke grup WhatsApp agar viral", feedback: "Memviralkan kasus kekerasan justru bisa mempermalukan korban dan melanggar hukum UU ITE.", isRecommended: false, points: 0 },
      { key: "C", label: "Menghapus videonya karena takut ketahuan kelompok tersebut", feedback: "Ketakutanmu membiarkan korban lain terus berjatuhan. Sistem pelaporan anonim diciptakan untuk situasi ini.", isRecommended: false, points: 0 },
    ],
  }
];

export const BADGES_LIST: BadgeItem[] = [
  {
    id: "first_steps",
    name: "First Steps",
    description: "Menyelesaikan modul pembelajaran anti-bullying pertama.",
    icon: "verified",
    color: "#2dbcfe",
    earned: true,
  },
  {
    id: "defender",
    name: "Defender",
    description: "Menyelesaikan simulasi peran Saksi dan membela teman.",
    icon: "shield_person",
    color: "#00658d",
    earned: true,
  },
  {
    id: "empath",
    name: "Empath",
    description: "Menganalisis dampak tindakan dari sudut pandang Pelaku.",
    icon: "psychology",
    color: "#2dbcfe",
    earned: false,
  },
  {
    id: "ally",
    name: "Ally",
    description: "Mengirimkan pesan solidaritas di Teman SIGAP.",
    icon: "group_add",
    color: "#00658d",
    earned: false,
  },
  {
    id: "detective_master",
    name: "SIGAP Detective",
    description: "Memecahkan 3 kasus investigasi perundungan dengan tepat.",
    icon: "search",
    color: "#2dbcfe",
    earned: false,
  },
];

export const SITUATION_QUESTIONS: SituationQuestion[] = [
  {
    id: 1,
    question: "Apakah ada ketimpangan kekuatan/posisi antara pihak yang terlibat?",
    icon: "balance",
    helperText:
      "Ketimpangan bisa berupa fisik lebih besar, lebih populer, lebih senior, atau jumlah yang lebih banyak.",
  },
  {
    id: 2,
    question: "Apakah ada niat menyakiti secara fisik, emosional, atau sosial?",
    icon: "sentiment_dissatisfied",
    helperText:
      "Tindakan tersebut membuat pihak yang dituju merasa terluka, malu, atau tertekan.",
  },
  {
    id: 3,
    question: "Apakah kejadian terjadi berulang?",
    icon: "repeat",
    helperText:
      "Kejadian yang berulang berarti hal ini terjadi lebih dari satu kali atau terus-menerus.",
  },
  {
    id: 4,
    question: "Apakah kamu/korban merasa kesulitan untuk menghentikannya sendiri?",
    icon: "pan_tool",
    helperText:
      "Sudah mencoba meminta berhenti namun perlakuan tersebut tetap berlanjut.",
  },
  {
    id: 5,
    question: "Apakah kejadian ini mengganggu rasa aman atau aktivitas belajar?",
    icon: "school",
    helperText:
      "Menimbulkan rasa takut ke sekolah, susah konsentrasi, atau isolasi sosial.",
  },
];

export const INITIAL_REPORTS: IncidentReport[] = [
  {
    id: "SIGAP-2026-00124",
    createdAt: "2026-08-21 09:30",
    role: "victim",
    description: "Sering diejek dan dipalak saat berada di belakang kantin oleh sekelompok siswa senior.",
    datetime: "2026-08-20 12:15",
    location: "Kantin Belakang Sekolah",
    incidentType: "Verbal & Finansial (Pemalakan)",
    hasAttachment: true,
    fileName: "bukti_pesan_ancaman.jpg",
    fileBase64: "https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=400&auto=format&fit=crop",
    isAnonymous: true,
    status: "Sedang Ditinjau",
    counselorNotes:
      "Laporan telah diterima oleh Tim Pencegahan Kekerasan Sekolah. Konselor sedang menjadwalkan mediasi tertutup dan pendampingan aman.",
  },
  {
    id: "SIGAP-2026-00125",
    createdAt: "2026-08-22 14:10",
    role: "witness",
    description: "Melihat grup WA angkatan menyebarkan editan stiker memalukan dari teman sekelas hingga korban menangis dan tidak mau masuk sekolah.",
    datetime: "2026-08-22 10:00",
    location: "Grup WhatsApp Kelas 8B / Daring",
    incidentType: "Cyberbullying",
    hasAttachment: true,
    fileName: "tangkapan_layar_chat.png",
    fileBase64: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
    isAnonymous: false,
    status: "Dalam Penanganan",
    counselorNotes:
      "Admin grup telah dipanggil dan diberikan pembinaan. Satgas telah mendampingi korban untuk konseling pemulihan rasa percaya diri.",
  },
  {
    id: "SIGAP-2026-00126",
    createdAt: "2026-08-19 11:45",
    role: "helper",
    description: "Saya menemani teman sebangku yang dikucilkan saat kerja kelompok dan diancam agar tidak boleh duduk di baris depan.",
    datetime: "2026-08-19 08:30",
    location: "Ruang Kelas 8A",
    incidentType: "Sosial & Relasional (Pengucilan)",
    hasAttachment: false,
    isAnonymous: false,
    status: "Selesai",
    counselorNotes:
      "Wali kelas telah melakukan rotasi tempat duduk dan sesi refleksi empati bersama. Situasi kelas saat ini telah kondusif dan terpantau damai.",
  },
  {
    id: "SIGAP-2026-00127",
    createdAt: "2026-08-23 15:20",
    role: "victim",
    description: "Sepatu olahraga saya disembunyikan di atas ventilasi toilet dan dicoret dengan spidol permanen.",
    datetime: "2026-08-23 13:40",
    location: "Toilet Pria Lantai 2",
    incidentType: "Bullying Fisik & Vandalisme",
    hasAttachment: true,
    fileName: "sepatu_dicoret.jpg",
    fileBase64: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400&auto=format&fit=crop",
    isAnonymous: true,
    status: "Sedang Ditinjau",
    counselorNotes: "",
  }
];

export const QUICK_DECISION_CARDS = [
  {
    id: "qd_1", requiredLevel: 1,
    scenario: "Seorang teman baru duduk sendirian di pojok kantin dan ditertawakan oleh kelompok siswa lain. Waktumu 10 detik!",
    choices: [
      { text: "Duduk bersamanya dan mengajaknya mengobrol", correct: true, pts: 30 },
      { text: "Pura-pura tidak melihat dan pergi", correct: false, pts: 0 },
      { text: "Ikut menertawakan agar tidak dijauhi", correct: false, pts: 0 },
    ],
  },
  {
    id: "qd_2", requiredLevel: 1,
    scenario: "Ada pesan bernada merendahkan fisik temanmu di grup chat kelas. Apa tindakan cepatmu?",
    choices: [
      { text: "Screenshot bukti dan tegur pengirim bahwa itu tidak sopan", correct: true, pts: 30 },
      { text: "Kirim stiker tertawa", correct: false, pts: 0 },
      { text: "Forward ke grup sekolah lain", correct: false, pts: 0 },
    ],
  },
  {
    id: "qd_3", requiredLevel: 2,
    scenario: "Kamu melihat buku tugas temanmu disembunyikan oleh teman lain saat istirahat.",
    choices: [
      { text: "Beri tahu teman tersebut di mana bukunya dan lapor guru", correct: true, pts: 30 },
      { text: "Biarkan saja karena bukan barangmu", correct: false, pts: 0 },
      { text: "Ikut menyembunyikan", correct: false, pts: 0 },
    ],
  },
  {
    id: "qd_4", requiredLevel: 2,
    scenario: "Teman sebangkumu terus-menerus digoda karena logat bicaranya. Dia terlihat menahan tangis.",
    choices: [
      { text: "Berdiri dan meminta mereka berhenti dengan tegas tapi tenang", correct: true, pts: 40 },
      { text: "Menyuruh temanmu diam saja", correct: false, pts: 0 },
      { text: "Menjauhi teman sebangkumu", correct: false, pts: 0 },
    ],
  },
  {
    id: "qd_5", requiredLevel: 3,
    scenario: "Seseorang membuat akun palsu di media sosial untuk mengejek teman sekelasmu.",
    choices: [
      { text: "Report (Laporkan) akun tersebut dan beri tahu korban agar tidak merespons", correct: true, pts: 50 },
      { text: "Ikut mem-follow akun tersebut karena penasaran", correct: false, pts: 0 },
      { text: "Membagikan postingannya ke orang lain", correct: false, pts: 0 },
    ],
  },
  {
    id: "qd_6", requiredLevel: 3,
    scenario: "Kamu melihat seorang adik kelas dipalak uang jajan oleh kakak kelas di toilet.",
    choices: [
      { text: "Segera melapor ke guru piket atau BK diam-diam", correct: true, pts: 50 },
      { text: "Berteriak menantang sang kakak kelas sendirian", correct: false, pts: 0 },
      { text: "Pura-pura cuci tangan dan langsung lari", correct: false, pts: 0 },
    ],
  },
  {
    id: "qd_7", requiredLevel: 4,
    scenario: "Dalam rapat OSIS, ide salah satu teman selalu diabaikan dan ditertawakan oleh ketua.",
    choices: [
      { text: "Menginterupsi dengan sopan dan meminta agar ide temanmu didengarkan", correct: true, pts: 60 },
      { text: "Diam saja karena takut pada ketua OSIS", correct: false, pts: 0 },
      { text: "Mengirim chat pribadi ke korban setelah rapat agar sabar", correct: false, pts: 0 },
    ],
  },
  {
    id: "qd_8", requiredLevel: 4,
    scenario: "Teman dekatmu bercanda melampaui batas dan membuat siswa lain menangis. Dia merasa tidak salah.",
    choices: [
      { text: "Menarik temanmu menjauh, menegurnya, dan menyuruhnya minta maaf", correct: true, pts: 60 },
      { text: "Membela temanmu karena dia sahabatmu", correct: false, pts: 0 },
      { text: "Ikut memarahi korban karena terlalu baper", correct: false, pts: 0 },
    ],
  },
  {
    id: "qd_9", requiredLevel: 5,
    scenario: "Kamu menemukan coretan bernada SARA (rasis) di meja salah satu siswa.",
    choices: [
      { text: "Memfoto untuk bukti laporan, lalu berusaha menghapusnya bersama", correct: true, pts: 80 },
      { text: "Membiarkannya saja karena bukan mejamu", correct: false, pts: 0 },
      { text: "Menambahkan coretan lain", correct: false, pts: 0 },
    ],
  },
  {
    id: "qd_10", requiredLevel: 5,
    scenario: "Seseorang menyebarkan foto editan vulgar yang menggunakan wajah teman sekelasmu di grup rahasia.",
    choices: [
      { text: "Menyimpan bukti diam-diam dan memberitahu konselor sekolah agar korban dilindungi", correct: true, pts: 100 },
      { text: "Memberitahu korban agar dia melabrak pelakunya sendiri", correct: false, pts: 0 },
      { text: "Langsung keluar grup tanpa berbuat apa-apa", correct: false, pts: 0 },
    ],
  }
];

export const DETECTIVE_CASES = [
  {
    id: "case_01", requiredLevel: 1,
    title: "Kasus 01: 'Loker yang Terkunci'",
    story: "Rian menemukan loker miliknya dipasangi gembok baru dan ditempeli catatan ejekan. Siapa yang bertanggung jawab dan apa bukti kuncinya?",
    clues: [
      "Catatan ditulis dengan spidol biru tua berbau khas.",
      "CCTV lorong menunjukkan 2 siswa berdiri di depan loker pukul 09.45.",
      "Dika terlihat meminjam spidol biru dari ruang seni sebelum jam istirahat.",
    ],
    question: "Bagaimana cara menangani temuan ini secara adil?",
    options: [
      "Serahkan bukti foto catatan dan rekaman waktu CCTV kepada Guru BK untuk diklarifikasi",
      "Langsung melabrak Dika di depan semua teman",
      "Merusak gembok loker Dika sebagai balasan",
    ],
    correctIndex: 0,
    reward: 50,
  },
  {
    id: "case_02", requiredLevel: 2,
    title: "Kasus 02: 'Gosip di Grup Gelap'",
    story: "Sebuah grup rahasia di Telegram sedang menyebarkan gosip bohong tentang seorang siswi berprestasi. Sebuah screenshot bocor ke publik.",
    clues: [
      "Screenshot tersebut menunjukkan nama pembuat grup: 'Bintang59'.",
      "Siswa bernama Bintang sering terlihat bermain HP saat pelajaran.",
      "Anggota grup terlihat membicarakan tentang nilai ulangan terakhir.",
    ],
    question: "Tindakan apa yang paling tepat sebagai detektif?",
    options: [
      "Simpan screenshot secara diam-diam dan serahkan ke kepala sekolah untuk investigasi resmi",
      "Menuduh Bintang secara terbuka di grup angkatan",
      "Membiarkannya karena tidak ingin ikut campur",
    ],
    correctIndex: 0,
    reward: 80,
  },
  {
    id: "case_03", requiredLevel: 3,
    title: "Kasus 03: 'Sepatu yang Hilang'",
    story: "Sepatu olahraga Andi hilang saat pelajaran penjasorkes. Setelah dicari, sepatu itu ditemukan di tempat sampah.",
    clues: [
      "Siswa bernama Tono sering mengejek Andi karena sepatunya terlihat usang.",
      "Ada noda lumpur di dekat tempat sampah yang sama dengan lumpur di sepatu Tono.",
      "Beberapa saksi melihat Tono pergi ke arah tempat sampah setelah berganti pakaian.",
    ],
    question: "Apa langkah terbaik untuk membantu Andi?",
    options: [
      "Mengajak saksi mata untuk melapor ke guru Penjas bersama-sama agar ada bukti valid",
      "Membuang sepatu Tono ke tempat sampah sebagai pembalasan",
      "Membelikan sepatu baru untuk Andi tanpa melapor",
    ],
    correctIndex: 0,
    reward: 100,
  },
  {
    id: "case_04", requiredLevel: 4,
    title: "Kasus 04: 'Catatan Kelam di Papan Tulis'",
    story: "Setiap pagi sebelum kelas dimulai, selalu ada ancaman tak bernama tertulis di papan tulis kelas untuk salah satu siswa. Tulisan selalu sama namun tidak ada yang mengaku.",
    clues: [
      "Satpam sekolah membuka pagar jam 06.00 pagi.",
      "Hanya ada tiga siswa yang selalu datang sebelum jam 06.15.",
      "Penghapus papan tulis kelas basah setiap pagi, tanda baru digunakan.",
    ],
    question: "Bagaimana cara mengungkap pelakunya tanpa gegabah?",
    options: [
      "Meminta izin wali kelas untuk datang lebih pagi dan memantau dari jauh",
      "Menginterogasi ketiga siswa tersebut secara paksa",
      "Membiarkan saja karena tulisannya akan dihapus oleh piket harian",
    ],
    correctIndex: 0,
    reward: 150,
  },
  {
    id: "case_05", requiredLevel: 5,
    title: "Kasus 05: 'Isolasi Terencana'",
    story: "Seluruh kelas tiba-tiba menolak berbicara dengan satu siswa baru selama seminggu penuh. Tidak ada kekerasan fisik, tapi suasananya sangat mencekam.",
    clues: [
      "Sang korban merasa sangat stres dan berniat pindah sekolah.",
      "Beberapa siswa kelas terlihat merasa bersalah, tapi takut menentang satu pentolan kelas bernama Aris.",
      "Aris pernah mengatakan bahwa siswa baru tersebut 'terlalu sok pintar'.",
    ],
    question: "Apa tindakan paling efektif sebagai seorang 'Defender'?",
    options: [
      "Mendekati siswa-siswa yang merasa bersalah untuk bersama-sama melawan ketakutan dan merangkul korban",
      "Langsung memarahi Aris di depan umum dan menantangnya berantem",
      "Membujuk korban agar segera pindah sekolah demi kebaikannya",
    ],
    correctIndex: 0,
    reward: 200,
  }
];

export const PEER_SOLIDARITY_MESSAGES = [
  {
    id: "msg1",
    author: "Siswa Kelas 8B",
    badge: "Anti-Bully Champion",
    text: "Setiap orang punya keunikan masing-masing. Ruang kelas kita harus jadi tempat yang paling aman dan ramah untuk belajar! 🌟",
    likes: 24,
    time: "2 jam yang lalu",
  },
  {
    id: "msg2",
    author: "Anonim",
    badge: "Upstander",
    text: "Terima kasih SIGAP AI, tadi pagi aku berani cerita ke guru BK tentang pengucilan di kelasku. Sekarang suasananya jauh lebih tenang.",
    likes: 42,
    time: "5 jam yang lalu",
  },
  {
    id: "msg3",
    author: "Ketua OSIS SMP Harapan Bangsa",
    badge: "School Leader",
    text: "Keren itu bukan yang bisa menindas, tapi yang berani melindungi dan merangkul teman yang lemah. Mari bersatu! 💙",
    likes: 68,
    time: "Kemarin",
  },
];
