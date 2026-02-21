// Data offline Al-Qur'an untuk fallback
const offlineQuranData = {
    1: [ // Al-Fatihah
        {
            arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
            latin: "Bismillahir-rahmanir-rahiim",
            translation: "Dengan nama Allah Yang Maha Pengasih, Maha Penyayang."
        },
        {
            arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
            latin: "Alhamdu lillahi rabbil-'alamiin",
            translation: "Segala puji bagi Allah, Tuhan seluruh alam."
        },
        {
            arabic: "الرَّحْمَٰنِ الرَّحِيمِ",
            latin: "Ar-rahmanir-rahiim",
            translation: "Yang Maha Pengasih, Maha Penyayang."
        },
        {
            arabic: "مَالِكِ يَوْمِ الدِّينِ",
            latin: "Maliki yaumid-diin",
            translation: "Pemilik hari pembalasan."
        },
        {
            arabic: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
            latin: "Iyyaka na'budu wa iyyaka nasta'iin",
            translation: "Hanya kepada Engkaulah kami menyembah dan hanya kepada Engkaulah kami mohon pertolongan."
        },
        {
            arabic: "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
            latin: "Ihdinash-shiratal-mustaqiim",
            translation: "Tunjukilah kami jalan yang lurus."
        },
        {
            arabic: "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ",
            latin: "Shiratal-ladziina an'amta 'alaihim ghairil-maghdhuubi 'alaihim wa ladh-dhaaliin",
            translation: "(Yaitu) jalan orang-orang yang telah Engkau beri nikmat kepadanya; bukan (jalan) mereka yang dimurkai, dan bukan (pula jalan) mereka yang sesat."
        }
    ],
    
    2: [ // Al-Baqarah (contoh beberapa ayat pertama)
        {
            arabic: "الم",
            latin: "Alif Lam Mim",
            translation: "Alif Lam Mim."
        },
        {
            arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ",
            latin: "Dzalikal-kitabu la raiba fiih, hudal-lil-muttaqiin",
            translation: "Kitab (Al-Qur'an) ini tidak ada keraguan padanya; petunjuk bagi mereka yang bertakwa."
        },
        {
            arabic: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ",
            latin: "Alladziina yu'minuuna bil-ghaibi wa yuqiimuunash-shalaata wa mimma razaqnaahum yunfiquun",
            translation: "(yaitu) mereka yang beriman kepada yang ghaib, yang mendirikan shalat, dan menafkahkan sebahagian rezeki yang Kami anugerahkan kepada mereka."
        }
    ],

    112: [ // Al-Ikhlas
        {
            arabic: "قُلْ هُوَ اللَّهُ أَحَدٌ",
            latin: "Qul huwallahu ahad",
            translation: "Katakanlah: 'Dia-lah Allah, Yang Maha Esa."
        },
        {
            arabic: "اللَّهُ الصَّمَدُ",
            latin: "Allahush-shamad",
            translation: "Allah adalah Tuhan yang bergantung kepada-Nya segala sesuatu."
        },
        {
            arabic: "لَمْ يَلِدْ وَلَمْ يُولَدْ",
            latin: "Lam yalid wa lam yuulad",
            translation: "Dia tiada beranak dan tiada pula diperanakkan."
        },
        {
            arabic: "وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ",
            latin: "Wa lam yakul-lahu kufuwan ahad",
            translation: "Dan tidak ada seorangpun yang setara dengan Dia.'"
        }
    ],

    113: [ // Al-Falaq
        {
            arabic: "قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ",
            latin: "Qul a'uudzu birabbil-falaq",
            translation: "Katakanlah: 'Aku berlindung kepada Tuhan yang menguasai subuh,"
        },
        {
            arabic: "مِن شَرِّ مَا خَلَقَ",
            latin: "Min sharri ma khalaq",
            translation: "dari kejahatan (makhluk) yang diciptakan-Nya,"
        },
        {
            arabic: "وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ",
            latin: "Wa min sharri ghasiqin idza waqab",
            translation: "dan dari kejahatan malam apabila telah gelap gulita,"
        },
        {
            arabic: "وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ",
            latin: "Wa min sharrin-naffatsati fil-'uqad",
            translation: "dan dari kejahatan wanita-wanita tukang sihir yang meniup pada buhul-buhul,"
        },
        {
            arabic: "وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ",
            latin: "Wa min sharri hasidin idza hasad",
            translation: "dan dari kejahatan orang yang dengki apabila ia dengki.'"
        }
    ],

    114: [ // An-Nas
        {
            arabic: "قُلْ أَعُوذُ بِرَبِّ النَّاسِ",
            latin: "Qul a'uudzu birabbin-nas",
            translation: "Katakanlah: 'Aku berlindung kepada Tuhan manusia,"
        },
        {
            arabic: "مَلِكِ النَّاسِ",
            latin: "Malikin-nas",
            translation: "Raja manusia,"
        },
        {
            arabic: "إِلَٰهِ النَّاسِ",
            latin: "Ilahin-nas",
            translation: "Sembahan manusia,"
        },
        {
            arabic: "مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ",
            latin: "Min sharril-waswasil-khannas",
            translation: "dari kejahatan (bisikan) syaitan yang biasa bersembunyi,"
        },
        {
            arabic: "الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ",
            latin: "Alladzii yuwaswisu fii shudurin-nas",
            translation: "yang membisikkan (kejahatan) ke dalam dada manusia,"
        },
        {
            arabic: "مِنَ الْجِنَّةِ وَالنَّاسِ",
            latin: "Minal-jinnati wan-nas",
            translation: "dari (golongan) jin dan manusia.'"
        }
    ],

    103: [ // Al-Asr
        {
            arabic: "وَالْعَصْرِ",
            latin: "Wal-'ashr",
            translation: "Demi masa."
        },
        {
            arabic: "إِنَّ الْإِنسَانَ لَفِي خُسْرٍ",
            latin: "Innal-insana lafii khusr",
            translation: "Sungguh, manusia berada dalam kerugian,"
        },
        {
            arabic: "إِلَّا الَّذِينَ آمَنُوا وَعَمِلُوا الصَّالِحَاتِ وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ",
            latin: "Illal-ladziina aamanuu wa 'amilus-shalihaati wa tawaashau bil-haqqi wa tawaashau bish-shabr",
            translation: "kecuali orang-orang yang beriman dan mengerjakan kebajikan serta saling menasihati untuk kebenaran dan saling menasihati untuk kesabaran."
        }
    ],

    108: [ // Al-Kawthar
        {
            arabic: "إِنَّا أَعْطَيْنَاكَ الْكَوْثَرَ",
            latin: "Inna a'thainakal-kawthar",
            translation: "Sungguh, Kami telah memberimu (nikmat yang banyak dan) kebaikan yang berlimpah."
        },
        {
            arabic: "فَصَلِّ لِرَبِّكَ وَانْحَرْ",
            latin: "Fashalli li rabbika wanhar",
            translation: "Maka laksanakanlah shalat karena Tuhanmu dan berkorbanlah (sebagai ibadah dan mendekatkan diri kepada Allah)."
        },
        {
            arabic: "إِنَّ شَانِئَكَ هُوَ الْأَبْتَرُ",
            latin: "Inna shaani'aka huwal-abtar",
            translation: "Sungguh, orang yang membencimu dialah yang terputus (dari rahmat Allah)."
        }
    ],

    110: [ // An-Nasr
        {
            arabic: "إِذَا جَاءَ نَصْرُ اللَّهِ وَالْفَتْحُ",
            latin: "Idza jaa nashru-llahi wal-fath",
            translation: "Apabila telah datang pertolongan Allah dan kemenangan,"
        },
        {
            arabic: "وَرَأَيْتَ النَّاسَ يَدْخُلُونَ فِي دِينِ اللَّهِ أَفْوَاجًا",
            latin: "Wa ra'aitan-nasa yadkhuluuna fii diini-llahi afwaaja",
            translation: "dan engkau melihat manusia berbondong-bondong masuk agama Allah,"
        },
        {
            arabic: "فَسَبِّحْ بِحَمْدِ رَبِّكَ وَاسْتَغْفِرْهُ ۚ إِنَّهُ كَانَ تَوَّابًا",
            latin: "Fasabbih bi hamdi rabbika wastaghfirh, innahu kana tawwaaba",
            translation: "maka bertasbihlah dengan memuji Tuhanmu dan mohonlah ampunan kepada-Nya. Sungguh, Dia Maha Penerima tobat."
        }
    ]
};