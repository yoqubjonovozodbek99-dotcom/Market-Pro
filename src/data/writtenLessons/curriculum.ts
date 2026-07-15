import type { LessonBlock, WrittenLesson, WrittenModule } from './types'

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

function buildTopicDetails(
  moduleNum: number,
  title: string,
  titleRu: string,
  summaryUz: string,
  summaryRu: string,
): {
  deepDiveUz: string
  deepDiveRu: string
  theoryUz: string[]
  theoryRu: string[]
  stepsUz: string[]
  stepsRu: string[]
  metricsUz: string[]
  metricsRu: string[]
  formulasUz: string[]
  formulasRu: string[]
  caseUz: string[]
  caseRu: string[]
  assignmentUz: string[]
  assignmentRu: string[]
  mistakesUz: string
  mistakesRu: string
  secretsUz: string[]
  secretsRu: string[]
} {
  const base = {
    deepDiveUz: `${title} mavzusida asosiy maqsad: jarayonni tasodifiy emas, boshqariladigan tizimga aylantirish. ${summaryUz}. Har qarorni sonlar bilan tekshirib borish sizni tezroq o‘sishga olib keladi.`,
    deepDiveRu: `Ключевая цель урока ${titleRu}: превратить процесс из хаотичного в управляемую систему. ${summaryRu}. Проверка решений по цифрам ускоряет стабильный рост.`,
    theoryUz: [
      `${title} bo‘yicha tizim 3 qatlamdan iborat: strategiya (nima uchun), operatsiya (qanday), nazorat (qanday o‘lchaymiz).`,
      'Strategiya noto‘g‘ri bo‘lsa, yaxshi ijro ham past natija beradi; shu sabab birinchi qadam har doim aniq maqsad va pozitsionlashdan boshlanadi.',
      'Operatsiyada standartlashtirish muhim: bir xil jarayon qayta-qayta bir xil natija berishi kerak.',
      'Nazoratda esa bitta ko‘rsatkichga qaram bo‘lmang, metrikalarni bir-biriga bog‘lab tahlil qiling.',
    ],
    theoryRu: [
      `Система по теме ${titleRu} строится в 3 слоя: стратегия (зачем), операция (как), контроль (чем измеряем).`,
      'Если стратегия ошибочна, даже хорошее исполнение даст слабый результат; поэтому начинайте с четкой цели и позиционирования.',
      'В операциях важна стандартизация: одинаковый процесс должен давать одинаковый результат.',
      'В контроле не опирайтесь на одну метрику, анализируйте связь показателей между собой.',
    ],
    stepsUz: [
      'Start nuqtani yozib qo‘ying: hozirgi ko‘rsatkichlar, kuchli va zaif tomonlar.',
      'Bitta asosiy maqsad qo‘ying va unga bog‘langan 2-3 ta KPI tanlang.',
      'Mavzuga oid o‘zgarishlarni ketma-ket test qiling, bir vaqtda hammasini almashtirmang.',
      'Har 48 soatda natijani qayta ko‘rib chiqib, samarasiz ishlarni to‘xtating.',
      'Ishlagan usulni standartga aylantirib, boshqa SKUlarga nusxa qiling.',
    ],
    stepsRu: [
      'Зафиксируйте старт: текущие метрики, сильные и слабые стороны.',
      'Поставьте одну главную цель и выберите 2-3 KPI, привязанные к ней.',
      'Тестируйте изменения по теме последовательно, а не все сразу.',
      'Каждые 48 часов пересматривайте результат и отключайте слабые решения.',
      'Рабочий подход превращайте в стандарт и масштабируйте на другие SKU.',
    ],
    metricsUz: [
      'CTR: sarlavha va vizualning e’tibor jalb qilish kuchi',
      'Konversiya: sahifadan sotuvga o‘tish sifati',
      'Marja: reklama/logistika ichida sof foyda saqlanayotganini tekshiradi',
      'Qaytarish ulushi: mahsulot sifati va va’da aniqligi indikatori',
    ],
    metricsRu: [
      'CTR: сила заголовка и визуала в привлечении внимания',
      'Конверсия: качество перехода от просмотра к покупке',
      'Маржа: показывает, сохраняется ли чистая прибыль с учетом рекламы и логистики',
      'Доля возвратов: индикатор качества товара и точности обещаний',
    ],
    formulasUz: [
      'Brutto foyda = Sotuv narxi - (tannarx + komissiya + logistika + reklama)',
      'Konversiya (%) = Buyurtmalar soni / Ko‘rishlar soni * 100',
      'ROAS = Reklama orqali tushgan tushum / Reklama xarajati',
      'Haqiqiy marja (%) = Sof foyda / Tushum * 100',
    ],
    formulasRu: [
      'Валовая прибыль = Цена продажи - (себестоимость + комиссия + логистика + реклама)',
      'Конверсия (%) = Кол-во заказов / Кол-во просмотров * 100',
      'ROAS = Выручка от рекламы / Расход на рекламу',
      'Фактическая маржа (%) = Чистая прибыль / Выручка * 100',
    ],
    caseUz: [
      'Holat: SKU ko‘rishlari ko‘p, lekin buyurtma past. Diagnostika: sarlavha va rasm CTR beradi, ammo tavsif va narx konversiyani tushiryapti.',
      'Qaror: tavsifni mijoz savoliga javob beradigan formatga o‘tkazish, asosiy rasmni foydalanish holati bilan almashtirish, narxda kichik test qilish.',
      'Natija: 10-14 kun ichida konversiya o‘sishi kuzatilsa, yechim standartga olinadi; o‘sish bo‘lmasa, navbatdagi gipoteza ishga tushiriladi.',
    ],
    caseRu: [
      'Ситуация: у SKU много просмотров, но мало заказов. Диагностика: заголовок и фото дают CTR, но описание и цена снижают конверсию.',
      'Решение: переписать описание в формате ответов на вопросы клиента, заменить главное фото на сценарий использования, протестировать цену.',
      'Результат: если за 10-14 дней есть рост конверсии, решение стандартизируется; если роста нет, запускается следующая гипотеза.',
    ],
    assignmentUz: [
      '1 ta SKU tanlang va bugungi bazaviy metrikalarni jadvalga kiriting.',
      'Ushbu dars bo‘yicha 3 ta gipoteza yozing: tez natija, o‘rta muddat, uzoq muddat.',
      '7 kunlik mini sprint reja tuzing: har kun nima o‘zgaradi va nima o‘lchanadi.',
      'Sprint yakunida post-mortem yozing: nima ishladi, nima ishlamadi, keyingi qadam.',
    ],
    assignmentRu: [
      'Выберите 1 SKU и внесите в таблицу базовые метрики на сегодня.',
      'Сформулируйте 3 гипотезы по уроку: быстрый результат, средний срок, долгий срок.',
      'Соберите план мини-спринта на 7 дней: что меняется каждый день и что измеряется.',
      'В конце спринта оформите post-mortem: что сработало, что нет, следующий шаг.',
    ],
    mistakesUz:
      'Eng katta xato: his-hayajon bilan tez-tez o‘zgartirish qilib, natijani izsiz qoldirish. Versiya nazorati bo‘lmasa, qaysi qaror foyda berganini aniqlab bo‘lmaydi.',
    mistakesRu:
      'Главная ошибка: частые эмоциональные изменения без фиксации результата. Без версионного контроля невозможно понять, какое решение дало рост.',
    secretsUz: [
      '80/20 qoida: daromadning asosiy qismini berayotgan SKUlarga alohida boshqaruv rejimi qiling.',
      'Haftalik post-mortem: o‘sish/pasayish sababini yozing va keyingi haftaga bitta kuchli gipoteza qoldiring.',
      'Shablonlash siri: ishlagan sarlavha, vizual, narx va aksiya formulalarini “playbook”ga jamlang.',
    ],
    secretsRu: [
      'Правило 80/20: выделите отдельный режим управления для SKU, дающих основную выручку.',
      'Weekly post-mortem: фиксируйте причины роста/падения и оставляйте одну сильную гипотезу на неделю.',
      'Секрет масштабирования: соберите рабочие формулы заголовков, визуалов, цен и акций в playbook.',
    ],
  }

  switch (moduleNum) {
    case 2:
      return {
        ...base,
        deepDiveUz: `${title} bo‘yicha maqsad - “to‘g‘ri mahsulot + to‘g‘ri marja + boshqariladigan risk” formulasini topish. ${summaryUz}. Bu modulda noto‘g‘ri mahsulot tanlashdan keladigan yo‘qotishlarni oldindan qisqartirasiz.`,
        deepDiveRu: `Цель темы ${titleRu} - найти формулу «правильный товар + правильная маржа + управляемый риск». ${summaryRu}. Вы заранее снижаете потери от неверного выбора товара.`,
        theoryUz: [
          `${title} bo‘yicha asosiy yondashuv: bozor hajmi, raqobat zichligi va ta’minot barqarorligini birga baholash.`,
          'Faqat trendga qarab qaror qabul qilish xato: trend bor, ammo marja yo‘q bo‘lishi mumkin.',
          'Niche tanlashda “sotiladi” degan savoldan tashqari “stabil foyda beradimi” degan savol hal qiluvchi.',
          'Test partiyasiz katta kirish xatarlidir; validatsiya bo‘lmagan SKU kapitalni muzlatadi.',
        ],
        theoryRu: [
          `Подход по теме ${titleRu}: одновременно оценивать объем рынка, плотность конкуренции и стабильность поставок.`,
          'Ошибка - принимать решение только по тренду: тренд может быть, а маржи нет.',
          'При выборе ниши важен не только вопрос «продается ли», но и «дает ли стабильную прибыль».',
          'Вход без тестовой партии рискован: SKU без валидации замораживает капитал.',
        ],
        metricsUz: [
          'Talab indeksi va mavsumiylik amplitudasi',
          'Raqobatchilar soni va narx oralig‘i',
          'Unit economics: COGS + logistika + komissiya + reklama',
          'Test partiyada brak va qaytarish foizi',
        ],
        metricsRu: [
          'Индекс спроса и сезонная амплитуда',
          'Количество конкурентов и ценовой диапазон',
          'Unit economics: COGS + логистика + комиссия + реклама',
          'Процент брака и возвратов в тестовой партии',
        ],
      }
    case 3:
      return {
        ...base,
        deepDiveUz: `${title} mavzusi sotuv hunarining yuragi hisoblanadi: qidiruvda ko‘rinish, bosilish va sotib olish zanjiri shu yerda shakllanadi. ${summaryUz}.`,
        deepDiveRu: `Тема ${titleRu} - ядро продаж: здесь формируется цепочка видимости в поиске, клика и покупки. ${summaryRu}.`,
      }
    case 4:
      return {
        ...base,
        deepDiveUz: `${title}da asosiy vazifa - arzonlashmasdan sotish emas, foydani yo‘qotmasdan raqobat qilish. ${summaryUz}.`,
        deepDiveRu: `В теме ${titleRu} задача не просто снижать цену, а конкурировать без потери прибыли. ${summaryRu}.`,
      }
    case 5:
      return {
        ...base,
        deepDiveUz: `${title} moduli reklama pullarini “xarajat”dan “investitsiya”ga aylantirishni o‘rgatadi. ${summaryUz}.`,
        deepDiveRu: `Модуль ${titleRu} учит превращать рекламные расходы в инвестиции. ${summaryRu}.`,
      }
    case 6:
      return {
        ...base,
        deepDiveUz: `${title}da barqarorlik kaliti logistika intizomida: stockout, kechikish va qaytarishlarni oldindan boshqarish kerak. ${summaryUz}.`,
        deepDiveRu: `В теме ${titleRu} ключ к стабильности - дисциплина логистики: важно заранее управлять stockout, задержками и возвратами. ${summaryRu}.`,
      }
    case 7:
      return {
        ...base,
        deepDiveUz: `${title} bo‘yicha maqsad - raqamlarni oddiy hisobot emas, qaror chiqaruvchi tizimga aylantirish. ${summaryUz}.`,
        deepDiveRu: `Цель темы ${titleRu} - превратить цифры из отчета в систему принятия решений. ${summaryRu}.`,
      }
    case 8:
      return {
        ...base,
        deepDiveUz: `${title} modulida siz operatsiyani egadan mustaqil ishlaydigan darajaga olib chiqasiz: jamoa, standart va avtomatizatsiya markazda bo‘ladi. ${summaryUz}.`,
        deepDiveRu: `В модуле ${titleRu} вы переводите бизнес на уровень, где он работает независимо от владельца: в центре команда, стандарты и автоматизация. ${summaryRu}.`,
      }
    default:
      return base
  }
}

