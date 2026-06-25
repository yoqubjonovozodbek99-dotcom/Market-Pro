import type { WrittenModule } from './types'
import { lesson, intro, h2, h3, ul, ol, tip, warning, nextStep } from './helpers'

export const module2: WrittenModule = {
  num: 2,
  slug: 'modul-2',
  title: 'Mahsulot tanlash (Niche research)',
  titleRu: 'Выбор товара (Niche research)',
  desc: 'To\'g\'ri mahsulot tanlash, raqobat tahlili, trend o\'lchash, yetkazib beruvchi topish va marja hisoblash.',
  descRu: 'Правильный выбор товара, анализ конкурентов, измерение тренда, поиск поставщиков и расчёт маржи.',
  lessonCount: 12,
  hours: 5,
  available: true,
  lessons: [
    lesson(
      'dars-1',
      2,
      1,
      'Niche research — to\'g\'ri mahsulot tanlash',
      'Niche research — правильный выбор товара',
      'uzum',
      '18 daqiqa',
      [
        intro(
          'Mahsulot tanlash — marketplace biznesining poydevori. Noto\'g\'ri niche tanlasangiz, reklama, logistika va vaqt behuda ketadi. Uzum Market kontekstida to\'g\'ri mahsulot — talab bor, raqobat o\'rtacha va marja 25% dan yuqori bo\'lgan tovar.',
        ),
        h2('Niche research nima?'),
        intro(
          'Niche research — bozorda qaysi mahsulot kategoriyasi qanchalik talabga ega, qancha raqobatchi bor va siz foyda qila olasizmi degan savollarga javob berish jarayoni. Bu taxmin emas, raqamlar va kuzatuvga asoslangan tahlil.',
        ),
        h2('Uzum Marketda qayerdan boshlash?'),
        ul([
          'seller.uzum.uz → «Analitika» va «Bozor tahlili» bo\'limlari (mavjud bo\'lsa)',
          'Uzum Market ilovasida kategoriyalar bo\'yicha «Eng ko\'p sotilgan» filtrlari',
          'Qidiruv satrida mahsulot nomini kiritib, natijalar sonini kuzatish',
          'Raqobatchi do\'konlar vitrinasini ochib, qaysi SKU tez sotilayotganini ko\'rish',
        ]),
        h3('Yaxshi niche belgilari'),
        ul([
          'Oylik qidiruv hajmi barqaror yoki o\'sib boradi',
          'Kartochkalar soni 50–500 oralig\'ida (juda kam yoki juda ko\'p emas)',
          'O\'rtacha narx 50 000–500 000 so\'m (logistika va komissiyani qoplash oson)',
          'Mavsumiy emas yoki mavsumiy bo\'lsa ham yil davomida sotuv bor',
          'Taqiqlangan yoki sertifikatsiz kategoriya emas',
        ]),
        h2('Yomon niche belgilari'),
        ul([
          'Faqat 2–3 ta kuchli brend monopol qilgan (masalan, premium smartfonlar)',
          'Narx raqobati juda qattiq — barcha sotuvchilar zarar bilan sotadi',
          'Yuqori qaytarish foizi (kiyim noto\'g\'ri o\'lcham, noaniq tavsif)',
          'Katta hajmli, qimmat logistika talab qiladigan mahsulotlar',
        ]),
        warning(
          'Elektronika, kosmetika va bolalar mahsulotlari Uzum Marketda qo\'shimcha hujjat (sertifikat, deklaratsiya) talab qilishi mumkin. Niche tanlashdan oldin kategoriya qoidalarini o\'qing.',
        ),
        h2('Amaliy vazifa: 3 ta niche ro\'yxati'),
        ol([
          'O\'zingiz biladigan yoki yetkazib bera oladigan 5 ta kategoriya yozing',
          'Har birida Uzum Marketda qidiruv qiling, birinchi sahifadagi kartochkalar sonini sanang',
          'Eng ko\'p sotilgan 3 ta mahsulot narxini va sharhlar sonini yozib oling',
          'Har niche uchun taxminiy xarid narxi va sotuv narxini solishtiring',
          'Eng yuqori ball olgan 3 ta ni qisqa ro\'yxatga kiriting',
        ]),
        tip(
          'Boshlovchilar uchun eng xavfsiz yo\'l — o\'rtacha narxli, kundalik foydalaniladigan mahsulotlar: uy-ro\'zg\'or buyumlari, aksessuarlar, kichik elektronika aksessuarlari. Ular tez aylanadi va qaytarish kam.',
        ),
        nextStep(
          'Keyingi darsda tanlangan niche ichidagi raqobatchilarni chuqur tahlil qilishni o\'rganamiz — ularning narx, reyting va kartochka sifatini qanday o\'lchash kerak.',
        ),
      ],
    ),
    lesson(
      'dars-2',
      2,
      2,
      'Raqobatchilarni tahlil qilish',
      'Анализ конкурентов',
      'uzum',
      '20 daqiqa',
      [
        intro(
          'Raqobatchi tahlili — siz tanlagan mahsulotda kimlar sotayotganini, qanday narx va kartochka bilan ishlashini tushunish. Uzum Marketda bir xil mahsulotni 10–50 ta sotuvchi taklif qilishi mumkin; siz ulardan qanday ajralib turishingizni bilishingiz kerak.',
        ),
        h2('Raqobatchilarni qanday topish?'),
        ol([
          'Uzum Market ilovasida mahsulot nomini qidiring',
          '«Barcha takliflar» yoki «Boshqa sotuvchilar» bo\'limini oching',
          'Reytingi yuqori va ko\'p sharhli 5–10 ta sotuvchini tanlang',
          'Ularning do\'kon nomi va kartochkalarini saqlab qo\'ying',
        ]),
        h2('Tahlil qilinadigan ko\'rsatkichlar'),
        ul([
          'Narx — eng arzon, o\'rtacha va eng qimmat taklif',
          'Reyting — 4.5+ yaxshi, 4.0 dan past xavfli signal',
          'Sharhlar soni — ko\'p sharh = barqaror sotuv',
          'Yetkazish — FBO (tez) yoki FBS (kechroq bo\'lishi mumkin)',
          'Rasmlar sifati — professional yoki oddiy telefon surati',
          'Sarlavha va kalit so\'zlar — qanday so\'zlar ishlatilgan',
        ]),
        h3('Excel yoki Google Sheets jadvali'),
        intro(
          'Har raqobatchi uchun ustun yarating: Do\'kon nomi | Narx | Reyting | Sharhlar | Yetkazish | Rasm sifati (1–5) | Eslatma. Bu jadval keyingi modullarda narx va kartochka strategiyasini qurishda asosi bo\'ladi.',
        ),
        h2('Kuchli va zaif raqobatchilar'),
        ul([
          'Kuchli: yuqori reyting, professional rasmlar, tez yetkazish, barqaror narx',
          'Zaif: past reyting, kam sharh, yomon rasmlar, noto\'g\'ri kategoriya, kech yetkazish',
        ]),
        warning(
          'Eng arzon narx — har doim ham g\'alaba emas. Ba\'zi sotuvchilar zarar bilan sotib, reyting yig\'adi yoki eski qoldiqni tashlaydi. O\'rtacha narx va sifat balansini maqsad qiling.',
        ),
        h2('Raqobatchi kartochkasini «sindirish»'),
        ol([
          'Birinchi 3 ta rasmni tahlil qiling — fon, burchak, infografika bormi?',
          'Sarlavhadagi kalit so\'zlarni ajrating',
          'Tavsifda qaysi savollarga javob berilgan, qaysilari qolgan?',
          'Sharhlarni o\'qing — xaridorlar nima yoqtirmaydi?',
          'Bu zaif tomonlarni o\'z kartochkangizda yaxshilang',
        ]),
        tip(
          'seller.uzum.uz kabinetida «Raqobatchilar» yoki analitika bo\'limi bo\'lsa, o\'z mahsulotingizni qaysi kartochkalar bilan solishtirish mumkinligini ko\'ring. Boost reklama oldidan raqobatchi tahlili majburiy.',
        ),
        nextStep(
          'Keyingi darsda trend va talabni o\'lchash — qaysi mahsulotlar o\'sib borayotganini va mavsumiy o\'zgarishlarni qanday aniqlashni ko\'rib chiqamiz.',
        ),
      ],
    ),
    lesson(
      'dars-3',
      2,
      3,
      'Trend va talabni o\'lchash',
      'Измерение тренда и спроса',
      'uzum',
      '17 daqiqa',
      [
        intro(
          'Trend — vaqt o\'tishi bilan o\'sib yoki tushib borayotgan talab. Uzum Marketda talabni to\'g\'ri o\'lchamasangiz, omborga ko\'p yoki kam mahsulot qo\'yib, pulingizni muzlatib qo\'yishingiz mumkin.',
        ),
        h2('Talabni qayerdan ko\'rish mumkin?'),
        ul([
          'Qidiruv natijalaridagi mahsulotlar soni — ko\'payayotgan bo\'lsa, bozor kengaymoqda',
          '«Eng ko\'p sotilgan» ro\'yxatidagi o\'zgarishlar — haftalik kuzatuv',
          'Ijtimoiy tarmoqlar (Telegram, Instagram) — O\'zbekistonda qaysi mahsulotlar muhokama qilinmoqda',
          'Mavsumiy hodisalar — Navruz, maktab, qish, to\'y mavsumi',
        ]),
        h2('Trend turlari'),
        h3('Doimiy talab'),
        intro(
          'Kundalik foydalaniladigan mahsulotlar: oshxona buyumlari, telefon qoplamalari, kabel, batareya. Yil davomida barqaror sotuv — yangi sotuvchilar uchun xavfsizroq.',
        ),
        h3('Mavsumiy talab'),
        intro(
          'Konditsioner (yoz), isitgich (qish), maktab anjomlari (avgust–sentabr), sovg\'a to\'plamlari (bayramlar). Oldindan zaxira va reklama rejasini tuzish kerak.',
        ),
        h3('Viral / qisqa muddatli trend'),
        warning(
          'TikTok yoki Telegramda bir haftada mashhur bo\'lgan mahsulot tez ham to\'lib qolishi mumkin. Bunday trendga katta hajmda kirish xavfli — avval test partiya bilan sinab ko\'ring.',
        ),
        h2('Oddiy talab formulasi'),
        intro(
          'Taxminiy oylik talab = (Kategoriyadagi o\'rtacha sharhlar soni × 10) yoki (Top-10 mahsulotlarning jami sharhlari / 10). Bu aniq emas, lekin nisbiy taqqoslash uchun yetarli.',
        ),
        h2('Kuzatuv jadvali yaratish'),
        ol([
          'Tanlangan 5 ta mahsulot nomini yozing',
          'Har hafta ularning Uzum\'dagi o\'rni, narx va sharhlar sonini belgilang',
          '4 hafta kuzatgach, o\'sish yoki tushish trendini aniqlang',
          'Trend o\'sayotgan mahsulotni test partiyaga qo\'ying',
        ]),
        tip(
          'Uzum Market Boost reklamasini yoqishdan oldin organik talab borligini tekshiring — qidiruvda kamida birinchi sahifada raqobatchilar bo\'lsa, bozorda pul bor degani.',
        ),
        nextStep(
          'Keyingi dars — yetkazib beruvchi topish: mahsulotni qayerdan olish, Uzum FBO uchun qanday minimal partiya va sifat nazorati kerak.',
        ),
      ],
    ),
    lesson(
      'dars-4',
      2,
      4,
      'Yetkazib beruvchi topish',
      'Поиск поставщика',
      'uzum',
      '20 daqiqa',
      [
        intro(
          'Yetkazib beruvchi — sizning omboringiz va Uzum Market o\'rtasidagi zanjir. Arzon va ishonchli supplier topmasangiz, marja yo\'qoladi yoki sifat muammosi reytingingizni tushiradi.',
        ),
        h2('Yetkazib beruvchi manbalari'),
        ul([
          'O\'zbekiston optom bozorlar: Chorsu, Mirabad, Urgut (kategoriyaga qarab)',
          '1688.com va Alibaba — Xitoydan to\'g\'ridan-to\'g\'ri import',
          'Mahalliy ishlab chiqaruvchilar va distributorlar',
          'Telegram guruhlari: «Optom Uzbekiston», «Import tovar» mavzulari',
          'Yarmarka va ko\'rgazmalar (Tashkent, Samarqand)',
        ]),
        h2('Supplier tanlash mezonlari'),
        ol([
          'Minimal buyurtma (MOQ) — sizning test byudjetingizga mosmi?',
          'Narx — 3 ta supplierdan narx so\'rang, o\'rtachani oling',
          'Namuna — sotishdan oldin 1–3 dona o\'z qo\'lingiz bilan tekshiring',
          'Hujjatlar — faktura, sertifikat (kerak bo\'lsa) bormi?',
          'Yetkazish vaqti — Toshkentga qancha kunda keladi?',
          'Qaytarish sharti — nuqsonli partiya almashtiriladimi?',
        ]),
        h3('FBO uchun qo\'shimcha talablar'),
        ul([
          'Shtrix-kod (EAN-13) — Uzum omboriga qabul uchun kerak',
          'Qadoq markirovka — kategoriya talabiga muvofiq',
          'Barqaror ta\'minot — omborda qoldiq tugab qolmasligi kerak',
          'Bir xil sifat — har partiya avvalgidek bo\'lishi shart',
        ]),
        warning(
          'Birinchi marta Xitoydan import qilsangiz, kichik partiya va ishonchli logistika kompaniyasi tanlang. Bojxona, GST va yetkazish narxini marja hisobiga qo\'shishni unutmang.',
        ),
        h2('Supplier bilan muzokara'),
        intro(
          'Optom narx odatda hajmga bog\'liq. «100 dona olsam qancha, 500 dona olsam qancha?» deb so\'rang. To\'lov: naqd, bank o\'tkazmasi yoki qismli to\'lov — har doim kvitansiya oling.',
        ),
        tip(
          'Ikki supplier bilan ishlang — biri asosiy, biri zaxira. Bir supplier kechiktirsa yoki sifat tushirsa, ikkinchisi biznesni qutqaradi.',
        ),
        h2('Tekshiruv ro\'yxati'),
        ul([
          'Namuna olindi va sifat tasdiqlandi',
          'Narx va MOQ yozma shaklda kelishildi',
          'Shtrix-kod yoki markirovka masalasi hal qilindi',
          'Yetkazish vaqti va javobgarlik kelishildi',
          'Birinchi test partiya hajmi belgilandi (odatda 20–50 dona)',
        ]),
        nextStep(
          'Keyingi darsda marja hisoblash — xarid narxidan Uzum komissiyasi, logistika va soliqlarni ayirib, haqiqiy foydangizni qanday hisoblash.',
        ),
      ],
    ),
    lesson(
      'dars-5',
      2,
      5,
      'Marja hisoblash',
      'Расчёт маржи',
      'uzum',
      '19 daqiqa',
      [
        intro(
          'Marja — har bir sotuvdan sizga qoladigan foyda foizi. Uzum Marketda komissiya, yetkazish, qadoqlash, reklama (Boost) va soliq barchasi narx ichidan olinadi. Foydasiz narx bilan sotish — vaqt va pul yo\'qotish.',
        ),
        h2('Marja formulasi'),
        intro(
          'Sof foyda = Sotuv narxi − Xarid narxi − Uzum komissiyasi − Logistika − Qadoqlash − Reklama − Soliq. Marja % = (Sof foyda / Sotuv narxi) × 100.',
        ),
        h2('Uzum Market xarajatlari'),
        ul([
          'Komissiya — kategoriyaga qarab odatda 8–18% (elektronika yuqoriroq, uy-ro\'zg\'or pastroq)',
          'FBO logistika — omborga yetkazish + saqlash + xaridorgacha yetkazish (tarif jadvali bo\'yicha)',
          'FBS logistika — o\'zingiz yuborsangiz, kuryer yoki Uzum pickup xizmati narxi',
          'Boost reklama — bosish yoki buyurtma modeli, odatda sotuvning 5–15%',
          'Qaytarish — qaytarilgan mahsulot uchun qo\'shimcha xarajat',
        ]),
        h3('Misol hisob-kitob'),
        intro(
          'Telefon qoplamasi: xarid 15 000 so\'m, sotuv 45 000 so\'m. Komissiya 12% = 5 400 so\'m. FBO logistika ≈ 3 000 so\'m. Qadoq 500 so\'m. Boost 3 000 so\'m. Sof foyda = 45 000 − 15 000 − 5 400 − 3 000 − 500 − 3 000 = 18 100 so\'m. Marja ≈ 40%.',
        ),
        h2('Minimal marja qoidalari'),
        ul([
          'Boshlang\'ich test: kamida 25% marja',
          'Barqaror sotuv: 30–35% marja maqsad',
          'Chegirma va aksiyalar uchun: 40%+ marja zaxira qoldiring',
        ]),
        warning(
          'Faqat «raqobatchidan 1000 so\'m arzon» deb narx qo\'ymang — avval to\'liq xarajatlarni hisoblang. Agar marja 15% dan past bo\'lsa, bu mahsulotni sotish foydasiz.',
        ),
        h2('Google Sheets shablon'),
        ol([
          'Ustunlar: Mahsulot | Xarid | Sotuv | Komissiya % | Logistika | Qadoq | Reklama | Sof foyda | Marja %',
          'Har yangi SKU uchun qator qo\'shing',
          'Komissiya foizini seller.uzum.uz dagi shaxsiy tarifingizdan oling',
          'Sotuv narxini o\'zgartirsangiz, marja avtomatik qayta hisoblansin',
        ]),
        tip(
          'FBO va FBS uchun alohida qator yarating — logistika farqi katta. Ba\'zi mahsulotlar FBS da foydaliroq, ba\'zilari FBO da.',
        ),
        nextStep(
          'Keyingi dars — test buyurtma strategiyasi: katta hajmga kirmasdan oldin Uzum Marketda mahsulotni qanday sinovdan o\'tkazish.',
        ),
      ],
    ),
    lesson(
      'dars-6',
      2,
      6,
      'Test buyurtma strategiyasi',
      'Стратегия тестового заказа',
      'uzum',
      '18 daqiqa',
      [
        intro(
          'Test buyurtma — katta investitsiya qilmasdan mahsulotni bozorda sinash. Uzum Marketda 20–50 dona bilan boshlab, sotuv tezligi, qaytarish va reytingni o\'lchaysiz.',
        ),
        h2('Nima uchun test kerak?'),
        ul([
          'Talab taxminiy bo\'lishi mumkin — faqat sotuv tasdiqlaydi',
          'Kartochka sifati — qaysi rasm va sarlavha yaxshi ishlaydi',
          'Logistika — FBO qabul va yetkazish qancha vaqt oladi',
          'Raqobatchilar — narx urushi boshlanadimi?',
        ]),
        h2('Test bosqichlari'),
        ol([
          '1-bosqich: 20–30 dona, organik narx (o\'rtacha yoki biroz past)',
          'Kartochkani to\'liq to\'ldiring — 5+ rasm, batafsil tavsif',
          '2 hafta kuzatuv: kunlik ko\'rish, savatga qo\'shish, buyurtma',
          '2-bosqich: agar kuniga 1+ buyurtma bo\'lsa — 50–100 donaga oshiring',
          'Boost reklamani kichik byudjet bilan (50 000–100 000 so\'m) sinab ko\'ring',
          '3-bosqich: barqaror sotuv bo\'lsa — to\'liq hajm va FBO ombor',
        ]),
        h2('Muvaffaqiyat mezonlari'),
        ul([
          '14 kun ichida 50% dan ko\'p sotildi — yaxshi signal',
          'Reyting 4.5+ va kam qaytarish',
          'Marja 25%+ saqlanmoqda',
          'Raqobatchilar bilan narxda barqaror turish mumkin',
        ]),
        h3('Muvaffaqiyatsizlik signallari'),
        ul([
          '30 kun ichida 30% dan kam sotildi — niche yoki kartochka muammosi',
          'Ko\'p qaytarish — tavsif yoki sifat noto\'g\'ri',
          'Hech qanday ko\'rish — SEO yoki kategoriya xato',
        ]),
        warning(
          'Test davrida ham xaridorlarga tez javob bering va sifatli qadoqlang. Past reyting test natijasini buzadi va keyingi mahsulotlarga ham ta\'sir qiladi.',
        ),
        tip(
          'seller.uzum.uz → «Statistika» bo\'limida konversiya (ko\'rish → buyurtma) ni kuzating. 1% dan past bo\'lsa, avval kartochkani yaxshilang, narxni tushirmang.',
        ),
        h2('Testdan keyin qaror'),
        intro(
          'Scale qilish (kengaytirish), pivot qilish (boshqa variant) yoki to\'xtatish — uchta yo\'l. Raqamlar ijobiy bo\'lsa, yetkazib beruvchidan katta partiya va FBO omborga yuborishni rejalashtiring.',
        ),
        nextStep(
          'Uzum bo\'limi yakunlandi. Keyingi 6 ta dars Yandex Market — Rossiya va MDH bozorida xuddi shu jarayonni qanday qo\'llashni o\'rganamiz.',
        ),
      ],
    ),
    lesson(
      'dars-7',
      2,
      7,
      'Rossiya va MDH bozorini tahlil',
      'Анализ рынка России и СНГ',
      'yandex',
      '20 daqiqa',
      [
        intro(
          'Yandex Market — Rossiya, Qozog\'iston, Belarus va boshqa MDH mamlakatlarida faol. O\'zbek sotuvchi uchun bu katta auditoriya, lekin boshqa valyuta, logistika va qoidalar — alohida strategiya talab qiladi.',
        ),
        h2('Bozor hajmi va imkoniyatlar'),
        ul([
          'Rossiya — 140+ mln aholi, onlayn savdo yirik va o\'sib borayapti',
          'MDH — Qozog\'iston, O\'zbekiston migrantlari va mahalliy xaridorlar',
          'Yandex qidiruv integratsiyasi — Market natijalari qidiruvda ko\'rinadi',
          'Valyuta — rubl (kurs o\'zgarishi marjaga ta\'sir qiladi)',
        ]),
        h2('O\'zbek sotuvchi uchun afzalliklar'),
        ul([
          'Ishlab chiqarish yoki arzon import — ba\'zi kategoriyalarda narx ustunligi',
          'Textil, aksessuar, uy-ro\'zg\'or — an\'anaviy kuchli tomonlar',
          'MDH tajribasi — til va madaniyat yaqinligi',
        ]),
        h2('Qiyinchiliklar'),
        ul([
          'Rossiyaga yetkazish — FBY ombori yoki FBS/DBS logistika',
          'Rus tilida kartochka — sarlavha va tavsif professional bo\'lishi kerak',
          'Sertifikat — EAC, deklaratsiya ba\'zi kategoriyalarda majburiy',
          'To\'lov — rubl hisob yoki Payoneer kabi xizmatlar',
          'Bojxona va soliq — eksport qoidalari',
        ]),
        h2('Bozor tahlili manbalari'),
        ol([
          'market.yandex.ru — kategoriya va qidiruv natijalari',
          'partner.yandex.ru — sotuvchi analitika va bozor hisobotlari',
          'Wordstat.yandex.ru — kalit so\'z qidiruv hajmi (rus tilida)',
          'Raqobatchi do\'konlar — narx va reyting kuzatuvi',
        ]),
        warning(
          'Sanksiya va cheklovlar ba\'zi tovarlar va to\'lov yo\'llariga ta\'sir qilishi mumkin. Hujjatlar va kategoriya ro\'yxatini Yandex Market qoidalaridan tekshiring — bu ma\'lumotlar o\'zgarishi mumkin.',
        ),
        tip(
          'Boshlash uchun bir mamlakatni tanlang: masalan, faqat Qozog\'iston yoki faqat Rossiya (Moscow region). Kengayishni barqaror sotuvdan keyin rejalashtiring.',
        ),
        nextStep(
          'Keyingi dars — Yandex Marketda kategoriya va talab tanlash: qaysi tovarlar MDH dan eksport uchun mos.',
        ),
      ],
    ),
    lesson(
      'dars-8',
      2,
      8,
      'Kategoriya va talab tanlash',
      'Выбор категории и спроса',
      'yandex',
      '18 daqiqa',
      [
        intro(
          'Yandex Marketda kategoriya tanlash Uzumdan qattiqroq: noto\'g\'ri atribut yoki kategoriya — moderatsiya rad etadi. Talabni rus tilidagi qidiruv va Wordstat orqali o\'lchaysiz.',
        ),
        h2('Yandex Market kategoriya tuzilmasi'),
        intro(
          'Har mahsulot aniq kategoriya va podkategoriyaga tegishli. Masalan: «Elektronika → Aksessuarlar → Telefon qoplamalari». Kategoriya komissiya foizini ham belgilaydi.',
        ),
        h2('Talabli kategoriyalar (O\'zbek eksporti uchun)'),
        ul([
          'Textil va kiyim — past bojxona murakkabligi, yuqori talab',
          'Uy-ro\'zg\'or va dekor',
          'Bolalar tovarlari (sertifikat talab qilinadi)',
          'Aksessuarlar va zargarlik (arzon segment)',
          'Sport va hobi tovarlari',
        ]),
        h2('Wordstat bilan talab o\'lchash'),
        ol([
          'wordstat.yandex.ru ga kiring',
          'Mahsulot nomini rus tilida kiriting (masalan: «чехол для телефона»)',
          'Oylik qidiruv hajmini yozing',
          'Mavsumiylik grafigini ko\'ring — qaysi oylar pik',
          'Bir nechta sinonim kalit so\'zni solishtiring',
        ]),
        h3('Yandex Market ichida tekshirish'),
        ul([
          'Qidiruv natijalaridagi takliflar soni',
          '«Популярное» va reyting bo\'yicha saralash',
          'O\'rtacha narx rubl da — kurs bilan so\'mga o\'tkazing',
        ]),
        warning(
          'Dori-darmon, qurol, alkogol va ba\'zi elektronika kategoriyalari cheklangan yoki taqiqlangan. Kategoriya qoidalarini partner.yandex.ru dan oldindan o\'qing.',
        ),
        tip(
          'Bitta kategoriyada 3–5 ta yaqin SKU bilan boshlang. Har xil kategoriyada sinash o\'rniga chuqurroq bitta yo\'nalish — tezroq tajriba yig\'asiz.',
        ),
        nextStep(
          'Keyingi dars — Yandex Marketda raqobatchilar monitoringi: rubl narxlar va FBY/FBS yetkazish taqqoslash.',
        ),
      ],
    ),
    lesson(
      'dars-9',
      2,
      9,
      'Raqobatchilar monitoringi',
      'Мониторинг конкурентов',
      'yandex',
      '19 daqiqa',
      [
        intro(
          'Yandex Marketda raqobatchilar ko\'pincha mahalliy Rossiya ishlab chiqaruvchilari, Xitoy importi yoki boshqa MDH sotuvchilari. Ularni muntazam kuzatish — narx va kartochka strategiyasi uchun shart.',
        ),
        h2('Monitoring obyektlari'),
        ul([
          'Narx — eng arzon 5 ta taklif va o\'rtacha',
          'Yetkazish — FBY (1–2 kun) vs FBS (3–7 kun)',
          'Reyting va sharhlar — Yandex Market baholash tizimi',
          'Kartochka — rasm, video, rich-kontent',
          'Aksiya — «Скидка», «Распродажа» yorliqlari',
        ]),
        h2('Monitoring vositalari'),
        ul([
          'Qo\'lda — haftalik Excel jadval (boshlang\'ich bosqich)',
          'partner.yandex.ru analitika — o\'z mahsulotingiz vs bozor',
          'Uchinchi tomon parserlar (qoidalar bilan mos) — ko\'p SKU uchun',
          'Yandex Market ilovasida «Избранное» — tez solishtirish',
        ]),
        h2('Haftalik monitoring jadvali'),
        ol([
          'Dushanba: raqobatchi narxlarini yangilang',
          'Chorshanba: yangi sharhlarni o\'qing — shikoyatlar trendi',
          'Juma: o\'z narx va qoldiq strategiyangizni moslashtiring',
          'Oy oxiri: oylik sotuv va marja hisoboti',
        ]),
        h3('Narx urushi signallari'),
        warning(
          'Agar bir nechta raqobatchi bir vaqtda narxni 15%+ tushirsa — bu odatda qoldiq tashlash yoki reklama kampaniyasi. Shunchaki ergashmang — marjangizni hisoblang.',
        ),
        h2('Raqobatchidan o\'rganish'),
        ul([
          'Qaysi sotuvchi FBY ishlatadi — tez yetkazish ustunligi',
          'Video bor kartochkalar — konversiya yuqoriroq',
          'Brend do\'konlari — qanday vitrina dizayni',
        ]),
        tip(
          'Yandex Marketda «Buy box» (asosiy taklif) odatda eng yaxshi narx + tez yetkazish + yuqori reyting kombinatsiyasiga beriladi. Monitoring buy box egasini kuzatishni o\'z ichiga oladi.',
        ),
        nextStep(
          'Keyingi dars — xalqaro yetkazib beruvchilar: Xitoy, O\'zbekiston va Rossiya o\'rtasida logistika zanjirini qurish.',
        ),
      ],
    ),
    lesson(
      'dars-10',
      2,
      10,
      'Xalqaro yetkazib beruvchilar',
      'Международные поставщики',
      'yandex',
      '21 daqiqa',
      [
        intro(
          'Yandex Market uchun mahsulot manbai — O\'zbekiston ishlab chiqaruvchi, Xitoy fabrikasi yoki Rossiya distritor bo\'lishi mumkin. Xalqaro zanjir: sifat, muddat va hujjatlar muhim.',
        ),
        h2('Yetkazib beruvchi turlari'),
        ul([
          'Mahalliy O\'zbekiston — tez, arzon logistika, so\'m to\'lov',
          'Xitoy (1688, Alibaba) — arzon unit, uzoq yetkazish, USD/CNY',
          'Rossiya distritor — tez FBY ga yetkazish, rubl, mahalliy sertifikat osonroq',
          'Turkiya / BAA — o\'rta narx, o\'rta muddat',
        ]),
        h2('FBY uchun logistika zanjiri'),
        ol([
          'Supplier dan mahsulotni oling (O\'zbekiston yoki import)',
          'Shtrix-kod va markirovka tekshiring (Rossiya talablari)',
          'Yandex FBY omboriga yuborish — cross-border yoki mahalliy ombor',
          'Qabul (acceptance) — brak va ortiqcha tekshiruv',
          'Omborda saqlash — Yandex tariflari bo\'yicha',
        ]),
        h3('FBS/DBS varianti'),
        intro(
          'O\'zbekistondan to\'g\'ridan-to\'g\'ri Rossiyaga yuborsangiz — yetkazish 7–21 kun, bojxona va kuryer xarajati yuqori. Kichik test uchun mos; hajm oshganda FBY yoki mahalliy ombor ma\'qul.',
        ),
        warning(
          'Rossiyaga import qilinadigan tovarlar uchun EAC sertifikati, GTD va ba\'zan markirovka ( «Честный ЗНАК» ) talab qilinadi. Hujjatsiz partiya omborga qabul qilinmaydi.',
        ),
        h2('Supplier tekshiruvi'),
        ul([
          'Fabrika audit yoki namuna partiya',
          'Incoterms: FOB, CIF — kim logistika va bojxonaga javobgar',
          'To\'lov: LC, T/T, Payoneer — xavfsizlik',
          'Shartnoma — sifat, muddat, brak qaytarish',
        ]),
        tip(
          'Birinchi marta Xitoydan import qilsangiz, logistika broker bilan ishlang — bojxona va hujjatlar to\'g\'ri rasmiylashtiriladi. Keyin mustaqil qilishingiz mumkin.',
        ),
        nextStep(
          'Keyingi dars — Yandex Marketda narx va marja hisoblash: rubl, komissiya va kurs xavfi.',
        ),
      ],
    ),
    lesson(
      'dars-11',
      2,
      11,
      'Narx va marja hisoblash',
      'Расчёт цены и маржи',
      'yandex',
      '20 daqiqa',
      [
        intro(
          'Yandex Market marjasi Uzumdan farq qiladi: komissiya kategoriyaga qarab 5–25%, FBY saqlash, yetkazish va rubl kursi. Barcha xarajatlarni rubl da hisoblang, keyin so\'mga o\'tkazing.',
        ),
        h2('Xarajatlar ro\'yxati'),
        ul([
          'Xarid narxi (supplier) — valyuta kursi bilan',
          'Xalqaro logistika va bojxona',
          'Yandex komissiya — partner kabinetidagi kategoriya tarifi',
          'FBY: qabul, saqlash, komplektatsiya, yetkazish',
          'FBS: o\'z qadoqlash va yuborish',
          'Yandex reklama (Market Boost / Direct)',
          'Qaytarish va brak',
        ]),
        h2('Marja formulasi (rubl)'),
        intro(
          'Sof foyda = Sotuv (₽) − Xarid (₽) − Komissiya − Logistika − Reklama. Marja % = Sof foyda / Sotuv × 100. Minimal maqsad — 20% (xalqaro logistika tufayli Uzumdan pastroq bo\'lishi mumkin).',
        ),
        h3('Kurs xavfi'),
        warning(
          'Rubl kursi o\'zgarishi marjani o\'zgartiradi. Narxni haftalik kurs bo\'yicha qayta ko\'rib chiqing yoki sotuv narxiga 3–5% «kurs zaxirasi» qo\'shing.',
        ),
        h2('Minimal narx va komissiya'),
        intro(
          'Yandex har kategoriyada minimal narx yoki minimal komissiya qo\'yishi mumkin. partner.yandex.ru → «Тарифы» bo\'limida o\'z kategoriyangizni tekshiring. Juda arzon narx — moderatsiya yoki «suspicious pricing» ogohlantirishi.',
        ),
        h2('Hisob-kitob misoli'),
        ol([
          'Telefon qoplamasi: xarid $1.5 ≈ 135 ₽, sotuv 450 ₽',
          'Komissiya 15% = 67.5 ₽',
          'FBY logistika ≈ 80 ₽',
          'Reklama 30 ₽',
          'Sof foyda ≈ 137.5 ₽, marja ≈ 30%',
        ]),
        tip(
          'Google Sheets da =GOOGLEFINANCE("CURRENCY:USDRUB") yoki qo\'lda kurs yangilab, barcha formulalar avtomatik qayta hisoblansin.',
        ),
        nextStep(
          'Modulning oxirgi darsi — Yandex Marketda test savdo rejasi: FBY ga kichik partiya yuborish va natijalarni baholash.',
        ),
      ],
    ),
    lesson(
      'dars-12',
      2,
      12,
      'Test savdo rejasi',
      'План тестовых продаж',
      'yandex',
      '18 daqiqa',
      [
        intro(
          'Yandex Marketda test savdo — 30–100 dona partiya, bitta SKU, bitta region (masalan, Moskva). Natija ijobiy bo\'lsa, FBY hajmini oshirasiz va kategoriyani kengaytirasiz.',
        ),
        h2('Test rejasi bosqichlari'),
        ol([
          '1. Kategoriya va supplier tasdiqlash (7–14 kun)',
          '2. Kartochka yaratish — rus tilida, barcha atributlar (3–5 kun moderatsiya)',
          '3. FBY ga 30–50 dona yuborish yoki FBS bilan 10–20 ta test',
          '4. Narx — o\'rtacha yoki median raqobatchi narx',
          '5. 14 kun organik kuzatuv — reklama yo\'q',
          '6. 7 kun kichik reklama byudjeti (Market reklama)',
          '7. Qaror: scale / optimize / stop',
        ]),
        h2('KPI mezonlari'),
        ul([
          'Konversiya ko\'rish → buyurtma: 0.5%+ yaxshi',
          '14 kun ichida 40%+ sotuv — yaxshi signal',
          'Reyting 4.3+ (Yandex shkalasi)',
          'Qaytarish 5% dan past',
          'Marja 20%+ saqlangan',
        ]),
        h2('Muvaffaqiyatsiz test sabablari'),
        ul([
          'Kartochka rus tilida yomon — tarjima xato',
          'Noto\'g\'ri kategoriya yoki atribut',
          'Narx juda yuqori — raqobatchilardan uzoq',
          'FBY qabul kechikishi — omborda «yo\'q» ko\'rinishi',
          'Sertifikat yo\'qligi — kartochka bloklangan',
        ]),
        warning(
          'Test partiyani qaytarib olish yoki boshqa kanalga o\'tkazish rejasini oldindan tuzing. FBY da qoldiq uzoq turishi saqlash xarajatini oshiradi.',
        ),
        tip(
          'partner.yandex.ru da «Отчёты» → sotuv, qoldiq va qaytarish bir joyda. Haftalik 15 daqiqa — test natijasini tahlil qilish uchun yetarli.',
        ),
        h2('Modul yakuni'),
        intro(
          '2-modulni tugatdingiz! Endi Uzum va Yandex Marketda mahsulot tanlash, raqobat tahlili, marja hisoblash va test strategiyasini bilasiz. Keyingi modul — kartochka yaratish va SEO optimizatsiya.',
        ),
        nextStep(
          'Amaliy vazifa: kamida bitta platformada bitta mahsulot uchun to\'liq niche tahlili va marja jadvalini yarating. Keyingi modulga o\'tishdan oldin buni qiling.',
        ),
      ],
    ),
  ],
}
