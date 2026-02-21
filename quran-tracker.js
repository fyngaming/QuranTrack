// User Management and Progress Tracking
class QuranTracker {
    constructor() {
        this.currentUser = null;
        this.userProgress = null;
        this.init();
    }

    init() {
        this.loadUserData();
        this.loadUserProgress();
    }

    // Load user data from localStorage
    loadUserData() {
        const savedUser = localStorage.getItem('quranTrackUser');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
    }

    // Load user progress from localStorage
    loadUserProgress() {
        if (!this.currentUser) return;
        
        const progressKey = `quranProgress_${this.currentUser.id}`;
        const savedProgress = localStorage.getItem(progressKey);
        
        if (savedProgress) {
            this.userProgress = JSON.parse(savedProgress);
        } else {
            // Initialize default progress
            this.userProgress = {
                totalPages: 604,
                currentPage: 1,
                pagesRead: [],
                dailyTarget: 20,
                streak: 0,
                lastReadDate: null,
                totalReadingTime: 0,
                achievements: [],
                notes: {},
                bookmarks: [],
                startDate: new Date().toISOString()
            };
            this.saveProgress();
        }
    }

    // Save progress to localStorage
    saveProgress() {
        if (!this.currentUser || !this.userProgress) return;
        
        const progressKey = `quranProgress_${this.currentUser.id}`;
        localStorage.setItem(progressKey, JSON.stringify(this.userProgress));
    }

    // Mark page as read
    markPageAsRead(pageNumber) {
        if (!this.userProgress.pagesRead.includes(pageNumber)) {
            this.userProgress.pagesRead.push(pageNumber);
            this.updateStreak();
            this.checkAchievements();
            this.saveProgress();
        }
    }

    // Update reading streak
    updateStreak() {
        const today = new Date().toDateString();
        const lastRead = this.userProgress.lastReadDate;
        
        if (lastRead === today) {
            return; // Already read today
        }
        
        if (lastRead) {
            const lastReadDate = new Date(lastRead);
            const todayDate = new Date(today);
            const diffTime = todayDate - lastReadDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays === 1) {
                this.userProgress.streak++;
            } else if (diffDays > 1) {
                this.userProgress.streak = 1;
            }
        } else {
            this.userProgress.streak = 1;
        }
        
        this.userProgress.lastReadDate = today;
    }

    // Check and award achievements
    checkAchievements() {
        const achievements = [];
        const pagesRead = this.userProgress.pagesRead.length;
        
        // Reading milestones
        const milestones = [10, 50, 100, 200, 300, 400, 500, 604];
        milestones.forEach(milestone => {
            if (pagesRead >= milestone && !this.userProgress.achievements.includes(`pages_${milestone}`)) {
                achievements.push({
                    id: `pages_${milestone}`,
                    title: `${milestone} Halaman Dibaca`,
                    description: `Alhamdulillah! Anda telah membaca ${milestone} halaman Al-Quran`,
                    icon: '📖',
                    date: new Date().toISOString()
                });
                this.userProgress.achievements.push(`pages_${milestone}`);
            }
        });

        // Streak achievements
        const streakMilestones = [7, 30, 100];
        streakMilestones.forEach(streak => {
            if (this.userProgress.streak >= streak && !this.userProgress.achievements.includes(`streak_${streak}`)) {
                achievements.push({
                    id: `streak_${streak}`,
                    title: `${streak} Hari Berturut-turut`,
                    description: `Masya Allah! Konsistensi ${streak} hari membaca Al-Quran`,
                    icon: '🔥',
                    date: new Date().toISOString()
                });
                this.userProgress.achievements.push(`streak_${streak}`);
            }
        });

        // Show achievement notifications
        achievements.forEach(achievement => {
            this.showAchievementNotification(achievement);
        });

        return achievements;
    }

    // Show achievement notification
    showAchievementNotification(achievement) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <div class="achievement-content">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-text">
                    <h4>${achievement.title}</h4>
                    <p>${achievement.description}</p>
                </div>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--secondary-color), #ffd700);
            color: var(--primary-color);
            padding: 20px;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(244, 196, 48, 0.3);
            z-index: 10000;
            animation: slideInRight 0.5s ease-out;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        // Remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.5s ease-in';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        }, 5000);
    }

    // Get progress statistics
    getProgressStats() {
        if (!this.userProgress) return null;

        const pagesRead = this.userProgress.pagesRead.length;
        const totalPages = this.userProgress.totalPages;
        const percentage = Math.round((pagesRead / totalPages) * 100);
        
        return {
            pagesRead,
            totalPages,
            percentage,
            streak: this.userProgress.streak,
            dailyTarget: this.userProgress.dailyTarget,
            achievements: this.userProgress.achievements.length,
            daysActive: this.calculateDaysActive(),
            averagePagesPerDay: this.calculateAveragePages()
        };
    }

    // Calculate days active
    calculateDaysActive() {
        if (!this.userProgress.startDate) return 0;
        
        const startDate = new Date(this.userProgress.startDate);
        const today = new Date();
        const diffTime = today - startDate;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return Math.max(1, diffDays);
    }

    // Calculate average pages per day
    calculateAveragePages() {
        const daysActive = this.calculateDaysActive();
        const pagesRead = this.userProgress.pagesRead.length;
        
        return daysActive > 0 ? Math.round((pagesRead / daysActive) * 10) / 10 : 0;
    }

    // Add bookmark
    addBookmark(pageNumber, note = '') {
        const bookmark = {
            page: pageNumber,
            note: note,
            date: new Date().toISOString()
        };
        
        this.userProgress.bookmarks.push(bookmark);
        this.saveProgress();
    }

    // Remove bookmark
    removeBookmark(pageNumber) {
        this.userProgress.bookmarks = this.userProgress.bookmarks.filter(
            bookmark => bookmark.page !== pageNumber
        );
        this.saveProgress();
    }

    // Add note to page
    addNote(pageNumber, note) {
        this.userProgress.notes[pageNumber] = {
            text: note,
            date: new Date().toISOString()
        };
        this.saveProgress();
    }

    // Get note for page
    getNote(pageNumber) {
        return this.userProgress.notes[pageNumber] || null;
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Logout user
    logout() {
        localStorage.removeItem('quranTrackUser');
        this.currentUser = null;
        this.userProgress = null;
        window.location.href = 'login.html';
    }

    // Export progress data
    exportProgress() {
        if (!this.userProgress) return null;
        
        const exportData = {
            user: this.currentUser,
            progress: this.userProgress,
            exportDate: new Date().toISOString()
        };
        
        return JSON.stringify(exportData, null, 2);
    }

    // Import progress data
    importProgress(jsonData) {
        try {
            const importData = JSON.parse(jsonData);
            if (importData.progress) {
                this.userProgress = importData.progress;
                this.saveProgress();
                return true;
            }
        } catch (error) {
            console.error('Error importing progress:', error);
        }
        return false;
    }
}

// Initialize global QuranTracker instance
const quranTracker = new QuranTracker();

// Add CSS for achievement notifications
const achievementStyles = document.createElement('style');
achievementStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .achievement-content {
        display: flex;
        align-items: center;
        gap: 15px;
    }
    
    .achievement-icon {
        font-size: 2rem;
    }
    
    .achievement-text h4 {
        margin: 0 0 5px 0;
        font-size: 1.1rem;
        font-weight: 600;
    }
    
    .achievement-text p {
        margin: 0;
        font-size: 0.9rem;
        opacity: 0.9;
    }
`;

document.head.appendChild(achievementStyles);