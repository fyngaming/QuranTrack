// Data Quran untuk aplikasi web Ramadhan
class QuranData {
    constructor() {
        this.surahs = [
            { number: 1, name: 'Al-Fatihah', arabicName: 'الفاتحة', verses: 7, revelation: 'Makkah', juz: 1 },
            { number: 2, name: 'Al-Baqarah', arabicName: 'البقرة', verses: 286, revelation: 'Madinah', juz: 1 },
            { number: 3, name: 'Ali Imran', arabicName: 'آل عمران', verses: 200, revelation: 'Madinah', juz: 3 },
            { number: 4, name: 'An-Nisa', arabicName: 'النساء', verses: 176, revelation: 'Madinah', juz: 4 },
            { number: 5, name: 'Al-Maidah', arabicName: 'المائدة', verses: 120, revelation: 'Madinah', juz: 6 },
            { number: 6, name: 'Al-Anam', arabicName: 'الأنعام', verses: 165, revelation: 'Makkah', juz: 7 },
            { number: 7, name: 'Al-Araf', arabicName: 'الأعراف', verses: 206, revelation: 'Makkah', juz: 8 },
            { number: 8, name: 'Al-Anfal', arabicName: 'الأنفال', verses: 75, revelation: 'Madinah', juz: 9 },
            { number: 9, name: 'At-Taubah', arabicName: 'التوبة', verses: 129, revelation: 'Madinah', juz: 10 },
            { number: 10, name: 'Yunus', arabicName: 'يونس', verses: 109, revelation: 'Makkah', juz: 11 },
            { number: 11, name: 'Hud', arabicName: 'هود', verses: 123, revelation: 'Makkah', juz: 11 },
            { number: 12, name: 'Yusuf', arabicName: 'يوسف', verses: 111, revelation: 'Makkah', juz: 12 },
            { number: 13, name: 'Ar-Rad', arabicName: 'الرعد', verses: 43, revelation: 'Madinah', juz: 13 },
            { number: 14, name: 'Ibrahim', arabicName: 'إبراهيم', verses: 52, revelation: 'Makkah', juz: 13 },
            { number: 15, name: 'Al-Hijr', arabicName: 'الحجر', verses: 99, revelation: 'Makkah', juz: 14 },
            { number: 16, name: 'An-Nahl', arabicName: 'النحل', verses: 128, revelation: 'Makkah', juz: 14 },
            { number: 17, name: 'Al-Isra', arabicName: 'الإسراء', verses: 111, revelation: 'Makkah', juz: 15 },
            { number: 18, name: 'Al-Kahf', arabicName: 'الكهف', verses: 110, revelation: 'Makkah', juz: 15 },
            { number: 19, name: 'Maryam', arabicName: 'مريم', verses: 98, revelation: 'Makkah', juz: 16 },
            { number: 20, name: 'Taha', arabicName: 'طه', verses: 135, revelation: 'Makkah', juz: 16 },
            { number: 21, name: 'Al-Anbiya', arabicName: 'الأنبياء', verses: 112, revelation: 'Makkah', juz: 17 },
            { number: 22, name: 'Al-Hajj', arabicName: 'الحج', verses: 78, revelation: 'Madinah', juz: 17 },
            { number: 23, name: 'Al-Mukminun', arabicName: 'المؤمنون', verses: 118, revelation: 'Makkah', juz: 18 },
            { number: 24, name: 'An-Nur', arabicName: 'النور', verses: 64, revelation: 'Madinah', juz: 18 },
            { number: 25, name: 'Al-Furqan', arabicName: 'الفرقان', verses: 77, revelation: 'Makkah', juz: 18 },
            { number: 26, name: 'Ash-Shuara', arabicName: 'الشعراء', verses: 227, revelation: 'Makkah', juz: 19 },
            { number: 27, name: 'An-Naml', arabicName: 'النمل', verses: 93, revelation: 'Makkah', juz: 19 },
            { number: 28, name: 'Al-Qasas', arabicName: 'القصص', verses: 88, revelation: 'Makkah', juz: 20 },
            { number: 29, name: 'Al-Ankabut', arabicName: 'العنكبوت', verses: 69, revelation: 'Makkah', juz: 20 },
            { number: 30, name: 'Ar-Rum', arabicName: 'الروم', verses: 60, revelation: 'Makkah', juz: 21 },
            { number: 31, name: 'Luqman', arabicName: 'لقمان', verses: 34, revelation: 'Makkah', juz: 21 },
            { number: 32, name: 'As-Sajdah', arabicName: 'السجدة', verses: 30, revelation: 'Makkah', juz: 21 },
            { number: 33, name: 'Al-Ahzab', arabicName: 'الأحزاب', verses: 73, revelation: 'Madinah', juz: 21 },
            { number: 34, name: 'Saba', arabicName: 'سبأ', verses: 54, revelation: 'Makkah', juz: 22 },
            { number: 35, name: 'Fatir', arabicName: 'فاطر', verses: 45, revelation: 'Makkah', juz: 22 },
            { number: 36, name: 'Yasin', arabicName: 'يس', verses: 83, revelation: 'Makkah', juz: 22 },
            { number: 37, name: 'As-Saffat', arabicName: 'الصافات', verses: 182, revelation: 'Makkah', juz: 23 },
            { number: 38, name: 'Sad', arabicName: 'ص', verses: 88, revelation: 'Makkah', juz: 23 },
            { number: 39, name: 'Az-Zumar', arabicName: 'الزمر', verses: 75, revelation: 'Makkah', juz: 23 },
            { number: 40, name: 'Ghafir', arabicName: 'غافر', verses: 85, revelation: 'Makkah', juz: 24 },
            { number: 41, name: 'Fussilat', arabicName: 'فصلت', verses: 54, revelation: 'Makkah', juz: 24 },
            { number: 42, name: 'Ash-Shura', arabicName: 'الشورى', verses: 53, revelation: 'Makkah', juz: 25 },
            { number: 43, name: 'Az-Zukhruf', arabicName: 'الزخرف', verses: 89, revelation: 'Makkah', juz: 25 },
            { number: 44, name: 'Ad-Dukhan', arabicName: 'الدخان', verses: 59, revelation: 'Makkah', juz: 25 },
            { number: 45, name: 'Al-Jathiyah', arabicName: 'الجاثية', verses: 37, revelation: 'Makkah', juz: 25 },
            { number: 46, name: 'Al-Ahqaf', arabicName: 'الأحقاف', verses: 35, revelation: 'Makkah', juz: 26 },
            { number: 47, name: 'Muhammad', arabicName: 'محمد', verses: 38, revelation: 'Madinah', juz: 26 },
            { number: 48, name: 'Al-Fath', arabicName: 'الفتح', verses: 29, revelation: 'Madinah', juz: 26 },
            { number: 49, name: 'Al-Hujurat', arabicName: 'الحجرات', verses: 18, revelation: 'Madinah', juz: 26 },
            { number: 50, name: 'Qaf', arabicName: 'ق', verses: 45, revelation: 'Makkah', juz: 26 },
            { number: 51, name: 'Adh-Dhariyat', arabicName: 'الذاريات', verses: 60, revelation: 'Makkah', juz: 26 },
            { number: 52, name: 'At-Tur', arabicName: 'الطور', verses: 49, revelation: 'Makkah', juz: 27 },
            { number: 53, name: 'An-Najm', arabicName: 'النجم', verses: 62, revelation: 'Makkah', juz: 27 },
            { number: 54, name: 'Al-Qamar', arabicName: 'القمر', verses: 55, revelation: 'Makkah', juz: 27 },
            { number: 55, name: 'Ar-Rahman', arabicName: 'الرحمن', verses: 78, revelation: 'Madinah', juz: 27 },
            { number: 56, name: 'Al-Waqiah', arabicName: 'الواقعة', verses: 96, revelation: 'Makkah', juz: 27 },
            { number: 57, name: 'Al-Hadid', arabicName: 'الحديد', verses: 29, revelation: 'Madinah', juz: 27 },
            { number: 58, name: 'Al-Mujadilah', arabicName: 'المجادلة', verses: 22, revelation: 'Madinah', juz: 28 },
            { number: 59, name: 'Al-Hashr', arabicName: 'الحشر', verses: 24, revelation: 'Madinah', juz: 28 },
            { number: 60, name: 'Al-Mumtahanah', arabicName: 'الممتحنة', verses: 13, revelation: 'Madinah', juz: 28 },
            { number: 61, name: 'As-Saff', arabicName: 'الصف', verses: 14, revelation: 'Madinah', juz: 28 },
            { number: 62, name: 'Al-Jumuah', arabicName: 'الجمعة', verses: 11, revelation: 'Madinah', juz: 28 },
            { number: 63, name: 'Al-Munafiqun', arabicName: 'المنافقون', verses: 11, revelation: 'Madinah', juz: 28 },
            { number: 64, name: 'At-Taghabun', arabicName: 'التغابن', verses: 18, revelation: 'Madinah', juz: 28 },
            { number: 65, name: 'At-Talaq', arabicName: 'الطلاق', verses: 12, revelation: 'Madinah', juz: 28 },
            { number: 66, name: 'At-Tahrim', arabicName: 'التحريم', verses: 12, revelation: 'Madinah', juz: 28 },
            { number: 67, name: 'Al-Mulk', arabicName: 'الملك', verses: 30, revelation: 'Makkah', juz: 29 },
            { number: 68, name: 'Al-Qalam', arabicName: 'القلم', verses: 52, revelation: 'Makkah', juz: 29 },
            { number: 69, name: 'Al-Haqqah', arabicName: 'الحاقة', verses: 52, revelation: 'Makkah', juz: 29 },
            { number: 70, name: 'Al-Maarij', arabicName: 'المعارج', verses: 44, revelation: 'Makkah', juz: 29 },
            { number: 71, name: 'Nuh', arabicName: 'نوح', verses: 28, revelation: 'Makkah', juz: 29 },
            { number: 72, name: 'Al-Jinn', arabicName: 'الجن', verses: 28, revelation: 'Makkah', juz: 29 },
            { number: 73, name: 'Al-Muzzammil', arabicName: 'المزمل', verses: 20, revelation: 'Makkah', juz: 29 },
            { number: 74, name: 'Al-Muddaththir', arabicName: 'المدثر', verses: 56, revelation: 'Makkah', juz: 29 },
            { number: 75, name: 'Al-Qiyamah', arabicName: 'القيامة', verses: 40, revelation: 'Makkah', juz: 29 },
            { number: 76, name: 'Al-Insan', arabicName: 'الإنسان', verses: 31, revelation: 'Madinah', juz: 29 },
            { number: 77, name: 'Al-Mursalat', arabicName: 'المرسلات', verses: 50, revelation: 'Makkah', juz: 29 },
            { number: 78, name: 'An-Naba', arabicName: 'النبأ', verses: 40, revelation: 'Makkah', juz: 30 },
            { number: 79, name: 'An-Naziat', arabicName: 'النازعات', verses: 46, revelation: 'Makkah', juz: 30 },
            { number: 80, name: 'Abasa', arabicName: 'عبس', verses: 42, revelation: 'Makkah', juz: 30 },
            { number: 81, name: 'At-Takwir', arabicName: 'التكوير', verses: 29, revelation: 'Makkah', juz: 30 },
            { number: 82, name: 'Al-Infitar', arabicName: 'الإنفطار', verses: 19, revelation: 'Makkah', juz: 30 },
            { number: 83, name: 'Al-Mutaffifin', arabicName: 'المطففين', verses: 36, revelation: 'Makkah', juz: 30 },
            { number: 84, name: 'Al-Inshiqaq', arabicName: 'الإنشقاق', verses: 25, revelation: 'Makkah', juz: 30 },
            { number: 85, name: 'Al-Buruj', arabicName: 'البروج', verses: 22, revelation: 'Makkah', juz: 30 },
            { number: 86, name: 'At-Tariq', arabicName: 'الطارق', verses: 17, revelation: 'Makkah', juz: 30 },
            { number: 87, name: 'Al-Ala', arabicName: 'الأعلى', verses: 19, revelation: 'Makkah', juz: 30 },
            { number: 88, name: 'Al-Ghashiyah', arabicName: 'الغاشية', verses: 26, revelation: 'Makkah', juz: 30 },
            { number: 89, name: 'Al-Fajr', arabicName: 'الفجر', verses: 30, revelation: 'Makkah', juz: 30 },
            { number: 90, name: 'Al-Balad', arabicName: 'البلد', verses: 20, revelation: 'Makkah', juz: 30 },
            { number: 91, name: 'Ash-Shams', arabicName: 'الشمس', verses: 15, revelation: 'Makkah', juz: 30 },
            { number: 92, name: 'Al-Lail', arabicName: 'الليل', verses: 21, revelation: 'Makkah', juz: 30 },
            { number: 93, name: 'Ad-Duha', arabicName: 'الضحى', verses: 11, revelation: 'Makkah', juz: 30 },
            { number: 94, name: 'Ash-Sharh', arabicName: 'الشرح', verses: 8, revelation: 'Makkah', juz: 30 },
            { number: 95, name: 'At-Tin', arabicName: 'التين', verses: 8, revelation: 'Makkah', juz: 30 },
            { number: 96, name: 'Al-Alaq', arabicName: 'العلق', verses: 19, revelation: 'Makkah', juz: 30 },
            { number: 97, name: 'Al-Qadr', arabicName: 'القدر', verses: 5, revelation: 'Makkah', juz: 30 },
            { number: 98, name: 'Al-Bayyinah', arabicName: 'البينة', verses: 8, revelation: 'Madinah', juz: 30 },
            { number: 99, name: 'Az-Zalzalah', arabicName: 'الزلزلة', verses: 8, revelation: 'Madinah', juz: 30 },
            { number: 100, name: 'Al-Adiyat', arabicName: 'العاديات', verses: 11, revelation: 'Makkah', juz: 30 },
            { number: 101, name: 'Al-Qariah', arabicName: 'القارعة', verses: 11, revelation: 'Makkah', juz: 30 },
            { number: 102, name: 'At-Takathur', arabicName: 'التكاثر', verses: 8, revelation: 'Makkah', juz: 30 },
            { number: 103, name: 'Al-Asr', arabicName: 'العصر', verses: 3, revelation: 'Makkah', juz: 30 },
            { number: 104, name: 'Al-Humazah', arabicName: 'الهمزة', verses: 9, revelation: 'Makkah', juz: 30 },
            { number: 105, name: 'Al-Fil', arabicName: 'الفيل', verses: 5, revelation: 'Makkah', juz: 30 },
            { number: 106, name: 'Quraish', arabicName: 'قريش', verses: 4, revelation: 'Makkah', juz: 30 },
            { number: 107, name: 'Al-Maun', arabicName: 'الماعون', verses: 7, revelation: 'Makkah', juz: 30 },
            { number: 108, name: 'Al-Kauthar', arabicName: 'الكوثر', verses: 3, revelation: 'Makkah', juz: 30 },
            { number: 109, name: 'Al-Kafirun', arabicName: 'الكافرون', verses: 6, revelation: 'Makkah', juz: 30 },
            { number: 110, name: 'An-Nasr', arabicName: 'النصر', verses: 3, revelation: 'Madinah', juz: 30 },
            { number: 111, name: 'Al-Masad', arabicName: 'المسد', verses: 5, revelation: 'Makkah', juz: 30 },
            { number: 112, name: 'Al-Ikhlas', arabicName: 'الإخلاص', verses: 4, revelation: 'Makkah', juz: 30 },
            { number: 113, name: 'Al-Falaq', arabicName: 'الفلق', verses: 5, revelation: 'Makkah', juz: 30 },
            { number: 114, name: 'An-Nas', arabicName: 'الناس', verses: 6, revelation: 'Makkah', juz: 30 }
        ];
        
        this.surahData = {};
        this.initializeSampleData();
    }
    
