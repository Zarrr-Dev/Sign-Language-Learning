# SGL Learning

Platform belajar Bahasa Isyarat (BISINDO) interaktif berbasis web dengan desain modern.

---

## Fitur Utama

* **Auth System**: Login & Register terintegrasi dengan Supabase Auth.
* **Dashboard**: Ringkasan progres belajar, streak harian, dan kuis.
* **Modul Belajar (`/learn`)**: Kartu materi isyarat + Modal Video Player HD + Fitur pencarian instan.
* **Kuis Interaktif (`/quiz`)**: Tebak gerakan isyarat dari video dengan skor otomatis.
* **Profil Pengguna (`/profile`)**: Info akun dan riwayat kuis.

---

## 🛠️ Tech Stack

* **Frontend**: React 18 (Vite) + TypeScript
* **Styling**: Tailwind CSS + Framer Motion + Lucide Icons
* **Backend**: Supabase (PostgreSQL + Auth + RLS)

---

## Cara Jalankan di Lokal

### 1. Clone & Install
```bash
git clone [https://github.com/Zarrr-Dev/Sign Language-Learning.git](https://github.com/Zarrr-Dev/SGL-Learning.git)
cd HandTalk-learn
npm install

2. Setting .env

Buat file .env di folder utama dan isi Key Supabase kamu:
Contoh Kode

VITE_SUPABASE_URL=[https://xxxxxxxx.supabase.co]
VITE_SUPABASE_ANON_KEY=...

3. Run Application


npm run dev
