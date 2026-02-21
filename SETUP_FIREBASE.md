# Setup Firebase untuk Login Google

## Langkah-langkah Setup:

### 1. Buat Project Firebase
1. Buka [Firebase Console](https://console.firebase.google.com/) 
2. Klik "Add project" atau "Tambah project"
3. Masukkan nama project: `quran-track-ramadhan`
4. Ikuti langkah-langkah setup

### 2. Enable Authentication
1. Di Firebase Console, pilih project Anda
2. Klik "Authentication" di sidebar kiri
3. Klik tab "Sign-in method"
4. Enable "Google" sebagai provider
5. Masukkan email support project Anda

### 3. Enable Firestore Database
1. Klik "Firestore Database" di sidebar
2. Klik "Create database"
3. Pilih "Start in test mode" (untuk development)
4. Pilih lokasi server (pilih yang terdekat)

### 4. Setup Web App
1. Klik ikon "Web" (</>) di Project Overview
2. Masukkan nama app: `Quran Track Web`
3. Centang "Also set up Firebase Hosting" (opsional)
4. Klik "Register app"

### 5. Copy Configuration
Setelah registrasi, Anda akan mendapat konfigurasi seperti ini:
```javascript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

### 6. Update firebase-config.js
Ganti konfigurasi di file `firebase-config.js` dengan konfigurasi yang Anda dapatkan dari Firebase Console.

### 7. Setup Domain untuk Production
1. Di Firebase Console, buka "Authentication" > "Settings"
2. Scroll ke "Authorized domains"
3. Tambahkan domain website Anda (contoh: `yourwebsite.com`)

## Testing Login
1. Buka website di browser
2. Klik tombol "🔐 Login with Google"
3. Pilih akun Google Anda
4. Login berhasil jika muncul nama dan foto profil

## Troubleshooting
- **Error "auth/unauthorized-domain"**: Tambahkan domain Anda ke Authorized domains
- **Error "auth/popup-blocked"**: Allow popup di browser
- **Error "auth/network-request-failed"**: Periksa koneksi internet

## Security Rules Firestore (Opsional)
Untuk production, update rules di Firestore:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```