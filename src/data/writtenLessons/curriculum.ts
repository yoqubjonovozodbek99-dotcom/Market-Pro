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

type TopicSeed = {
  focusUz: string
  focusRu: string
  primaryKpiUz: string
  primaryKpiRu: string
  secretUz: string
  secretRu: string
}

const topicSeeds: Record<string, TopicSeed> = {
  'Marketplace modeli va ishlash tamoyili': {
    focusUz: 'komissiya zanjiri, xaridor oqimi va fulfillment modelini to‘g‘ri tushunish',
    focusRu: 'понимание цепочки комиссии, потока покупателей и модели fulfillment',
    primaryKpiUz: 'har bir buyurtmadan qoladigan sof marja',
    primaryKpiRu: 'чистая маржа с каждого заказа',
    secretUz: 'Komissiya va logistika ulushini oldindan 3 ssenariyda hisoblab qo‘ysangiz, noto‘g‘ri kategoriya tanlashdan qutulasiz.',
    secretRu: 'Если заранее считать комиссию и логистику в 3 сценариях, вы избежите ошибки выбора невыгодной категории.',
  },
  'Sotuvchi akkaunti ochish': {
    focusUz: 'hujjat, verifikatsiya va yuridik ma’lumotlarni bir urinishda to‘g‘ri topshirish',
    focusRu: 'корректная подача документов, верификации и юридических данных с первой попытки',
    primaryKpiUz: 'verifikatsiya o‘tish tezligi',
    primaryKpiRu: 'скорость прохождения верификации',
    secretUz: 'Hujjatlarni bir xil nomlash standartida yuborsangiz, moderatsiya savollarini keskin kamaytirasiz.',
    secretRu: 'Единый стандарт именования документов резко снижает количество вопросов от модерации.',
  },
  'Do‘kon profilini sozlash': {
    focusUz: 'profil ishonchliligini oshiradigan atributlar va brend pozitsionlash',
    focusRu: 'атрибуты профиля, повышающие доверие, и позиционирование бренда',
    primaryKpiUz: 'profil ko‘rishdan kartochkaga o‘tish ulushi',
    primaryKpiRu: 'доля переходов из профиля в карточки',
    secretUz: 'Do‘kon tavsifida tor niche va aniq va’da bo‘lsa, profil konversiyasi sezilarli oshadi.',
    secretRu: 'Узкая ниша и четкое обещание в описании магазина заметно повышают конверсию профиля.',
  },
  'Birinchi mahsulotni joylashtirish': {
    focusUz: 'moderatsiyadan tez o‘tadigan va sotuvga tayyor birinchi SKU yaratish',
    focusRu: 'создание первого SKU, который быстро проходит модерацию и готов к продажам',
    primaryKpiUz: 'moderatsiya rad etilish ulushi',
    primaryKpiRu: 'доля отклонений на модерации',
    secretUz: 'Birinchi SKU’da murakkab variation qilmasdan oddiy konfiguratsiya bilan kirish xatoni kamaytiradi.',
    secretRu: 'Запуск первого SKU в простой конфигурации без сложных вариаций существенно снижает ошибки.',
  },
  'Niche research asoslari': {
    focusUz: 'bozor hajmi bilan raqobat zichligini bir vaqtda baholash',
    focusRu: 'одновременная оценка объема рынка и плотности конкуренции',
    primaryKpiUz: 'talab/raqobat nisbati',
    primaryKpiRu: 'соотношение спроса к конкуренции',
    secretUz: 'Kichik, lekin marjasi yuqori niche ko‘pincha ommaviy trenddan ko‘ra tezroq pul aylantiradi.',
    secretRu: 'Небольшая, но маржинальная ниша часто оборачивает деньги быстрее массового тренда.',
  },
  'Talab va trendni o‘lchash': {
    focusUz: 'trendning vaqtinchalik shovqin emas, barqaror talab ekanini tekshirish',
    focusRu: 'проверка, что тренд — это устойчивый спрос, а не краткий шум',
    primaryKpiUz: 'haftalik qidiruv trend indeksining barqarorligi',
    primaryKpiRu: 'стабильность недельного индекса поискового спроса',
    secretUz: 'Kamida 8 haftalik trend chizig‘ini ko‘rmasdan katta partiya kiritmang.',
    secretRu: 'Не заходите большой партией без анализа тренда минимум за 8 недель.',
  },
  'Raqobatchi tahlili': {
    focusUz: 'top sotuvchilar kartochkasi, narxi va sharh naqshini dekompozitsiya qilish',
    focusRu: 'декомпозиция карточек, цен и паттернов отзывов топ-продавцов',
    primaryKpiUz: 'top-10 raqobatchi o‘rtacha narx diapazoni',
    primaryKpiRu: 'средний ценовой диапазон топ-10 конкурентов',
    secretUz: 'Raqibning kuchli tomonini nusxalash emas, uning bo‘sh joyini topish ko‘proq foyda beradi.',
    secretRu: 'Больше прибыли дает не копирование сильных сторон конкурента, а поиск его слабых зон.',
  },
  'Yetkazib beruvchi topish': {
    focusUz: 'sifat, MOQ va yetkazib berish intizomi bo‘yicha ishonchli supplier tanlash',
    focusRu: 'выбор надежного поставщика по качеству, MOQ и дисциплине поставки',
    primaryKpiUz: 'test partiyadagi brak foizi',
    primaryKpiRu: 'процент брака в тестовой партии',
    secretUz: 'Supplierni narxdan oldin qayta buyurtma tezligi va brak kompensatsiyasi bo‘yicha baholang.',
    secretRu: 'Оценивайте поставщика не только по цене, а по скорости повторного заказа и компенсации брака.',
  },
  'Marja va unit economics': {
    focusUz: 'har bir SKU bo‘yicha real foyda formulalarini to‘liq hisoblash',
    focusRu: 'полный расчет реальной прибыли по каждому SKU',
    primaryKpiUz: 'net margin (%)',
    primaryKpiRu: 'чистая маржа (%)',
    secretUz: 'Reklama xarajatini SKU kesimida ajratmasangiz, foydali va zararli mahsulotlarni aralashtirib yuborasiz.',
    secretRu: 'Без раздельного учета рекламных расходов по SKU вы смешиваете прибыльные и убыточные товары.',
  },
  'Test partiya va validatsiya': {
    focusUz: 'katta kirishdan oldin kichik partiya bilan riskni verifikatsiya qilish',
    focusRu: 'проверка рисков через тестовую партию до крупного входа',
    primaryKpiUz: 'testdan keyingi qayta buyurtma qarori aniqligi',
    primaryKpiRu: 'точность решения о повторном заказе после теста',
    secretUz: 'Test partiyada foyda emas, signal yig‘ing: brak, qaytarish, tez sotilish va feedback sifati.',
    secretRu: 'В тестовой партии собирайте не прибыль, а сигналы: брак, возвраты, скорость продажи и качество feedback.',
  },
  'Kartochka strukturasini qurish': {
    focusUz: 'kartochka bloklarini qidiruv va konversiyaga mos arxitektura bilan joylash',
    focusRu: 'построение архитектуры карточки под поиск и конверсию',
    primaryKpiUz: 'kartochka ko‘rishdan savatga qo‘shish ulushi',
    primaryKpiRu: 'доля добавлений в корзину из просмотров карточки',
    secretUz: 'Kartochka bloklarini “savol-javob ketma-ketligi” sifatida joylashtirsangiz konversiya oshadi.',
    secretRu: 'Если строить блоки карточки как последовательность ответов на вопросы клиента, конверсия растет.',
  },
  'Sarlavha va tavsif copywriting': {
    focusUz: 'qidiruv so‘zlari va xaridor og‘riq nuqtalarini bir matnda birlashtirish',
    focusRu: 'объединение поисковых ключей и болей клиента в одном тексте',
    primaryKpiUz: 'CTR va description scroll depth',
    primaryKpiRu: 'CTR и глубина просмотра описания',
    secretUz: 'Sarlavhada 1 ta asosiy va 2 ta tijoriy kalitni tabiiy joylashtirish eng yaxshi balans beradi.',
    secretRu: 'Естественное включение 1 основного и 2 коммерческих ключей в заголовок дает лучший баланс.',
  },
  'Rasm va infografika': {
    focusUz: 'vizual kontentda birinchi 3 rasm orqali ishonch va farqni ko‘rsatish',
    focusRu: 'показ доверия и отличия через первые 3 изображения',
    primaryKpiUz: 'birinchi rasm CTR va 2-3 rasmga o‘tish ulushi',
    primaryKpiRu: 'CTR первого изображения и доля перехода ко 2-3 кадру',
    secretUz: 'Birinchi rasmda “kim uchun” va “nima foyda” bir kadrda ko‘rsatilsa, bosilish oshadi.',
    secretRu: 'Если в первом кадре показать «для кого» и «какая выгода», кликабельность растет.',
  },
  'Atributlar va variationlar': {
    focusUz: 'filterlarda chiqish uchun atribut to‘liqligi va variation tozaligi',
    focusRu: 'полнота атрибутов и чистота вариаций для выхода в фильтрах',
    primaryKpiUz: 'variation ichidagi noto‘g‘ri buyurtma ulushi',
    primaryKpiRu: 'доля ошибочных заказов внутри вариаций',
    secretUz: 'Variation nomlarini mijoz tili bilan yozsangiz support savollari kamayadi.',
    secretRu: 'Названия вариаций на языке клиента заметно снижают вопросы в поддержку.',
  },
  'SEO va indeksatsiya': {
    focusUz: 'kalit so‘z klasteri asosida barqaror organik ko‘rinishni oshirish',
    focusRu: 'рост стабильной органической видимости по кластерам ключевых слов',
    primaryKpiUz: 'top-20 kalitlarda pozitsiya dinamikasi',
    primaryKpiRu: 'динамика позиций в топ-20 ключей',
    secretUz: 'Har 14 kunda kalit klaster audit qilsangiz, indeksatsiya pasayishini oldindan ushlaysiz.',
    secretRu: 'Аудит кластеров каждые 14 дней позволяет заранее поймать падение индексации.',
  },
  'Start narx strategiyasi': {
    focusUz: 'bozorga kirishda pozitsiyani yo‘qotmasdan kirish narxini tanlash',
    focusRu: 'выбор стартовой цены без потери рыночной позиции',
    primaryKpiUz: 'start davridagi marja va savdo tezligi balansi',
    primaryKpiRu: 'баланс маржи и скорости продаж на старте',
    secretUz: 'Start narxda 3 bosqichli ssenariy qiling: kirish, barqarorlash, foyda fazasi.',
    secretRu: 'Для старта используйте 3 фазы цены: вход, стабилизация, прибыль.',
  },
  'Raqobatga qarab repricing': {
    focusUz: 'raqib harakatiga javoban marjani yemirmaydigan dinamik narx boshqaruvi',
    focusRu: 'динамическое ценообразование без проедания маржи в ответ на конкурентов',
    primaryKpiUz: 'narx o‘zgarishidan keyingi konversiya elastikligi',
    primaryKpiRu: 'эластичность конверсии после изменения цены',
    secretUz: 'Raqibdan har doim arzon bo‘lish emas, “eng yaxshi qiymat” zonasi topilishi kerak.',
    secretRu: 'Не нужно быть всегда дешевле конкурента — нужно найти зону лучшей ценности.',
  },
  'Aksiya va chegirma mexanikasi': {
    focusUz: 'aksiya orqali hajm oshirib ham marjani saqlash mexanikasi',
    focusRu: 'механика акций, которая увеличивает объем и сохраняет маржу',
    primaryKpiUz: 'aksiya davridagi incremental profit',
    primaryKpiRu: 'инкрементальная прибыль в период акции',
    secretUz: 'Chegirma foizini emas, xaridor segmentini boshqarish aksiyada ko‘proq foyda beradi.',
    secretRu: 'В акциях больше прибыли дает управление сегментом покупателя, а не размером скидки.',
  },
  'Marja himoyasi': {
    focusUz: 'xarajat o‘sishida ham sof foydani himoya qiladigan qoidalar',
    focusRu: 'правила защиты чистой прибыли при росте издержек',
    primaryKpiUz: 'minimal ruxsat etilgan marja chegarasi',
    primaryKpiRu: 'минимально допустимая граница маржи',
    secretUz: 'Har SKU uchun “stop-loss marja” qoidasini yozing, aks holda savdo ko‘payib zarar ham ko‘payadi.',
    secretRu: 'Пропишите правило stop-loss по марже для каждого SKU, иначе рост продаж может увеличить убыток.',
  },
  'Narx testlari va A/B': {
    focusUz: 'narx gipotezalarini statistik xatolarsiz test qilish',
    focusRu: 'корректное A/B тестирование ценовых гипотез без статистических ошибок',
    primaryKpiUz: 'test variantlari bo‘yicha net profit uplift',
    primaryKpiRu: 'uplift чистой прибыли по тестовым вариантам',
    secretUz: 'Testni erta yopmang: kamida bir xil trafik sikli tugamasdan qaror chiqarmang.',
    secretRu: 'Не закрывайте тест слишком рано: решение только после полного сопоставимого цикла трафика.',
  },
  'Reklama platformasiga kirish': {
    focusUz: 'reklama kabinetidagi formatlar va maqsadlarni to‘g‘ri ulash',
    focusRu: 'правильная связка форматов и целей в рекламном кабинете',
    primaryKpiUz: 'formatlar bo‘yicha CPC/CTR farqi',
    primaryKpiRu: 'разница CPC/CTR по форматам',
    secretUz: 'Kabinetni birinchi haftada “o‘rganish rejimi”da ishlating, katta byudjetni keyin kengaytiring.',
    secretRu: 'В первую неделю ведите кабинет в режиме обучения и масштабируйте бюджет только после сигналов.',
  },
  'Kampaniya yaratish': {
    focusUz: 'maqsadga mos kampaniya strukturasi va segmentatsiya',
    focusRu: 'структура кампании и сегментация под конкретную цель',
    primaryKpiUz: 'kampaniya maqsadiga mos konversiya qiymati',
    primaryKpiRu: 'стоимость конверсии относительно цели кампании',
    secretUz: 'Bitta kampaniyada hamma SKU ni aralashtirmang, intentga qarab ajrating.',
    secretRu: 'Не смешивайте все SKU в одной кампании — делите по intent аудитории.',
  },
  'Byudjet boshqaruvi': {
    focusUz: 'kunlik limit va pacing orqali byudjetni samarali taqsimlash',
    focusRu: 'эффективное распределение бюджета через дневные лимиты и pacing',
    primaryKpiUz: 'kunlik byudjetdan foydali spend ulushi',
    primaryKpiRu: 'доля эффективного расхода в дневном бюджете',
    secretUz: 'Byudjetni “winner SKU” va “exploration SKU”ga bo‘lib yuritish natijani tezlashtiradi.',
    secretRu: 'Разделение бюджета на winner SKU и exploration SKU ускоряет результат.',
  },
  'Keyword va targeting': {
    focusUz: 'kalit so‘z niyati va auditoriya qatlamiga mos targeting',
    focusRu: 'таргетинг по намерению ключевых слов и слоям аудитории',
    primaryKpiUz: 'kalit so‘z kesimida CR va CPA',
    primaryKpiRu: 'CR и CPA в разрезе ключевых слов',
    secretUz: 'Negativ keyword ro‘yxatini haftalik yangilash reklama oqishini kesadi.',
    secretRu: 'Еженедельное обновление списка негативных ключей резко снижает утечки бюджета.',
  },
  'Kreativ va CTR': {
    focusUz: 'kreativlarda birinchi 2 soniyada e’tibor va foydani berish',
    focusRu: 'передача выгоды и внимания в первые 2 секунды креатива',
    primaryKpiUz: 'kreativ variantlar bo‘yicha CTR uplift',
    primaryKpiRu: 'CTR uplift по вариантам креативов',
    secretUz: 'Kreativ testida bitta elementni almashtiring, aks holda qaysi detal ishlaganini bilmaysiz.',
    secretRu: 'В тесте креатива меняйте только один элемент, иначе не поймете источник роста.',
  },
  'ROAS va samaradorlik': {
    focusUz: 'ROASni sof foyda bilan bog‘lab real samaradorlikni o‘lchash',
    focusRu: 'измерение ROAS в связке с чистой прибылью',
    primaryKpiUz: 'profit-based ROAS',
    primaryKpiRu: 'ROAS с учетом прибыли',
    secretUz: 'Faqat ROASga qarab o‘chirish qilmang, LTV yuqori segmentlarni alohida ko‘ring.',
    secretRu: 'Не отключайте кампании только по ROAS — сегменты с высоким LTV оценивайте отдельно.',
  },
  'Kampaniya optimizatsiyasi': {
    focusUz: 'samarsiz segmentlarni kesib, winner segmentlarni scale qilish',
    focusRu: 'отсечение неэффективных сегментов и масштабирование winner-сегментов',
    primaryKpiUz: 'optimizatsiyadan keyingi CPA pasayishi',
    primaryKpiRu: 'снижение CPA после оптимизации',
    secretUz: 'Optimallashtirishda “pauza” va “stop”ni ajrating: vaqtincha past segmentni keyin qayta test qiling.',
    secretRu: 'Разделяйте pause и stop: временно слабые сегменты стоит перетестировать позже.',
  },
  'Ombor modelini tanlash': {
    focusUz: 'FBO/FBS (yoki analog) modelini mahsulot xususiyatiga mos tanlash',
    focusRu: 'выбор модели FBO/FBS (или аналога) под характеристики товара',
    primaryKpiUz: 'logistika xarajati / buyurtma',
    primaryKpiRu: 'логистическая стоимость на заказ',
    secretUz: 'Bir modelga yopishib qolmang: SKU tipiga qarab gibrid model ko‘proq foyda beradi.',
    secretRu: 'Не зацикливайтесь на одной модели: гибрид по типам SKU часто выгоднее.',
  },
  'Qoldiq va replenishment': {
    focusUz: 'stockoutni oldini oladigan replenishment siklini qurish',
    focusRu: 'построение цикла пополнения без stockout',
    primaryKpiUz: 'stock cover days',
    primaryKpiRu: 'дни покрытия остатка',
    secretUz: 'Top SKU uchun “qizil chiziq” qoldiq limitini alohida qo‘ying va auto-alert ishlating.',
    secretRu: 'Для top SKU задайте отдельный красный порог остатка и включите auto-alert.',
  },
  'Yetkazib berish SLA': {
    focusUz: 'tez yetkazish va servis sifatini SLA orqali boshqarish',
    focusRu: 'управление скоростью доставки и качеством сервиса через SLA',
    primaryKpiUz: 'o‘rtacha yetkazish vaqti',
    primaryKpiRu: 'среднее время доставки',
    secretUz: 'SLA buziladigan hududlarni ajratib, ularga alohida logistika strategiyasi qo‘ying.',
    secretRu: 'Выделяйте регионы с просадкой SLA и применяйте к ним отдельную логистическую стратегию.',
  },
  'Qaytarish va nuqson': {
    focusUz: 'qaytarish sabablarini ildizida yopish va brakni pasaytirish',
    focusRu: 'закрытие причин возвратов на корневом уровне и снижение брака',
    primaryKpiUz: 'qaytarish ulushi va sabablar top-3',
    primaryKpiRu: 'доля возвратов и top-3 причин',
    secretUz: 'Qaytarish kommentlarini kodlash tizimi qilsangiz, mahsulot muammosini 2 haftada topasiz.',
    secretRu: 'Если кодировать комментарии возвратов, корневую проблему товара можно найти за 2 недели.',
  },
  'KPI va dashboard': {
    focusUz: 'qaror uchun yetarli KPI panelini minimal, lekin aniq qurish',
    focusRu: 'построение минимального, но точного KPI-дашборда для решений',
    primaryKpiUz: 'dashboarddagi asosiy 6 KPI intizomi',
    primaryKpiRu: 'дисциплина 6 ключевых KPI в дашборде',
    secretUz: 'Dashboardda ortiqcha KPI ko‘payishi qarorni sekinlashtiradi; 6-8 ko‘rsatkich yetarli.',
    secretRu: 'Слишком много KPI тормозит решения; для управления обычно достаточно 6-8 метрик.',
  },
  'Konversiya tahlili': {
    focusUz: 'view-cart-order voronkasidagi yo‘qotish nuqtalarini topish',
    focusRu: 'поиск точек потерь во воронке view-cart-order',
    primaryKpiUz: 'view-to-cart va cart-to-order konversiya',
    primaryKpiRu: 'конверсия view-to-cart и cart-to-order',
    secretUz: 'Voronkadagi eng katta oqish nuqtasini topib, faqat o‘sha joyni tuzating.',
    secretRu: 'Найдите крупнейшую утечку в воронке и исправляйте сначала только ее.',
  },
  'Assortiment tahlili': {
    focusUz: 'SKU portfelini ABC/XYZ mantiqida boshqarish',
    focusRu: 'управление SKU-портфелем по логике ABC/XYZ',
    primaryKpiUz: 'SKU kesimida daromad ulushi',
    primaryKpiRu: 'доля выручки по SKU',
    secretUz: 'Assortimentni “qahramon SKU” va “support SKU”ga bo‘lsangiz boshqaruv soddalashadi.',
    secretRu: 'Разделение ассортимента на hero SKU и support SKU делает управление намного проще.',
  },
  'Mavsumiy va regional tahlil': {
    focusUz: 'hudud va mavsum farqiga mos reja bilan sotuvni barqarorlashtirish',
    focusRu: 'стабилизация продаж через план по регионам и сезонности',
    primaryKpiUz: 'regionlar bo‘yicha konversiya farqi',
    primaryKpiRu: 'разница конверсии по регионам',
    secretUz: 'Mavsum oldidan 4-6 hafta avval tayyorlangan zaxira eng katta ustunlik beradi.',
    secretRu: 'Подготовленный за 4-6 недель до сезона запас дает максимальное преимущество.',
  },
  'O‘sish gipotezalari': {
    focusUz: 'gipotezalarni tez testlab ishlaydiganlarini scale qilish',
    focusRu: 'быстрое тестирование гипотез и масштабирование рабочих',
    primaryKpiUz: 'test-to-win ratio',
    primaryKpiRu: 'коэффициент test-to-win',
    secretUz: 'Gipotezani 7 kun ichida tekshirib bo‘lmasa, uni yana qisqartirib test qiling.',
    secretRu: 'Если гипотезу нельзя проверить за 7 дней, дробите ее на более короткий тест.',
  },
  'Scaling rejasi': {
    focusUz: 'operatsion va moliyaviy cheklovlarni hisobga olib bosqichma-bosqich scaling',
    focusRu: 'поэтапное масштабирование с учетом операционных и финансовых ограничений',
    primaryKpiUz: 'scaling davridagi cash conversion cycle',
    primaryKpiRu: 'cash conversion cycle в период масштабирования',
    secretUz: 'Scale qilishdan oldin “nimani scale qilmaymiz” ro‘yxatini ham yozing.',
    secretRu: 'Перед масштабированием фиксируйте не только что увеличиваем, но и что не масштабируем.',
  },
  'Jamoa va rollar': {
    focusUz: 'rol va javobgarlikni aniq ajratib operatsiyani egadan mustaqillashtirish',
    focusRu: 'разделение ролей и ответственности для автономности операций',
    primaryKpiUz: 'rol bo‘yicha bajarilish SLA',
    primaryKpiRu: 'SLA исполнения по ролям',
    secretUz: 'RACI jadvali bo‘lmasa, jamoa o‘sishi bilan xatolar geometrik oshadi.',
    secretRu: 'Без RACI-матрицы ошибки растут геометрически вместе с ростом команды.',
  },
  Avtomatizatsiya: {
    focusUz: 'takrorlanuvchi jarayonlarni avtomatlashtirib inson xatosini kamaytirish',
    focusRu: 'автоматизация повторяемых процессов и снижение человеческих ошибок',
    primaryKpiUz: 'avtomatlashtirilgan jarayon ulushi',
    primaryKpiRu: 'доля автоматизированных процессов',
    secretUz: 'Eng ko‘p vaqt olayotgan 20% jarayonni avtomatlashtirish umumiy samarani keskin oshiradi.',
    secretRu: 'Автоматизация 20% самых затратных по времени процессов резко повышает общую эффективность.',
  },
  'Brand va loyal mijoz': {
    focusUz: 'qayta xaridni oshiradigan brend va kommunikatsiya tizimini qurish',
    focusRu: 'построение бренда и коммуникации для роста повторных покупок',
    primaryKpiUz: 'repeat purchase rate',
    primaryKpiRu: 'доля повторных покупок',
    secretUz: 'Loyal mijoz uchun post-purchase aloqa ssenariysi bo‘lsa, reklamasiz sotuv oshadi.',
    secretRu: 'Сценарий post-purchase коммуникации повышает продажи даже без дополнительной рекламы.',
  },
  'Yangi kategoriya ochish': {
    focusUz: 'mavjud tajribani yangi toifaga xatarsiz ko‘chirish',
    focusRu: 'безрисковый перенос текущей экспертизы в новую категорию',
    primaryKpiUz: 'yangi kategoriya payback muddati',
    primaryKpiRu: 'срок payback новой категории',
    secretUz: 'Yangi kategoriyani eski infratuzilma bilan “adjacent move” tarzida oching.',
    secretRu: 'Запускайте новую категорию как adjacent move на базе существующей инфраструктуры.',
  },
  'Cross-platform kengayish': {
    focusUz: 'Uzum va Yandexda bir vaqtning o‘zida sinxron o‘sish tizimini qurish',
    focusRu: 'построение синхронного роста в Uzum и Yandex одновременно',
    primaryKpiUz: 'platformalar bo‘yicha bir xil SKU rentabelligi',
    primaryKpiRu: 'сопоставимая рентабельность SKU по платформам',
    secretUz: 'Cross-platformda birinchi navbatda kontent va narx standarti bir xil bo‘lishi kerak.',
    secretRu: 'В cross-platform первым делом выравнивайте стандарты контента и цены.',
  },
}

