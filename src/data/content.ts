import { siteConfig } from './site'

export interface Teacher {
  id: string
  name: string
  nameRu: string
  role: string
  roleRu: string
  platform: 'uzum' | 'yandex'
  experience: string
  experienceRu: string
  students: number
  bio: string
  bioRu: string
  specialties: string[]
  specialtiesRu: string[]
}

/** PDF (08 — JAMOA) bo'yicha: 2 ta mentor — Uzum va Yandex */
export const teachers: Teacher[] = [
  {
    id: '1',
    name: 'Uzum Market mentori',
    nameRu: 'Ментор Uzum Market',
    role: 'MarketPro Academy jamoasi',
    roleRu: 'Команда MarketPro Academy',
    platform: 'uzum',
    experience: 'Amaliy savdo',
    experienceRu: 'Практическая торговля',
    students: 0,
    bio: 'Uzum Market bo\'yicha darslarni o\'tkazadi. To\'liq ma\'lumot tez orada qo\'shiladi.',
    bioRu: 'Проводит уроки по Uzum Market. Полная информация скоро будет добавлена.',
    specialties: [
      'Ro\'yxatdan o\'tish va magazin ochish',
      'Mahsulot kartochkalari (SEO)',
      'FBO / FBS ombor tizimi',
      'Boost reklama boshqaruvi',
    ],
    specialtiesRu: [
      'Регистрация и открытие магазина',
      'Карточки товаров (SEO)',
      'Система складов FBO / FBS',
      'Управление рекламой Boost',
    ],
  },
  {
    id: '2',
    name: 'Yandex Market mentori',
    nameRu: 'Ментор Yandex Market',
    role: 'MarketPro Academy jamoasi',
    roleRu: 'Команда MarketPro Academy',
    platform: 'yandex',
    experience: 'Amaliy savdo',
    experienceRu: 'Практическая торговля',
    students: 0,
    bio: 'Yandex Market bo\'yicha darslarni o\'tkazadi. To\'liq ma\'lumot tez orada qo\'shiladi.',
    bioRu: 'Проводит уроки по Yandex Market. Полная информация скоро будет добавлена.',
    specialties: [
      'Biznes-akkaunt ochish',
      'Mahsulot yuklash va Excel import',
      'DBS / FBY / FBS sxemalari',
      'Yandex Direct reklama',
    ],
    specialtiesRu: [
      'Открытие бизнес-аккаунта',
      'Загрузка товаров и Excel импорт',
      'Схемы DBS / FBY / FBS',
      'Реклама Yandex Direct',
    ],
  },
]

export type Platform = 'uzum' | 'yandex'

export interface VideoLesson {
  id: number
  platform: Platform
  moduleNum: number
  lessonNum: number
  title: string
  titleRu: string
  duration: string
}

interface ModuleDef {
  num: number
  nameUz: string
  nameRu: string
  totalLessons: number
  hours: number
  uzumLessons: number
  yandexLessons: number
  uzumTopics: string[]
  uzumTopicsRu: string[]
  yandexTopics: string[]
  yandexTopicsRu: string[]
}

