# 🔐 Panduan Setup Google Sign-In

## 📋 Langkah-langkah Setup

### 1️⃣ **Buat Project di Google Cloud Console**

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Klik **Select a project** → **New Project**
3. Beri nama project (contoh: "Quran Track")
4. Klik **Create**

### 2️⃣ **Aktifkan Google Identity Services**

1. Di dashboard project, cari **APIs & Services**
2. Klik **Enable APIs and Services**
3. Cari "Google Identity Services" atau "Google+ API"
4. Klik **Enable**

### 3️⃣ **Buat OAuth 2.0 Client ID**

1. Pergi ke **APIs & Services** → **Credentials**
2. Klik **Create Credentials** → **OAuth client ID**
3. Jika diminta, konfigurasi **OAuth consent screen**:
   - User Type: **External**
   - App name: **Quran Track**
   - User support email: email Anda
   - Developer contact: email Anda
   - Klik **Save and Continue**
   - Scopes: Skip (klik **Save and Continue**)
   - Test users: Tambahkan email Anda untuk testing
   - Klik **Save and Continue**

4. Kembali ke **Credentials** → **Create Credentials** → **OAuth client ID**
5. Application type: **Web application**
6. Name: **Quran Track Web Client**
7. **Authorized JavaScript origins**:
   ```
   http://localhost
   http://localhost:8080
   http://127.0.0.1
   https://yourdomain.com (jika sudah deploy)
   ```
8. **Authorized redirect URIs**:
   ```
   http://localhost/login.html
   http://localhost:8080/login.html
   https://yourdomain.com/login.html
   ```
9. Klik **Create**
10. **SIMPAN CLIENT ID** yang muncul (format: `xxxxx.apps.googleusercontent.com`)

### 4️⃣ **Update Kode dengan Client ID**

Buka file `login.html` dan ganti baris ini:

```javascript
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID_HERE.apps.googleusercontent.com';
```

Dengan Client ID Anda:

```javascript
const GOOGLE_CLIENT_ID = '123456789-abcdefghijklmnop.apps.googleusercontent.com';
```

### 5️⃣ **Testing Lokal**

#### Opsi A: Menggunakan Live Server (Recommended)

1. Install extension **Live Server** di VS Code
2. Klik kanan pada `login.html`
3. Pilih **Open with Live Server**
4. Browser akan terbuka di `http://127.0.0.1:5500/login.html`

#### Opsi B: Menggunakan Python HTTP Server

```bash
# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

Buka browser: `http://localhost:8080/login.html`

#### Opsi C: Menggunakan Node.js http-server

```bash
# Install
npm install -g http-server

# Run
http-server -p 8080
```

Buka browser: `http://localhost:8080/login.html`

### 6️⃣ **Testing Sign-In**

1. Buka `login.html` di browser
2. Klik tombol **Sign in with Google**
3. Pilih akun Google Anda
4. Izinkan akses aplikasi
5. Anda akan melihat info profil Anda

## 🔧 Integrasi dengan Aplikasi Utama

### Update index.html

Tambahkan tombol login di header:

```html
<div class="header-controls">
    <button class="login-btn" id="loginBtn" onclick="window.location.href='login.html'">
        <span class="icon">👤</span> Login
    </button>
    <!-- existing buttons -->
</div>
```

### Tambahkan CSS untuk tombol login:

```css
.login-btn {
    background: var(--success-color);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 25px;
    cursor: pointer;
    font-size: 1rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 8px;
}

.login-btn:hover {
    background: #45a049;
    transform: translateY(-2px);
}
```

### Cek Status Login di script.js

```javascript
// Tambahkan di awal file script.js
function checkUserLogin() {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        console.log('User logged in:', userData.name);
        
        // Update UI untuk user yang login
        const loginBtn = document.getElementById('loginBtn');
        if (loginBtn) {
            loginBtn.innerHTML = `
                <img src="${userData.picture}" style="width: 30px; height: 30px; border-radius: 50%;">
                <span>${userData.name}</span>
            `;
            loginBtn.onclick = () => {
                if (confirm('Logout?')) {
                    localStorage.removeItem('user');
                    location.reload();
                }
            };
        }
        
        return userData;
    }
    return null;
}

// Panggil saat init
const currentUser = checkUserLogin();
```

## 📊 Fitur yang Bisa Ditambahkan

### 1. Sinkronisasi Progress ke Cloud

```javascript
async function syncProgressToCloud(userId, progressData) {
    // Gunakan Firebase, Supabase, atau backend sendiri
    await fetch('https://your-api.com/sync', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userId}`
        },
        body: JSON.stringify(progressData)
    });
}
```

### 2. Leaderboard

```javascript
async function getLeaderboard() {
    const response = await fetch('https://your-api.com/leaderboard');
    const data = await response.json();
    return data;
}
```

### 3. Social Sharing

```javascript
function shareProgress(score) {
    const text = `Saya mendapat skor ${score} di Quran Track! 🌙`;
    if (navigator.share) {
        navigator.share({
            title: 'Quran Track',
            text: text,
            url: window.location.href
        });
    }
}
```

## 🚀 Deploy ke Production

### Untuk Netlify/Vercel:

1. Push code ke GitHub
2. Connect repository di Netlify/Vercel
3. Update **Authorized JavaScript origins** di Google Console:
   ```
   https://your-app.netlify.app
   https://your-app.vercel.app
   ```
4. Update **Authorized redirect URIs**:
   ```
   https://your-app.netlify.app/login.html
   ```

### Untuk GitHub Pages:

1. Push code ke GitHub
2. Enable GitHub Pages di Settings
3. Update Google Console dengan:
   ```
   https://username.github.io/repo-name
   ```

## ⚠️ Troubleshooting

### Error: "Invalid Client ID"
- Pastikan Client ID sudah benar
- Cek apakah origin URL sudah ditambahkan di Google Console

### Error: "Redirect URI mismatch"
- Tambahkan URL lengkap di Authorized redirect URIs
- Pastikan protokol (http/https) sama

### Button tidak muncul
- Cek console browser untuk error
- Pastikan library Google sudah loaded
- Cek koneksi internet

### Auto sign-in tidak bekerja
- Clear browser cache dan cookies
- Pastikan `google.accounts.id.prompt()` dipanggil

## 📱 Mobile Support

Google Sign-In otomatis support mobile browser. Untuk aplikasi mobile native:

### Android (WebView)
```java
// Enable JavaScript
webView.getSettings().setJavaScriptEnabled(true);
```

### iOS (WKWebView)
```swift
// Enable JavaScript
webView.configuration.preferences.javaScriptEnabled = true
```

## 🔒 Security Best Practices

1. **Jangan expose Client Secret** di frontend
2. **Validasi token** di backend sebelum menyimpan data
3. **Gunakan HTTPS** di production
4. **Set expiry** untuk session
5. **Implement CSRF protection**

## 📚 Resources

- [Google Identity Documentation](https://developers.google.com/identity/gsi/web)
- [OAuth 2.0 Guide](https://developers.google.com/identity/protocols/oauth2)
- [Best Practices](https://developers.google.com/identity/gsi/web/guides/overview)

## 💡 Tips

- Test dengan multiple Google accounts
- Implement error handling untuk network issues
- Add loading state saat sign-in
- Cache user data untuk offline access
- Implement refresh token untuk long sessions