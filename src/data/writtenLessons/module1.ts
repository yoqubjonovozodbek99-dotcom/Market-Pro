import type { WrittenModule } from './types'

export const module1: WrittenModule = {
  num: 1,
  slug: 'modul-1',
  title: 'Marketplace asoslari',
  titleRu: 'Основы маркетплейса',
  desc: 'Marketplace nima, Uzum va Yandex Marketda ro\'yxatdan o\'tish, magazin ochish va birinchi mahsulotni joylashtirish.',
  descRu: 'Что такое маркетплейс, регистрация, открытие магазина и размещение первого товара.',
  lessonCount: 8,
  hours: 3,
  available: true,
  lessons: [
    {
      id: 'dars-1',
      moduleNum: 1,
      lessonNum: 1,
      title: 'Marketplace nima va qanday ishlaydi?',
      titleRu: 'Что такое маркетплейс и как он работает?',
      readTime: '15 daqiqa',
      platform: 'both',
      blocks: [
        {
          type: 'p',
          text: 'Marketplace (onlayn bozor) — bu sotuvchilar va xaridorlarni bitta platformada birlashtiruvchi raqamli savdo maydoni. Oddiy internet-do\'kondan farqi shundaki, siz o\'z saytingizni yaratmasdan, tayyor auditoriyaga ega bo\'lgan katta platformada sotasiz.',
        },
        {
          type: 'image',
          file: 'lessons/module-1/dars-01-uzum-sotish-jarayoni.jpg',
          alt: 'Uzum Marketda sotish jarayoni',
          caption:
            'Uzum Marketda sotuvchi sifatida o\'z saytini yaratmasdan platform orqali xaridorlarga to\'g\'ridan-to\'g\'ri mahsulot sotish',
        },
        {
          type: 'image',
          file: 'lessons/module-1/dars-01-marketplace-sxema.jpg',
          alt: 'Marketplace ishlash sxemasi',
          caption:
            'Rasm joylash: public/lessons/module-1/dars-01-marketplace-sxema.jpg — sotuvchi → marketplace → xaridor zanjirini ko\'rsating.',
        },
        {
          type: 'h2',
          text: 'Marketplace qanday pul ishlaydi?',
        },
        {
          type: 'p',
          text: 'Asosiy daromad modeli — har bir sotuvdan olinadigan komissiya. Siz mahsulot narxini belgilaysiz, platforma yetkazib berish va to\'lovni (ko\'pincha) o\'z zimmasiga oladi, siz esa foydangizni olasiz.',
        },
        {
          type: 'ul',
          items: [
            'Xaridor platformada qidiradi va buyurtma beradi',
            'Siz buyurtmani tasdiqlaysiz va mahsulotni tayyorlaysiz',
            'Platforma yoki siz yetkazib berishni amalga oshirasiz (FBO/FBS/DBS sxemalariga qarab)',
            'Pul platforma hisobingizga tushadi, keyin yechib olasiz',
          ],
        },
        {
          type: 'h2',
          text: 'Nima uchun marketplace, oddiy do\'kondan yaxshiroq?',
        },
        {
          type: 'ul',
          items: [
            'Tayyor trafik — millionlab foydalanuvchi allaqachon platformada',
            'Ishonch — xaridorlar tanish brendga ishonadi',
            'Logistika va to\'lov infratuzilmasi tayyor',
            'Kichik kapital bilan boshlash mumkin',
          ],
        },
        {
          type: 'h2',
          text: 'Uzum Market va Yandex Market farqi',
        },
        {
          type: 'p',
          text: 'Uzum Market — O\'zbekiston bozoriga yo\'naltirilgan. Yandex Market — Rossiya va MDH mamlakatlari. Kursda ikkalasini ham o\'rganamiz: birinchi modulda ikkala platformada hisob ochish va birinchi mahsulotni joylashtirishni bosqichma-bosqich ko\'rib chiqamiz.',
        },
        {
          type: 'tip',
          title: 'Maslahat',
          text: 'Boshlash uchun bitta platformani tanlang. O\'zbekistonda yashaysiz — Uzum Marketdan boshlash tabiiy. Keyin Yandex Marketga kengaysh mumkin.',
        },
        {
          type: 'h2',
          text: 'Keyingi qadam',
        },
        {
          type: 'p',
          text: 'Keyingi darsda Uzum Marketda ro\'yxatdan o\'tish va hujjatlarni tayyorlashni ko\'rib chiqamiz. Hoziroq INN/STIR, bank kartasi va telefon raqamingiz tayyor bo\'lsin.',
        },
      ],
    },
    {
      id: 'dars-2',
      moduleNum: 1,
      lessonNum: 2,
      title: 'Uzum Marketda ro\'yxatdan o\'tish',
      titleRu: 'Регистрация на Uzum Market',
      readTime: '18 daqiqa',
      platform: 'uzum',
      blocks: [
        {
          type: 'p',
          text: 'Uzum Marketda sotuvchi bo\'lish uchun rasmiy kabinet ochish kerak. Jarayon odatda 1–3 ish kuni davom etadi. Quyida har bir bosqichni batafsil ko\'rib chiqamiz.',
        },
        {
          type: 'h2',
          text: 'Kerakli hujjatlar',
        },
        {
          type: 'ul',
          items: [
            'Yakka tartibdagi tadbirkor (YTT) yoki MChJ ro\'yxatdan o\'tganligi (STIR/INN)',
            'O\'zbekiston bank kartasi yoki hisob raqami',
            'Pasport nusxasi (skaner yoki sifatli foto)',
            'Telefon raqam va email (doimiy foydalaniladigan)',
          ],
        },
        {
          type: 'warning',
          title: 'Muhim',
          text: 'Ro\'yxatdan o\'tishda kiritilgan ma\'lumotlar bank va soliq hujjatlari bilan mos kelishi shart. Aks holda shartnoma tasdiqlanmaydi.',
        },
        {
          type: 'h2',
          text: 'Ro\'yxatdan o\'tish bosqichlari',
        },
        {
          type: 'ol',
          items: [
            'seller.uzum.uz saytiga kiring (yoki Uzum Market sotuvchi bo\'limi)',
            '«Sotuvchi bo\'lish» tugmasini bosing',
            'Telefon raqamingizni kiriting va SMS kodni tasdiqlang',
            'Tadbirkorlik shaklini tanlang: YTT yoki yuridik shaxs',
            'STIR, pasport va bank rekvizitlarini kiriting',
            'Shartnomani o\'qing va elektron imzo yoki tasdiqlash orqali yuboring',
            'Moderatsiya natijasini kuting (1–3 kun)',
          ],
        },
        {
          type: 'image',
          file: 'lessons/module-1/dars-02-birinchi-mahsulot.jpg',
          alt: 'Birinchi mahsulot uchun taqolatlar ro\'yxati',
          caption:
            'Birinchi mahsulotni joylashtirish uchun tekshiruv ro\'yxati va talab qilinadigan ma\'lumotlar',
        },
        {
          type: 'h2',
          text: 'Moderatsiyadan keyin',
        },
        {
          type: 'p',
          text: 'Hisob tasdiqlangach, sotuvchi kabinetiga kirasiz. U yerda buyurtmalar, moliya, mahsulotlar va statistika bo\'limlari ochiladi. Hali mahsulot sotilmaydi — avval magazin sozlamalarini to\'ldirish kerak.',
        },
        {
          type: 'tip',
          text: 'Email va telefonni doim yoqiq saqlang — platforma buyurtma va shartnoma xabarlari shu orqali keladi.',
        },
      ],
    },
    {
      id: 'dars-3',
      moduleNum: 1,
      lessonNum: 3,
      title: 'Uzum Market: magazin ochish va sozlash',
      titleRu: 'Uzum Market: открытие и настройка магазина',
      readTime: '20 daqiqa',
      platform: 'uzum',
      blocks: [
        {
          type: 'p',
          text: 'Magazin — bu xaridorlar ko\'radigan sotuvchi vitrinangiz. To\'g\'ri sozlash ishonchni oshiradi va buyurtmalar soniga ta\'sir qiladi.',
        },
        {
          type: 'h2',
          text: 'Magazin nomi va brend',
        },
        {
          type: 'ul',
          items: [
            'Nom qisqa, esda qolarli va mahsulot kategoriyangizga mos bo\'lsin',
            'Lotin alifbosida yozing — qidiruvda oson topiladi',
            'Brend logotipi: kvadrat, fon siz, kamida 500×500 px',
          ],
        },
        {
          type: 'image',
          file: 'lessons/module-1/dars-03-magazin-panel.jpg',
          alt: 'Uzum sotuvchi kabineti',
          caption:
            'Rasm joylash: public/lessons/module-1/dars-03-magazin-panel.jpg — sotuvchi paneli umumiy ko\'rinishi.',
        },
        {
          type: 'h2',
          text: 'Yetkazib berish sxemasini tanlash',
        },
        {
          type: 'p',
          text: 'Uzum Marketda asosan ikkita model mavjud:',
        },
        {
          type: 'ul',
          items: [
            'FBO — mahsulotni Uzum omboriga yuborasiz, qolganini platforma hal qiladi (yangi sotuvchilar uchun qulay)',
            'FBS — mahsulot sizda, buyurtma kelganda o\'zingiz qadoqlab yuborasiz (kontrol ko\'proq, lekin mehnat ham)',
          ],
        },
        {
          type: 'tip',
          title: 'Boshlovchilar uchun',
          text: 'Birinchi 10–20 ta SKU uchun FBO tanlang — logistika sodda, xatolik kamroq. Keyin hajm oshganda FBS ni sinab ko\'ring.',
        },
        {
          type: 'h2',
          text: 'To\'lov va soliq ma\'lumotlari',
        },
        {
          type: 'p',
          text: 'Kabinetda bank hisob raqami, yechib olish usuli va soliq ma\'lumotlarini tekshiring. Har oy sotuv hisob-kitobini yuklab olish odatiy amaliyot — bu YTT/MChJ hisobotingiz uchun kerak bo\'ladi.',
        },
        {
          type: 'h2',
          text: 'Tekshiruv ro\'yxati',
        },
        {
          type: 'ol',
          items: [
            'Magazin nomi va logo yuklangan',
            'Aloqa telefoni va ish vaqti ko\'rsatilgan',
            'FBO yoki FBS tanlangan',
            'Bank rekvizitlari tasdiqlangan',
          ],
        },
      ],
    },
    {
      id: 'dars-4',
      moduleNum: 1,
      lessonNum: 4,
      title: 'Uzum Market: birinchi mahsulotni joylashtirish',
      titleRu: 'Uzum Market: размещение первого товара',
      readTime: '22 daqiqa',
      platform: 'uzum',
      blocks: [
        {
          type: 'p',
          text: 'Birinchi mahsulot — eng muhim qadam. Noto\'g\'ri kartochka moderatsiyadan o\'tmaydi yoki sotilmaydi. Quyidagi tartibda harakat qiling.',
        },
        {
          type: 'h2',
          text: 'Kategoriya tanlash',
        },
        {
          type: 'p',
          text: 'Mahsulotingizga eng mos kategoriya va podkategoriyani tanlang. Noto\'g\'ri kategoriya — qidiruvda ko\'rinmaslik va rad etish sababi bo\'ladi.',
        },
        {
          type: 'h2',
          text: 'Kartochka elementlari',
        },
        {
          type: 'ul',
          items: [
            'Sarlavha: 60–120 belgi, asosiy kalit so\'z boshida',
            'Tavsif: foyda, material, o\'lcham, qo\'llanma',
            'Rasmlar: oq fon, kamida 5 ta, birinchi rasm — old tomondan to\'liq ko\'rinish',
            'Narx: bozor narxidan biroz past yoki teng (boshlang\'ich strategiya)',
            'Qoldiq: haqiqiy ombor miqdori',
            'Shtrix-kod (barcode) bo\'lsa kiriting',
          ],
        },
        {
          type: 'image',
          file: 'lessons/module-1/dars-04-mahsulot-kartochka.jpg',
          alt: 'Mahsulot kartochkasi namunasi',
          caption:
            'Rasm joylash: public/lessons/module-1/dars-04-mahsulot-kartochka.jpg — to\'liq to\'ldirilgan kartochka misoli.',
        },
        {
          type: 'h2',
          text: 'Moderatsiya',
        },
        {
          type: 'p',
          text: 'Kartochka yuborilgach, 24–48 soat ichida tekshiriladi. Rad etilsa, sabab ko\'rsatiladi — odatda rasm sifati, taqiqlangan so\'z yoki noto\'g\'ri kategoriya bo\'ladi. Tuzatib qayta yuboring.',
        },
        {
          type: 'warning',
          text: 'Brend mahsulotlari uchun ruxsatnoma (sertifikat) talab qilinishi mumkin. Orijinal emas deb gumon qilingan kartochkalar bloklanadi.',
        },
        {
          type: 'h2',
          text: 'Birinchi buyurtma',
        },
        {
          type: 'p',
          text: 'Mahsulot «Sotuvda» holatiga o\'tgach, narxni raqobatchilar bilan solishtiring. Birinchi 5–10 buyurtmada tez javob va sifatli qadoqlash — reytingingizni shakllantiradi.',
        },
      ],
    },
    {
      id: 'dars-5',
      moduleNum: 1,
      lessonNum: 5,
      title: 'Yandex Market ekotizimi',
      titleRu: 'Экосистема Yandex Market',
      readTime: '16 daqiqa',
      platform: 'yandex',
      blocks: [
        {
          type: 'p',
          text: 'Yandex Market — Rossiyaning yirik marketplace\'i. O\'zbek sotuvchilar MDH va Rossiya xaridorlariga sotishi mumkin. Ekotizim Yandex qidiruv, Yandex Go va reklama xizmatlari bilan bog\'langan.',
        },
        {
          type: 'image',
          file: 'lessons/module-1/dars-05-yandex-ekotizim.jpg',
          alt: 'Yandex Market ekotizimi',
          caption:
            'Rasm joylash: public/lessons/module-1/dars-05-yandex-ekotizim.jpg — Market, Direct, Analytics bog\'lanishi.',
        },
        {
          type: 'h2',
          text: 'Kim sotishi mumkin?',
        },
        {
          type: 'ul',
          items: [
            'O\'zbekiston va boshqa MDH mamlakatlaridagi yuridik shaxs yoki YTT',
            'Rossiya bank hisobi yoki partner to\'lov tizimi (masalan, Payoneer orqali)',
            'Rus yoki o\'zbek tilida kartochka to\'ldirish qobiliyati',
          ],
        },
        {
          type: 'h2',
          text: 'Yetkazish modellari',
        },
        {
          type: 'ul',
          items: [
            'FBY — Yandex omboriga yuborasiz (FBO ga o\'xshash)',
            'FBS — o\'zingiz yuborasiz',
            'DBS — o\'z kuryeringiz yoki shartnoma asosida yetkazasiz',
            'Express — tez yetkazish (shahar ichida, alohida talablar)',
          ],
        },
        {
          type: 'h2',
          text: 'Komissiya va to\'lov',
        },
        {
          type: 'p',
          text: 'Komissiya kategoriyaga qarab 5–25% atrofida. Valyuta — odatda rubl. Pul yechish qoidalari biznes-akkaunt shartlariga bog\'liq; shartnomani ochishdan oldin o\'qing.',
        },
        {
          type: 'tip',
          text: 'Yandex Marketga kirishdan oldin 2–3 ta raqobatchi do\'kon kartochkasini o\'rganing — narx, rasm va tavsif standartini tushunasiz.',
        },
      ],
    },
    {
      id: 'dars-6',
      moduleNum: 1,
      lessonNum: 6,
      title: 'Yandex Market: biznes-akkaunt ochish',
      titleRu: 'Yandex Market: открытие бизнес-аккаунта',
      readTime: '20 daqiqa',
      platform: 'yandex',
      blocks: [
        {
          type: 'p',
          text: 'Yandex Marketda sotish uchun partner.yandex.ru (yoki market.yandex.ru partner bo\'limi) orqali biznes-akkaunt ochasiz. Jarayon Uzumdan biroz ko\'proq hujjat talab qilishi mumkin.',
        },
        {
          type: 'h2',
          text: 'Tayyorlanadigan hujjatlar',
        },
        {
          type: 'ul',
          items: [
            'Yuridik shaxs guvohnomasi yoki YTT ro\'yxatdan o\'tish hujjati',
            'STIR/INN (O\'zbekiston) yoki Rossiya INN (agar Rossiya subyekti bo\'lsangiz)',
            'Bank rekvizitlari (valyuta hisob raqami)',
            'Direktor pasporti, muhr va imzo namunasi (skaner)',
            'Aloqa shaxs email va telefon',
          ],
        },
        {
          type: 'image',
          file: 'lessons/module-1/dars-04-yandex-biznes-akkaunt.jpg',
          alt: 'Yandex biznes-akkaunt ro\'yxati',
          caption:
            'Yandex biznes-akkaunt ochish uchun talab qilinadigan hujjatlar va bosqichlar',
        },
        {
          type: 'h2',
          text: 'Ro\'yxat bosqichlari',
        },
        {
          type: 'ol',
          items: [
            'Yandex ID yarating (yoki mavjud Yandex pochtangiz bilan kiring)',
            '«Marketplace sotuvchisi» yo\'nalishini tanlang',
            'Kompaniya ma\'lumotlarini kiriting',
            'Hujjatlarni PDF formatida yuklang',
            'Shartnomani ko\'rib chiqing va imzolang',
            'Tekshiruvni kuting (3–7 ish kuni)',
          ],
        },
        {
          type: 'warning',
          title: 'Eslatma',
          text: 'Ba\'zi kategoriyalar (kosmetika, bolalar mahsuloti, elektronika) uchun sertifikat talab qilinadi. Kategoriyangiz ro\'yxatini oldindan tekshiring.',
        },
      ],
    },
    {
      id: 'dars-7',
      moduleNum: 1,
      lessonNum: 7,
      title: 'Yandex Market: do\'kon sozlamalari',
      titleRu: 'Yandex Market: настройка магазина',
      readTime: '18 daqiqa',
      platform: 'yandex',
      blocks: [
        {
          type: 'p',
          text: 'Biznes-akkaunt tasdiqlangach, do\'kon parametrlarini to\'ldirasiz. Bu bosqich sifat xizmat ko\'rsatkichlari (SLA) va to\'lov jadvaliga ta\'sir qiladi.',
        },
        {
          type: 'h2',
          text: 'Asosiy sozlamalar',
        },
        {
          type: 'ul',
          items: [
            'Do\'kon nomi va URL (latin, bo\'sh joysiz)',
            'Qaytarish siyosati — qancha kun ichida qaytarish mumkin',
            'Ish vaqti va buyurtmaga javob berish vaqti',
            'Ombor manzili (FBS/DBS uchun aniq ko\'cha, indeks)',
            'Yetkazish hududi — qaysi shahar yoki mamlakatlarga yuborasiz',
          ],
        },
        {
          type: 'image',
          file: 'lessons/module-1/dars-05-yandex-dokon-sozlamalari.jpg',
          alt: 'Yandex do\'kon sozlamalari',
          caption:
            'Yandex Marketda do\'kon sozlamalari va logistika shartlariga ta\'lim',
        },
        {
          type: 'h2',
          text: 'Logistika shartlari',
        },
        {
          type: 'p',
          text: 'FBS tanlasangiz, qadoqlash standartlariga rioya qiling: mustahkam quti, ichki to\'ldirish materiali, shikastlanmasdan yetib borishi kerak. Yandex o\'lchovlar bo\'yicha jarima qo\'llashi mumkin.',
        },
        {
          type: 'h2',
          text: 'API va Excel (keyingi bosqich)',
        },
        {
          type: 'p',
          text: 'Ko\'p mahsulot yuklash uchun Excel shablon yoki API mavjud. Birinchi mahsulotni qo\'lda kiritish tavsiya etiladi — keyin avtomatlashtirasiz.',
        },
        {
          type: 'tip',
          text: 'Buyurtmaga 24 soat ichida «Tayyor» deb belgilang — kechikish reytingni tushiradi va reklama imkoniyatlarini cheklaydi.',
        },
      ],
    },
    {
      id: 'dars-8',
      moduleNum: 1,
      lessonNum: 8,
      title: 'Yandex Market: birinchi mahsulotni yuklash',
      titleRu: 'Yandex Market: загрузка первого товара',
      readTime: '22 daqiqa',
      platform: 'yandex',
      blocks: [
        {
          type: 'p',
          text: 'Yandex Marketda mahsulot «oferta» orqali yuklanadi — siz mavjud katalog kartochkasiga ulanish yoki yangi kartochka yaratishni tanlaysiz.',
        },
        {
          type: 'h2',
          text: 'Mavjud kartochkaga ulanish',
        },
        {
          type: 'p',
          text: 'Agar mahsulotingiz allaqachon katalogda bo\'lsa (masalan, mashhur brend modeli), shtrix-kod orqali topib, o\'z narx va qoldiqingizni qo\'shasiz. Bu eng tez usul.',
        },
        {
          type: 'h2',
          text: 'Yangi kartochka yaratish',
        },
        {
          type: 'ol',
          items: [
            'Kategoriya va brend tanlang',
            'Model nomi va barcha majburiy atributlarni to\'ldiring (rang, o\'lcham, material)',
            'Rasmlar: minimum 1200×900 px, oq yoki och fon',
            'Tavsif rus tilida — imlo va formatlash muhim',
            'Narx rubl da, yetkazish narxi alohida ko\'rsatilishi mumkin',
            'Moderatsiyaga yuboring',
          ],
        },
        {
          type: 'image',
          file: 'lessons/module-1/dars-06-mahsulot-yuklash.jpg',
          alt: 'Yandex mahsulot yuklash',
          caption:
            'Yandex Marketda mahsulot kartochkasini yaratish va yuklash jarayoni',
        },
        {
          type: 'h2',
          text: 'Moderatsiya va xatolar',
        },
        {
          type: 'ul',
          items: [
            '«Atribut yetishmayapti» — barcha majburiy maydonlarni to\'ldiring',
            '«Rasm sifati past» — yuqori aniqlikdagi foto ishlating',
            '«Brend tasdiqlanmagan» — brend huquqi hujjatini yuklang',
          ],
        },
        {
          type: 'h2',
          text: 'Modul yakuni',
        },
        {
          type: 'p',
          text: 'Tabriklaymiz! 1-modulni tugatdingiz. Endi siz marketplace mantiqini bilasiz, Uzum va Yandex Marketda kabinet ochish va birinchi mahsulotni joylashtirishni bilasiz. Keyingi modul — «Mahsulot tanlash (Niche research)» — yozma darslar bo\'limida mavjud.',
        },
        {
          type: 'tip',
          title: 'Amaliy vazifa',
          text: 'Bu modulni o\'qiganingizdan keyin kamida bitta platformada bitta haqiqiy mahsulot kartochkasini yarating. Nazariy bilim amalda sinab ko\'rilgandagina o\'zlashtiriladi.',
        },
      ],
    },
  ],
}