    initializeSampleData() {
        // Data sample untuk beberapa surat pendek
        this.surahData[1] = {
            number: 1,
            name: 'Al-Fatihah',
            arabicName: 'الفاتحة',
            numberOfVerses: 7,
            revelation: 'Makkah',
            verses: [
                {
                    number: 1,
                    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
                    transliteration: 'Bismillahir-rahmanir-rahiim',
                    translation: 'Dengan nama Allah Yang Maha Pengasih, Maha Penyayang'
                },
                {
                    number: 2,
                    arabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
                    transliteration: 'Alhamdulillahi rabbil-alamiin',
                    translation: 'Segala puji bagi Allah, Tuhan seluruh alam'
                },
                {
                    number: 3,
                    arabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
                    transliteration: 'Ar-rahmanir-rahiim',
                    translation: 'Yang Maha Pengasih, Maha Penyayang'
                },
                {
                    number: 4,
                    arabic: 'مَالِكِ يَوْمِ الدِّينِ',
                    transliteration: 'Maliki yaumid-diin',
                    translation: 'Pemilik hari pembalasan'
                },
                {
                    number: 5,
                    arabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
                    transliteration: 'Iyyaka na\'budu wa iyyaka nasta\'iin',
                    translation: 'Hanya kepada-Mu kami menyembah dan hanya kepada-Mu kami mohon pertolongan'
                },
                {
                    number: 6,
                    arabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
                    transliteration: 'Ihdinash-shiratal-mustaqiim',
                    translation: 'Tunjukilah kami jalan yang lurus'
                },
                {
                    number: 7,
                    arabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
                    transliteration: 'Shiratalladzina an\'amta alaihim ghairil-maghdubi alaihim wa ladh-dhallin',
                    translation: '(yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai dan bukan (pula jalan) mereka yang sesat'
                }
            ]
        };
        
        this.surahData[112] = {
            number: 112,
            name: 'Al-Ikhlas',
            arabicName: 'الإخلاص',
            numberOfVerses: 4,
            revelation: 'Makkah',
            verses: [
                {
                    number: 1,
                    arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
                    transliteration: 'Qul huwallahu ahad',
                    translation: 'Katakanlah: Dia-lah Allah, Yang Maha Esa'
                },
                {
                    number: 2,
                    arabic: 'اللَّهُ الصَّمَدُ',
                    transliteration: 'Allahush-shamad',
                    translation: 'Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu'
                },
                {
                    number: 3,
                    arabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
                    transliteration: 'Lam yalid wa lam yuulad',
                    translation: 'Dia tiada beranak dan tidak pula diperanakkan'
                },
                {
                    number: 4,
                    arabic: 'وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
                    transliteration: 'Wa lam yakun lahu kufuwan ahad',
                    translation: 'Dan tidak ada seorang pun yang setara dengan Dia'
                }
            ]
        };
        
        this.surahData[114] = {
            number: 114,
            name: 'An-Nas',
            arabicName: 'الناس',
            numberOfVerses: 6,
            revelation: 'Makkah',
            verses: [
                {
                    number: 1,
                    arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
                    transliteration: 'Qul a\'uudzu birabbin-nas',
                    translation: 'Katakanlah: Aku berlindung kepada Tuhan manusia'
                },
                {
                    number: 2,
                    arabic: 'مَلِكِ النَّاسِ',
                    transliteration: 'Malikin-nas',
                    translation: 'Raja manusia'
                },
                {
                    number: 3,
                    arabic: 'إِلَٰهِ النَّاسِ',
                    transliteration: 'Ilahin-nas',
                    translation: 'Sembahan manusia'
                },
                {
                    number: 4,
                    arabic: 'مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
                    transliteration: 'Min sharril-waswasil-khannas',
                    translation: 'dari kejahatan (bisikan) syaitan yang biasa bersembunyi'
                },
                {
                    number: 5,
                    arabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
                    transliteration: 'Alladzii yuwaswisu fii shudurin-nas',
                    translation: 'yang membisikkan (kejahatan) ke dalam dada manusia'
                },
                {
                    number: 6,
                    arabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
                    transliteration: 'Minal-jinnati wan-nas',
                    translation: 'dari golongan jin dan manusia'
                }
            ]
        };
    }
    
