import type { WrittenLesson, WrittenModule } from './types'

type PairTopic = {
  uzTitle: string
  ruTitle: string
  uzSummary: string
  ruSummary: string
}

type ModuleBlueprint = {
  num: number
  slug: string
  title: string
  titleRu: string
  desc: string
  descRu: string
  hours: number
  pairs: PairTopic[]
}

function makeLesson(
  moduleNum: number,
  lessonNum: number,
  id: string,
  title: string,
  titleRu: string,
  platform: 'uzum' | 'yandex',
  summaryUz: string,
  summaryRu: string,
): WrittenLesson {
  const platformLabelUz = platform === 'uzum' ? 'Uzum Market' : 'Yandex Market'
  const platformLabelRu = platform === 'uzum' ? 'Uzum Market' : 'Yandex Market'

  return {
    id,
    moduleNum,
    lessonNum,
    title,
    titleRu,
    readTime: '18 daqiqa',
    platform,
    blocks: [
      {
        type: 'p',
        text: `${platformLabelUz} uchun: ${summaryUz}`,
        textRu: `${platformLabelRu}: ${summaryRu}`,
      },
      {
        type: 'h2',
        text: 'Amaliy qadamlar',
        textRu: 'Практические шаги',
      },
      {
        type: 'ul',
        items: [
          'Kabinetga kiring va shu mavzu bo‘yicha bo‘limni oching',
          'Mavzudagi sozlamalarni bosqichma-bosqich to‘ldiring',
          'Natijani tekshirib, xatolarni qayta tuzating',
        ],
        itemsRu: [
          'Войдите в кабинет и откройте нужный раздел',
          'Пошагово заполните настройки по теме',
          'Проверьте результат и исправьте ошибки',
        ],
      },
      {
        type: 'tip',
        title: 'Maslahat',
        text: 'Bu dars bo‘yicha checklist tuzib, har bir SKU uchun bir xil standartda ishlang.',
        textRu: 'Сделайте чеклист по уроку и применяйте единый стандарт для каждого SKU.',
      },
    ],
  }
}

function buildModule(bp: ModuleBlueprint): WrittenModule {
  const lessons: WrittenLesson[] = []

  bp.pairs.forEach((pair, idx) => {
    const base = idx + 1
    lessons.push(
      makeLesson(
        bp.num,
        base * 2 - 1,
        `m${bp.num}-u${base}`,
        pair.uzTitle,
        pair.ruTitle,
        'uzum',
        pair.uzSummary,
        pair.ruSummary,
      ),
    )
    lessons.push(
      makeLesson(
        bp.num,
        base * 2,
        `m${bp.num}-y${base}`,
        pair.uzTitle,
        pair.ruTitle,
        'yandex',
        bp.num === 2
          ? `${pair.uzSummary}. Yandex Market O‘zbekistonda ishlash (ombor, yetkazish, lokal xaridor) bo‘yicha amaliy sozlamalar alohida ko‘rsatildi.`
          : pair.uzSummary,
        bp.num === 2
          ? `${pair.ruSummary}. Отдельно показана работа Yandex Market в Узбекистане: склады, доставка, локальные продажи.`
          : pair.ruSummary,
      ),
    )
  })

  return {
    num: bp.num,
    slug: bp.slug,
    title: bp.title,
    titleRu: bp.titleRu,
    desc: bp.desc,
    descRu: bp.descRu,
    lessonCount: lessons.length,
    hours: bp.hours,
    available: true,
    lessons,
  }
}

