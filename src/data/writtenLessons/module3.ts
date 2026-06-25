import type { WrittenModule } from './types'
import { lesson, intro, h2, h3, ul, ol, tip, warning, nextStep } from './helpers'

export const module3: WrittenModule = {
  num: 3,
  slug: 'modul-3',
  title: 'Kartochka va SEO optimizatsiya',
  titleRu: 'Карточка и SEO оптимизация',
  desc: 'Mahsulot kartochkasi yaratish, sarlavha, rasm, kalit so\'zlar va konversiya optimizatsiyasi.',
  descRu: 'Создание карточки товара, заголовок, фото, ключевые слова и оптимизация конверсии.',
  lessonCount: 10,
  hours: 4,
  available: true,
  lessons: [
    lesson(
      'dars-1',
      3,
      1,
      'Mahsulot kartochkasi yaratish',
      'Создание карточки товара',
      'uzum',
      '20 daqiqa',
      [
        intro(
          'Mahsulot kartochkasi — xaridorning sizning mahsulotingiz bilan birinchi uchrashuvi. Uzum Marketda to\'liq va sifatli kartochka moderatsiyadan o\'tadi, qidiruvda ko\'rinadi va sotadi. Yomon kartochka — nol sotuv.',
        ),
        h2('Kartochka tuzilmasi'),
        ul([
          'Kategoriya va podkategoriya — aniq tanlash',
          'Sarlavha — qidiruv va ko\'rinish uchun',
          'Tavsif — matn va struktura',
          'Rasmlar — minimum 5 ta, oq fon',
          'Atributlar — rang, o\'lcham, material, brend',
          'Narx va qoldiq — real vaqt yangilanishi',
          'Shtrix-kod (EAN) — FBO uchun tavsiya',
        ]),
        h2('seller.uzum.uz da yaratish'),
        ol([
          'Kabinet → «Mahsulotlar» → «Yangi mahsulot qo\'shish»',
          'Kategoriyani qidiruv orqali toping',
          'Majburiy maydonlarni to\'ldiring (qizil yulduzcha)',
          'Rasmlarni yuklang — format JPG/PNG, min 800×800 px',
          'Narx va ombor miqdorini kiriting',
          '«Moderatsiyaga yuborish»',
        ]),
        h3('FBO vs FBS kartochka farqi'),
        ul([
          'FBO — qoldiq Uzum omborida, «Tez yetkazish» yorlig\'i',
          'FBS — qoldiq sizda, yetkazish vaqti uzoqroq bo\'lishi mumkin',
          'Bir kartochka — ikkala sxemada ham bo\'lishi mumkin (qoldiq alohida)',
        ]),
        warning(
          'Brend mahsulotlari uchun ruxsatnoma yoki distribyutorlik hujjati talab qilinishi mumkin. Hujjatsiz kartochka rad etiladi yoki bloklanadi.',
        ),
        h2('Moderatsiya vaqti va xatolar'),
        ul([
          'Odatda 24–48 soat',
          '«Kategoriya noto\'g\'ri» — qayta tanlang',
          '«Rasm sifati past» — yuqori aniqlik, oq fon',
          '«Taqiqlangan so\'z» — sarlavha va tavsifni tekshiring',
        ]),
        tip(
          'Birinchi kartochkani yaratishdan oldin kategoriyadagi top-3 raqobatchi kartochkasini ochib, qaysi maydonlar to\'ldirilganini ko\'chiring — bu standartni tushunishga yordam beradi.',
        ),
        nextStep(
          'Keyingi dars — sarlavha va tavsif yozish: qidiruvda chiqish va xaridorni sotib olishga undash.',
        ),
      ],
    ),
    lesson(
      'dars-2',
      3,
      2,
      'Sarlavha va tavsif yozish',
      'Написание заголовка и описания',
      'uzum',
      '19 daqiqa',
      [
        intro(
          'Sarlavha — qidiruv algoritmi va xaridor birinchi ko\'radigan matn. Uzum Marketda 60–120 belgi optimal; asosiy kalit so\'z boshda, brend va model aniq.',
        ),
        h2('Sarlavha formulasi'),
        intro(
          'Formula: [Asosiy kalit so\'z] + [Brend/Model] + [Asosiy xususiyat] + [O\'lcham/Rang]. Misol: «Silikon telefon qoplamasi iPhone 15 Pro Max qora slim».',
        ),
        ul([
          'Lotin alifbosida — o\'zbek xaridorlari shunday qidiradi',
          'Raqam va model aniq — «15 Pro Max», «128 GB»',
          'Superlativlar cheklang — «eng yaxshi», «№1» taqiqlanishi mumkin',
          'Bosh harf — faqat brend nomida',
        ]),
        h2('Tavsif strukturasi'),
        ol([
          '1-abzas: mahsulot nima va kimga mos',
          '2-abzas: asosiy afzalliklar (3–5 ta bullet)',
          '3-abzas: texnik xususiyatlar (material, o\'lcham, og\'irlik)',
          '4-abzas: qadoq tarkibi va kafolat',
          '5-abzas: ishlatish bo\'yicha qisqa ko\'rsatma',
        ]),
        h3('Bullet points (ro\'yxat)'),
        ul([
          'Har bir foyda — alohida qator',
          'Xaridor savollariga javob: «Nimadan?», «Qanday o\'lcham?», «Nima bilan keladi?»',
          'Emoji o\'rtacha — 2–3 ta yetarli',
        ]),
        warning(
          'Boshqa platforma havolalari, telefon raqam yoki «Telegramda yozing» kabi matnlar taqiqlangan. Faqat Uzum Market qoidalariga mos tavsif.',
        ),
        tip(
          'Sharhlarda tez-tez so\'raladigan savollarni tavsifga qo\'shing — keyingi xaridorlar savol bermaydi va qaytarish kamayadi.',
        ),
        h2('Tavsif namunasi (qisqa)'),
        intro(
          '«Bu silikon qoplama iPhone 15 Pro Max uchun yaratilgan. Yumshoq material telefonni zarb va tishdan himoya qiladi. Ichki qism mikrofiber — ekran tirnalmasin. 0.8 mm qalinlik — wireless zaryad ishlaydi. Qadoqda: 1 ta qoplama, quti.»',
        ),
        nextStep(
          'Keyingi dars — rasmlar va infografika: xaridorning «ko\'z bilan sotib olish» qadamini optimallashtirish.',
        ),
      ],
    ),
    lesson(
      'dars-3',
      3,
      3,
      'Rasmlar va infografika',
      'Фото и инфографика',
      'uzum',
      '21 daqiqa',
      [
        intro(
          'Rasmlar — kartochkada eng katta konversiya omili. Uzum Market talabi: oq yoki och fon, mahsulot markazda, yuqori aniqlik. Professional rasm — raqobatchidan ajralish.',
        ),
        h2('Rasm talablari'),
        ul([
          'Minimum 5 ta rasm, tavsiya 7–10 ta',
          'Birinchi rasm — asosiy ko\'rinish (front), oq fon',
          'O\'lcham: kamida 800×800 px, yaxshisi 1200×1200 px',
          'Format: JPG yoki PNG, hajm 500 KB–2 MB',
          'Mahsulot 80% kadrni egallashi kerak',
          'Suv belgisi, logo va matn cheklangan — faqat infografika rasmida',
        ]),
        h2('Rasm turlari ro\'yxati'),
        ol([
          '1-rasm: old tomondan to\'liq ko\'rinish',
          '2-rasm: orqa yoki boshqa burchak',
          '3-rasm: yon ko\'rinish yoki qalinlik',
          '4-rasm: detal yoki material yaqin plan',
          '5-rasm: o\'lcham yoki qo\'lda ushlash (masshtab)',
          '6-rasm: infografika — afzalliklar matn bilan',
          '7-rasm: qadoq tarkibi (flat lay)',
        ]),
        h3('Infografika'),
        intro(
          'Infografika — rasm ustida qisqa matn va ikonkalar. «Suv o\'tkazmaydi», «5000 mAh», «2 yil kafolat» kabi foydalarni vizual ko\'rsating. Canva yoki Figma shablonlari ishlating.',
        ),
        warning(
          'Internetdan o\'g\'irilgan rasmlar — moderatsiya rad etadi va huquqiy muammo. O\'z suratingiz yoki supplier dan ruxsat olingan foto ishlating.',
        ),
        h2('Suratga olish maslahatlari'),
        ul([
          'Tabiiy yorug\'lik yoki softbox — soya kam',
          'Tripod — aniqlik',
          'Oq fon: fotofon yoki qog\'oz',
          'Telefon kamerasi yetarli — tozalash va yoritish muhim',
        ]),
        tip(
          'A/B test: bir hafta oddiy rasm, keyin infografika qo\'shilgan rasm — qaysi konversiya yuqori ekanini seller.uzum.uz statistikasidan ko\'ring.',
        ),
        nextStep(
          'Keyingi dars — kalit so\'zlar va SEO: Uzum Market qidiruvida yuqori o\'rin olish.',
        ),
      ],
    ),
    lesson(
      'dars-4',
      3,
      4,
      'Kalit so\'zlar va SEO',
      'Ключевые слова и SEO',
      'uzum',
      '18 daqiqa',
      [
        intro(
          'SEO (Search Engine Optimization) — mahsulotingizni xaridor qidirgan so\'zlar bo\'yicha topilishini ta\'minlash. Uzum Market ichki qidiruv algoritmi sarlavha, tavsif, kategoriya va sotuv statistikasiga qarab ishlaydi.',
        ),
        h2('Kalit so\'z qayerdan topish?'),
        ul([
          'Uzum Market qidiruv satri — avtoto\'ldirish takliflari',
          'Raqobatchi sarlavhalari — qaysi so\'zlar takrorlanadi',
          'Google Trends — O\'zbekiston uchun (qo\'simcha)',
          'Xaridor sharhlari — qanday atama ishlatishadi',
        ]),
        h2('Kalit so\'z joylashtirish'),
        ol([
          'Asosiy kalit so\'z — sarlavha boshida',
          'Qo\'shimcha sinonimlar — tavsifda tabiiy tarzda',
          'Kategoriya va atributlar — algoritm uchun signal',
          'Brand + model — aniq qidiruvlar uchun',
        ]),
        h3('O\'zbek va rus aralash qidiruv'),
        intro(
          'Ba\'zi xaridorlar «чехол» deb ruscha qidiradi. Agar auditoriya ikkilamchi til ishlatsa, tavsifda qavs ichida rus sinonim qo\'yish mumkin — lekin sarlavha o\'zbek/lotin bo\'lsin.',
        ),
        warning(
          'Keyword stuffing — bir so\'zni 10 marta takrorlash algoritm jarimasi va rad etishga olib kelishi mumkin. Tabiiy matn yozing.',
        ),
        h2('SEO va sotuv signalari'),
        ul([
          'Yuqori konversiya — qidiruvda yuqoriroq',
          'Tez yetkazish (FBO) — filtrlarda ustun',
          'Yuqori reyting va ko\'p sharh — ishonch',
          'Barqaror qoldiq — «tugagan» mahsulot pastga tushadi',
        ]),
        tip(
          'Boost reklama SEO o\'rnini bosmaydi — organik optimizatsiya va reklama birga ishlaydi. Avval kartochkani SEO qiling, keyin Boost yoqing.',
        ),
        nextStep(
          'Keyingi dars — A/B test va optimizatsiya: qaysi o\'zgarish sotuvni oshiradi.',
        ),
      ],
    ),
    lesson(
      'dars-5',
      3,
      5,
      'A/B test va optimizatsiya',
      'A/B тест и оптимизация',
      'uzum',
      '17 daqiqa',
      [
        intro(
          'A/B test — bir xil mahsulotning ikki variantini (masalan, turli birinchi rasm yoki sarlavha) solishtirib, qaysi yaxshi ishlayotganini aniqlash. Uzum Marketda bu qo\'lda yoki vaqt bo\'yicha almashtirish orqali amalga oshiriladi.',
        ),
        h2('Nimani test qilish mumkin?'),
        ul([
          'Birinchi rasm — mahsulot vs infografika',
          'Sarlavha — kalit so\'z tartibi',
          'Narx — biroz past vs o\'rtacha (marja ruxsat bersa)',
          'Tavsif uzunligi — qisqa vs batafsil',
        ]),
        h2('Test metodologiyasi'),
        ol([
          'Faqat bitta elementni o\'zgartiring — aks holda sabab noma\'lum',
          'Kamida 7 kun yoki 100+ ko\'rish kuting',
          'Konversiya = buyurtmalar / ko\'rishlar × 100%',
          'G\'olib variantni qoldiring, mag\'lubni almashtiring',
          'Keyingi elementni test qiling',
        ]),
        h3('Statistika qayerda?'),
        intro(
          'seller.uzum.uz → Mahsulot → Statistika: ko\'rishlar, savatga qo\'shish, buyurtmalar. O\'zgarish sanasini eslab qoling — oldin/ keyin solishtiring.',
        ),
        warning(
          'Mavsumiy o\'zgarish (bayram, paydo) test natijasini buzishi mumkin. Muhim o\'zgarishlarni «oddiy» haftalarda test qiling.',
        ),
        h2('Optimizatsiya tsikli'),
        ul([
          'Haftalik: statistika ko\'rish',
          'Oylik: rasm yoki sarlavha yangilash',
          'Sharhlarni o\'qish — kartochkaga qo\'shish',
          'Raqobatchi yangilanishlarini kuzatish',
        ]),
        tip(
          'Konversiya 2%+ bo\'lsa — yaxshi kartochka. 1% dan past — avval rasm va sarlavhani yaxshilang, narxni tushirmang.',
        ),
        nextStep(
          'Uzum kartochka bo\'limi tugadi. Keyingi 5 ta dars Yandex Market kartochka talablari va optimizatsiyasi.',
        ),
      ],
    ),
    lesson(
      'dars-6',
      3,
      6,
      'Kartochka talablari',
      'Требования к карточке',
      'yandex',
      '20 daqiqa',
      [
        intro(
          'Yandex Market kartochkasi — qattiqroq standart: rus tilida to\'liq atributlar, katalogga mos kelish yoki yangi kartochka yaratish. Noto\'g\'ri to\'ldirish — moderatsiya rad yoki «skryta» holat.',
        ),
        h2('Kartochka turlari'),
        ul([
          'Mavjud katalog kartochkasiga ulanish — shtrix-kod orqali (eng tez)',
          'Yangi kartochka yaratish — yangi brend/model uchun',
          'Brend kartochkasi — brend huquqi tasdiqlangan bo\'lishi kerak',
        ]),
        h2('Majburiy elementlar'),
        ol([
          'Kategoriya — Yandex ierarxiyasida aniq',
          'Brend — ro\'yxatdan tanlash yoki yangi brend ariza',
          'Model nomi — rus tilida',
          'Barcha majburiy atributlar (rang, o\'lcham, material, hajm...)',
          'Rasmlar — min 1200×900 px',
          'Tavsif — rus tilida, imlo to\'g\'ri',
          'Oferta: narx, qoldiq, yetkazish muddati',
        ]),
        h3('FBY / FBS / DBS'),
        ul([
          'FBY — qoldiq Yandex omborida, «Плюс» yorlig\'i mumkin',
          'FBS — siz yuborasiz, ombor manzili aniq',
          'DBS — o\'z kuryer yoki shartnoma yetkazish',
        ]),
        warning(
          'Elektronika, kosmetika, bolalar mahsuloti uchun sertifikat (EAC, deklaratsiya) yuklash talab qilinadi. Kategoriya ro\'yxatini partner.yandex.ru dan tekshiring.',
        ),
        h2('Moderatsiya xatolari'),
        ul([
          '«Недостаточно данных» — atribut to\'ldiring',
          '«Неверная категория» — kategoriyani o\'zgartiring',
          '«Бренд не подтверждён» — hujjat yuklang',
          '«Качество фото» — yuqori aniqlik kerak',
        ]),
        tip(
          'Avval mavjud katalog kartochkasiga ulanishga harakat qiling — moderatsiya tezroq va xaridorlar allaqachon qidiradi.',
        ),
        nextStep(
          'Keyingi dars — sarlavha va atributlar: rus tilida to\'g\'ri nom va xususiyatlar.',
        ),
      ],
    ),
    lesson(
      'dars-7',
      3,
      7,
      'Sarlavha va atributlar',
      'Заголовок и атрибуты',
      'yandex',
      '19 daqiqa',
      [
        intro(
          'Yandex Marketda sarlavha ko\'pincha katalog tomonidan belgilanadi — siz model va atributlarni to\'g\'ri kiritasiz, tizim sarlavhani yig\'adi. Atribut xato — noto\'g\'ri qidiruv va qaytarish.',
        ),
        h2('Atributlar muhimligi'),
        intro(
          'Har kategoriyada majburiy va ixtiyoriy atributlar bor. Masalan, kiyim: pol, o\'lcham, rang, material, brend. Barcha majburiy maydonlar to\'ldirilmaguncha kartochka faol bo\'lmaydi.',
        ),
        h2('Rus tilida to\'g\'ri nom'),
        ul([
          'Professional tarjima — Google tarjima yetarli emas',
          'Brend nomi lotin — asl ko\'rinishda',
          'O\'lchamlar — Rossiya standarti (RU, EU, sm)',
          'Rang — ruscha: «чёрный», «белый», «синий»',
        ]),
        h3('Sarlavha tuzilishi (katalog)'),
        intro(
          'Yandex avtomatik: [Brend] + [Model] + [Asosiy xususiyat]. Sizning vazifangiz — model nomi va atributlarni aniq kiritish, takror va xato qilmaslik.',
        ),
        h2('Atribut to\'ldirish qoidalari'),
        ol([
          'Kategoriya shablonini oching — qaysi maydonlar majburiy',
          'Supplier ma\'lumotidan nusxa olmang — tekshiring',
          'O\'lcham jadvali bo\'lsa — tavsifga qo\'shing',
          'Ikki marta saqlang va moderatsiyaga yuboring',
        ]),
        warning(
          'Noto\'g\'ri o\'lcham atributi — eng ko\'p qaytarish sababi (kiyim, oyoq kiyim). O\'lcham jadvali majburiy qo\'shing.',
        ),
        tip(
          'Raqobatchi kartochkasidagi atributlarni ko\'ring — qaysi maydonlar to\'ldirilgan, qaysi ixtiyoriy maydonlar SEO ga yordam beradi.',
        ),
        nextStep(
          'Keyingi dars — rasm va video qo\'shish: Yandex Market vizual standartlari.',
        ),
      ],
    ),
    lesson(
      'dars-8',
      3,
      8,
      'Rasm va video qo\'shish',
      'Добавление фото и видео',
      'yandex',
      '21 daqiqa',
      [
        intro(
          'Yandex Market rasmlar uchun yuqori talab: aniqlik, fon, burchaklar. Video qo\'shilgan kartochkalar konversiyani 10–20% oshirishi mumkin (platforma ma\'lumotlariga qarab).',
        ),
        h2('Rasm talablari'),
        ul([
          'Minimum o\'lcham 1200×900 px',
          'Oq yoki och kulrang fon',
          'Birinchi rasm — mahsulot yolg\'iz, markazda',
          '6–10 ta rasm tavsiya etiladi',
          'Infografika — alohida slayd',
          'Watermark va reklama matni taqiqlangan',
        ]),
        h2('Rasm turlari'),
        ol([
          'Studiya — oq fon, barcha burchaklar',
          'Lifestyle — foydalanish konteksti (ixtiyoriy)',
          'Masshtab — o\'lcham ko\'rsatish',
          'Qadoq va komplekt',
          'Infografika — rus tilida matn',
        ]),
        h3('Video talablari'),
        ul([
          'Davomiylik: 15–60 soniya',
          'Format: MP4, yuqori sifatsiz emas',
          'Mahsulot ko\'rsatilishi — aylanish yoki foydalanish',
          'Rus tilida ovoz yoki subtitr (ixtiyoriy)',
        ]),
        warning(
          'Brend rasmlarini ruxsatsiz ishlatish — kartochka bloklanishi va shikoyat. O\'z kontent yoki litsenziyalangan material.',
        ),
        h2('Suratga olish va montaj'),
        ul([
          'Smartphone + tripod + softbox — boshlang\'ich uchun yetarli',
          'Video: sekin aylanish (turntable) yoki qo\'lda ko\'rsatish',
          'CapCut yoki DaVinci — qisqa montaj',
        ]),
        tip(
          'Video qo\'shishdan oldin rasmlar to\'liq bo\'lsin — video qo\'simcha, asos emas. Birinchi rasm hali ham eng muhim.',
        ),
        nextStep(
          'Keyingi dars — qidiruv optimizatsiyasi: Wordstat va Yandex Market ichki qidiruv.',
        ),
      ],
    ),
    lesson(
      'dars-9',
      3,
      9,
      'Qidiruv optimizatsiyasi',
      'Поисковая оптимизация',
      'yandex',
      '18 daqiqa',
      [
        intro(
          'Yandex Market qidiruvi Yandex qidiruv tizimi bilan bog\'langan. Kalit so\'zlar rus tilida, sarlavha va atributlarda; sotuv va reyting ham o\'rin belgilaydi.',
        ),
        h2('Wordstat dan foydalanish'),
        ol([
          'wordstat.yandex.ru — mahsulot nomi ruscha',
          'Oylik qidiruv hajmi — talab ko\'rsatkichi',
          'Bog\'liq so\'rovlar — qo\'simcha kalit so\'zlar',
          'Mavsumiylik — qaysi oylar pik',
        ]),
        h2('Kartochkada SEO'),
        ul([
          'Model nomida qidiruv so\'rovi bo\'lsin',
          'Tavsifda tabiiy kalit so\'zlar — rus tilida',
          'Barcha atributlar to\'liq — filtrlarda chiqish',
          'Brend tasdiqlangan — ishonch signali',
        ]),
        h3('Yandex Market filtrlari'),
        intro(
          'Xaridorlar narx, yetkazish, reyting bo\'yicha filtrlashadi. FBY + yuqori reyting + raqobatbardosh narx — filtrlardan o\'tish imkonini oshiradi.',
        ),
        warning(
          'Spam kalit so\'zlar tavsifda — moderatsiya rad. Yandex sifat algoritmlari buni aniqlaydi.',
        ),
        h2('Tashqi SEO'),
        ul([
          'Yandex Direct — to\'g\'ridan-to\'g\'ri kartochkaga trafik',
          'Ijtimoiy tarmoqlar — qo\'simcha ko\'rish',
          'Sharhlar — organik matn va ishonch',
        ]),
        tip(
          'partner.yandex.ru da «Поисковые запросы» hisoboti bo\'lsa — qaysi so\'rovlar sizning kartochkangizga olib kelganini ko\'ring va tavsifni shunga moslang.',
        ),
        nextStep(
          'Modulning oxirgi darsi — konversiya oshirish: buy box, reyting va A/B test Yandex Marketda.',
        ),
      ],
    ),
    lesson(
      'dars-10',
      3,
      10,
      'Konversiya oshirish',
      'Повышение конверсии',
      'yandex',
      '20 daqiqa',
      [
        intro(
          'Konversiya — ko\'rgan xaridorlarning qancha foizi sotib oladi. Yandex Marketda konversiyani oshirish: kartochka sifati, narx, yetkazish, reyting va «buy box» (asosiy taklif).',
        ),
        h2('Buy box nima?'),
        intro(
          'Bir xil mahsulotni bir nechta sotuvchi taklif qilganda, kartochkada asosiy ko\'rinadigan taklif — buy box egasi. Odatda: eng yaxshi narx + tez yetkazish (FBY) + yuqori reyting.',
        ),
        h2('Konversiya omillari'),
        ul([
          'Birinchi rasm va video — birinchi taassurot',
          'Narx — raqobatbardosh, lekin marja saqlangan',
          'Yetkazish — FBY 1–2 kun ustun',
          'Reyting 4.5+ va 10+ sharh',
          'To\'liq tavsif va o\'lcham jadvali',
          'Aksiya yorlig\'i — «Скидка» (marja ruxsat bersa)',
        ]),
        h2('A/B test Yandex Marketda'),
        ol([
          'Oferta narxini vaqt bo\'yicha o\'zgartirish (ehtiyotkorlik bilan)',
          'Rasm to\'plamini yangilash — statistikani kuzatish',
          'Tavsif qo\'simcha bullet — qaytarish kamaydimi?',
          'FBY ga o\'tkazish — yetkazish tezligi ta\'siri',
        ]),
        h3('Reyting va sharhlar'),
        ul([
          'Tez yetkazish va sifatli qadoq',
          'Sharhlarga javob — professional ton',
          'Muammoli buyurtmalarni hal qilish — 1 yulduz oldini olish',
        ]),
        warning(
          'Sun\'iy sharh yoki yulduz sotib olish — doimiy blok. Faqat haqiqiy xizmat orqali reyting oling.',
        ),
        tip(
          'Konversiya 1% dan past bo\'lsa — avval kartochka (rasm, tavsif, atribut), keyin narx. 2%+ — yaxshi natija, reklama byudjetini oshirish mumkin.',
        ),
        h2('Modul yakuni'),
        intro(
          '3-modul tugadi. Endi Uzum va Yandex Marketda professional kartochka yaratish, SEO va konversiya optimizatsiyasini bilasiz. Keyingi modul — narx va raqobat strategiyasi.',
        ),
        nextStep(
          'Amaliy vazifa: bitta mahsulot uchun to\'liq kartochka (rasm, sarlavha, tavsif, SEO) yarating va 7 kun statistikani kuzating.',
        ),
      ],
    ),
  ],
}