function buildLessonBlocks(
  moduleNum: number,
  title: string,
  titleRu: string,
  platformLabelUz: string,
  platformLabelRu: string,
  summaryUz: string,
  summaryRu: string,
  platformSpecificUz: string,
  platformSpecificRu: string,
): LessonBlock[] {
  const details = buildTopicDetails(moduleNum, title, titleRu, summaryUz, summaryRu)

  return [
    {
      type: 'p',
      text: `${platformLabelUz} uchun: ${summaryUz}`,
      textRu: `${platformLabelRu}: ${summaryRu}`,
    },
    {
      type: 'p',
      text: details.deepDiveUz,
      textRu: details.deepDiveRu,
    },
    {
      type: 'h3',
      text: 'Asosiy nazariya',
      textRu: 'Ключевая теория',
    },
    {
      type: 'ul',
      items: details.theoryUz,
      itemsRu: details.theoryRu,
    },
    {
      type: 'p',
      text: platformSpecificUz,
      textRu: platformSpecificRu,
    },
    {
      type: 'h2',
      text: 'To‘liq amaliy yo‘l xarita',
      textRu: 'Полная практическая дорожная карта',
    },
    {
      type: 'ol',
      items: details.stepsUz,
      itemsRu: details.stepsRu,
    },
    {
      type: 'h3',
      text: 'Mavzu bo‘yicha chuqur checklist',
      textRu: 'Глубокий чеклист по теме',
    },
    {
      type: 'ul',
      items: [
        `${title} bo‘yicha aniq standart hujjatini yarating (SOP: kim, qachon, nima qiladi).`,
        'Jarayonda qaror qabul qilish mezonlarini oldindan yozing: “qachon davom etish, qachon to‘xtatish”.',
        'Topilgan xatolarni root-cause formatida yozing: sabab, ta’sir, yechim, mas’ul.',
        'Har hafta natijani qisqa hisobotga aylantirib, keyingi sprint maqsadini belgilang.',
      ],
      itemsRu: [
        `Создайте четкий стандарт (SOP) по теме ${titleRu}: кто, когда и что делает.`,
        'Заранее зафиксируйте критерии решений: «когда продолжаем, когда останавливаем».',
        'Фиксируйте ошибки в root-cause формате: причина, влияние, решение, ответственный.',
        'Еженедельно собирайте короткий отчет и ставьте цель следующего спринта.',
      ],
    },
    {
      type: 'h3',
      text: 'Nazorat metrikalari',
      textRu: 'Контрольные метрики',
    },
    {
      type: 'ul',
      items: details.metricsUz,
      itemsRu: details.metricsRu,
    },
    {
      type: 'h3',
      text: 'Muhim formulalar',
      textRu: 'Ключевые формулы',
    },
    {
      type: 'ul',
      items: details.formulasUz,
      itemsRu: details.formulasRu,
    },
    {
      type: 'h3',
      text: 'Real case tahlili',
      textRu: 'Разбор реального кейса',
    },
    {
      type: 'ol',
      items: details.caseUz,
      itemsRu: details.caseRu,
    },
    {
      type: 'h3',
      text: 'Amaliy vazifa (uyga topshiriq)',
      textRu: 'Практическое задание (домашняя работа)',
    },
    {
      type: 'ol',
      items: details.assignmentUz,
      itemsRu: details.assignmentRu,
    },
    {
      type: 'warning',
      title: 'Ko‘p uchraydigan xato',
      text: details.mistakesUz,
      textRu: details.mistakesRu,
    },
    {
      type: 'tip',
      title: 'Yashirin sir 1 (tez natija)',
      text: details.secretsUz[0],
      textRu: details.secretsRu[0],
    },
    {
      type: 'tip',
      title: 'Yashirin sir 2 (barqaror o‘sish)',
      text: details.secretsUz[1],
      textRu: details.secretsRu[1],
    },
    {
      type: 'tip',
      title: 'Yashirin sir 3 (scaling playbook)',
      text: details.secretsUz[2],
      textRu: details.secretsRu[2],
    },
  ]
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
  const platformSpecificUz =
    platform === 'uzum'
      ? 'Uzum ichida katalog intizomi va ichki qidiruv mosligi ustuvor bo‘ladi.'
      : 'Yandex ichida analitika paneli va trafik segmentlari bilan ishlash ustuvor bo‘ladi.'
  const platformSpecificRu =
    platform === 'uzum'
      ? 'В Uzum приоритет: дисциплина каталога и соответствие внутреннему поиску.'
      : 'В Yandex приоритет: работа с аналитикой и сегментами трафика.'

  return {
    id,
    moduleNum,
    lessonNum,
    title,
    titleRu,
    readTime: '35 daqiqa',
    platform,
    blocks: buildLessonBlocks(
      moduleNum,
      title,
      titleRu,
      platformLabelUz,
      platformLabelRu,
      summaryUz,
      summaryRu,
      platformSpecificUz,
      platformSpecificRu,
    ),
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