function getTopicSeed(title: string, titleRu: string): TopicSeed {
  const byTitle = topicSeeds[title]
  if (byTitle) return byTitle

  return {
    focusUz: `${title} bo‘yicha asosiy operatsion nuqtani topib, uni raqam bilan boshqarish`,
    focusRu: `по теме ${titleRu} найти ключевой операционный рычаг и управлять им по цифрам`,
    primaryKpiUz: `${title} bo‘yicha asosiy natija ko‘rsatkichi`,
    primaryKpiRu: `ключевой итоговый KPI по теме ${titleRu}`,
    secretUz: `${title} mavzusida eng katta ustunlik - qarorlarni taxmin bilan emas, test va jurnal bilan yuritish.`,
    secretRu: `Главное преимущество в теме ${titleRu} - управлять решениями не догадками, а тестами и журналом изменений.`,
  }
}

function buildLongNarrative(moduleNum: number, title: string, seed: TopicSeed): { uz: string[]; ru: string[] } {
  const baseUz = [
    `${title} bo‘yicha professional yondashuv shundan boshlanadi: siz bu mavzuni alohida vazifa deb emas, butun savdo tizimining bir bo‘lagi deb ko‘rishingiz kerak. Bu darsning markaziy nuqtasi: ${seed.focusUz}. Qarorlar “tez natija” asosida emas, butun zanjirga ta’siri bilan tekshiriladi.`,
    `Yana bir muhim tamoyil: marketplace ichida tezkor harakat qilish foydali, lekin tartibsiz tezlik zarar keltiradi. Sizda kuzatuv jadvali, test jurnali va aniq versiya nazorati bo‘lmasa, qaysi o‘zgarish natija berganini bilolmaysiz. Kuchli sotuvchilar intuisiya bilan emas, hujjatlashtirilgan takrorlanadigan tizim bilan yutadi. Har darsdagi tavsiyalarni bir martalik ish deb emas, keyin jamoaga topshirsa ham ishlaydigan standart deb tasavvur qiling.`,
    `Bu mavzuda chuqur ishlashning siri - ikkinchi darajali signallarni kuzatishda. Bu dars uchun asosiy signal: ${seed.primaryKpiUz}. Agar siz shu signalni intizom bilan haftalik kuzatsangiz, 30-60 kunlik natijani oldindan bashorat qilish osonlashadi.`,
  ]
  const baseRu = [
    `Профессиональный подход к теме ${title} начинается с правильного взгляда: это не отдельная задача, а часть всей системы продаж. Центральный фокус урока: ${seed.focusRu}. Решения проверяются не по эмоциям, а по влиянию на всю модель.`,
    `Второй важный принцип: в маркетплейсах скорость полезна, но хаотичная скорость вредна. Если у вас нет таблицы наблюдения, журнала тестов и контроля версий, вы не поймете, какое изменение реально дало результат. Сильные продавцы выигрывают не интуицией, а документированной повторяемой системой. Воспринимайте рекомендации урока не как разовую задачу, а как стандарт, который сможет выполнять и команда.`,
    `Еще один скрытый слой сильной работы - внимание к сигналам второго порядка. В этом уроке ключевой сигнал: ${seed.primaryKpiRu}. Если отслеживать его дисциплинированно каждую неделю, можно заранее видеть динамику бизнеса на 30-60 дней вперед.`,
  ]

  if (moduleNum === 2) {
    return {
      uz: [
        `${title}da eng katta pul noto‘g‘ri mahsulot tanlashda yo‘qotiladi. Odatda yangi sotuvchi trend ko‘rib hayajon bilan kiradi, lekin real xarajatlarni, supply chain riskini va bozorning to‘yinmagan yoki to‘yinganligini to‘liq baholamaydi. Natijada sotuv bo‘lsa ham, pul aylanmaydi yoki kapital uzoq muddatga muzlab qoladi. Shu sabab bu modulda asosiy maqsad “nima sotiladi?” emas, “nimani sotish xavfsiz va foydali?” degan savolga javob topishdir.`,
        `Yetkazib beruvchi, MOQ, yetib kelish muddati, brak xavfi, qadoqlash sifati va qayta buyurtma tezligi mahsulot tanlashning ajralmas qismi hisoblanadi. Agar siz faqat marjani ko‘rsangiz, lekin logistika yoki quality riskni ko‘rmasangiz, model noto‘g‘ri quriladi. Kuchli sotuvchi foydali mahsulotni emas, boshqariladigan mahsulotni tanlaydi: ya’ni talab bor, raqobatni tushunsa bo‘ladi, sifat nazorat qilinadi va qayta to‘ldirish ritmi barqaror.`,
        `Bu modul bo‘yicha yana bir pro yondashuv: mahsulotni alohida buyum sifatida emas, kelajakdagi assortiment yadrosi sifatida ko‘ring. Bitta SKU muvaffaqiyatli bo‘lsa, undan keyingi 3-5 ta qo‘shimcha variantni ochish qanchalik oson bo‘ladi? Rangi, o‘lchami, bundle varianti, premium va budget liniyasi bormi? Shuni oldindan ko‘rsangiz, bir mahsulotdan butun kategoriya iqtisodiyotini qurishingiz mumkin bo‘ladi.`,
      ],
      ru: [
        `В теме ${title} самые большие потери происходят из-за неверного выбора товара. Часто новый продавец видит тренд и входит эмоционально, не оценивая полную структуру затрат, риски supply chain и насыщенность рынка. В результате продажи могут быть, но деньги не оборачиваются или капитал замораживается надолго. Поэтому главный вопрос модуля не «что продается?», а «что безопасно и прибыльно продавать?».`,
        `Поставщик, MOQ, сроки доставки, риск брака, качество упаковки и скорость повторного заказа - это не отдельные задачи, а часть выбора товара. Если вы видите только маржу, но не учитываете логистику и quality risk, модель будет ошибочной. Сильный продавец выбирает не просто прибыльный товар, а управляемый товар: на него есть спрос, конкуренция понятна, качество контролируется, а пополнение идет стабильно.`,
        `Еще один профессиональный подход в этом модуле - смотреть на товар не как на одну позицию, а как на ядро будущего ассортимента. Если один SKU взлетит, насколько легко на его базе запустить еще 3-5 вариантов? Есть ли цвета, размеры, bundle, premium и budget линейки? Если думать так заранее, из одного товара можно построить экономику целой категории.`,
      ],
    }
  }

  return { uz: baseUz, ru: baseRu }
}

