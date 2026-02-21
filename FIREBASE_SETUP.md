# Setup Firebase untuk Login Google

## Langkah-langkah Setup:

### 1. Buat Project Firebase
1. Buka [Firebase Console](https://console.firebase.google.com/)
2. Klik "Add project" atau "Tambah project"
3. Masukkan nama project (contoh: "quran-track-ramadhan")
4. Ikuti langkah-langkah setup

### 2. Enable Authentication
1. Di Firebase Console, pilih project Anda
2. Klik "Authentication" di sidebar kiri
3. Klik tab "Sign-in method"
4. Enable "Google" sebagai sign-in provider
5. Masukkan email support project

### 3. Setup Firestore Database
1. Klik "Firestore Database" di sidebar
2. Klik "Create database"
3. Pilih "Start in test mode" (untuk development)
4. Pilih lokasi server (pilih yang terdekat)

### 4. Get Firebase Config
1. Klik ⚙️ (Settings) > "Project settings"
2. Scroll ke bawah ke "Your apps"
3. Klik "Web" icon (</>) untuk add web app
4. Masukkan nama app, centang "Firebase Hosting" (optional)
5. Copy konfigurasi Firebase

### 5. Update auth.js
Ganti konfigurasi di file `auth.js`:

```javascript
const firebaseConfig = {
    apiKey: "your-actual-api-key",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-actual-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "123456789",
    appId: "your-actual-app-id"
};
```

### 6. Setup Domain (untuk Production)
1. Di Firebase Console > Authentication > Settings
2. Tambahkan domain website Anda ke "Authorized domains"

## Fitur yang Tersedia:

✅ **Login dengan Google**: User bisa login menggunakan akun Google
✅ **Sync Progress**: Progress Juz tersimpan di cloud
✅ **Auto Backup**: Data otomatis tersimpan saat user mengubah progress
✅ **Cross Device**: Progress bisa diakses dari device berbeda
✅ **Offline Support**: Tetap bisa digunakan tanpa login (data lokal)

## Cara Penggunaan:

1. **Tanpa Login**: Progress tersimpan di localStorage browser
2. **Dengan Login**: Progress tersimpan di Firebase Firestore
3. **Sync**: Saat login, data lokal akan di-merge dengan data cloud
4. **Logout**: Data tetap tersimpan di cloud, bisa diakses lagi saat login

## Security Rules Firestore:

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

Paste rules ini di Firestore > Rules untuk keamanan data user.