    async getSurahData(surahNumber) {
        // Simulasi loading delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        if (this.surahData[surahNumber]) {
            return this.surahData[surahNumber];
        }
        
        // Untuk surat yang belum ada data lengkap, coba load dari API atau sumber lain
        const surahInfo = this.surahs.find(s => s.number === surahNumber);
        if (surahInfo) {
            // Coba load data dari API eksternal atau file JSON
            try {
                const fullSurahData = await this.loadSurahFromAPI(surahNumber);
                if (fullSurahData) {
                    this.surahData[surahNumber] = fullSurahData;
                    return fullSurahData;
                }
            } catch (error) {
                console.warn(`Gagal memuat data lengkap untuk surat ${surahNumber}:`, error);
            }
            
            // Fallback jika API gagal
            console.warn(`Menggunakan fallback untuk surat ${surahNumber}`);
            const verses = [];
            for (let i = 1; i <= surahInfo.verses; i++) {
                verses.push({
                    number: i,
                    arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
                    transliteration: `Ayat ${i} - Sedang memuat...`,
                    translation: `Ayat ${i} - Sedang memuat dari server...`
                });
            }
            
            return {
                number: surahNumber,
                name: surahInfo.name,
                arabicName: surahInfo.arabicName,
                numberOfVerses: surahInfo.verses,
                revelation: surahInfo.revelation,
                verses: verses
            };
        }
        
