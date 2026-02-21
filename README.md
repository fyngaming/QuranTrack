# 🌙 Quran Track - Pelacak Tadarus Ramadhan

<div align="center">

![Quran Track](https://img.shields.io/badge/Quran-Track-green?style=for-the-badge&logo=crescent-moon)
![Status](https://img.shields.io/badge/Status-Ready%20to%20Use-brightgreen?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)

**Aplikasi web untuk melacak progress tadarus Al-Qur'an selama bulan Ramadhan**

[🚀 Demo Live](#) | [📖 Dokumentasi](#fitur-utama) | [🛠️ Instalasi](#cara-menjalankan)

</div>

## ✨ Fitur Utama

### 📊 **Progress Tracking**
- Pelacakan 30 Juz Al-Qur'an dengan visual menarik
- Progress bar real-time
- Penyimpanan otomatis di localStorage dan Firebase
- Animasi konfetti saat khatam

### 📖 **Baca Al-Qur'an**
- 114 surat lengkap dengan terjemahan Indonesia
- Transliterasi latin untuk memudahkan bacaan
- Filter berdasarkan Juz
- Tampilan responsive dan mudah dibaca

### 🧠 **Uji Hafalan Interaktif**
- 3 level kesulitan: Easy, Medium, Hard
- Berbagai jenis soal: melengkapi bacaan, identifikasi ayat, terjemahan
- Sistem penilaian otomatis dengan feedback
- Voice mode untuk menjawab dengan suara (coming soon)

### 🌙 **Countdown Ramadhan**
- Hitung mundur real-time ke Hari Raya
- Penanda hari ke-berapa Ramadhan
- Update otomatis setiap detik

### 🔐 **Autentikasi Google**
- Login dengan akun Google
- Sinkronisasi progress antar device
- Backup data otomatis ke Firebase

### 🎨 **Tema & UI/UX**
- Dark mode dan Light mode
- Animasi smooth dan modern
- Desain responsive untuk semua device
- Quotes islami yang berganti otomatis

## 🛠️ Teknologi yang Digunakan

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Backend:** Firebase (Authentication & Firestore)
- **API:** Al-Qur'an API untuk data surat dan ayat
- **Styling:** CSS Grid, Flexbox, CSS Variables
- **Icons:** Unicode Emoji

## 🚀 Cara Menjalankan

### Opsi 1: Langsung Buka (Termudah)
```bash
# Clone repository
git clone https://github.com/username/quran-track-ramadhan.git

# Masuk ke folder
cd quran-track-ramadhan

# Buka index.html di browser
# Double-click atau klik kanan → Open with Browser
```

### Opsi 2: Live Server (Recommended)
```bash
# Jika menggunakan VS Code
# 1. Install Live Server extension
# 2. Klik kanan index.html
# 3. Pilih "Open with Live Server"
```

### Opsi 3: HTTP Server
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# Buka http://localhost:8000
```

## ⚙️ Setup Firebase (Opsional)

### 1. Buat Project Firebase
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project"
3. Ikuti langkah setup

### 2. Enable Services
- **Authentication** → Enable Google provider
- **Firestore Database** → Create database (test mode)

### 3. Update Konfigurasi
```javascript
// firebase-config.js
const firebaseConfig = {
    apiKey: "your-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "your-sender-id",
    appId: "your-app-id"
};
```

## 📱 Screenshot

<div align="center">

### Desktop View
![Desktop](https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Desktop+View)

### Mobile View
![Mobile](https://via.placeholder.com/300x600/1a1a1a/ffffff?text=Mobile+View)

### Dark Mode
![Dark Mode](https://via.placeholder.com/800x400/0f172a/ffffff?text=Dark+Mode)

</div>

## 🎯 Roadmap

### ✅ **Sudah Selesai**
- [x] Progress tracking 30 Juz
- [x] Baca Al-Qur'an lengkap
- [x] Uji hafalan interaktif
- [x] Firebase authentication
- [x] Dark/Light theme
- [x] Responsive design

### 🔄 **Dalam Pengembangan**
- [ ] Voice recognition untuk hafalan
- [ ] Bookmark ayat favorit
- [ ] Sharing progress ke social media
- [ ] Reminder notifikasi
- [ ] Statistik detail

### 💡 **Ide Masa Depan**
- [ ] Multiplayer quiz
- [ ] Leaderboard global
- [ ] Audio recitation
- [ ] Offline mode
- [ ] Mobile app (React Native)

## 🤝 Kontribusi

Kontribusi sangat diterima! Silakan:

1. **Fork** repository ini
2. **Buat** branch fitur (`git checkout -b feature/AmazingFeature`)
3. **Commit** perubahan (`git commit -m 'Add some AmazingFeature'`)
4. **Push** ke branch (`git push origin feature/AmazingFeature`)
5. **Buat** Pull Request

## 📄 Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Developer

**Favian Yusuf Ashari**

- 📧 Email: [favianyusuf@example.com](mailto:favianyusuf@example.com)
- 📱 Instagram: [@favianyusuf_](https://www.instagram.com/favianyusuf_?igsh=MWJ1ZW5hZWN0OWxneQ==)
- 💼 LinkedIn: [Favian Yusuf Ashari](https://linkedin.com/in/favianyusuf)

## 🙏 Acknowledgments

- **Al-Qur'an API** untuk data surat dan ayat
- **Firebase** untuk backend services
- **Google Fonts** untuk typography
- **Komunitas Muslim Developer** untuk inspirasi

## 📊 Stats

![GitHub stars](https://img.shields.io/github/stars/username/quran-track-ramadhan?style=social)
![GitHub forks](https://img.shields.io/github/forks/username/quran-track-ramadhan?style=social)
![GitHub issues](https://img.shields.io/github/issues/username/quran-track-ramadhan)
![GitHub license](https://img.shields.io/github/license/username/quran-track-ramadhan)

---

<div align="center">

**⭐ Jika project ini bermanfaat, jangan lupa kasih star ya! ⭐**

**Barakallahu fiikum** 🤲

</div>