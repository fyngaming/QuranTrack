# 🔐 Setup Firebase Authentication

## Langkah 1: Aktifkan Authentication di Firebase Console

1. **Buka Firebase Console**
   - Masuk ke https://console.firebase.google.com
   - Pilih project "qurantrack-3c8aa"

2. **Aktifkan Authentication**
   - Di sidebar kiri, klik **"Authentication"**
   - Klik tombol **"Get started"**

3. **Setup Google Sign-in**
   - Klik tab **"Sign-in method"**
   - Pilih **"Google"** dari daftar providers
   - Klik **"Enable"**
   - Pilih **Support email** (gunakan: favianyusuf9@gmail.com)
   - Klik **"Save"**

## Langkah 2: Konfigurasi Domain yang Diizinkan

1. **Tambahkan Domain**
   - Masih di tab **"Sign-in method"**
   - Scroll ke bawah ke bagian **"Authorized domains"**
   - Pastikan domain berikut sudah ada:
     - `localhost` (untuk testing lokal)
     - `127.0.0.1` (untuk testing lokal)
     - Domain website Anda jika sudah deploy

2. **Tambah Domain Baru (jika perlu)**
   - Klik **"Add domain"**
   - Masukkan domain website Anda
   - Klik **"Add"**

## Langkah 3: Setup Firestore Database (untuk menyimpan progress)

1. **Buat Firestore Database**
   - Di sidebar kiri, klik **"Firestore Database"**
   - Klik **"Create database"**
   - Pilih **"Start in test mode"** (untuk development)
   - Pilih lokasi server (pilih yang terdekat dengan Indonesia)
   - Klik **"Done"**

2. **Atur Security Rules (opsional, untuk production)**
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /userProgress/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

## Langkah 4: Test Login

1. **Buka website Anda**
2. **Klik tombol "🔐 Login with Google"**
3. **Pilih akun Google Anda**
4. **Jika berhasil, akan muncul:**
   - Foto profil dan nama Anda di header
   - Notifikasi "Login berhasil!"
   - Progress Anda akan tersimpan di cloud

## Troubleshooting

### Error: "This domain is not authorized"
- **Solusi**: Tambahkan domain Anda ke "Authorized domains" di Firebase Console

### Error: "Configuration not found"
- **Solusi**: Pastikan konfigurasi Firebase di `firebase-config.js` sudah benar

### Error: "Popup blocked"
- **Solusi**: Izinkan popup di browser Anda

### Login berhasil tapi progress tidak tersimpan
- **Solusi**: Pastikan Firestore Database sudah dibuat dan aktif

## Status Saat Ini ✅

- ✅ Firebase project sudah dibuat
- ✅ Konfigurasi Firebase sudah diupdate
- ✅ Kode autentikasi sudah siap
- ⏳ **Perlu dilakukan**: Aktifkan Authentication di Firebase Console
- ⏳ **Perlu dilakukan**: Buat Firestore Database

## Fitur yang Akan Aktif Setelah Setup

1. **Login dengan Google** - User bisa login dengan akun Google
2. **Sinkronisasi Progress** - Progress tadarus tersimpan di cloud
3. **Multi-device Access** - Bisa akses dari device berbeda
4. **Backup Otomatis** - Progress tidak akan hilang
5. **User Profile** - Menampilkan foto dan nama user

---

**Catatan**: Setelah mengikuti langkah di atas, sistem login akan langsung berfungsi!