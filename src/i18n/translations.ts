export type Language = 'uz' | 'ru'

export type TranslationKeys = {
  nav: {
    home: string
    lessons: string
    videos: string
    profile: string
    admin: string
  }
  hero: {
    badge: string
    title: string
    subtitle: string
    cta: string
    ctaSecondary: string
    telegram: string
  }
  contact: {
    title: string
    subtitle: string
    telegram: string
    telegramChannel: string
    telegramDesc: string
    email: string
    phone: string
  }
  stats: {
    students: string
    videos: string
    modules: string
    months: string
  }
  about: {
    title: string
    subtitle: string
    description: string
  }
  course: {
    title: string
    subtitle: string
    duration: string
    format: string
    live: string
    modules: string
    viewDetails: string
  }
  teachers: {
    title: string
    subtitle: string
    experience: string
    students: string
    specialty: string
  }
  pricing: {
    title: string
    subtitle: string
    monthly: string
    quarterly: string
    perMonth: string
    oneTime: string
    save: string
    features: string[]
  }
  features: {
    title: string
    items: { title: string; desc: string }[]
  }
  faq: {
    title: string
    items: { q: string; a: string }[]
  }
  cta: {
    title: string
    subtitle: string
    button: string
  }
  lessons: {
    title: string
    subtitle: string
    uzum: {
      title: string
      desc: string
      modules: string
      videos: string
      duration: string
      liveSessions: string
      topics: string[]
    }
    yandex: {
      title: string
      desc: string
      modules: string
      videos: string
      duration: string
      liveSessions: string
      topics: string[]
    }
    enter: string
  }
  lessonsHub: {
    title: string
    subtitle: string
    writtenTitle: string
    writtenDesc: string
    videoTitle: string
    videoDesc: string
    openWritten: string
    openVideo: string
    lessonsInModule1: string
    protectedNote: string
    protectedDesc: string
    backToHub: string
    writtenPageDesc: string
    comingSoon: string
    available: string
    lessonWord: string
    notFound: string
    backToWritten: string
    prevLesson: string
    nextLesson: string
  }
  videos: {
    title: string
    subtitle: string
    filterAll: string
    filterUzum: string
    filterYandex: string
    lesson: string
    duration: string
    locked: string
    watch: string
  }
  profile: {
    title: string
    demoNote: string
    memberSince: string
    subscription: string
    active: string
    progress: string
    completed: string
    remaining: string
    totalHours: string
    watchedHours: string
    lastActivity: string
    achievements: string
    recentActivity: string
    stats: {
      lessonsDone: string
      testsPassed: string
      liveAttended: string
      streak: string
    }
  }
  footer: {
    rights: string
    contact: string
    telegram: string
    description: string
    platforms: string
    email: string
    telegramAdmin: string
    telegramChannel: string
    phone: string
    technicalLead: string
  }
  modules: { num: string; name: string; lessons: string; hours: string }[]
}

