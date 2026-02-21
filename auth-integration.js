// Integrasi Google Sign-In dengan Firebase Authentication
import { signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { auth, provider } from "./firebase-config.js";

class AuthIntegration {
    constructor() {
        this.auth = auth;
        this.provider = provider;
        this.redirectIfLoggedIn();
        this.init();
    }

    /**
     * Cek apakah sudah ada sesi login yang aktif.
     * Jika ada, langsung arahkan ke halaman utama.
     */
    redirectIfLoggedIn() {
        onAuthStateChanged(this.auth, (user) => {
            if (user) {
                console.log("Sesi aktif ditemukan, mengarahkan ke halaman utama...");
                window.location.href = 'index.html';
            }
        });
    }

    init() {
        const loginBtn = document.getElementById('googleSignInBtn');
        if (loginBtn) {
            loginBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.signIn();
            });
        }
    }

    async signIn() {
        try {
            const result = await signInWithPopup(this.auth, this.provider);
            const user = result.user;
            console.log('User signed in:', user.displayName);
            // Redirect langsung ke halaman utama
            window.location.href = 'index.html';
        } catch (error) {
            console.error('Error signing in:', error);
            
            if (error.code === 'auth/unauthorized-domain') {
                alert(`Gagal Login: Domain aplikasi (${window.location.hostname}) belum didaftarkan di Firebase Console.\n\nSolusi:\n1. Buka Firebase Console > Authentication > Settings > Authorized Domains\n2. Tambahkan domain: ${window.location.hostname}`);
            } else if (error.code === 'auth/popup-closed-by-user') {
                console.log('Login dibatalkan oleh user (popup ditutup)');
            } else if (error.code === 'auth/network-request-failed') {
                alert('Gagal Login: Terjadi kesalahan jaringan.\n\nMohon periksa koneksi internet Anda. Jika menggunakan VPN atau AdBlocker, coba matikan sementara.');
            } else {
                alert('Gagal login: ' + error.message);
            }
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.authIntegration = new AuthIntegration();
});