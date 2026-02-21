// Google Sign-In Configuration
// Untuk mendapatkan Client ID:
// 1. Buka Google Cloud Console (console.cloud.google.com)
// 2. Buat project baru atau pilih project yang ada
// 3. Aktifkan Google+ API
// 4. Buat credentials OAuth 2.0 Client ID
// 5. Tambahkan domain Anda ke authorized domains

const GOOGLE_CONFIG = {
    // Client ID dari Google Cloud Console
    CLIENT_ID: '352190786290-0hl2d84ah4giivns4pdm98shch3e7v7k.apps.googleusercontent.com',
    
    // Mode production - Google Sign-In aktif
    DEMO_MODE: false, // Set ke true jika ingin menggunakan demo mode
    
    // Demo user untuk testing
    DEMO_USER: {
        sub: 'demo_user_123',
        name: 'Demo User',
        email: 'demo@example.com',
        picture: 'https://via.placeholder.com/80'
    }
};

// Google Sign-In Handler
class GoogleSignInHandler {
    constructor() {
        this.isInitialized = false;
        this.init();
    }
    
    async init() {
        if (GOOGLE_CONFIG.DEMO_MODE) {
            console.log('Running in demo mode - Google Sign-In disabled');
            this.setupDemoMode();
            return;
        }
        
        try {
            await this.loadGoogleLibrary();
            this.initializeGoogleSignIn();
        } catch (error) {
            console.error('Failed to initialize Google Sign-In:', error);
            this.setupDemoMode();
        }
    }
    
    loadGoogleLibrary() {
        return new Promise((resolve, reject) => {
            if (typeof google !== 'undefined' && google.accounts) {
                resolve();
                return;
            }
            
            const script = document.createElement('script');
            script.src = 'https://accounts.google.com/gsi/client';
            script.async = true;
            script.defer = true;
            
            script.onload = () => {
                // Wait for google object to be available
                const checkGoogle = () => {
                    if (typeof google !== 'undefined' && google.accounts) {
                        resolve();
                    } else {
                        setTimeout(checkGoogle, 100);
                    }
                };
                checkGoogle();
            };
            
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }
    
    initializeGoogleSignIn() {
        try {
            google.accounts.id.initialize({
                client_id: GOOGLE_CONFIG.CLIENT_ID,
                callback: this.handleCredentialResponse.bind(this)
            });
            
            const signInButton = document.getElementById('googleSignInBtn');
            if (signInButton) {
                google.accounts.id.renderButton(signInButton, {
                    theme: 'outline',
                    size: 'large',
                    text: 'signin_with',
                    width: 300
                });
            }
            
            this.isInitialized = true;
            console.log('Google Sign-In initialized successfully');
            
        } catch (error) {
            console.error('Error initializing Google Sign-In:', error);
            this.setupDemoMode();
        }
    }
    
    setupDemoMode() {
        const signInButton = document.getElementById('googleSignInBtn');
        if (signInButton) {
            signInButton.onclick = () => {
                this.handleDemoLogin();
            };
            
            // Update button text for demo
            signInButton.innerHTML = `
                <svg class="google-icon" viewBox="0 0 24 24" style="width: 20px; height: 20px;">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Demo Login (Click to Continue)
            `;
        }
    }
    
    handleCredentialResponse(response) {
        try {
            const userObject = this.parseJwt(response.credential);
            console.log('User logged in:', userObject);
            this.saveUserData(userObject);
            this.showUserInfo(userObject);
        } catch (error) {
            console.error('Error handling credential response:', error);
        }
    }
    
    handleDemoLogin() {
        console.log('Demo login activated');
        const demoUser = GOOGLE_CONFIG.DEMO_USER;
        this.saveUserData(demoUser);
        this.showUserInfo(demoUser);
    }
    
    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        return JSON.parse(jsonPayload);
    }
    
    saveUserData(user) {
        const userData = {
            id: user.sub,
            name: user.name,
            email: user.email,
            picture: user.picture
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        console.log('User data saved:', userData);
    }
    
    showUserInfo(user) {
        const loginSection = document.getElementById('loginSection');
        const userInfo = document.getElementById('userInfo');
        const userAvatar = document.getElementById('userAvatar');
        const userName = document.getElementById('userName');
        const userEmail = document.getElementById('userEmail');
        
        if (loginSection) loginSection.style.display = 'none';
        if (userInfo) userInfo.style.display = 'block';
        if (userAvatar) userAvatar.src = user.picture;
        if (userName) userName.textContent = user.name;
        if (userEmail) userEmail.textContent = user.email;
    }
    
    signOut() {
        if (this.isInitialized && !GOOGLE_CONFIG.DEMO_MODE) {
            google.accounts.id.disableAutoSelect();
        }
        
        localStorage.removeItem('user');
        
        const loginSection = document.getElementById('loginSection');
        const userInfo = document.getElementById('userInfo');
        
        if (loginSection) loginSection.style.display = 'block';
        if (userInfo) userInfo.style.display = 'none';
        
        console.log('User signed out');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.googleSignInHandler = new GoogleSignInHandler();
    
    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            window.googleSignInHandler.signOut();
        });
    }
    
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        const user = JSON.parse(savedUser);
        window.googleSignInHandler.showUserInfo(user);
    }
});