function buildAuditQuestions(title: string, titleRu: string, seed: TopicSeed): { uz: string[]; ru: string[] } {
  return {
    uz: [
      `${title} bo‘yicha hozir eng katta tor joy qayerda va bu joy ${seed.primaryKpiUz}ga qanday ta’sir qilyapti?`,
      'Qaysi qaror raqam bilan tasdiqlangan, qaysi qaror esa faqat taxmin asosida qilingan?',
      'Agar bugun shu jarayonni jamoa a’zosiga topshirish kerak bo‘lsa, yozilgan standart yetarlimi?',
      'Oxirgi 14 kunda aynan qaysi o‘zgarish natija berganini aniq ayta olasizmi?',
      `Mijoz nuqtai nazaridan qaraganda, ${seed.focusUz} bo‘yicha eng katta ishonchsizlik sababi nima?`,
    ],
    ru: [
      `Где сейчас главное узкое место по теме ${titleRu} и как оно влияет на ${seed.primaryKpiRu}?`,
      'Какие решения подтверждены цифрами, а какие приняты только на предположениях?',
      'Если сегодня передать этот процесс сотруднику, достаточно ли прописан стандарт?',
      'Можете ли вы точно назвать, какое изменение за последние 14 дней дало результат?',
      `Если смотреть глазами клиента, в чем главная причина недоверия в части: ${seed.focusRu}?`,
    ],
  }
}