/** PDF (03 — KURS TUZILMASI) — 8 modul, 82 dars */
const modules: ModuleDef[] = [
  {
    num: 1,
    nameUz: 'Marketplace asoslari',
    nameRu: 'Основы маркетплейса',
    totalLessons: 8,
    hours: 3,
    uzumLessons: 4,
    yandexLessons: 4,
    uzumTopics: [
      'Marketplace nima va qanday ishlaydi?',
      'Uzum Market ro\'yxatdan o\'tish',
      'Magazin ochish va sozlash',
      'Birinchi mahsulotni joylashtirish',
    ],
    uzumTopicsRu: [
      'Что такое маркетплейс и как он работает?',
      'Регистрация на Uzum Market',
      'Открытие и настройка магазина',
      'Размещение первого товара',
    ],
    yandexTopics: [
      'Yandex Market ekotizimi',
      'Biznes-akkaunt ochish',
      'Do\'kon sozlamalari',
      'Birinchi mahsulotni yuklash',
    ],
    yandexTopicsRu: [
      'Экосистема Yandex Market',
      'Открытие бизнес-аккаунта',
      'Настройка магазина',
      'Загрузка первого товара',
    ],
  },
  {
    num: 2,
    nameUz: 'Mahsulot tanlash (Niche research)',
    nameRu: 'Выбор товара (Niche research)',
    totalLessons: 12,
    hours: 5,
    uzumLessons: 6,
    yandexLessons: 6,
    uzumTopics: [
      'Niche research — to\'g\'ri mahsulot tanlash',
      'Raqobatchilarni tahlil qilish',
      'Trend va talabni o\'lchash',
      'Yetkazib beruvchi topish',
      'Marja hisoblash',
      'Test buyurtma strategiyasi',
    ],
    uzumTopicsRu: [
      'Niche research — правильный выбор товара',
      'Анализ конкурентов',
      'Измерение тренда и спроса',
      'Поиск поставщика',
      'Расчёт маржи',
      'Стратегия тестового заказа',
    ],
    yandexTopics: [
      'Rossiya va MDH bozorini tahlil',
      'Kategoriya va talab tanlash',
      'Raqobatchilar monitoringi',
      'Xalqaro yetkazib beruvchilar',
      'Narx va marja hisoblash',
      'Test savdo rejasi',
    ],
    yandexTopicsRu: [
      'Анализ рынка России и СНГ',
      'Выбор категории и спроса',
      'Мониторинг конкурентов',
      'Международные поставщики',
      'Расчёт цены и маржи',
      'План тестовых продаж',
    ],
  },
  {
    num: 3,
    nameUz: 'Kartochka va SEO optimizatsiya',
    nameRu: 'Карточка и SEO оптимизация',
    totalLessons: 10,
    hours: 4,
    uzumLessons: 5,
    yandexLessons: 5,
    uzumTopics: [
      'Mahsulot kartochkasi yaratish',
      'Sarlavha va tavsif yozish',
      'Rasmlar va infografika',
      'Kalit so\'zlar va SEO',
      'A/B test va optimizatsiya',
    ],
    uzumTopicsRu: [
      'Создание карточки товара',
      'Написание заголовка и описания',
      'Фото и инфографика',
      'Ключевые слова и SEO',
      'A/B тест и оптимизация',
    ],
    yandexTopics: [
      'Kartochka talablari',
      'Sarlavha va atributlar',
      'Rasm va video qo\'shish',
      'Qidiruv optimizatsiyasi',
      'Konversiya oshirish',
    ],
    yandexTopicsRu: [
      'Требования к карточке',
      'Заголовок и атрибуты',
      'Добавление фото и видео',
      'Оптимизация поиска',
      'Повышение конверсии',
    ],
  },
  {
    num: 4,
    nameUz: 'Narx va raqobat strategiyasi',
    nameRu: 'Ценовая и конкурентная стратегия',
    totalLessons: 9,
    hours: 4,
    uzumLessons: 4,
    yandexLessons: 5,
    uzumTopics: [
      'Narx strategiyasi asoslari',
      'Raqobatchilar narxini kuzatish',
      'Chegirma va aksiyalar',
      'Foyda marjasini saqlash',
    ],
    uzumTopicsRu: [
      'Основы ценовой стратегии',
      'Мониторинг цен конкурентов',
      'Скидки и акции',
      'Сохранение маржи прибыли',
    ],
    yandexTopics: [
      'Dinamik narxlash',
      'Raqobat tahlili',
      'Minimal narx va komissiya',
      'Aksiya va promokodlar',
      'Foyda optimizatsiyasi',
    ],
    yandexTopicsRu: [
      'Динамическое ценообразование',
      'Конкурентный анализ',
      'Минимальная цена и комиссия',
      'Акции и промокоды',
      'Оптимизация прибыли',
    ],
  },
  {
    num: 5,
    nameUz: 'Reklama va traffic',
    nameRu: 'Реклама и трафик',
    totalLessons: 14,
    hours: 6,
    uzumLessons: 7,
    yandexLessons: 7,
    uzumTopics: [
      'Boost reklama tizimi',
      'Reklama kampaniyasi yaratish',
      'Byudjet va stavkalar',
      'Kalit so\'zlar tanlash',
      'Konversiya tahlili',
      'ROAS hisoblash',
      'Reklamani optimizatsiya qilish',
    ],
    uzumTopicsRu: [
      'Система рекламы Boost',
      'Создание рекламной кампании',
      'Бюджет и ставки',
      'Выбор ключевых слов',
      'Анализ конверсии',
      'Расчёт ROAS',
      'Оптимизация рекламы',
    ],
    yandexTopics: [
      'Yandex Direct kirish',
      'Kampaniya sozlash',
      'Byudjet boshqaruvi',
      'Maqsadli auditoriya',
      'Reklama matnlari',
      'Statistika va tahlil',
      'Kampaniyani optimizatsiya',
    ],
    yandexTopicsRu: [
      'Введение в Yandex Direct',
      'Настройка кампании',
      'Управление бюджетом',
      'Целевая аудитория',
      'Рекламные тексты',
      'Статистика и анализ',
      'Оптимизация кампании',
    ],
  },
  {
    num: 6,
    nameUz: 'Logistika va omborxona',
    nameRu: 'Логистика и склад',
    totalLessons: 8,
    hours: 3,
    uzumLessons: 4,
    yandexLessons: 4,
    uzumTopics: [
      'FBO va FBS farqi',
      'Omborga mahsulot yuborish',
      'Qaytarishlar bilan ishlash',
      'Inventarizatsiya',
    ],
    uzumTopicsRu: [
      'Разница FBO и FBS',
      'Отправка товара на склад',
      'Работа с возвратами',
      'Инвентаризация',
    ],
    yandexTopics: [
      'DBS, FBY va FBS sxemalari',
      'Yetkazib berish sozlash',
      'Xalqaro logistika',
      'Qaytarish jarayoni',
    ],
    yandexTopicsRu: [
      'Схемы DBS, FBY и FBS',
      'Настройка доставки',
      'Международная логистика',
      'Процесс возврата',
    ],
  },
  {
    num: 7,
    nameUz: 'Tahlil va o\'sish (Analytics)',
    nameRu: 'Анализ и рост (Analytics)',
    totalLessons: 11,
    hours: 5,
    uzumLessons: 6,
    yandexLessons: 5,
    uzumTopics: [
      'Sotuv statistikasi o\'qish',
      'Konversiya va CTR',
      'Mahsulot samaradorligi',
      'Mavsumiy tahlil',
      'Hisobot va KPI',
      'O\'sish strategiyasi',
    ],
    uzumTopicsRu: [
      'Чтение статистики продаж',
      'Конверсия и CTR',
      'Эффективность товара',
      'Сезонный анализ',
      'Отчёты и KPI',
      'Стратегия роста',
    ],
    yandexTopics: [
      'Yandex Market analitikasi',
      'Konversiya ko\'rsatkichlari',
      'Mahsulot reytingi tahlili',
      'Savdo dinamikasi',
      'Qaror qabul qilish',
    ],
    yandexTopicsRu: [
      'Аналитика Yandex Market',
      'Показатели конверсии',
      'Анализ рейтинга товара',
      'Динамика продаж',
      'Принятие решений',
    ],
  },
  {
    num: 8,
    nameUz: 'Biznesni kengaytirish',
    nameRu: 'Масштабирование бизнеса',
    totalLessons: 10,
    hours: 4,
    uzumLessons: 5,
    yandexLessons: 5,
    uzumTopics: [
      'Ko\'p mahsulotli do\'kon',
      'Jamoa yollash',
      'Avtomatlashtirish',
      'Daromad chiqarish va soliqlar',
      'Keyingi qadamlar',
    ],
    uzumTopicsRu: [
      'Магазин с множеством товаров',
      'Найм команды',
      'Автоматизация',
      'Вывод дохода и налоги',
      'Следующие шаги',
    ],
    yandexTopics: [
      'Yangi kategoriyalarga kirish',
      'Ko\'p kanalli savdo',
      'Brend qurish',
      'Xalqaro kengayish',
      'Uzoq muddatli reja',
    ],
    yandexTopicsRu: [
      'Выход в новые категории',
      'Многоканальные продажи',
      'Построение бренда',
      'Международное расширение',
      'Долгосрочный план',
    ],
  },
]