        return null;
    }
    
    async loadSurahFromAPI(surahNumber) {
        try {
            const response = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,id.indonesian,en.transliteration`);
            const data = await response.json();
            
            if (data.code === 200 && data.data) {
                const arabicData = data.data[0];
                const translationData = data.data[1];
                const transliterationData = data.data[2];
                
                const verses = arabicData.ayahs.map((ayah, index) => ({
                    number: ayah.numberInSurah,
                    arabic: ayah.text,
                    transliteration: transliterationData.ayahs[index]?.text || '',
                    translation: translationData.ayahs[index]?.text || ''
                }));
                
                return {
                    number: arabicData.number,
                    name: arabicData.englishName,
                    arabicName: arabicData.name,
                    numberOfVerses: arabicData.numberOfAyahs,
                    revelation: arabicData.revelationType,
                    verses: verses
                };
            }
        } catch (error) {
            console.error('Error loading from API:', error);
        }
        return null;
    }
    
    // Method untuk menyimpan progress ke Firebase
    async saveReadingProgress(surahNumber, ayahNumber) {
        if (window.firebaseService) {
            await window.firebaseService.saveProgress(surahNumber, ayahNumber);
        }
        
        // Simpan juga di localStorage sebagai backup
        localStorage.setItem('lastRead', JSON.stringify({
            surah: surahNumber,
            ayah: ayahNumber,
            timestamp: new Date().toISOString()
        }));
    }
    
    getLastReadingProgress() {
        const localProgress = localStorage.getItem('lastRead');
        return localProgress ? JSON.parse(localProgress) : null;
    }
}

// Initialize global QuranData
window.quranData = new QuranData();
console.log('QuranData initialized with', window.quranData.surahs.length, 'surahs');