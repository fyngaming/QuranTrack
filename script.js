// Data quotes islami
const quotes = [
    "Bacalah Al-Qur'an, karena ia akan datang pada hari kiamat sebagai pemberi syafaat bagi pembacanya. (HR. Muslim)",
    "Sebaik-baik kalian adalah yang mempelajari Al-Qur'an dan mengajarkannya. (HR. Bukhari)",
    "Orang yang membaca Al-Qur'an dan ia mahir, maka ia bersama para malaikat yang mulia. (HR. Bukhari & Muslim)",
    "Barangsiapa membaca satu huruf dari Al-Qur'an maka baginya satu kebaikan, dan satu kebaikan dibalas sepuluh kali lipat. (HR. Tirmidzi)",
    "Al-Qur'an adalah perjamuan Allah, maka pelajarilah perjamuan-Nya semampu kalian. (HR. Hakim)"
];

// Inisialisasi
let completedJuzList = JSON.parse(localStorage.getItem('completedJuz')) || [];
let isDarkMode = localStorage.getItem('darkMode') !== 'false';
let isLebaranMode = false;

// Expose ke window agar auth.js bisa mengaksesnya
window.completedJuzList = completedJuzList;
window.renderJuzGrid = renderJuzGrid;

// Tanggal tetap untuk Ramadhan dan Lebaran
const RAMADHAN_START = new Date('2026-02-19T04:24:00+07:00'); // 19 Februari 2026 pukul 04:24
const LEBARAN_DATE = new Date('2026-03-21T00:00:00+07:00');   // 21 Maret 2026 pukul 00:00

// Fungsi untuk mendapatkan waktu real saat ini
function getCurrentTime() {
    return new Date();
}

// Hitung countdown real-time ke lebaran
function calculateRealCountdown() {
    const now = getCurrentTime();
    const timeLeft = LEBARAN_DATE - now;
    
    if (timeLeft <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
    return { days, hours, minutes, seconds };
}

// Tanggal untuk simulasi - menggunakan waktu real
let ramadhanStartDate = RAMADHAN_START;
let lebaranDate = LEBARAN_DATE;

// Set tema awal
if (!isDarkMode) {
    document.body.setAttribute('data-theme', 'light');
}

// Fungsi render grid juz
function renderJuzGrid() {
    const juzGrid = document.getElementById('juzGrid');
    if (!juzGrid) return;
    
    // Sinkronisasi dengan data global jika ada update dari Auth/Database
    if (window.completedJuzList && window.completedJuzList !== completedJuzList) {
        completedJuzList = window.completedJuzList;
    }

    juzGrid.innerHTML = '';
    
    for (let i = 1; i <= 30; i++) {
        const juzCard = document.createElement('div');
        juzCard.className = 'juz-card';
        juzCard.dataset.juz = i;
        
        if (completedJuzList.includes(i)) {
            juzCard.classList.add('completed');
        }
        
        juzCard.innerHTML = `
            <div class="checkmark">✓</div>
            <div class="juz-number">${i}</div>
            <div class="juz-label">Juz</div>
        `;
        
        juzCard.addEventListener('click', () => toggleJuz(i));
        juzGrid.appendChild(juzCard);
    }
    
    updateProgress();
}

function toggleJuz(juzNumber) {
    const index = completedJuzList.indexOf(juzNumber);
    
    if (index > -1) {
        completedJuzList.splice(index, 1);
    } else {
        completedJuzList.push(juzNumber);
        
        // Mark pages as read in QuranTracker
        if (window.quranTracker) {
            const pagesPerJuz = Math.ceil(604 / 30); // Approximate pages per juz
            const startPage = (juzNumber - 1) * pagesPerJuz + 1;
            const endPage = Math.min(juzNumber * pagesPerJuz, 604);
            
            for (let page = startPage; page <= endPage; page++) {
                quranTracker.markPageAsRead(page);
            }
        }
        
        if (completedJuzList.length === 30) {
            setTimeout(() => showKhatamModal(), 500);
        }
    }
    
    localStorage.setItem('completedJuz', JSON.stringify(completedJuzList));
    window.completedJuzList = completedJuzList; // Update global variable
    renderJuzGrid();
}

function updateProgress() {
    const completed = completedJuzList.length;
    const percentage = Math.round((completed / 30) * 100);
    
    const completedEl = document.getElementById('completedJuz');
    const fillEl = document.getElementById('progressFill');
    const percentEl = document.getElementById('progressPercentage');
    
    if (completedEl) completedEl.textContent = completed;
    if (fillEl) fillEl.style.width = percentage + '%';
    if (percentEl) percentEl.textContent = percentage + '%';
    
    // Update progress stats from QuranTracker if available
    if (window.quranTracker && quranTracker.isLoggedIn()) {
        const stats = quranTracker.getProgressStats();
        if (stats) {
            // Update additional stats if elements exist
            const streakEl = document.getElementById('currentStreak');
            const pagesReadEl = document.getElementById('pagesRead');
            const achievementsEl = document.getElementById('totalAchievements');
            
            if (streakEl) streakEl.textContent = stats.streak;
            if (pagesReadEl) pagesReadEl.textContent = stats.pagesRead;
            if (achievementsEl) achievementsEl.textContent = stats.achievements;
        }
    }
}

function showKhatamModal() {
    const modal = document.getElementById('khatamModal');
    if (modal) {
        modal.classList.add('show');
        createConfetti();
    }
}

function createConfetti() {
    const container = document.getElementById('confettiContainer');
    if (!container) return;
    
    const colors = ['#ffd700', '#4ade80', '#60a5fa', '#f472b6', '#fb923c'];
    
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 2 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

function updateRamadhanDay() {
    const now = getCurrentTime();
    const diffTime = now - ramadhanStartDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const dayEl = document.getElementById('ramadhanDay');
    const headerEl = document.querySelector('.ramadhan-counter h3');
    
    if (!dayEl || !headerEl) return;
    
    if (diffTime < 0) {
        const daysToRamadhan = Math.abs(diffDays);
        dayEl.textContent = `${daysToRamadhan} hari lagi`;
        headerEl.innerHTML = `🕌 Menuju Ramadhan 1447 H dalam <span id="ramadhanDay">${daysToRamadhan} hari lagi</span>`;
    } else {
        const ramadhanDay = Math.max(1, Math.min(diffDays + 1, 30));
        dayEl.textContent = ramadhanDay;
        headerEl.innerHTML = `🕌 Hari ke-<span id="ramadhanDay">${ramadhanDay}</span> Ramadhan 1447 H`;
    }
}

function updateLebaranCountdown() {
    const countdown = calculateRealCountdown();
    
    // Cek jika waktu sudah habis (Lebaran tiba)
    if (countdown.days === 0 && countdown.hours === 0 && countdown.minutes === 0 && countdown.seconds === 0) {
        if (!isLebaranMode) {
            showLebaranCelebration();
        }
        return;
    }
    
    // Update tampilan dengan animasi
    animateNumber('daysLeft', countdown.days);
    animateNumber('hoursLeft', countdown.hours);
    animateNumber('minutesLeft', countdown.minutes);
    animateNumber('secondsLeft', countdown.seconds);
}

function showLebaranCelebration() {
    isLebaranMode = true;
    
    const countdownContainer = document.querySelector('.lebaran-countdown');
    if (countdownContainer) {
        countdownContainer.innerHTML = `
            <div class="lebaran-celebration" style="text-align: center; animation: fadeIn 1s ease-in; padding: 20px;">
                <div style="font-size: 3rem; margin-bottom: 10px; animation: bounce 2s infinite;">🕌 ✨ 🌙</div>
                <h2 style="
                    font-size: 2.2rem; 
                    color: #ffd700; 
                    text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); 
                    margin-bottom: 15px;
                    font-family: 'Amiri', serif;
                ">
                    Selamat Hari Raya Idul Fitri 1447 H
                </h2>
                <h3 style="font-size: 1.5rem; margin-bottom: 10px; color: var(--text-color);">Taqabbalallahu Minna Wa Minkum</h3>
                <p style="font-size: 1.1rem; opacity: 0.9; color: var(--text-secondary);">Mohon Maaf Lahir dan Batin</p>
            </div>
        `;
    }
    
    // Tambahkan animasi confetti full screen
    startLebaranAnimation();
}

function startLebaranAnimation() {
    // Container untuk animasi
    let container = document.getElementById('lebaranAnimationContainer');
    if (!container) {
        container = document.createElement('div');
        container.id = 'lebaranAnimationContainer';
        container.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9999;
            overflow: hidden;
        `;
        document.body.appendChild(container);
    }
    
    // Tambahkan style animasi
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fall {
            0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .lebaran-confetti {
            position: absolute;
            width: 10px;
            height: 10px;
            top: -10px;
        }
    `;
    document.head.appendChild(style);
    
    // Interval untuk membuat confetti terus menerus
    setInterval(() => {
        const colors = ['#ffd700', '#4ade80', '#60a5fa', '#f472b6', '#fb923c', '#ffffff'];
        const shapes = ['50%', '0']; // Circle and Square
        
        for (let i = 0; i < 5; i++) { // Buat 5 confetti setiap interval
            const confetti = document.createElement('div');
            confetti.className = 'lebaran-confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.style.animation = `fall ${Math.random() * 3 + 3}s linear forwards`;
            confetti.style.opacity = Math.random() * 0.5 + 0.5;
            
            container.appendChild(confetti);
            
            // Hapus elemen setelah animasi selesai
            setTimeout(() => confetti.remove(), 6000);
        }
    }, 300);
}

function animateNumber(elementId, newValue) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const currentValue = parseInt(element.textContent) || 0;
    
    if (currentValue !== newValue) {
        element.style.transform = 'translateY(-10px)';
        element.style.opacity = '0.5';
        
        setTimeout(() => {
            element.textContent = newValue.toString().padStart(2, '0');
            element.style.transform = 'translateY(0)';
            element.style.opacity = '1';
        }, 150);
    }
}

function displayRandomQuote() {
    const quoteEl = document.getElementById('quoteText');
    if (quoteEl) {
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        quoteEl.textContent = randomQuote;
    }
}

function saveDateSettings() {
    const ramadhanInput = document.getElementById('ramadhanStart');
    const lebaranInput = document.getElementById('lebaranDate');
    
    if (ramadhanInput && lebaranInput && ramadhanInput.value && lebaranInput.value) {
        ramadhanStartDate = new Date(ramadhanInput.value + '+07:00');
        lebaranDate = new Date(lebaranInput.value + '+07:00');
        
        updateRamadhanDay();
        updateLebaranCountdown();
        
        const modal = document.getElementById('settingsModal');
        if (modal) modal.classList.remove('show');
        
        showNotification('Pengaturan tanggal berhasil disimpan!');
    }
}

function loadDateSettings() {
    const ramadhanInput = document.getElementById('ramadhanStart');
    const lebaranInput = document.getElementById('lebaranDate');
    
    if (ramadhanInput) {
        ramadhanInput.value = ramadhanStartDate.toISOString().slice(0, 16);
    }
    if (lebaranInput) {
        lebaranInput.value = lebaranDate.toISOString().slice(0, 16);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 100);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Inisialisasi aplikasi
function init() {
    console.log('Initializing app...');
    
    // Pastikan data Quran tersedia
    if (!window.quranData) {
        console.warn('QuranData belum tersedia, menunggu...');
        setTimeout(init, 100);
        return;
    }
    
    console.log('QuranData tersedia:', window.quranData.surahs.length, 'surat');
    
    // Render komponen dasar
    renderJuzGrid();
    updateRamadhanDay();
    updateLebaranCountdown();
    displayRandomQuote();
    createFooter();
    
    // Set intervals - countdown dengan animasi
    setInterval(updateLebaranCountdown, 1000); // Update setiap detik
    setInterval(updateRamadhanDay, 1000 * 60 * 60 * 24); // Update setiap hari
    setInterval(displayRandomQuote, 30000);
    
    // Event listeners
    setupEventListeners();
    
    console.log('App initialized successfully');
}

function setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            document.body.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
            
            if (isDarkMode) {
                document.body.removeAttribute('data-theme');
                const icon = document.querySelector('.theme-toggle .icon');
                const moon = document.querySelector('.moon');
                if (icon) icon.textContent = '☀️';
                if (moon) moon.textContent = '🌙';
            } else {
                document.body.setAttribute('data-theme', 'light');
                const icon = document.querySelector('.theme-toggle .icon');
                const moon = document.querySelector('.moon');
                if (icon) icon.textContent = '🌙';
                if (moon) moon.textContent = '☀️';
            }
            
            localStorage.setItem('darkMode', isDarkMode);
            setTimeout(() => { document.body.style.transition = ''; }, 1500);
        });
    }
    
    // Settings
    const settingsBtn = document.getElementById('settingsBtn');
    if (settingsBtn) {
        settingsBtn.addEventListener('click', () => {
            loadDateSettings();
            const modal = document.getElementById('settingsModal');
            if (modal) modal.classList.add('show');
        });
    }
    
    const cancelSettings = document.getElementById('cancelSettings');
    if (cancelSettings) {
        cancelSettings.addEventListener('click', () => {
            const modal = document.getElementById('settingsModal');
            if (modal) modal.classList.remove('show');
        });
    }
    
    const saveSettings = document.getElementById('saveSettings');
    if (saveSettings) {
        saveSettings.addEventListener('click', saveDateSettings);
    }
    
    const settingsModal = document.getElementById('settingsModal');
    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target.id === 'settingsModal') {
                settingsModal.classList.remove('show');
            }
        });
    }
    
    // Close khatam modal
    const closeModal = document.getElementById('closeModal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            const modal = document.getElementById('khatamModal');
            if (modal) modal.classList.remove('show');
        });
    }
    
    // Reset button
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Apakah Anda yakin ingin mereset semua progress?')) {
                completedJuzList = [];
                localStorage.setItem('completedJuz', JSON.stringify(completedJuzList));
                renderJuzGrid();
            }
        });
    }
    
    // Navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
            
            btn.classList.add('active');
            const sectionId = btn.dataset.section + 'Section';
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Initialize Quran section when it's activated
                if (btn.dataset.section === 'quran' && window.quranReader) {
                    window.quranReader.initializeQuranSection();
                }
                
                // Load history when history section is activated
                if (btn.dataset.section === 'history' && window.quranReader) {
                    window.quranReader.loadHistory();
                }
            }
        });
    });
}