function formatDuration(totalMinutes: number): string {
  const m = Math.max(12, Math.round(totalMinutes))
  const h = Math.floor(m / 60)
  const min = m % 60
  if (h > 0) return `${h}:${String(min).padStart(2, '0')}:00`
  return `${min}:00`
}

function buildLessonsForPlatform(
  mod: ModuleDef,
  platform: Platform,
  count: number,
  topicsUz: string[],
  topicsRu: string[],
  startId: number,
): VideoLesson[] {
  const minutesPerLesson = (mod.hours * 60) / mod.totalLessons
  const lessons: VideoLesson[] = []

  for (let i = 0; i < count; i++) {
    const topicUz = topicsUz[i] ?? `${mod.nameUz} — amaliy dars ${i + 1}`
    const topicRu = topicsRu[i] ?? `${mod.nameRu} — практический урок ${i + 1}`
    lessons.push({
      id: startId + i,
      platform,
      moduleNum: mod.num,
      lessonNum: i + 1,
      title: topicUz,
      titleRu: topicRu,
      duration: formatDuration(minutesPerLesson + (i % 3) * 2),
    })
  }

  return lessons
}

function generateVideoLessons(): VideoLesson[] {
  const all: VideoLesson[] = []
  let id = 1

  for (const mod of modules) {
    const uzum = buildLessonsForPlatform(
      mod,
      'uzum',
      mod.uzumLessons,
      mod.uzumTopics,
      mod.uzumTopicsRu,
      id,
    )
    id += uzum.length
    all.push(...uzum)

    const yandex = buildLessonsForPlatform(
      mod,
      'yandex',
      mod.yandexLessons,
      mod.yandexTopics,
      mod.yandexTopicsRu,
      id,
    )
    id += yandex.length
    all.push(...yandex)
  }

  return all
}