function buildScriptSection(moduleNum: number, title: string, titleRu: string, seed: TopicSeed): { uzTitle: string; ruTitle: string; uzItems: string[]; ruItems: string[] } {
  if (moduleNum === 2 && /Yetkazib beruvchi|supplier/i.test(title)) {
    return {
      uzTitle: 'Yetkazib beruvchi bilan gaplashish skripti',
      ruTitle: 'Скрипт переговоров с поставщиком',
      uzItems: [
        'Salom, men marketplace uchun uzoq muddatli hamkor qidiryapman. Avval kichik test partiya bilan boshlaymiz, keyin barqaror buyurtmaga o‘tamiz.',
        'Menga 3 ta asosiy ma’lumot kerak: MOQ, ishlab chiqarish muddati va brak bo‘lsa kompensatsiya tartibi.',
        'Agar birinchi partiya yaxshi o‘tsa, keyingi buyurtmalarda hajmni oshiramiz. Shu sabab men uchun sifatning barqarorligi narxdan ham muhim.',
        'Qadoqlash, markirovka va video/photo proof bera olasizmi? Marketplace’da qaytarish xavfini kamaytirish uchun bu majburiy.',
      ],
      ruItems: [
        'Здравствуйте, я ищу долгосрочного поставщика для маркетплейса. Сначала начинаем с маленькой тестовой партии, затем переходим к стабильным заказам.',
        'Мне нужны 3 ключевых параметра: MOQ, срок производства и порядок компенсации при браке.',
        'Если первая партия пройдет хорошо, мы увеличим объем. Поэтому для меня стабильность качества важнее разовой низкой цены.',
        'Сможете ли вы предоставить упаковку, маркировку и фото/видео proof? Для маркетплейса это критично, чтобы снизить возвраты.',
      ],
    }
  }

  return {
    uzTitle: 'Mavzu bo‘yicha amaliy skript',
    ruTitle: 'Практический скрипт по теме',
    uzItems: [
      `Avval ${title} bo‘yicha bugungi holatni yozib chiqing va “men aynan nimani yaxshilamoqchiman?” degan savolga bitta aniq javob bering.`,
      `Keyin asosiy fokus sifatida quyidagini belgilang: ${seed.focusUz}.`,
      'Keyin 2 ta tez va 1 ta chuqur gipoteza tanlang: bittasi darhol natija uchun, bittasi barqaror o‘sish uchun, bittasi tizimni mustahkamlash uchun.',
      `Har o‘zgarishdan oldin va keyin ${seed.primaryKpiUz}ni yozing; fakt bo‘lmasa, qaror qabul qilmang.`,
      'Ishlagan yechimni SOP yoki playbook ko‘rinishiga olib keling, shunda dars natijasi keyingi SKUlarda ham ishlaydi.',
    ],
    ruItems: [
      `Сначала зафиксируйте текущее состояние по теме ${titleRu} и дайте один точный ответ на вопрос: «что именно я хочу улучшить?»`,
      `Затем зафиксируйте главный фокус урока: ${seed.focusRu}.`,
      'Затем выберите 2 быстрые и 1 глубокую гипотезу: одна для немедленного эффекта, одна для стабильного роста, одна для укрепления системы.',
      `До и после каждого изменения фиксируйте ${seed.primaryKpiRu}; без факта не принимайте решение.`,
      'Рабочее решение переводите в SOP или playbook, чтобы результат урока масштабировался и на другие SKU.',
    ],
  }
}

