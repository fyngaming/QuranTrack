// Authentication System
import { onAuthStateChanged, signOut, signInWithPopup } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import { doc, getDoc, setDoc, updateDoc, serverTimestamp, increment } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
import { auth, db, provider } from "./firebase-config.js";

class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.checkAuthState();
    }
    
    setupEventListeners() {
        const loginBtn = document.getElementById('loginBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        
        if (loginBtn) {
            loginBtn.addEventListener('click', () => this.signInWithGoogle());
        }
        
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.signOut());
        }
    }
    
    async signInWithGoogle() {
        try {
            const result = await signInWithPopup(auth, provider); // Gunakan provider dari config
            const user = result.user;
            
            console.log('User signed in:', user.displayName);
            this.showNotification(`Selamat datang, ${user.displayName}!`);
            
            await this.saveUserData(user);
            
        } catch (error) {
            console.error('Error signing in:', error);
            this.showNotification('Gagal login. Silakan coba lagi.', 'error');
        }
    }
    
    async signOut() {
        try {
            await signOut(auth);
            console.log('User signed out');
            this.showNotification('Berhasil logout');
            window.location.href = 'login.html';
        } catch (error) {
            console.error('Error signing out:', error);
            this.showNotification('Gagal logout', 'error');
        }
    }
    
    handleAuthStateChange(user) {
        const loginBtn = document.getElementById('loginBtn');
        const userInfo = document.getElementById('userInfo');
        const userName = document.getElementById('userName');
        const userPhoto = document.getElementById('userPhoto');
        
        if (user) {
            this.currentUser = user;
            
            if (loginBtn) loginBtn.style.display = 'none';
            if (userInfo) userInfo.style.display = 'flex';
            if (userName) userName.textContent = user.displayName || 'User';
            if (userPhoto) {
                userPhoto.src = user.photoURL || 'https://via.placeholder.com/40';
                userPhoto.alt = user.displayName || 'User';
            }
            
            this.loadUserProgress();
            
        } else {
            this.currentUser = null;
            
            if (loginBtn) loginBtn.style.display = 'block';
            if (userInfo) userInfo.style.display = 'none';
        }
    }
    
    async saveUserData(user) {
        try {
            const userRef = doc(db, 'users', user.uid);
            const userDoc = await getDoc(userRef);
            
            if (!userDoc.exists()) {
                await setDoc(userRef, {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL,
                    createdAt: serverTimestamp(),
                    completedJuz: [],
                    totalKhatam: 0
                });
                console.log('New user document created');
            } else {
                await updateDoc(userRef, {
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    lastLogin: serverTimestamp()
                });
                console.log('User document updated');
            }
        } catch (error) {
            console.error('Error saving user data:', error);
        }
    }
    
    async loadUserProgress() {
        if (!this.currentUser) return;
        
        try {
            const userRef = doc(db, 'users', this.currentUser.uid);
            const userDoc = await getDoc(userRef);
            
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const completedJuz = userData.completedJuz || [];
                
                localStorage.setItem('completedJuz', JSON.stringify(completedJuz));
                
                if (window.completedJuzList !== undefined) {
                    window.completedJuzList = completedJuz;
                    if (typeof renderJuzGrid === 'function') {
                        renderJuzGrid();
                    }
                }
                
                console.log('User progress loaded:', completedJuz.length, 'juz completed');
            }
        } catch (error) {
            console.error('Error loading user progress:', error);
        }
    }
    
    async saveProgress(completedJuz) {
        if (!this.currentUser) {
            console.log('No user logged in, saving to localStorage only');
            return;
        }
        
        try {
            const userRef = doc(db, 'users', this.currentUser.uid);
            await updateDoc(userRef, {
                completedJuz: completedJuz,
                lastUpdated: serverTimestamp()
            });
            
            if (completedJuz.length === 30) {
                await updateDoc(userRef, {
                    totalKhatam: increment(1),
                    lastKhatam: serverTimestamp()
                });
                console.log('Khatam completed! Total khatam updated.');
            }
            
            console.log('Progress saved to Firestore');
        } catch (error) {
            console.error('Error saving progress:', error);
        }
    }
    
    checkAuthState() {
        onAuthStateChanged(auth, (user) => {
            this.handleAuthStateChange(user);
            if (user) {
                console.log('User already signed in:', user.displayName);
            } else {
                console.log('No user signed in');
                // Opsional: Redirect ke login jika ingin mewajibkan login
                window.location.href = 'login.html';
            }
        });
    }
    
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#ef4444' : '#22c55e'};
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            word-wrap: break-word;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize Auth System
let authSystem;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        authSystem = new AuthSystem();
        window.authSystem = authSystem;
    });
} else {
    authSystem = new AuthSystem();
    window.authSystem = authSystem;
}