export const translations: Record<Language, TranslationKeys> = {
  uz: {
    nav: {
      home: 'Bosh sahifa',
      lessons: 'Darslar',
      videos: 'Video darslar',
      profile: 'Profil',
      admin: 'Admin panel',
    },
    hero: {
      badge: 'Online o\'quv platformasi',
      title: 'Marketplace savdosini noldan o\'rganing',
      subtitle:
        'Uzum Market va Yandex Marketda muvaffaqiyatli savdo qilishni amaliy darslar, jonli vebinarlar va 82 ta video dars orqali o\'rganing.',
      cta: 'Kursni boshlash',
      ctaSecondary: 'Batafsil ma\'lumot',
      telegram: 'Telegram orqali bog\'lanish',
    },
    contact: {
      title: 'Savollaringiz bormi?',
      subtitle: 'Telegram orqali administratorga yozing — tez orada javob beramiz.',
      telegram: 'Telegram orqali yozish',
      telegramChannel: 'Telegram kanalga obuna bo\'lish',
      telegramDesc: 'Kurs, narx va ro\'yxatdan o\'tish bo\'yicha savollar',
      email: 'Email',
      phone: 'Telefon',
    },
    stats: {
      students: 'Maqsadli o\'quvchi',
      videos: 'Video dars',
      modules: 'Modul',
      months: 'Oy davomiylik',
    },
    about: {
      title: 'Nima o\'rgatiladi?',
      subtitle: 'Ikki katta marketplace — bitta kurs',
      description:
        'MarketPro Academy sizga Uzum Market (O\'zbekiston) va Yandex Market (Rossiya/MDH) platformalarida professional savdo qilishni o\'rgatadi. Ro\'yxatdan o\'tishdan tortib birinchi daromadgacha — har bir qadam amaliy va tushunarli.',
    },
    course: {
      title: 'Kurs haqida',
      subtitle: '8 modul, 82 dars, 3 oy',
      duration: '3 oy: 2 oy nazariy + 1 oy amaliy savdo',
      format: 'Haftada 3 kun jonli dars (har biri 2 soat)',
      live: 'Jonli darslar yozib olinadi — istalgan vaqtda qayta ko\'ring',
      modules: 'modul',
      viewDetails: 'Modullarni ko\'rish',
    },
    teachers: {
      title: 'O\'qituvchilar',
      subtitle: 'Amaliy tajribaga ega mentorlar',
      experience: 'Tajriba',
      students: 'O\'qitilgan o\'quvchi',
      specialty: 'Mutaxassislik',
    },
    pricing: {
      title: 'Narxlar',
      subtitle: 'O\'zingizga qulay tarifni tanlang',
      monthly: 'Oylik obuna',
      quarterly: '3 oylik (bir yo\'la)',
      perMonth: 'so\'m/oy',
      oneTime: 'so\'m (bir martalik)',
      save: 'tejash',
      features: [
        '82 ta HD video dars',
        'Haftada 3 marta jonli vebinar',
        'PDF konspekt va cheat-sheet',
        'Modul testlari va mentor yordami',
        'Shaxsiy kabinet va progress kuzatuv',
        'Ikki tilli interfeys (O\'zbek/Rus)',
      ],
    },
    features: {
      title: 'Platforma imkoniyatlari',
      items: [
        {
          title: 'Jonli vebinarlar',
          desc: 'Haftada 3 marta jonli dars. Savollaringizni to\'g\'ridan-to\'g\'ri mentorlarga bering.',
        },
        {
          title: 'Video darslar',
          desc: '82 ta HD video — real ekran yozuvi bilan. O\'tkazib yuborgan darsni qayta ko\'ring.',
        },
        {
          title: 'Yozma materiallar',
          desc: 'Har bir darsga PDF konspekt va cheat-sheet. Internetsiz ham o\'qish mumkin.',
        },
        {
          title: 'Testlar',
          desc: 'Har bir modul oxirida bilim testi. Muvaffaqiyatsiz bo\'lsangiz, mentor yordam beradi.',
        },
        {
          title: 'Forum va chat',
          desc: 'O\'quvchilar hamjamiyati. Savol bering, tajriba almashing.',
        },
        {
          title: 'Xavfsizlik',
          desc: 'Shaxsiy watermark, IP kuzatuv va bir qurilma cheklovi — kontent himoyalangan.',
        },
      ],
    },
    faq: {
      title: 'Ko\'p so\'raladigan savollar',
      items: [
        {
          q: 'Kurs qancha davom etadi?',
          a: 'Kurs 3 oy davom etadi: 2 oy nazariy bilim va 1 oy amaliy savdo sinovi.',
        },
        {
          q: 'Jonli darslarga qatnasha olmasam?',
          a: 'Barcha jonli darslar yozib olinadi va saytga yuklanadi. O\'tkazib yuborgan darsni istalgan vaqtda ko\'rishingiz mumkin.',
        },
        {
          q: 'Qaysi tillarda o\'qitiladi?',
          a: 'Kurs O\'zbek va Rus tillarida o\'tiladi. Sayt ham ikkala tilni qo\'llab-quvvatlaydi.',
        },
        {
          q: 'Oldindan tajriba kerakmi?',
          a: 'Yo\'q, kurs noldan boshlanadi. Kompyuter va internet bo\'lsa kifoya.',
        },
      ],
    },
    cta: {
      title: 'Bugun o\'rganishni boshlang',
      subtitle: 'Marketplace savdosi — kelajak kasbi. Birinchi qadamni hozir qo\'ying.',
      button: 'Ro\'yxatdan o\'tish',
    },
    lessons: {
      title: 'Darslar',
      subtitle: 'Platformani tanlang va kurs dasturini ko\'ring',
      uzum: {
        title: 'Uzum Market',
        desc: 'O\'zbekistonning eng yirik onlayn marketplace\'ida savdo qilishni to\'liq o\'rganing.',
        modules: '8 modul',
        videos: '41 ta video dars',
        duration: '17 soat video + 36 soat jonli dars',
        liveSessions: 'Haftada 3 marta jonli dars (2 soat)',
        topics: [
          'Ro\'yxatdan o\'tish va magazin ochish',
          'Mahsulot kartochkalarini yaratish (SEO)',
          'Narx strategiyasi va raqobat tahlili',
          'FBO / FBS ombor tizimi',
          'Reklama (Boost) boshqaruvi',
          'Daromad chiqarish va soliqlar',
        ],
      },
      yandex: {
        title: 'Yandex Market',
        desc: 'Rossiya va MDH bozorida Yandex Market orqali savdo qilishni o\'rganing.',
        modules: '8 modul',
        videos: '41 ta video dars',
        duration: '17 soat video + 36 soat jonli dars',
        liveSessions: 'Haftada 3 marta jonli dars (2 soat)',
        topics: [
          'Biznes-akkaunt ochish',
          'Mahsulot yuklash va Excel import',
          'DBS / FBY / FBS sxemalari',
          'Yandex Direct bilan reklama',
          'Reyting va sharhlar boshqaruvi',
          'Logistika va yetkazib berish',
        ],
      },
      enter: 'Darslarni ko\'rish',
    },
    lessonsHub: {
      title: 'Darslar',
      subtitle: 'Yozma darslar va video darslar — barchasi bir joyda. Login qilmasdan bu bo\'limga kira olmaysiz.',
      writtenTitle: 'Yozma darslar',
      writtenDesc: 'Batafsil matn, bosqichma-bosqich ko\'rsatmalar va amaliy maslahatlar. Modulma-modul o\'qing.',
      videoTitle: 'Video darslar',
      videoDesc: '82 ta HD video — ekran yozuvi bilan amaliy darslar. Uzum va Yandex Market bo\'yicha.',
      openWritten: 'Yozma darslarni ochish',
      openVideo: 'Video darslarni ochish',
      lessonsInModule1: 'dars (1-modul)',
      protectedNote: 'Himoyalangan bo\'lim',
      protectedDesc: 'Darslar, video va profil faqat login qilgan foydalanuvchilar uchun ochiq.',
      backToHub: 'Darslar bo\'limiga qaytish',
      writtenPageDesc: 'Modulni tanlang va darsma-dars o\'qing. Hozir 1-modul tayyor, qolganlari tez orada.',
      comingSoon: 'Tez orada',
      available: 'Tayyor',
      lessonWord: 'dars',
      notFound: 'Dars topilmadi',
      backToWritten: 'Yozma darslarga qaytish',
      prevLesson: 'Oldingi dars',
      nextLesson: 'Keyingi dars',
    },
    videos: {
      title: 'Video darslar',
      subtitle: 'Barcha video darslar bir joyda',
      filterAll: 'Hammasi',
      filterUzum: 'Uzum Market',
      filterYandex: 'Yandex Market',
      lesson: 'dars',
      duration: 'Davomiylik',
      locked: 'Tez orada',
      watch: 'Ko\'rish',
    },
    profile: {
      title: 'Shaxsiy kabinet',
      demoNote: 'Login tizimi qo\'shilguncha namuna ko\'rinish',
      memberSince: 'A\'zo bo\'lgan sana',
      subscription: 'Obuna holati',
      active: 'Faol',
      progress: 'Umumiy progress',
      completed: 'Tugatilgan darslar',
      remaining: 'Qolgan darslar',
      totalHours: 'Jami soat',
      watchedHours: 'Ko\'rilgan soat',
      lastActivity: 'Oxirgi faollik',
      achievements: 'Yutuqlar',
      recentActivity: 'So\'nggi faollik',
      stats: {
        lessonsDone: 'Tugatilgan dars',
        testsPassed: 'O\'tilgan test',
        liveAttended: 'Jonli dars',
        streak: 'Kun ketma-ket',
      },
    },
    footer: {
      rights: 'Barcha huquqlar himoyalangan',
      contact: 'Aloqa',
      telegram: 'Telegram kanal',
      description: 'Uzum Market va Yandex Marketda professional savdo qilishni o\'rgatuvchi platforma.',
      platforms: 'Platformalar',
      email: 'Email',
      telegramAdmin: 'Administrator',
      telegramChannel: 'Telegram kanal',
      phone: 'Telefon',
      technicalLead: 'Texnik xodim',
    },
    modules: [
      { num: '01', name: 'Marketplace asoslari', lessons: '8 dars', hours: '3 soat' },
      { num: '02', name: 'Mahsulot tanlash (Niche research)', lessons: '12 dars', hours: '5 soat' },
      { num: '03', name: 'Kartochka va SEO optimizatsiya', lessons: '10 dars', hours: '4 soat' },
      { num: '04', name: 'Narx va raqobat strategiyasi', lessons: '9 dars', hours: '4 soat' },
      { num: '05', name: 'Reklama va traffic', lessons: '14 dars', hours: '6 soat' },
      { num: '06', name: 'Logistika va omborxona', lessons: '8 dars', hours: '3 soat' },
      { num: '07', name: 'Tahlil va o\'sish (Analytics)', lessons: '11 dars', hours: '5 soat' },
      { num: '08', name: 'Biznesni kengaytirish', lessons: '10 dars', hours: '4 soat' },
    ],
  },
  ru: {
    nav: {
      home: 'Главная',
      lessons: 'Уроки',
      videos: 'Видеоуроки',
      profile: 'Профиль',
      admin: 'Админ-панель',
    },
    hero: {
      badge: 'Онлайн обучающая платформа',
      title: 'Научитесь торговать на маркетплейсах с нуля',
      subtitle:
        'Освойте успешную торговлю на Uzum Market и Yandex Market через практические уроки, живые вебинары и 82 видеоурока.',
      cta: 'Начать курс',
      ctaSecondary: 'Подробнее',
      telegram: 'Связаться в Telegram',
    },
    contact: {
      title: 'Есть вопросы?',
      subtitle: 'Напишите администратору в Telegram — скоро ответим.',
      telegram: 'Написать в Telegram',
      telegramChannel: 'Подписаться на канал',
      telegramDesc: 'Вопросы о курсе, цене и регистрации',
      email: 'Email',
      phone: 'Телефон',
    },
    stats: {
      students: 'Целевых учеников',
      videos: 'Видеоуроков',
      modules: 'Модулей',
      months: 'Месяцев обучения',
    },
    about: {
      title: 'Чему вы научитесь?',
      subtitle: 'Два крупных маркетплейса — один курс',
      description:
        'MarketPro Academy научит вас профессиональной торговле на Uzum Market (Узбекистан) и Yandex Market (Россия/СНГ). От регистрации до первого дохода — каждый шаг практичен и понятен.',
    },
    course: {
      title: 'О курсе',
      subtitle: '8 модулей, 82 урока, 3 месяца',
      duration: '3 месяца: 2 месяца теория + 1 месяц практика',
      format: '3 живых урока в неделю (по 2 часа)',
      live: 'Живые уроки записываются — смотрите в любое время',
      modules: 'модулей',
      viewDetails: 'Смотреть модули',
    },
    teachers: {
      title: 'Преподаватели',
      subtitle: 'Менторы с практическим опытом',
      experience: 'Опыт',
      students: 'Обучено учеников',
      specialty: 'Специализация',
    },
    pricing: {
      title: 'Цены',
      subtitle: 'Выберите удобный тариф',
      monthly: 'Ежемесячная подписка',
      quarterly: '3 месяца (единоразово)',
      perMonth: 'сум/мес',
      oneTime: 'сум (единоразово)',
      save: 'экономия',
      features: [
        '82 HD видеоурока',
        '3 живых вебинара в неделю',
        'PDF конспекты и шпаргалки',
        'Тесты модулей и помощь ментора',
        'Личный кабинет и отслеживание прогресса',
        'Двуязычный интерфейс (Узбек/Рус)',
      ],
    },
    features: {
      title: 'Возможности платформы',
      items: [
        {
          title: 'Живые вебинары',
          desc: '3 живых урока в неделю. Задавайте вопросы напрямую менторам.',
        },
        {
          title: 'Видеоуроки',
          desc: '82 HD видео — с записью реального экрана. Пересматривайте пропущенные уроки.',
        },
        {
          title: 'Письменные материалы',
          desc: 'PDF конспект и шпаргалка к каждому уроку. Можно читать без интернета.',
        },
        {
          title: 'Тесты',
          desc: 'Тест знаний после каждого модуля. При неудаче ментор поможет.',
        },
        {
          title: 'Форум и чат',
          desc: 'Сообщество учеников. Задавайте вопросы, делитесь опытом.',
        },
        {
          title: 'Безопасность',
          desc: 'Персональный watermark, мониторинг IP и ограничение одного устройства.',
        },
      ],
    },
    faq: {
      title: 'Часто задаваемые вопросы',
      items: [
        {
          q: 'Сколько длится курс?',
          a: 'Курс длится 3 месяца: 2 месяца теория и 1 месяц практической торговли.',
        },
        {
          q: 'Что если пропущу живой урок?',
          a: 'Все живые уроки записываются и загружаются на сайт. Пропущенный урок можно посмотреть в любое время.',
        },
        {
          q: 'На каких языках обучение?',
          a: 'Курс проводится на узбекском и русском языках. Сайт также поддерживает оба языка.',
        },
        {
          q: 'Нужен ли опыт заранее?',
          a: 'Нет, курс начинается с нуля. Достаточно компьютера и интернета.',
        },
      ],
    },
    cta: {
      title: 'Начните учиться сегодня',
      subtitle: 'Торговля на маркетплейсах — профессия будущего. Сделайте первый шаг сейчас.',
      button: 'Зарегистрироваться',
    },
    lessons: {
      title: 'Уроки',
      subtitle: 'Выберите платформу и изучите программу курса',
      uzum: {
        title: 'Uzum Market',
        desc: 'Полностью освойте торговлю на крупнейшем маркетплейсе Узбекистана.',
        modules: '8 модулей',
        videos: '41 видеоурок',
        duration: '17 часов видео + 36 часов живых уроков',
        liveSessions: '3 живых урока в неделю (2 часа)',
        topics: [
          'Регистрация и открытие магазина',
          'Создание карточек товаров (SEO)',
          'Ценовая стратегия и анализ конкурентов',
          'Система складов FBO / FBS',
          'Управление рекламой (Boost)',
          'Вывод дохода и налоги',
        ],
      },
      yandex: {
        title: 'Yandex Market',
        desc: 'Научитесь торговать на Yandex Market на рынках России и СНГ.',
        modules: '8 модулей',
        videos: '41 видеоурок',
        duration: '17 часов видео + 36 часов живых уроков',
        liveSessions: '3 живых урока в неделю (2 часа)',
        topics: [
          'Открытие бизнес-аккаунта',
          'Загрузка товаров и Excel импорт',
          'Схемы DBS / FBY / FBS',
          'Реклама через Yandex Direct',
          'Управление рейтингом и отзывами',
          'Логистика и доставка',
        ],
      },
      enter: 'Смотреть уроки',
    },
    lessonsHub: {
      title: 'Уроки',
      subtitle: 'Текстовые и видеоуроки в одном месте. Без входа этот раздел недоступен.',
      writtenTitle: 'Текстовые уроки',
      writtenDesc: 'Подробные тексты, пошаговые инструкции и практические советы.',
      videoTitle: 'Видеоуроки',
      videoDesc: '82 HD видео — практические уроки по Uzum и Yandex Market.',
      openWritten: 'Открыть текстовые',
      openVideo: 'Открыть видео',
      lessonsInModule1: 'уроков (модуль 1)',
      protectedNote: 'Защищённый раздел',
      protectedDesc: 'Уроки, видео и профиль доступны только после входа.',
      backToHub: 'Назад к разделу уроков',
      writtenPageDesc: 'Выберите модуль. Сейчас готов модуль 1, остальные скоро.',
      comingSoon: 'Скоро',
      available: 'Готово',
      lessonWord: 'урок',
      notFound: 'Урок не найден',
      backToWritten: 'К текстовым урокам',
      prevLesson: 'Предыдущий',
      nextLesson: 'Следующий',
    },
    videos: {
      title: 'Видеоуроки',
      subtitle: 'Все видеоуроки в одном месте',
      filterAll: 'Все',
      filterUzum: 'Uzum Market',
      filterYandex: 'Yandex Market',
      lesson: 'урок',
      duration: 'Длительность',
      locked: 'Скоро',
      watch: 'Смотреть',
    },
    profile: {
      title: 'Личный кабинет',
      demoNote: 'Демо-режим до подключения системы входа',
      memberSince: 'Дата регистрации',
      subscription: 'Статус подписки',
      active: 'Активна',
      progress: 'Общий прогресс',
      completed: 'Завершённые уроки',
      remaining: 'Оставшиеся уроки',
      totalHours: 'Всего часов',
      watchedHours: 'Просмотрено часов',
      lastActivity: 'Последняя активность',
      achievements: 'Достижения',
      recentActivity: 'Недавняя активность',
      stats: {
        lessonsDone: 'Завершено уроков',
        testsPassed: 'Пройдено тестов',
        liveAttended: 'Живых уроков',
        streak: 'Дней подряд',
      },
    },
    footer: {
      rights: 'Все права защищены',
      contact: 'Контакты',
      telegram: 'Telegram канал',
      description: 'Платформа для обучения профессиональной торговле на Uzum Market и Yandex Market.',
      platforms: 'Платформы',
      email: 'Email',
      telegramAdmin: 'Администратор',
      telegramChannel: 'Telegram канал',
      phone: 'Телефон',
      technicalLead: 'Технический специалист',
    },
    modules: [
      { num: '01', name: 'Основы маркетплейсов', lessons: '8 уроков', hours: '3 часа' },
      { num: '02', name: 'Выбор товара (Niche research)', lessons: '12 уроков', hours: '5 часов' },
      { num: '03', name: 'Карточка и SEO оптимизация', lessons: '10 уроков', hours: '4 часа' },
      { num: '04', name: 'Ценовая и конкурентная стратегия', lessons: '9 уроков', hours: '4 часа' },
      { num: '05', name: 'Реклама и трафик', lessons: '14 уроков', hours: '6 часов' },
      { num: '06', name: 'Логистика и склад', lessons: '8 уроков', hours: '3 часа' },
      { num: '07', name: 'Аналитика и рост', lessons: '11 уроков', hours: '5 часов' },
      { num: '08', name: 'Масштабирование бизнеса', lessons: '10 уроков', hours: '4 часа' },
    ],
  },
}