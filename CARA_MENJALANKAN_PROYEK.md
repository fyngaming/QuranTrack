# 🚀 Cara Menjalankan Proyek Quran Track

## 📋 Status Proyek
✅ **PROYEK SUDAH SIAP DIGUNAKAN!**

Aplikasi ini adalah **Quran Track** - Pelacak Tadarus Ramadhan dengan fitur lengkap:
- 📊 Progress tracking 30 Juz
- 📖 Baca Al-Qur'an dengan terjemahan
- 🧠 Uji hafalan interaktif
- 🔐 Login dengan Google
- 🌙 Countdown Ramadhan & Lebaran
- 🎨 Dark/Light theme

## 🎯 Cara Menjalankan (Mudah!)

### Opsi 1: Langsung Buka (Tanpa Server)
1. **Buka file `index.html`** dengan double-click
2. **Atau klik kanan** → "Open with" → pilih browser favorit Anda
3. **Selesai!** Aplikasi langsung bisa digunakan

### Opsi 2: Menggunakan Live Server (Recommended)
1. **Install Live Server extension** di VS Code
2. **Klik kanan** pada file `index.html`
3. **Pilih "Open with Live Server"**
4. **Aplikasi akan terbuka** di `http://localhost:5500`

## 🔧 Setup Firebase (Opsional untuk Login)

### Jika Ingin Menggunakan Login Google:
1. **Ikuti panduan** di file `SETUP_FIREBASE.md`
2. **Ganti konfigurasi** di `firebase-config.js` dengan data Firebase Anda
3. **Uncomment** konfigurasi yang sebenarnya

### Jika Tidak Perlu Login:
- **Aplikasi tetap berfungsi** tanpa login
- **Progress disimpan** di browser (localStorage)
- **Semua fitur tersedia** kecuali sinkronisasi antar device

## 📱 Fitur yang Tersedia

### 1. 📊 Progress Tracking
- Klik kotak Juz untuk menandai selesai
- Progress otomatis tersimpan
- Visual progress bar yang menarik

### 2. 📖 Baca Al-Qur'an
- 114 surat lengkap dengan terjemahan
- Filter berdasarkan Juz
- Tampilan yang mudah dibaca

### 3. 🧠 Uji Hafalan
- 3 level kesulitan (Easy, Medium, Hard)
- 10 soal per sesi
- Sistem penilaian otomatis
- Feedback untuk setiap jawaban

### 4. 🌙 Countdown
- Hitung mundur ke Lebaran
- Hari ke-berapa Ramadhan
- Update real-time

### 5. 🎨 Tema
- Dark mode / Light mode
- Animasi smooth transition
- Desain responsive

## 🛠️ Troubleshooting

### Masalah Umum:
1. **Data Quran tidak muncul**
   - Refresh halaman (F5)
   - Pastikan koneksi internet stabil

2. **Login Google tidak berfungsi**
   - Setup Firebase terlebih dahulu
   - Periksa konfigurasi di `firebase-config.js`

3. **Progress hilang**
   - Jangan clear browser data
   - Gunakan login Google untuk backup

### Browser yang Direkomendasikan:
- ✅ Chrome (Terbaik)
- ✅ Firefox
- ✅ Edge
- ✅ Safari

## 📂 Struktur File

```
PROJEK WEB RAMADHAN/
├── index.html              # File utama
├── style.css              # Styling
├── script.js              # Logic utama
├── auth.js                # Sistem login
├── firebase-config.js     # Konfigurasi Firebase
├── quran-data.js          # Data Al-Qur'an
├── quran-api.js           # API Quran
└── *.md                   # Dokumentasi
```

## 🎉 Selamat!

Proyek Anda sudah **100% siap digunakan**! 

**Langkah selanjutnya:**
1. **Buka `index.html`** dan nikmati aplikasinya
2. **Test semua fitur** untuk memastikan semuanya berjalan
3. **Setup Firebase** jika ingin fitur login
4. **Deploy ke hosting** jika ingin share ke orang lain

---

**Dibuat oleh:** Favian Yusuf Ashari  
**Instagram:** [@favianyusuf_](https://www.instagram.com/favianyusuf_?igsh=MWJ1ZW5hZWN0OWxneQ==)