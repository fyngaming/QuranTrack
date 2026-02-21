# 🔐 Panduan Setup Login Google dengan Firebase

## Langkah-langkah Setup:

### 1. Buat Firebase Project
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project" atau "Tambah project"
3. Masukkan nama project (contoh: "quran-track-app")
4. Ikuti langkah-langkah setup hingga selesai

### 2. Aktifkan Google Authentication
1. Di Firebase Console, pilih project Anda
2. Klik "Authentication" di menu kiri
3. Pilih tab "Sign-in method"
4. Klik "Google" dan aktifkan
5. Masukkan email support project Anda
6. Klik "Save"

### 3. Tambahkan Domain yang Diizinkan
1. Masih di halaman Authentication > Sign-in method
2. Scroll ke bawah ke bagian "Authorized domains"
3. Tambahkan domain Anda:
   - Untuk localhost: `localhost`
   - Untuk domain live: `yourdomain.com`

### 4. Dapatkan Konfigurasi Firebase
1. Klik ⚙️ (Settings) di sebelah "Project Overview"
2. Pilih "Project settings"
3. Scroll ke bawah ke bagian "Your apps"
4. Klik "Add app" dan pilih "Web" (</>) jika belum ada
5. Daftarkan app dengan nama (contoh: "Quran Track Web")
6. Copy konfigurasi yang diberikan

### 5. Update File auth.js
Ganti konfigurasi di `auth.js` dengan yang Anda dapatkan:

```javascript
const firebaseConfig = {
    apiKey: "AIzaSyC...", // Ganti dengan API Key Anda
    authDomain: "your-project.firebaseapp.com", // Ganti dengan Auth Domain Anda
    projectId: "your-project-id", // Ganti dengan Project ID Anda
    storageBucket: "your-project.appspot.com", // Ganti dengan Storage Bucket Anda
    messagingSenderId: "123456789", // Ganti dengan Messaging Sender ID Anda
    appId: "1:123456789:web:abcdef" // Ganti dengan App ID Anda
};
```

### 6. Test Login
1. Buka aplikasi di browser
2. Klik tombol "🔐 Login with Google"
3. Pilih akun Google Anda
4. Login harus berhasil!

## Troubleshooting:

### Jika masih "Login Gagal":
1. **Periksa Console Browser** (F12 → Console) untuk error detail
2. **Pastikan domain sudah ditambahkan** di Firebase Console
3. **Cek koneksi internet** - Firebase memerlukan internet
4. **Izinkan popup** di browser Anda
5. **Pastikan konfigurasi benar** - tidak ada typo di auth.js

### Error Umum:
- `auth/popup-blocked` → Izinkan popup di browser
- `auth/configuration-not-found` → Periksa konfigurasi Firebase
- `auth/invalid-api-key` → API Key salah atau tidak valid
- `auth/network-request-failed` → Tidak ada koneksi internet

## Keamanan:
⚠️ **PENTING**: Jangan share API Key di repository public. Untuk production, gunakan environment variables.

## Support:
Jika masih ada masalah, periksa:
1. [Firebase Documentation](https://firebase.google.com/docs/auth/web/google-signin)
2. Console browser untuk error detail
3. Firebase Console untuk status project