const blueprints: ModuleBlueprint[] = [
  {
    num: 1,
    slug: 'modul-1',
    title: 'Marketplace asoslari',
    titleRu: 'Основы маркетплейса',
    desc: 'Platforma, ro‘yxatdan o‘tish, kabinet va birinchi kartochka asoslari.',
    descRu: 'Платформа, регистрация, кабинет и основы первой карточки.',
    hours: 4,
    pairs: [
      { uzTitle: 'Marketplace modeli va ishlash tamoyili', ruTitle: 'Модель и принцип работы маркетплейса', uzSummary: 'Bozor modeli, komissiya va savdo zanjiri tushuntiriladi', ruSummary: 'Разбираются модель, комиссия и цепочка продаж' },
      { uzTitle: 'Sotuvchi akkaunti ochish', ruTitle: 'Открытие аккаунта продавца', uzSummary: 'Ro‘yxatdan o‘tish va hujjat topshirish bosqichlari', ruSummary: 'Этапы регистрации и подачи документов' },
      { uzTitle: 'Do‘kon profilini sozlash', ruTitle: 'Настройка профиля магазина', uzSummary: 'Do‘kon nomi, rekvizit, asosiy sozlamalar', ruSummary: 'Название, реквизиты и базовые настройки магазина' },
      { uzTitle: 'Birinchi mahsulotni joylashtirish', ruTitle: 'Публикация первого товара', uzSummary: 'Birinchi SKU ni moderatsiyaga tayyorlash', ruSummary: 'Подготовка первого SKU к модерации' },
    ],
  },
  {
    num: 2,
    slug: 'modul-2',
    title: 'Mahsulot tanlash',
    titleRu: 'Выбор товара',
    desc: 'Niche tanlash, talab, raqobat, ta’minot va marja tahlili.',
    descRu: 'Выбор ниши, спрос, конкуренция, поставки и маржа.',
    hours: 6,
    pairs: [
      { uzTitle: 'Niche research asoslari', ruTitle: 'Основы нишевого анализа', uzSummary: 'Qaysi tovar segmentiga kirishni tanlash', ruSummary: 'Выбор товарного сегмента для входа' },
      { uzTitle: 'Talab va trendni o‘lchash', ruTitle: 'Измерение спроса и тренда', uzSummary: 'Qidiruv, mavsumiylik va trend indikatorlari', ruSummary: 'Поиск, сезонность и трендовые индикаторы' },
      { uzTitle: 'Raqobatchi tahlili', ruTitle: 'Анализ конкурентов', uzSummary: 'Narx, reyting va kartochka sifati tahlili', ruSummary: 'Анализ цены, рейтинга и качества карточки' },
      { uzTitle: 'Yetkazib beruvchi topish', ruTitle: 'Поиск поставщика', uzSummary: 'Supplier, MOQ va sifat nazorati', ruSummary: 'Поставщик, MOQ и контроль качества' },
      { uzTitle: 'Marja va unit economics', ruTitle: 'Маржа и unit economics', uzSummary: 'Xarajatlar va sof foyda formulalari', ruSummary: 'Формулы затрат и чистой прибыли' },
      { uzTitle: 'Test partiya va validatsiya', ruTitle: 'Тестовая партия и валидация', uzSummary: 'Kichik partiyada riskni tekshirish', ruSummary: 'Проверка рисков на тестовой партии' },
    ],
  },
  {
    num: 3,
    slug: 'modul-3',
    title: 'Kartochka va SEO',
    titleRu: 'Карточка и SEO',
    desc: 'Kartochka, sarlavha, rasm, atribut va qidiruv optimizatsiyasi.',
    descRu: 'Карточка, заголовок, фото, атрибуты и SEO-оптимизация.',
    hours: 5,
    pairs: [
      { uzTitle: 'Kartochka strukturasini qurish', ruTitle: 'Построение структуры карточки', uzSummary: 'Kartochkaning majburiy bloklarini to‘ldirish', ruSummary: 'Заполнение обязательных блоков карточки' },
      { uzTitle: 'Sarlavha va tavsif copywriting', ruTitle: 'Копирайтинг заголовка и описания', uzSummary: 'Konversiyaga ishlaydigan matn yozish', ruSummary: 'Создание текста, который повышает конверсию' },
      { uzTitle: 'Rasm va infografika', ruTitle: 'Фото и инфографика', uzSummary: 'Vizual kontentni standartga moslash', ruSummary: 'Приведение визуала к стандарту' },
      { uzTitle: 'Atributlar va variationlar', ruTitle: 'Атрибуты и вариации', uzSummary: 'Rang/o‘lcham variationlarini to‘g‘ri berish', ruSummary: 'Корректная настройка вариаций цвета/размера' },
      { uzTitle: 'SEO va indeksatsiya', ruTitle: 'SEO и индексация', uzSummary: 'Qidiruvda ko‘rinish va keyword rejasi', ruSummary: 'Видимость в поиске и план ключевых слов' },
    ],
  },
  {
    num: 4,
    slug: 'modul-4',
    title: 'Narx strategiyasi',
    titleRu: 'Ценовая стратегия',
    desc: 'Narx belgilash, aksiya, marja himoyasi va raqobatga moslashuv.',
    descRu: 'Ценообразование, акции, защита маржи и адаптация к рынку.',
    hours: 5,
    pairs: [
      { uzTitle: 'Start narx strategiyasi', ruTitle: 'Стартовая ценовая стратегия', uzSummary: 'Bozorga kirish uchun boshlang‘ich narx', ruSummary: 'Стартовая цена для выхода на рынок' },
      { uzTitle: 'Raqobatga qarab repricing', ruTitle: 'Репрайсинг под конкуренцию', uzSummary: 'Raqobatchi narxiga mos dinamik narx', ruSummary: 'Динамическая цена под конкурентов' },
      { uzTitle: 'Aksiya va chegirma mexanikasi', ruTitle: 'Механика акций и скидок', uzSummary: 'Chegirma bilan foydani saqlash usullari', ruSummary: 'Как сохранять прибыль в акциях' },
      { uzTitle: 'Marja himoyasi', ruTitle: 'Защита маржи', uzSummary: 'Komissiya va logistika ichida marjani saqlash', ruSummary: 'Сохранение маржи с учетом комиссии и логистики' },
      { uzTitle: 'Narx testlari va A/B', ruTitle: 'Ценовые тесты и A/B', uzSummary: 'Narx bo‘yicha test orqali optimal nuqtani topish', ruSummary: 'Поиск оптимальной цены через тестирование' },
    ],
  },
  {
    num: 5,
    slug: 'modul-5',
    title: 'Reklama va traffic',
    titleRu: 'Реклама и трафик',
    desc: 'Ichki reklama, tashqi traffic, kampaniya optimizatsiyasi.',
    descRu: 'Внутренняя реклама, внешний трафик и оптимизация кампаний.',
    hours: 7,
    pairs: [
      { uzTitle: 'Reklama platformasiga kirish', ruTitle: 'Введение в рекламную платформу', uzSummary: 'Reklama kabinetining asosiy imkoniyatlari', ruSummary: 'Основные возможности рекламного кабинета' },
      { uzTitle: 'Kampaniya yaratish', ruTitle: 'Создание кампании', uzSummary: 'Maqsad, auditoriya, format tanlash', ruSummary: 'Выбор цели, аудитории и формата' },
      { uzTitle: 'Byudjet boshqaruvi', ruTitle: 'Управление бюджетом', uzSummary: 'Kunlik limit va xarajat nazorati', ruSummary: 'Дневные лимиты и контроль расходов' },
      { uzTitle: 'Keyword va targeting', ruTitle: 'Ключевые слова и таргетинг', uzSummary: 'Trafikni to‘g‘ri yo‘naltirish usullari', ruSummary: 'Методы точного направления трафика' },
      { uzTitle: 'Kreativ va CTR', ruTitle: 'Креативы и CTR', uzSummary: 'Banner/matn samaradorligini oshirish', ruSummary: 'Повышение эффективности баннеров и текстов' },
      { uzTitle: 'ROAS va samaradorlik', ruTitle: 'ROAS и эффективность', uzSummary: 'Reklama rentabelligini hisoblash', ruSummary: 'Расчет рентабельности рекламы' },
      { uzTitle: 'Kampaniya optimizatsiyasi', ruTitle: 'Оптимизация кампании', uzSummary: 'Samarasiz segmentlarni kesib tashlash', ruSummary: 'Отключение неэффективных сегментов' },
    ],
  },
  {
    num: 6,
    slug: 'modul-6',
    title: 'Logistika va ombor',
    titleRu: 'Логистика и склад',
    desc: 'Ombor modeli, qoldiq, yetkazish va qaytarish jarayonlari.',
    descRu: 'Складские модели, остатки, доставка и возвраты.',
    hours: 4,
    pairs: [
      { uzTitle: 'Ombor modelini tanlash', ruTitle: 'Выбор складской модели', uzSummary: 'FBO/FBS yoki analog model tanlovi', ruSummary: 'Выбор модели FBO/FBS или аналога' },
      { uzTitle: 'Qoldiq va replenishment', ruTitle: 'Остатки и пополнение', uzSummary: 'Qoldiq tugamasligi uchun reja', ruSummary: 'План пополнения без out-of-stock' },
      { uzTitle: 'Yetkazib berish SLA', ruTitle: 'SLA доставки', uzSummary: 'Yetkazish tezligi va sifat nazorati', ruSummary: 'Контроль скорости и качества доставки' },
      { uzTitle: 'Qaytarish va nuqson', ruTitle: 'Возвраты и брак', uzSummary: 'Qaytarilgan tovar bilan ishlash standardi', ruSummary: 'Стандарт работы с возвратами и браком' },
    ],
  },
  {
    num: 7,
    slug: 'modul-7',
    title: 'Tahlil va o‘sish',
    titleRu: 'Аналитика и рост',
    desc: 'KPI, analitika paneli, o‘sish gipotezalari va scaling.',
    descRu: 'KPI, аналитика, гипотезы роста и масштабирование.',
    hours: 6,
    pairs: [
      { uzTitle: 'KPI va dashboard', ruTitle: 'KPI и дашборд', uzSummary: 'Asosiy ko‘rsatkichlarni kuzatish', ruSummary: 'Мониторинг ключевых метрик' },
      { uzTitle: 'Konversiya tahlili', ruTitle: 'Анализ конверсии', uzSummary: 'View-to-cart va cart-to-order tahlili', ruSummary: 'Анализ воронки view-to-cart и cart-to-order' },
      { uzTitle: 'Assortiment tahlili', ruTitle: 'Анализ ассортимента', uzSummary: 'Qaysi SKU ni kuchaytirish yoki to‘xtatish', ruSummary: 'Какие SKU усиливать или выводить' },
      { uzTitle: 'Mavsumiy va regional tahlil', ruTitle: 'Сезонный и региональный анализ', uzSummary: 'Hududlar va mavsum bo‘yicha reja', ruSummary: 'План по регионам и сезонам' },
      { uzTitle: 'O‘sish gipotezalari', ruTitle: 'Гипотезы роста', uzSummary: 'Tez testlar orqali o‘sish nuqtasi topish', ruSummary: 'Поиск точек роста через быстрые тесты' },
      { uzTitle: 'Scaling rejasi', ruTitle: 'План масштабирования', uzSummary: 'Operatsion va moliyaviy o‘sish yo‘l xaritasi', ruSummary: 'Операционная и финансовая дорожная карта роста' },
    ],
  },
  {
    num: 8,
    slug: 'modul-8',
    title: 'Biznesni kengaytirish',
    titleRu: 'Масштабирование бизнеса',
    desc: 'Jamoa, avtomatizatsiya, brending va yangi bozorlar.',
    descRu: 'Команда, автоматизация, бренд и новые рынки.',
    hours: 5,
    pairs: [
      { uzTitle: 'Jamoa va rollar', ruTitle: 'Команда и роли', uzSummary: 'Operatsiyani jamoa bilan bo‘lish', ruSummary: 'Разделение операций внутри команды' },
      { uzTitle: 'Avtomatizatsiya', ruTitle: 'Автоматизация', uzSummary: 'Routine jarayonlarni avtomatlashtirish', ruSummary: 'Автоматизация рутинных процессов' },
      { uzTitle: 'Brand va loyal mijoz', ruTitle: 'Бренд и лояльность', uzSummary: 'Brend identitet va qayta xarid strategiyasi', ruSummary: 'Идентичность бренда и стратегия повторных покупок' },
      { uzTitle: 'Yangi kategoriya ochish', ruTitle: 'Запуск новой категории', uzSummary: 'Yangi toifa qo‘shish bo‘yicha playbook', ruSummary: 'Плейбук по запуску новой категории' },
      { uzTitle: 'Cross-platform kengayish', ruTitle: 'Кросс-платформенное расширение', uzSummary: 'Uzum va Yandex bo‘yicha parallel o‘sish', ruSummary: 'Параллельный рост в Uzum и Yandex' },
    ],
  },
]

export const pairedCurriculumModules: WrittenModule[] = blueprints.map(buildModule)