// Hafalan System
class HafalanSystem {
    constructor() {
        this.currentLevel = null;
        this.voiceMode = false;
        this.questions = [];
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];
        this.recognition = null;
        this.isRecording = false;
        this.currentAnswer = '';
        this.timer = null;
        this.timeLeft = 0;
        this.timePerQuestion = {
            mudah: 60,    // 60 detik
            sedang: 45,   // 45 detik
            sulit: 30     // 30 detik
        };
        
        this.initializeVoiceRecognition();
        this.setupEventListeners();
    }
    
    initializeVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = true; // Ubah ke true untuk hasil lebih akurat
            this.recognition.lang = 'id-ID';
            this.recognition.maxAlternatives = 3; // Ambil 3 alternatif terbaik
        }
    }
    
    setupEventListeners() {
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.level-btn').forEach(b => b.classList.remove('selected'));
                btn.classList.add('selected');
                this.currentLevel = btn.dataset.level;
                const startBtn = document.getElementById('startTest');
                if (startBtn) startBtn.disabled = false;
            });
        });
        
        const voiceMode = document.getElementById('voiceMode');
        if (voiceMode) {
            voiceMode.addEventListener('change', (e) => {
                this.voiceMode = e.target.checked;
            });
        }
        
        const startTest = document.getElementById('startTest');
        if (startTest) {
            startTest.addEventListener('click', () => this.startTest());
        }
        
        const submitAnswer = document.getElementById('submitAnswer');
        if (submitAnswer) {
            submitAnswer.addEventListener('click', () => this.submitAnswer());
        }
    }
    
    startTest() {
        this.generateQuestions();
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];
        
        const setup = document.getElementById('hafalanSetup');
        const test = document.getElementById('hafalanTest');
        if (setup) setup.style.display = 'none';
        if (test) test.style.display = 'block';
        
        this.showQuestion();
    }
    
    generateQuestions() {
        const allVerses = [
            // Al-Fatihah
            { surah: 'Al-Fatihah', surahNumber: 1, verse: 1, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', latin: 'Bismillahir-rahmanir-rahiim', translation: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang' },
            { surah: 'Al-Fatihah', surahNumber: 1, verse: 2, arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', latin: 'Alhamdulillahi rabbil-alamiin', translation: 'Segala puji bagi Allah, Tuhan seluruh alam' },
            { surah: 'Al-Fatihah', surahNumber: 1, verse: 3, arabic: 'الرَّحْمَٰنِ الرَّحِيمِ', latin: 'Ar-rahmanir-rahiim', translation: 'Yang Maha Pengasih, Maha Penyayang' },
            { surah: 'Al-Fatihah', surahNumber: 1, verse: 4, arabic: 'مَالِكِ يَوْمِ الدِّينِ', latin: 'Maliki yaumid-diin', translation: 'Pemilik hari pembalasan' },
            { surah: 'Al-Fatihah', surahNumber: 1, verse: 5, arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', latin: 'Iyyaka na\'budu wa iyyaka nasta\'iin', translation: 'Hanya kepada-Mu kami menyembah dan hanya kepada-Mu kami mohon pertolongan' },
            { surah: 'Al-Fatihah', surahNumber: 1, verse: 6, arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', latin: 'Ihdinash-shiratal-mustaqiim', translation: 'Tunjukilah kami jalan yang lurus' },
            { surah: 'Al-Fatihah', surahNumber: 1, verse: 7, arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', latin: 'Shiratalladzina an\'amta alaihim ghairil-maghdubi alaihim wa ladh-dhallin', translation: '(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) mereka yang sesat' },
            
            // Al-Ikhlas
            { surah: 'Al-Ikhlas', surahNumber: 112, verse: 1, arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', latin: 'Qul huwallahu ahad', translation: 'Katakanlah: Dia-lah Allah, Yang Maha Esa' },
            { surah: 'Al-Ikhlas', surahNumber: 112, verse: 2, arabic: 'اللَّهُ الصَّمَدُ', latin: 'Allahush-shamad', translation: 'Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu' },
            { surah: 'Al-Ikhlas', surahNumber: 112, verse: 3, arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ', latin: 'Lam yalid wa lam yuulad', translation: 'Dia tiada beranak dan tidak pula diperanakkan' },
            { surah: 'Al-Ikhlas', surahNumber: 112, verse: 4, arabic: 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ', latin: 'Wa lam yakun lahu kufuwan ahad', translation: 'Dan tidak ada seorang pun yang setara dengan Dia' },
            
            // An-Nas
            { surah: 'An-Nas', surahNumber: 114, verse: 1, arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', latin: 'Qul a\'uudzu birabbin-nas', translation: 'Katakanlah: Aku berlindung kepada Tuhan manusia' },
            { surah: 'An-Nas', surahNumber: 114, verse: 2, arabic: 'مَلِكِ النَّاسِ', latin: 'Malikin-nas', translation: 'Raja manusia' },
            { surah: 'An-Nas', surahNumber: 114, verse: 3, arabic: 'إِلَٰهِ النَّاسِ', latin: 'Ilahin-nas', translation: 'Sembahan manusia' },
            { surah: 'An-Nas', surahNumber: 114, verse: 4, arabic: 'مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ', latin: 'Min sharril-waswasil-khannas', translation: 'dari kejahatan (bisikan) syaitan yang biasa bersembunyi' },
            { surah: 'An-Nas', surahNumber: 114, verse: 5, arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ', latin: 'Alladzii yuwaswisu fii shudurin-nas', translation: 'yang membisikkan (kejahatan) ke dalam dada manusia' },
            { surah: 'An-Nas', surahNumber: 114, verse: 6, arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ', latin: 'Minal-jinnati wan-nas', translation: 'dari golongan jin dan manusia' }
        ];
        
        // Shuffle array untuk randomisasi
        const shuffled = [...allVerses].sort(() => Math.random() - 0.5);
        
        this.questions = [];
        const questionTypes = ['complete', 'identify', 'translate'];
        
        for (let i = 0; i < 10; i++) {
            const verse = shuffled[i % shuffled.length];
            const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];
            
            const question = { ...verse };
            question.id = i + 1;
            question.type = questionType;
            
            this.questions.push(question);
        }
    }
    
    showQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        const container = document.getElementById('questionContainer');
        const answerSection = document.getElementById('answerSection');
        const submitBtn = document.getElementById('submitAnswer');
        
        if (!container || !answerSection) return;
        
        if (submitBtn) {
            submitBtn.style.display = 'block';
            submitBtn.disabled = false;
        }
        
        container.innerHTML = '';
        
        document.getElementById('currentQuestion').textContent = this.currentQuestionIndex + 1;
        document.getElementById('testProgress').style.width = `${((this.currentQuestionIndex + 1) / 10) * 100}%`;
        document.getElementById('currentScore').textContent = this.score;
        
        // Start timer
        this.startTimer();
        
        if (question.type === 'complete') {
            container.innerHTML = `
                <div class="question-type">Lengkapi Bacaan Latin</div>
                <div class="timer-display" id="timerDisplay">
                    <span class="timer-icon">⏱️</span>
                    <span class="timer-text" id="timerText">00:00</span>
                </div>
                <div class="question-arabic">${question.arabic}</div>
                <div class="question-text">Lengkapi bacaan latin dari ayat di atas</div>
            `;
            
            if (this.voiceMode) {
                answerSection.innerHTML = `
                    <div class="voice-input-container">
                        <textarea class="answer-input" id="answerInput" placeholder="Ketik atau gunakan suara..."></textarea>
                        <button class="voice-record-btn" id="voiceRecordBtn" onclick="window.hafalanSystem.toggleVoiceRecording()">
                            <span class="mic-icon">🎤</span>
                            <span class="record-text">Rekam Suara</span>
                        </button>
                        <div class="voice-status" id="voiceStatus" style="display: none;"></div>
                    </div>
                `;
            } else {
                answerSection.innerHTML = `<textarea class="answer-input" id="answerInput" placeholder="Ketik bacaan latin..."></textarea>`;
            }
        } else if (question.type === 'identify') {
            container.innerHTML = `
                <div class="question-type">Identifikasi Ayat</div>
                <div class="timer-display" id="timerDisplay">
                    <span class="timer-icon">⏱️</span>
                    <span class="timer-text" id="timerText">00:00</span>
                </div>
                <div class="question-arabic">${question.arabic}</div>
                <div class="question-text">Sebutkan nama surat dan nomor ayat</div>
            `;
            answerSection.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <input type="text" class="answer-input" id="surahInput" placeholder="Nama Surat" style="min-height: auto; height: 50px;">
                    <input type="number" class="answer-input" id="verseInput" placeholder="Nomor Ayat" style="min-height: auto; height: 50px;">
                </div>
            `;
        } else if (question.type === 'translate') {
            container.innerHTML = `
                <div class="question-type">Terjemahkan Ayat</div>
                <div class="timer-display" id="timerDisplay">
                    <span class="timer-icon">⏱️</span>
                    <span class="timer-text" id="timerText">00:00</span>
                </div>
                <div class="question-arabic">${question.arabic}</div>
                <div class="question-text">Apa arti dari ayat di atas?</div>
            `;
            
            if (this.voiceMode) {
                answerSection.innerHTML = `
                    <div class="voice-input-container">
                        <textarea class="answer-input" id="answerInput" placeholder="Ketik atau gunakan suara..."></textarea>
                        <button class="voice-record-btn" id="voiceRecordBtn" onclick="window.hafalanSystem.toggleVoiceRecording()">
                            <span class="mic-icon">🎤</span>
                            <span class="record-text">Rekam Suara</span>
                        </button>
                        <div class="voice-status" id="voiceStatus" style="display: none;"></div>
                    </div>
                `;
            } else {
                answerSection.innerHTML = `<textarea class="answer-input" id="answerInput" placeholder="Ketik terjemahan..."></textarea>`;
            }
        }
    }
    
    startTimer() {
        // Clear existing timer
        if (this.timer) {
            clearInterval(this.timer);
        }
        
        // Set time based on difficulty level
        this.timeLeft = this.timePerQuestion[this.currentLevel] || 60;
        
        // Update display immediately
        this.updateTimerDisplay();
        
        // Start countdown
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            // Warning when time is running out
            if (this.timeLeft <= 10) {
                const timerDisplay = document.getElementById('timerDisplay');
                if (timerDisplay) {
                    timerDisplay.classList.add('timer-warning');
                }
            }
            
            // Time's up
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.handleTimeUp();
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        const timerText = document.getElementById('timerText');
        if (timerText) {
            const minutes = Math.floor(this.timeLeft / 60);
            const seconds = this.timeLeft % 60;
            timerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
    
    handleTimeUp() {
        const timerDisplay = document.getElementById('timerDisplay');
        if (timerDisplay) {
            timerDisplay.classList.add('timer-expired');
        }
        
        showNotification('⏰ Waktu habis! Melanjutkan ke soal berikutnya...');
        
        // Auto submit with empty answer
        setTimeout(() => {
            this.submitAnswer();
        }, 1500);
    }
    
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    toggleVoiceRecording() {
        if (!this.recognition) {
            showNotification('❌ Browser Anda tidak mendukung fitur voice recognition');
            return;
        }
        
        const recordBtn = document.getElementById('voiceRecordBtn');
        const voiceStatus = document.getElementById('voiceStatus');
        const answerInput = document.getElementById('answerInput');
        
        if (!this.isRecording) {
            // Mulai rekam
            this.isRecording = true;
            recordBtn.classList.add('recording');
            recordBtn.innerHTML = `
                <span class="mic-icon pulse">🎤</span>
                <span class="record-text">Merekam...</span>
            `;
            
            if (voiceStatus) {
                voiceStatus.style.display = 'block';
                voiceStatus.innerHTML = '<div class="recording-animation">🔴 Sedang merekam...</div>';
            }
            
            this.recognition.start();
            
            this.recognition.onresult = (event) => {
                // Ambil hasil final atau interim
                let transcript = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    if (event.results[i].isFinal) {
                        transcript += event.results[i][0].transcript;
                    } else {
                        // Tampilkan interim result
                        const interimTranscript = event.results[i][0].transcript;
                        if (answerInput) {
                            answerInput.placeholder = `Mendengarkan: ${interimTranscript}...`;
                        }
                    }
                }
                
                // Update input dengan hasil final
                if (transcript && answerInput) {
                    // Bersihkan dan format transcript
                    transcript = transcript.trim();
                    answerInput.value = transcript;
                    answerInput.placeholder = 'Ketik atau gunakan suara...';
                }
                this.currentAnswer = transcript;
            };
            
            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                showNotification('❌ Terjadi kesalahan saat merekam suara');
                this.stopVoiceRecording();
            };
            
            this.recognition.onend = () => {
                this.stopVoiceRecording();
            };
        } else {
            // Stop rekam
            this.recognition.stop();
        }
    }
    
    stopVoiceRecording() {
        this.isRecording = false;
        const recordBtn = document.getElementById('voiceRecordBtn');
        const voiceStatus = document.getElementById('voiceStatus');
        
        if (recordBtn) {
            recordBtn.classList.remove('recording');
            recordBtn.innerHTML = `
                <span class="mic-icon">🎤</span>
                <span class="record-text">Rekam Suara</span>
            `;
        }
        
        if (voiceStatus) {
            voiceStatus.style.display = 'none';
        }
    }
    
    submitAnswer() {
        // Stop timer
        this.stopTimer();
        
        const question = this.questions[this.currentQuestionIndex];
        let userAnswer = '';
        let evaluation = this.evaluateAnswer(question);
        
        if (question.type === 'complete' || question.type === 'translate') {
            const input = document.getElementById('answerInput');
            userAnswer = input ? input.value.trim() : '';
        } else if (question.type === 'identify') {
            const surahInput = document.getElementById('surahInput');
            const verseInput = document.getElementById('verseInput');
            userAnswer = `${surahInput ? surahInput.value.trim() : ''}, Ayat ${verseInput ? verseInput.value : ''}`;
        }
        
        this.answers.push({ 
            question, 
            userAnswer, 
            evaluation: evaluation.category,
            points: evaluation.points,
            feedback: evaluation.feedback
        });
        this.score += evaluation.points;
        
        // Tampilkan hasil evaluasi
        this.showAnswerFeedback(evaluation);
        
        // Tampilkan tombol lanjutkan setelah feedback
        setTimeout(() => {
            this.showContinueButton();
        }, 2000);
    }
    
    evaluateAnswer(question) {
        let userAnswer = '';
        let correctAnswer = '';
        
        if (question.type === 'complete') {
            const input = document.getElementById('answerInput');
            userAnswer = input ? input.value.trim().toLowerCase() : '';
            correctAnswer = question.latin.toLowerCase();
        } else if (question.type === 'translate') {
            const input = document.getElementById('answerInput');
            userAnswer = input ? input.value.trim().toLowerCase() : '';
            correctAnswer = question.translation.toLowerCase();
        } else if (question.type === 'identify') {
            const surahInput = document.getElementById('surahInput');
            const verseInput = document.getElementById('verseInput');
            const userSurah = surahInput ? surahInput.value.trim().toLowerCase() : '';
            const userVerse = verseInput ? parseInt(verseInput.value) || 0 : 0;
            
            correctAnswer = question.surah.toLowerCase();
            const correctVerse = question.verse;
            
            // Evaluasi untuk identifikasi ayat dengan toleransi lebih tinggi
            const surahMatch = this.calculateFlexibleSimilarity(userSurah, correctAnswer);
            const verseMatch = userVerse === correctVerse;
            
            if (surahMatch >= 0.75 && verseMatch) {
                return {
                    category: 'Sangat Tepat',
                    points: 100,
                    feedback: '🎉 Sempurna! Jawaban Anda benar!',
                    color: '#22c55e'
                };
            } else if (surahMatch >= 0.55 && verseMatch) {
                return {
                    category: 'Tepat',
                    points: 85,
                    feedback: '✅ Bagus! Jawaban Anda benar meskipun ada sedikit perbedaan penulisan.',
                    color: '#3b82f6'
                };
            } else if (surahMatch >= 0.4 || verseMatch) {
                return {
                    category: 'Kurang Tepat',
                    points: 50,
                    feedback: '⚠️ Hampir benar! Perhatikan penulisan atau nomor ayat.',
                    color: '#f59e0b'
                };
            } else {
                return {
                    category: 'Tidak Tepat',
                    points: 20,
                    feedback: '❌ Belum tepat. Coba lagi!',
                    color: '#ef4444'
                };
            }
        }
        
        // Evaluasi untuk melengkapi ayat dan terjemahan dengan sistem poin bertingkat
        const similarity = this.calculateFlexibleSimilarity(userAnswer, correctAnswer);
        
        // Sistem poin bertingkat yang lebih detail
        if (similarity >= 0.95) {
            return {
                category: 'Sangat Tepat',
                points: 100,
                feedback: '🎉 Sempurna! Jawaban Anda 100% benar!',
                color: '#22c55e'
            };
        } else if (similarity >= 0.85) {
            return {
                category: 'Sangat Tepat',
                points: 95,
                feedback: '🌟 Luar biasa! Hampir sempurna!',
                color: '#22c55e'
            };
        } else if (similarity >= 0.75) {
            return {
                category: 'Tepat',
                points: 90,
                feedback: '✅ Sangat bagus! Jawaban Anda benar!',
                color: '#3b82f6'
            };
        } else if (similarity >= 0.65) {
            return {
                category: 'Tepat',
                points: 85,
                feedback: '✅ Bagus! Jawaban Anda tepat dengan sedikit perbedaan.',
                color: '#3b82f6'
            };
        } else if (similarity >= 0.55) {
            return {
                category: 'Tepat',
                points: 75,
                feedback: '👍 Benar! Ada sedikit kesalahan penulisan.',
                color: '#3b82f6'
            };
        } else if (similarity >= 0.45) {
            return {
                category: 'Kurang Tepat',
                points: 60,
                feedback: '⚠️ Cukup baik! Masih ada beberapa kesalahan.',
                color: '#f59e0b'
            };
        } else if (similarity >= 0.35) {
            return {
                category: 'Kurang Tepat',
                points: 45,
                feedback: '⚠️ Hampir benar! Perlu lebih teliti lagi.',
                color: '#f59e0b'
            };
        } else if (similarity >= 0.25) {
            return {
                category: 'Kurang Tepat',
                points: 30,
                feedback: '📚 Masih kurang tepat. Pelajari lagi ya!',
                color: '#f59e0b'
            };
        } else {
            return {
                category: 'Tidak Tepat',
                points: 15,
                feedback: '❌ Belum tepat. Tetap semangat belajar!',
                color: '#ef4444'
            };
        }
    }
    
    calculateFlexibleSimilarity(str1, str2) {
        // Normalisasi string dengan lebih toleran
        str1 = this.normalizeText(str1);
        str2 = this.normalizeText(str2);
        
        if (str1 === str2) return 1;
        if (str1.length === 0 || str2.length === 0) return 0;
        
        // Cek kesamaan kata per kata (lebih toleran untuk urutan)
        const words1 = str1.split(/\s+/);
        const words2 = str2.split(/\s+/);
        
        let matchedWords = 0;
        const usedIndices = new Set();
        
        for (const word1 of words1) {
            for (let i = 0; i < words2.length; i++) {
                if (usedIndices.has(i)) continue;
                
                const wordSimilarity = this.calculateLevenshtein(word1, words2[i]);
                // Toleransi tinggi untuk kesamaan kata (60% sudah dianggap sama)
                if (wordSimilarity >= 0.6) {
                    matchedWords++;
                    usedIndices.add(i);
                    break;
                }
            }
        }
        
        // Hitung persentase kata yang cocok
        const wordMatchScore = matchedWords / Math.max(words1.length, words2.length);
        
        // Hitung juga kesamaan karakter keseluruhan
        const charSimilarity = this.calculateLevenshtein(str1, str2);
        
        // Gabungkan kedua metrik dengan bobot (70% kata, 30% karakter)
        return (wordMatchScore * 0.7) + (charSimilarity * 0.3);
    }
    
    normalizeText(text) {
        return text
            .toLowerCase()
            .trim()
            // Hapus tanda baca
            .replace(/[^a-z\s]/g, '')
            // Normalisasi spasi
            .replace(/\s+/g, ' ')
            // Perbaiki ejaan umum
            .replace(/bismilah/g, 'bismillah')
            .replace(/alhamdu/g, 'alhamdu')
            .replace(/rahman/g, 'rahman')
            .replace(/rahim/g, 'rahim');
    }
    
    calculateLevenshtein(str1, str2) {
        const matrix = [];
        
        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }
        
        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        
        const maxLength = Math.max(str1.length, str2.length);
        return (maxLength - matrix[str2.length][str1.length]) / maxLength;
    }
    
    showAnswerFeedback(evaluation) {
        const container = document.getElementById('questionContainer');
        if (!container) return;
        
        const submitBtn = document.getElementById('submitAnswer');
        if (submitBtn) {
            submitBtn.style.display = 'none';
            submitBtn.disabled = true;
        }
        
        const question = this.questions[this.currentQuestionIndex];
        const lastAnswer = this.answers[this.answers.length - 1];
        
        // Tampilkan jawaban yang benar
        let correctAnswerHtml = '';
        if (question.type === 'complete') {
            correctAnswerHtml = `
                <div class="correct-answer-section" style="
                    background: rgba(34, 197, 94, 0.1);
                    border: 2px solid #22c55e;
                    border-radius: 12px;
                    padding: 20px;
                    margin-top: 20px;
                    text-align: left;
                ">
                    <h4 style="color: #22c55e; margin-bottom: 15px; font-size: 16px;">✅ Jawaban Yang Benar:</h4>
                    <div style="background: white; padding: 15px; border-radius: 8px; margin-bottom: 10px;">
                        <p style="margin: 0; color: #333; font-size: 15px; font-weight: 600;">${question.latin}</p>
                    </div>
                    <div style="background: rgba(255,255,255,0.5); padding: 12px; border-radius: 8px;">
                        <p style="margin: 0; color: #666; font-size: 14px; font-style: italic;">${question.translation}</p>
                    </div>
                    ${lastAnswer.userAnswer ? `
                        <div style="margin-top: 15px; padding: 12px; background: rgba(239, 68, 68, 0.1); border-radius: 8px;">
                            <p style="margin: 0; color: #ef4444; font-size: 14px;"><strong>Jawaban Anda:</strong> ${lastAnswer.userAnswer}</p>
                        </div>
                    ` : ''}
                </div>
            `;
        } else if (question.type === 'identify') {
            correctAnswerHtml = `
                <div class="correct-answer-section" style="
                    background: rgba(34, 197, 94, 0.1);
                    border: 2px solid #22c55e;
                    border-radius: 12px;
                    padding: 20px;
                    margin-top: 20px;
                    text-align: left;
                ">
                    <h4 style="color: #22c55e; margin-bottom: 15px; font-size: 16px;">✅ Jawaban Yang Benar:</h4>
                    <div style="background: white; padding: 15px; border-radius: 8px;">
                        <p style="margin: 0 0 8px 0; color: #333; font-size: 15px;"><strong>Surat:</strong> ${question.surah}</p>
                        <p style="margin: 0; color: #333; font-size: 15px;"><strong>Ayat:</strong> ${question.verse}</p>
                    </div>
                    ${lastAnswer.userAnswer ? `
                        <div style="margin-top: 15px; padding: 12px; background: rgba(239, 68, 68, 0.1); border-radius: 8px;">
                            <p style="margin: 0; color: #ef4444; font-size: 14px;"><strong>Jawaban Anda:</strong> ${lastAnswer.userAnswer}</p>
                        </div>
                    ` : ''}
                </div>
            `;
        } else if (question.type === 'translate') {
            correctAnswerHtml = `
                <div class="correct-answer-section" style="
                    background: rgba(34, 197, 94, 0.1);
                    border: 2px solid #22c55e;
                    border-radius: 12px;
                    padding: 20px;
                    margin-top: 20px;
                    text-align: left;
                ">
                    <h4 style="color: #22c55e; margin-bottom: 15px; font-size: 16px;">✅ Terjemahan Yang Benar:</h4>
                    <div style="background: white; padding: 15px; border-radius: 8px;">
                        <p style="margin: 0; color: #333; font-size: 15px; line-height: 1.6;">${question.translation}</p>
                    </div>
                    ${lastAnswer.userAnswer ? `
                        <div style="margin-top: 15px; padding: 12px; background: rgba(239, 68, 68, 0.1); border-radius: 8px;">
                            <p style="margin: 0; color: #ef4444; font-size: 14px;"><strong>Jawaban Anda:</strong> ${lastAnswer.userAnswer}</p>
                        </div>
                    ` : ''}
                </div>
            `;
        }
        
        const feedbackHtml = `
            <div class="answer-feedback" style="
                background: linear-gradient(135deg, ${evaluation.color}15, ${evaluation.color}25);
                border: 2px solid ${evaluation.color};
                border-radius: 15px;
                padding: 25px;
                text-align: center;
                margin: 20px 0;
                animation: feedbackSlide 0.5s ease-out;
            ">
                <div class="evaluation-badge" style="
                    background: ${evaluation.color};
                    color: white;
                    padding: 8px 20px;
                    border-radius: 25px;
                    font-weight: bold;
                    font-size: 16px;
                    margin-bottom: 15px;
                    display: inline-block;
                ">
                    ${evaluation.category}
                </div>
                <div class="points-earned" style="
                    font-size: 24px;
                    font-weight: bold;
                    color: ${evaluation.color};
                    margin: 10px 0;
                ">
                    +${evaluation.points} Poin
                </div>
                <div class="feedback-message" style="
                    font-size: 16px;
                    color: var(--text-color);
                    margin-top: 10px;
                ">
                    ${evaluation.feedback}
                </div>
                ${correctAnswerHtml}
            </div>
        `;
        
        container.innerHTML += feedbackHtml;
        
        setTimeout(() => {
            const feedback = container.querySelector('.answer-feedback');
            if (feedback) {
                feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    }
    
    showContinueButton() {
        const container = document.getElementById('questionContainer');
        if (!container) return;
        
        // Tambahkan tombol lanjutkan
        const continueButtonHtml = `
            <div class="continue-section" style="
                text-align: center;
                margin: 20px 0;
                padding: 20px;
            ">
                <button class="continue-btn" onclick="window.hafalanSystem.nextQuestion()" style="
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    border-radius: 25px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
                ">
                    ${this.currentQuestionIndex + 1 < 10 ? '➡️ Lanjut ke Soal Berikutnya' : '🏁 Lihat Hasil Akhir'}
                </button>
            </div>
        `;
        
        container.innerHTML += continueButtonHtml;
    }
    
    nextQuestion() {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < 10) {
            this.showQuestion();
        } else {
            this.showFinalResult();
        }
    }
    
    showFinalResult() {
        const test = document.getElementById('hafalanTest');
        const result = document.getElementById('hafalanResult');
        
        if (test) test.style.display = 'none';
        if (result) {
            result.style.display = 'block';
            
            // Hitung statistik
            const stats = this.calculateStatistics();
            const grade = this.getGrade(this.score);
            
            result.innerHTML = `
                <div class="result-container">
                    <div class="result-header">
                        <h2>🎯 Hasil Uji Hafalan</h2>
                        <div class="final-score-display">
                            <div class="score-circle" style="background: ${grade.color}">
                                <span class="score-number">${this.score}</span>
                                <span class="score-total">/1000</span>
                            </div>
                            <div class="grade-info">
                                <div class="grade-letter" style="color: ${grade.color}">${grade.letter}</div>
                                <div class="grade-description">${grade.description}</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="statistics-grid">
                        <div class="stat-card sangat-tepat">
                            <div class="stat-icon">🎉</div>
                            <div class="stat-number">${stats.sangatTepat}</div>
                            <div class="stat-label">Sangat Tepat</div>
                        </div>
                        <div class="stat-card tepat">
                            <div class="stat-icon">✅</div>
                            <div class="stat-number">${stats.tepat}</div>
                            <div class="stat-label">Tepat</div>
                        </div>
                        <div class="stat-card kurang-tepat">
                            <div class="stat-icon">⚠️</div>
                            <div class="stat-number">${stats.kurangTepat}</div>
                            <div class="stat-label">Kurang Tepat</div>
                        </div>
                        <div class="stat-card tidak-tepat">
                            <div class="stat-icon">❌</div>
                            <div class="stat-number">${stats.tidakTepat}</div>
                            <div class="stat-label">Tidak Tepat</div>
                        </div>
                    </div>
                    
                    <div class="performance-message" style="color: ${grade.color}">
                        ${grade.message}
                    </div>
                    
                    <div class="result-actions">
                        <button class="restart-btn" onclick="window.hafalanSystem.restart()">
                            <span class="btn-icon">🔄</span>
                            <span class="btn-text">Uji Lagi</span>
                        </button>
                        <button class="back-btn" onclick="window.hafalanSystem.backToSetup()">
                            <span class="btn-icon">🏠</span>
                            <span class="btn-text">Kembali</span>
                        </button>
                    </div>
                </div>
            `;
        }
    }
    
    calculateStatistics() {
        const stats = {
            sangatTepat: 0,
            tepat: 0,
            kurangTepat: 0,
            tidakTepat: 0
        };
        
        this.answers.forEach(answer => {
            switch(answer.evaluation) {
                case 'Sangat Tepat':
                    stats.sangatTepat++;
                    break;
                case 'Tepat':
                    stats.tepat++;
                    break;
                case 'Kurang Tepat':
                    stats.kurangTepat++;
                    break;
                case 'Tidak Tepat':
                    stats.tidakTepat++;
                    break;
            }
        });
        
        return stats;
    }
    
    getGrade(score) {
        if (score >= 900) {
            return {
                letter: 'A+',
                description: 'Istimewa',
                color: '#22c55e',
                message: '🌟 Masya Allah! Hafalan Anda luar biasa sempurna! Terus pertahankan dan tingkatkan!'
            };
        } else if (score >= 800) {
            return {
                letter: 'A',
                description: 'Sangat Baik',
                color: '#16a34a',
                message: '🎉 Alhamdulillah! Hafalan Anda sangat baik! Sedikit lagi mencapai kesempurnaan!'
            };
        } else if (score >= 700) {
            return {
                letter: 'B+',
                description: 'Baik',
                color: '#3b82f6',
                message: '👏 Bagus! Hafalan Anda sudah baik, terus berlatih untuk hasil yang lebih baik!'
            };
        } else if (score >= 600) {
            return {
                letter: 'B',
                description: 'Cukup Baik',
                color: '#0ea5e9',
                message: '📚 Cukup baik! Perbanyak latihan dan muraja\'ah untuk meningkatkan hafalan!'
            };
        } else if (score >= 500) {
            return {
                letter: 'C+',
                description: 'Cukup',
                color: '#f59e0b',
                message: '💪 Terus semangat! Perbanyak latihan dan jangan menyerah!'
            };
        } else if (score >= 400) {
            return {
                letter: 'C',
                description: 'Kurang',
                color: '#f97316',
                message: '🔥 Jangan patah semangat! Setiap hafalan butuh proses dan latihan yang konsisten!'
            };
        } else {
            return {
                letter: 'D',
                description: 'Perlu Belajar Lebih',
                color: '#ef4444',
                message: '🌱 Ini adalah awal yang baik! Terus belajar dan berlatih, pasti bisa lebih baik!'
            };
        }
    }
    
    backToSetup() {
        this.stopTimer();
        
        const result = document.getElementById('hafalanResult');
        const test = document.getElementById('hafalanTest');
        const setup = document.getElementById('hafalanSetup');
        
        if (result) result.style.display = 'none';
        if (test) test.style.display = 'none';
        if (setup) setup.style.display = 'block';
        
        // Reset selections
        document.querySelectorAll('.level-btn').forEach(btn => btn.classList.remove('selected'));
        this.currentLevel = null;
        const startBtn = document.getElementById('startTest');
        if (startBtn) startBtn.disabled = true;
        
        // Reset voice mode
        const voiceMode = document.getElementById('voiceMode');
        if (voiceMode) voiceMode.checked = false;
        this.voiceMode = false;
        
        // Reset quiz state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];
        this.questions = [];
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    confirmExit() {
        // Stop timer sementara
        this.stopTimer();
        
        // Buat custom modal konfirmasi
        const modal = document.createElement('div');
        modal.className = 'exit-confirm-modal';
        modal.innerHTML = `
            <div class="exit-confirm-content">
                <div class="exit-icon">⚠️</div>
                <h3>Keluar dari Uji Hafalan?</h3>
                <p>Jika Anda keluar sekarang, skor uji hafalan Anda akan dianggap <strong>0 (kosong)</strong>.</p>
                <p class="exit-warning">Progress yang sudah dikerjakan tidak akan tersimpan.</p>
                <div class="exit-confirm-buttons">
                    <button class="exit-cancel-btn" onclick="window.hafalanSystem.cancelExit()">
                        ❌ Tidak, Lanjutkan
                    </button>
                    <button class="exit-confirm-btn" onclick="window.hafalanSystem.exitTest()">
                        ✅ Ya, Keluar
                    </button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);
    }
    
    cancelExit() {
        const modal = document.querySelector('.exit-confirm-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
        
        // Lanjutkan timer
        this.startTimer();
    }
    
    exitTest() {
        // Hapus modal
        const modal = document.querySelector('.exit-confirm-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
        
        // Set skor ke 0
        this.score = 0;
        this.answers = [];
        
        // Tampilkan hasil dengan skor 0
        this.showFinalResult();
    }
    
    restart() {
        this.stopTimer();
        
        // Reset quiz state
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.answers = [];
        
        // Generate new questions
        this.generateQuestions();
        
        const result = document.getElementById('hafalanResult');
        const test = document.getElementById('hafalanTest');
        
        if (result) result.style.display = 'none';
        if (test) test.style.display = 'block';
        
        // Show first question
        this.showQuestion();
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Quran Reader System
class QuranReader {
    constructor() {
        this.currentView = 'list';
        this.currentSurah = null;
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        const surahSelect = document.getElementById('surahSelect');
        if (surahSelect) {
            surahSelect.addEventListener('change', (e) => {
                if (e.target.value) {
                    this.loadSurah(parseInt(e.target.value));
                } else {
                    this.showSurahList();
                }
            });
        }
        
        const juzSelect = document.getElementById('juzSelect');
        if (juzSelect) {
            juzSelect.addEventListener('change', (e) => {
                this.filterByJuz(e.target.value);
            });
        }
    }
    
    async initializeQuranSection() {
        await this.populateSurahSelect();
        this.populateJuzSelect();
        this.showSurahList();
    }
    
    async populateSurahSelect() {
        const surahSelect = document.getElementById('surahSelect');
        if (!surahSelect) return;
        
        surahSelect.innerHTML = '<option value="">Pilih Surat</option>';
        
        try {
            if (window.quranData && window.quranData.surahs) {
                window.quranData.surahs.forEach(surah => {
                    const option = document.createElement('option');
                    option.value = surah.number;
                    option.textContent = `${surah.number}. ${surah.name} (${surah.arabicName})`;
                    surahSelect.appendChild(option);
                });
            }
        } catch (error) {
            console.error('Error populating surah select:', error);
        }
    }
    
    populateJuzSelect() {
        const juzSelect = document.getElementById('juzSelect');
        if (!juzSelect) return;
        
        juzSelect.innerHTML = '<option value="">Filter by Juz</option>';
        
        for (let i = 1; i <= 30; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Juz ${i}`;
            juzSelect.appendChild(option);
        }
    }
    
    showSurahList() {
        const quranReader = document.getElementById('quranReader');
        if (!quranReader) return;
        
        this.currentView = 'list';
        
        quranReader.innerHTML = `
            <div class="surah-list-header">
                <h3>📖 Daftar Surat Al-Qur'an</h3>
                <p>Pilih surat yang ingin Anda baca</p>
            </div>
            <div class="surah-grid" id="surahGrid">
                ${this.generateSurahCards()}
            </div>
        `;
        
        document.querySelectorAll('.surah-card').forEach(card => {
            card.addEventListener('click', () => {
                const surahNumber = parseInt(card.dataset.surah);
                this.loadSurah(surahNumber);
            });
        });
    }
    
    generateSurahCards() {
        if (!window.quranData || !window.quranData.surahs) {
            console.error('Data Quran tidak tersedia');
            return `
                <div class="error-message">
                    <h3>⚠️ Data Tidak Tersedia</h3>
                    <p>Data surat Al-Qur'an sedang dimuat. Silakan refresh halaman atau tunggu beberapa saat.</p>
                    <button onclick="location.reload()" class="refresh-btn">🔄 Refresh Halaman</button>
                </div>
            `;
        }
        
        return window.quranData.surahs.map(surah => `
            <div class="surah-card" data-surah="${surah.number}">
                <div class="surah-header">
                    <div class="surah-number">${surah.number}</div>
                    <div class="surah-names">
                        <h4 class="surah-name-latin">${surah.name}</h4>
                        <p class="surah-name-arabic">${surah.arabicName}</p>
                    </div>
                </div>
                <div class="surah-info">
                    <div class="info-item">
                        <span class="info-label">Ayat</span>
                        <span class="info-value">${surah.verses}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Turun</span>
                        <span class="info-value">${surah.revelation}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Juz</span>
                        <span class="info-value">${surah.juz}</span>
                    </div>
                </div>
                <button class="read-btn">
                    <span class="btn-icon">📖</span>
                    Baca Surat
                </button>
            </div>
        `).join('');
    }
    
    async loadSurah(surahNumber) {
        const quranReader = document.getElementById('quranReader');
        if (!quranReader) return;
        
        this.currentView = 'reader';
        this.currentSurah = surahNumber;
        
        const surahSelect = document.getElementById('surahSelect');
        if (surahSelect) {
            surahSelect.value = surahNumber;
        }
        
        quranReader.innerHTML = `
            <div class="loading-indicator">
                <div class="loading-spinner"></div>
                <p>Memuat surat...</p>
            </div>
        `;
        
        try {
            if (window.quranData && window.quranData.getSurahData) {
                const surahData = await window.quranData.getSurahData(surahNumber);
                
                if (surahData) {
                    this.displaySurah(surahData);
                } else {
                    this.showError('Gagal memuat data surat');
                }
            } else {
                this.showError('Data Quran tidak tersedia');
            }
        } catch (error) {
            console.error('Error loading surah:', error);
            this.showError('Terjadi kesalahan saat memuat surat');
        }
    }
    
    displaySurah(surahData) {
        const quranReader = document.getElementById('quranReader');
        if (!quranReader) return;
        
        const surahInfo = window.quranData.surahs.find(s => s.number === surahData.number);
        
        quranReader.innerHTML = `
            <div class="surah-content-view">
                <button class="back-btn" onclick="window.quranReader.showSurahList()">
                    <span>←</span> Kembali ke Daftar Surat
                </button>
                
                <div class="surah-content-header">
                    <div class="surah-title-section">
                        <h2 class="surah-title">${surahData.name}</h2>
                        <p class="surah-title-arabic">${surahData.arabicName}</p>
                        <div class="surah-meta">
                            ${surahData.numberOfVerses} Ayat • ${surahData.revelation} • Juz ${surahInfo?.juz || ''}
                        </div>
                    </div>
                </div>
                
                <div class="tajwid-legend">
                    <h4>📚 Panduan Hukum Tajwid</h4>
                    <div class="tajwid-info">
                        ℹ️ Untuk pewarnaan hukum tajwid yang akurat, disarankan menggunakan mushaf Al-Quran digital atau aplikasi khusus tajwid.
                        Berikut adalah panduan warna umum hukum tajwid:
                    </div>
                    <div class="tajwid-legend-grid">
                        <div class="tajwid-item">
                            <div class="tajwid-color" style="background: #a8dadc;"></div>
                            <span class="tajwid-label">Ikhfa (Samar)</span>
                        </div>
                        <div class="tajwid-item">
                            <div class="tajwid-color" style="background: #457b9d;"></div>
                            <span class="tajwid-label">Idgham (Masuk)</span>
                        </div>
                        <div class="tajwid-item">
                            <div class="tajwid-color" style="background: #e63946;"></div>
                            <span class="tajwid-label">Iqlab (Membalik)</span>
                        </div>
                        <div class="tajwid-item">
                            <div class="tajwid-color" style="background: #f1faee;"></div>
                            <span class="tajwid-label">Ghunnah (Dengung)</span>
                        </div>
                        <div class="tajwid-item">
                            <div class="tajwid-color" style="background: #06ffa5;"></div>
                            <span class="tajwid-label">Qalqalah (Mantul)</span>
                        </div>
                        <div class="tajwid-item">
                            <div class="tajwid-color" style="background: #ffbe0b;"></div>
                            <span class="tajwid-label">Mad (Panjang)</span>
                        </div>
                        <div class="tajwid-item">
                            <div class="tajwid-color" style="background: #fb5607;"></div>
                            <span class="tajwid-label">Waqf (Berhenti)</span>
                        </div>
                    </div>
                </div>
                
                ${this.generateBismillah(surahData.number)}
                
                <div class="ayah-list">
                    ${this.generateAyahList(surahData.verses, surahData.number)}
                </div>
            </div>
        `;
    }
    
    generateBismillah(surahNumber) {
        if (surahNumber === 9) return '';
        
        return `
            <div class="bismillah-header">
                <div class="ayah-arabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
                <div class="ayah-latin">Bismillahir-rahmanir-rahiim</div>
                <div class="ayah-translation">Dengan nama Allah Yang Maha Pengasih, Maha Penyayang</div>
            </div>
        `;
    }
    
    generateAyahList(verses, surahNumber) {
        if (!verses || verses.length === 0) {
            return '<p class="error-message">Tidak ada ayat yang tersedia</p>';
        }
        
        return verses.map(verse => {
            const isBismillah = surahNumber === 1 && verse.number === 1;
            const ayahClass = isBismillah ? 'ayah bismillah-ayah' : 'ayah';
            
            return `
                <div class="${ayahClass}">
                    <div class="ayah-number">${verse.number}</div>
                    <div class="ayah-content">
                        <div class="ayah-arabic">${verse.arabic}</div>
                        <div class="ayah-latin">${verse.transliteration}</div>
                        <div class="ayah-translation">${verse.translation}</div>
                    </div>
                    <button class="bookmark-btn" onclick="window.quranReader.bookmarkAyah(${surahNumber}, ${verse.number})" title="Simpan ayat ini">
                        🔖
                    </button>
                </div>
            `;
        }).join('');
    }
    
    showError(message) {
        const quranReader = document.getElementById('quranReader');
        if (!quranReader) return;
        
        quranReader.innerHTML = `
            <div class="error-message">
                <h3>❌ Error</h3>
                <p>${message}</p>
                <button class="back-btn" onclick="window.quranReader.showSurahList()">
                    Kembali ke Daftar Surat
                </button>
            </div>
        `;
    }
    
    filterByJuz(juzNumber) {
        if (!juzNumber) {
            this.showSurahList();
            return;
        }
        
        if (!window.quranData || !window.quranData.surahs) return;
        
        const filteredSurahs = window.quranData.surahs.filter(surah => surah.juz == juzNumber);
        const quranReader = document.getElementById('quranReader');
        
        if (!quranReader) return;
        
        quranReader.innerHTML = `
            <div class="surah-list-header">
                <h3>📖 Surat-surat Juz ${juzNumber}</h3>
                <p>Daftar surat yang ada di Juz ${juzNumber}</p>
            </div>
            <div class="surah-grid" id="surahGrid">
                ${filteredSurahs.map(surah => `
                    <div class="surah-card" data-surah="${surah.number}">
                        <div class="surah-header">
                            <div class="surah-number">${surah.number}</div>
                            <div class="surah-names">
                                <h4 class="surah-name-latin">${surah.name}</h4>
                                <p class="surah-name-arabic">${surah.arabicName}</p>
                            </div>
                        </div>
                        <div class="surah-info">
                            <div class="info-item">
                                <span class="info-label">Ayat</span>
                                <span class="info-value">${surah.verses}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Turun</span>
                                <span class="info-value">${surah.revelation}</span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">Juz</span>
                                <span class="info-value">${surah.juz}</span>
                            </div>
                        </div>
                        <button class="read-btn">
                            <span class="btn-icon">📖</span>
                            Baca Surat
                        </button>
                    </div>
                `).join('')}
            </div>
        `;
        
        document.querySelectorAll('.surah-card').forEach(card => {
            card.addEventListener('click', () => {
                const surahNumber = parseInt(card.dataset.surah);
                this.loadSurah(surahNumber);
            });
        });
    }
    
    bookmarkAyah(surahNumber, verseNumber) {
        const bookmarks = JSON.parse(localStorage.getItem('quranBookmarks')) || [];
        const surahInfo = window.quranData.surahs.find(s => s.number === surahNumber);
        
        const bookmark = {
            surahNumber,
            surahName: surahInfo?.name || 'Unknown',
            verseNumber,
            timestamp: new Date().toISOString()
        };
        
        bookmarks.unshift(bookmark);
        localStorage.setItem('quranBookmarks', JSON.stringify(bookmarks));
        
        showNotification(`✅ Ayat ${surahInfo?.name} ayat ${verseNumber} telah disimpan!`);
    }
    
    loadHistory() {
        const bookmarks = JSON.parse(localStorage.getItem('quranBookmarks')) || [];
        const historyList = document.getElementById('historyList');
        
        if (!historyList) return;
        
        if (bookmarks.length === 0) {
            historyList.innerHTML = `
                <div class="empty-history">
                    <div class="empty-icon">📚</div>
                    <h3>Belum Ada History</h3>
                    <p>Tandai ayat saat membaca Al-Quran untuk menyimpannya di sini</p>
                </div>
            `;
            return;
        }
        
        historyList.innerHTML = bookmarks.map((bookmark, index) => `
            <div class="history-item">
                <div class="history-info">
                    <h4>${bookmark.surahName} - Ayat ${bookmark.verseNumber}</h4>
                    <p class="history-time">${this.formatTime(bookmark.timestamp)}</p>
                </div>
                <div class="history-actions">
                    <button class="history-btn" onclick="window.quranReader.goToAyah(${bookmark.surahNumber}, ${bookmark.verseNumber})">
                        📖 Baca
                    </button>
                    <button class="delete-btn" onclick="window.quranReader.deleteBookmark(${index})">
                        🗑️
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    formatTime(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 1) return 'Baru saja';
        if (minutes < 60) return `${minutes} menit yang lalu`;
        if (hours < 24) return `${hours} jam yang lalu`;
        if (days < 7) return `${days} hari yang lalu`;
        return date.toLocaleDateString('id-ID');
    }
    
    async goToAyah(surahNumber, verseNumber) {
        // Switch to quran section
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
        
        const quranBtn = document.querySelector('[data-section="quran"]');
        const quranSection = document.getElementById('quranSection');
        
        if (quranBtn) quranBtn.classList.add('active');
        if (quranSection) quranSection.classList.add('active');
        
        // Load surah
        await this.loadSurah(surahNumber);
        
        // Scroll to ayah
        setTimeout(() => {
            const ayahs = document.querySelectorAll('.ayah');
            if (ayahs[verseNumber - 1]) {
                ayahs[verseNumber - 1].scrollIntoView({ behavior: 'smooth', block: 'center' });
                ayahs[verseNumber - 1].style.background = 'rgba(255, 215, 0, 0.2)';
                setTimeout(() => {
                    ayahs[verseNumber - 1].style.background = '';
                }, 2000);
            }
        }, 500);
    }
    
    deleteBookmark(index) {
        const bookmarks = JSON.parse(localStorage.getItem('quranBookmarks')) || [];
        bookmarks.splice(index, 1);
        localStorage.setItem('quranBookmarks', JSON.stringify(bookmarks));
        this.loadHistory();
        showNotification('🗑️ History dihapus');
    }
}

function createFooter() {
    let footer = document.querySelector('.site-footer');
    
    // Jika footer belum ada, buat elemennya
    if (!footer) {
        footer = document.createElement('footer');
        footer.className = 'site-footer';
        footer.style.cssText = `
            text-align: center;
            padding: 40px 20px;
            margin-top: 60px;
            background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
            color: var(--text-secondary, #ccc);
            position: relative;
            z-index: 10;
            width: 100%;
        `;
        document.body.appendChild(footer);
    }

    // Update konten footer
    footer.className = 'site-footer';
    footer.innerHTML = `
        <div class="footer-content">
            <p style="margin-bottom: 20px; font-size: 1.1em; color: var(--text-color, #fff); font-weight: 500;">Created by Favian Yusuf Ashari</p>
            <a href="https://www.instagram.com/favianyusuf_?igsh=MWJ1ZW5hZWN0OWxneQ==" target="_blank" rel="noopener noreferrer" id="instagramLink" style="
                display: inline-flex;
                align-items: center;
                gap: 10px;
                text-decoration: none;
                color: white;
                padding: 10px 20px;
                border-radius: 25px;
                background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
                font-weight: 600;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            ">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: middle;">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span style="font-size: 0.95em;">@favianyusuf_</span>
            </a>
        </div>
    `;
    
    // Menambahkan event listener untuk hover effect dengan JavaScript
    const instagramLink = footer.querySelector('#instagramLink');
    if (instagramLink) {
        instagramLink.addEventListener('mouseenter', () => {
            instagramLink.style.transform = 'translateY(-3px) scale(1.05)';
            instagramLink.style.boxShadow = '0 8px 25px rgba(220, 39, 67, 0.4)';
        });
        instagramLink.addEventListener('mouseleave', () => {
            instagramLink.style.transform = 'translateY(0) scale(1)';
            instagramLink.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
        });
    }
}

// Initialize
let hafalanSystem;
let quranReader;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        init();
        window.hafalanSystem = new HafalanSystem();
        window.quranReader = new QuranReader();
    });
} else {
    init();
    window.hafalanSystem = new HafalanSystem();
    window.quranReader = new QuranReader();
}