function buildTopicDetails(
  moduleNum: number,
  title: string,
  titleRu: string,
  summaryUz: string,
  summaryRu: string,
  platform: 'uzum' | 'yandex',
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
  const seed = getTopicSeed(title, titleRu)
  const platformSecretUz =
    platform === 'uzum'
      ? 'Uzum ichida bu mavzuda tez natija uchun avval ichki qidiruv va katalog mosligini tekshiring.'
      : 'Yandex ichida bu mavzuda tez natija uchun segmentlangan analitika kesimida qaror qiling.'
  const platformSecretRu =
    platform === 'uzum'
      ? 'В Uzum для быстрого результата по теме сначала проверяйте соответствие каталогу и внутреннему поиску.'
      : 'В Yandex для быстрого результата принимайте решения на сегментированной аналитике.'

  const base = {
    deepDiveUz: `${title} mavzusida asosiy maqsad: ${seed.focusUz}. ${summaryUz}. Har qarorni sonlar bilan tekshirishingiz kerak.`,
    deepDiveRu: `Ключевая цель урока ${titleRu}: ${seed.focusRu}. ${summaryRu}. Все решения должны проверяться цифрами.`,
    theoryUz: [
      `${title} bo‘yicha strategiya: avval eng katta ta’sir beradigan nuqtani toping - ${seed.focusUz}.`,
      `Operatsiya: jarayonni SOPga tushiring, mas’ul va muddatlarni yozing, keyin haftalik revyu qiling.`,
      `Nazorat: asosiy KPI sifatida ${seed.primaryKpiUz}ni doimiy kuzating va chetga chiqishlarga tez javob bering.`,
      'Masshtab: ishlagan yondashuvni boshqa SKUlarga ko‘chirishdan oldin kichik pilot orqali tekshiring.',
    ],
    theoryRu: [
      `Стратегия по теме ${titleRu}: сначала определите главный рычаг - ${seed.focusRu}.`,
      'Операции: зафиксируйте процесс в SOP, назначьте ответственного и срок, затем делайте недельный ревью.',
      `Контроль: как основной KPI используйте ${seed.primaryKpiRu} и быстро реагируйте на отклонения.`,
      'Масштаб: перед переносом на другие SKU сначала подтвердите подход на маленьком пилоте.',
    ],
    stepsUz: [
      `Start nuqtani yozing: ${seed.primaryKpiUz}ning bugungi holatini bazaviy qilib oling.`,
      'Bitta asosiy maqsad qo‘ying va unga bog‘langan 2-3 ta KPI tanlang.',
      `Mavzuga oid asosiy fokusni kiriting: ${seed.focusUz}.`,
      'O‘zgarishlarni ketma-ket test qiling, bir vaqtda hammasini almashtirmang.',
      'Har 48 soatda natijani qayta ko‘rib chiqib, samarasiz ishlarni to‘xtating.',
      'Ishlagan usulni standartga aylantirib, boshqa SKUlarga nusxa qiling.',
    ],
    stepsRu: [
      `Зафиксируйте старт: текущее значение ${seed.primaryKpiRu}.`,
      'Поставьте одну главную цель и выберите 2-3 KPI, привязанные к ней.',
      `Внедрите главный фокус по теме: ${seed.focusRu}.`,
      'Тестируйте изменения последовательно, а не все сразу.',
      'Каждые 48 часов пересматривайте результат и отключайте слабые решения.',
      'Рабочий подход превращайте в стандарт и масштабируйте на другие SKU.',
    ],
    metricsUz: [
      `${seed.primaryKpiUz}`,
      `${title} bo‘yicha jarayon tezligi (cycle time)`,
      'Xatolar ulushi va qayta ishlash soni',
      'Sof foydaga real ta’sir',
    ],
    metricsRu: [
      `${seed.primaryKpiRu}`,
      `Скорость процесса по теме ${titleRu} (cycle time)`,
      'Доля ошибок и количество доработок',
      'Реальное влияние на чистую прибыль',
    ],
    formulasUz: [
      `Asosiy formula: ${seed.primaryKpiUz}ni haftalik kesimda oldingi davr bilan taqqoslash`,
      'Brutto foyda = Sotuv narxi - (tannarx + komissiya + logistika + reklama)',
      'Konversiya (%) = Buyurtmalar soni / Ko‘rishlar soni * 100',
      'Haqiqiy marja (%) = Sof foyda / Tushum * 100',
    ],
    formulasRu: [
      `Ключевая формула: сравнение ${seed.primaryKpiRu} по неделям`,
      'Валовая прибыль = Цена продажи - (себестоимость + комиссия + логистика + реклама)',
      'Конверсия (%) = Кол-во заказов / Кол-во просмотров * 100',
      'Фактическая маржа (%) = Чистая прибыль / Выручка * 100',
    ],
    caseUz: [
      `Holat: ${title} bo‘yicha natija past, chunki ${seed.focusUz} aniq boshqarilmagan.`,
      `Qaror: bir haftalik sprintda faqat ${seed.primaryKpiUz}ga ta’sir qiluvchi o‘zgarishlar kiritildi.`,
      'Natija: ijobiy dinamikada yechim SOPga aylantirildi, salbiy holatda keyingi gipoteza ishga tushirildi.',
    ],
    caseRu: [
      `Ситуация: результат по теме ${titleRu} низкий, так как не управляется ключевой фокус: ${seed.focusRu}.`,
      `Решение: в недельном спринте внесены изменения только в то, что влияет на ${seed.primaryKpiRu}.`,
      'Результат: при положительной динамике решение переведено в SOP, при слабом результате запущена новая гипотеза.',
    ],
    assignmentUz: [
      '1 ta SKU yoki 1 jarayon tanlang va bazaviy ko‘rsatkichlarni jadvalga kiriting.',
      `Asosiy KPI sifatida ${seed.primaryKpiUz}ni tanlab, 7 kunlik maqsad qo‘ying.`,
      'Ushbu dars bo‘yicha 3 ta gipoteza yozing: tez natija, o‘rta muddat, uzoq muddat.',
      'Har kun uchun aniq amaliy qadam va tekshiruv mezoni yozing.',
      'Sprint yakunida post-mortem yozing: nima ishladi, nima ishlamadi, keyingi qadam.',
    ],
    assignmentRu: [
      'Выберите 1 SKU или 1 процесс и внесите базовые метрики в таблицу.',
      `Возьмите ${seed.primaryKpiRu} как главный KPI и поставьте цель на 7 дней.`,
      'Сформулируйте 3 гипотезы по уроку: быстрый результат, средний срок, долгий срок.',
      'Пропишите конкретные ежедневные шаги и критерий проверки.',
      'В конце спринта оформите post-mortem: что сработало, что нет, следующий шаг.',
    ],
    mistakesUz: `Eng katta xato: ${seed.focusUz} o‘rniga ikkinchi darajali ishlar bilan band bo‘lib qolish.`,
    mistakesRu: `Главная ошибка: вместо ${seed.focusRu} команда уходит во второстепенные действия.`,
    secretsUz: [
      seed.secretUz,
      platformSecretUz,
      `${title} bo‘yicha ishlagan yechimni 3 ta qoidaga qisqartirib jamoaga standart sifatida bering.`,
    ],
    secretsRu: [
      seed.secretRu,
      platformSecretRu,
      `Сведите рабочее решение по теме ${titleRu} к 3 простым правилам и передайте в командный стандарт.`,
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
  platform: 'uzum' | 'yandex',
  platformLabelUz: string,
  platformLabelRu: string,
  summaryUz: string,
  summaryRu: string,
  platformSpecificUz: string,
  platformSpecificRu: string,
): LessonBlock[] {
  const seed = getTopicSeed(title, titleRu)
  const details = buildTopicDetails(moduleNum, title, titleRu, summaryUz, summaryRu, platform)
  const narrative = buildLongNarrative(moduleNum, title, seed)
  const audit = buildAuditQuestions(title, titleRu, seed)
  const script = buildScriptSection(moduleNum, title, titleRu, seed)

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
    ...narrative.uz.map((text, index) => ({
      type: 'p' as const,
      text,
      textRu: narrative.ru[index],
    })),
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
      text: script.uzTitle,
      textRu: script.ruTitle,
    },
    {
      type: 'ol',
      items: script.uzItems,
      itemsRu: script.ruItems,
    },
    {
      type: 'h3',
      text: 'Ichki audit savollari',
      textRu: 'Вопросы для внутреннего аудита',
    },
    {
      type: 'ul',
      items: audit.uz,
      itemsRu: audit.ru,
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
    readTime: '50 daqiqa',
    platform,
    blocks: buildLessonBlocks(
      moduleNum,
      title,
      titleRu,
      platform,
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