export const videoLessons: VideoLesson[] = generateVideoLessons()

export interface DemoProfile {
  name: string
  email: string
  phone: string
  memberSince: string
  avatar: string
  subscriptionPlan: string
  subscriptionPlanRu: string
  progress: number
  completedLessons: number
  totalLessons: number
  watchedHours: number
  totalHours: number
  lastActivity: string
  lastActivityRu: string
  streak: number
  testsPassed: number
  liveAttended: number
  uzumCompleted: number
  uzumTotal: number
  yandexCompleted: number
  yandexTotal: number
  achievements: { icon: string; title: string; titleRu: string }[]
  recentActivity: { action: string; actionRu: string; time: string }[]
}

/** Profil sahifasi — login tizimi qo'shilguncha ko'rsatiladigan namuna */
export const demoProfile: DemoProfile = {
  name: siteConfig.founder.name,
  email: siteConfig.email,
  phone: siteConfig.phone,
  memberSince: '2026-03-01',
  avatar: 'YO',
  subscriptionPlan: '3 oylik obuna',
  subscriptionPlanRu: '3-месячная подписка',
  progress: 0,
  completedLessons: 0,
  totalLessons: 82,
  watchedHours: 0,
  totalHours: 34,
  lastActivity: 'Hali faollik yo\'q',
  lastActivityRu: 'Активности пока нет',
  streak: 0,
  testsPassed: 0,
  liveAttended: 0,
  uzumCompleted: 0,
  uzumTotal: 41,
  yandexCompleted: 0,
  yandexTotal: 41,
  achievements: [],
  recentActivity: [],
}

/** @deprecated demoProfile ishlating */
export const mockStudent = demoProfile
