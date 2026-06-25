import type { WrittenModule } from './types'
import { lesson, intro, h2, h3, ul, ol, tip, warning, nextStep } from './helpers'

export const module5: WrittenModule = {
  num: 5,
  slug: 'modul-5',
  title: 'Reklama va traffic',
  titleRu: 'Реклама и трафик',
  desc: 'Uzum Boost, Yandex Direct, byudjet boshqaruvi, ROAS va reklama optimizatsiyasi.',
  descRu: 'Uzum Boost, Yandex Direct, управление бюджетом, ROAS и оптимизация рекламы.',
  lessonCount: 14,
  hours: 6,
  available: true,
  lessons: [
    lesson('dars-1', 5, 1, 'Boost reklama tizimi', 'Система рекламы Boost', 'uzum', '22 daqiqa', [
      intro(
        'Uzum Market Boost — ichki reklama tizimi bo\'lib, mahsulotlaringizni qidiruv natijalari, kategoriya sahifalari va maxsus bannerlarda ko\'rsatadi. Tashqi reklamadan farqi: xaridor allaqachon sotib olish niyatida platformada.',
      ),
      h2('Boost qanday ishlaydi?'),
      intro(
        'Siz mahsulot yoki toifani tanlaysiz, kunlik byudjet va stavka belgilaysiz. Xaridor reklamani bosganda yoki ko\'rganda pul hisobingizdan yechiladi (CPC yoki CPM modeliga qarab).',
      ),
      ul([
        'Qidiruv natijalarida yuqori pozitsiya — «Reklama» belgisi bilan',
        'Kategoriya ichida «Tavsiya etilgan» bloklari',
        'Asosiy sahifa va aksiya bannerlarida ko\'rinish',
        'Raqobatchilar ham Boost ishlatganda stavka raqobati paydo bo\'ladi',
      ]),
      h2('Boost kabinetiga kirish'),
      ol([
        'seller.uzum.uz → «Reklama» yoki «Boost» bo\'limi',
        'Reklama shartnomasini tasdiqlang (birinchi marta)',
        'Hisobingizda minimal balans bo\'lsin (odatda 100 000 so\'mdan)',
        'Mahsulot kartochkasi «Sotuvda» holatida bo\'lishi kerak',
      ]),
      h3('Qachon Boost ishlatish kerak?'),
      ul([
        'Yangi mahsulot — birinchi 50 ta buyurtma va sharh uchun',
        'Mavsumiy cho\'qqi oldidan (Ramazon, yangi o\'quv yili)',
        'Raqobatchi sizdan past narxda sotsa ham, yuqorida ko\'rinishingiz kerak',
        'Qoldiq ko\'p, lekin organik ko\'rinish past bo\'lsa',
      ]),
      tip(
        'Boostni yoqishdan oldin kartochkani tekshiring: sifatli rasmlar, to\'liq tavsif va raqobatbardosh narx bo\'lmasa, reklama puli behuda ketadi.',
      ),
      warning(
        'Boost faqat sotuvda turgan mahsulotlar uchun ishlaydi. Moderatsiyadan o\'tmagan yoki qoldiq nol bo\'lgan kartochkalar reklamada chiqmaydi.',
      ),
      nextStep(
        'Keyingi darsda birinchi reklama kampaniyasini qadam-baqadam yaratamiz: maqsad, mahsulot tanlash va vaqt oralig\'i.',
      ),
    ]),
    lesson('dars-2', 5, 2, 'Reklama kampaniyasi yaratish', 'Создание рекламной кампании', 'uzum', '25 daqiqa', [
      intro(
        'Kampaniya — bitta maqsad, byudjet va mahsulotlar to\'plami. To\'g\'ri tuzilgan kampaniya katta pul sarflamasdan natija beradi.',
      ),
      h2('Kampaniya turlari'),
      ul([
        'Mahsulot kampaniyasi — aniq SKU yoki bir nechta mahsulot',
        'Kategoriya kampaniyasi — butun toifa (masalan, «Ayollar sumkalari»)',
        'Do\'kon kampaniyasi — brendingizdagi barcha faol mahsulotlar',
        'Aksiya kampaniyasi — chegirma davri bilan bog\'langan reklama',
      ]),
      h2('Yangi kampaniya yaratish'),
      ol([
        'Boost kabinetida «Yangi kampaniya» tugmasini bosing',
        'Maqsadni tanlang: sotuv, trafik yoki brend tan olish',
        'Mahsulot(lar)ni qidiruv orqali qo\'shing',
        'Kunlik byudjet kiriting (masalan, 150 000 so\'m/kun)',
        'Stavka turini tanlang: avtomatik yoki qo\'lda maksimal CPC',
        'Boshlanish va tugash sanasini belgilang',
        'Kampaniyani yoqing va 24 soat kuzating',
      ]),
      h3('Byudjet taqsimoti'),
      intro(
        'Bir nechta mahsulot reklama qilsangiz, eng yuqori marjali va eng ko\'p qoldiqli SKU ga ko\'proq byudjet ajrating. Past marja mahsulotlarni reklamadan vaqtincha olib tashlang.',
      ),
      ul([
        'A mahsulot — 60% byudjet (yuqori konversiya)',
        'B mahsulot — 30% byudjet (o\'sish potensiali)',
        'C mahsulot — 10% byudjet (sinov)',
      ]),
      tip(
        'Birinchi hafta kunlik byudjetni past tuting (50 000–100 000 so\'m). Statistika to\'plangach, foydali kampaniyalarni kengaytiring.',
      ),
      warning(
        'Kampaniya yaratishda «cheksiz byudjet» rejimini yoqmang — bir kechada butun balans ketishi mumkin.',
      ),
      nextStep(
        'Keyingi darsda stavkalar va byudjetni chuqurroq boshqaramiz: CPC, CPM va kunlik limitlar.',
      ),
    ]),
    lesson('dars-3', 5, 3, 'Byudjet va stavkalar', 'Бюджет и ставки', 'uzum', '24 daqiqa', [
      intro(
        'Reklama samaradorligi byudjet va stavka tanloviga bog\'liq. Boostda asosiy modellar — CPC (har bosish uchun to\'lov) va ba\'zi joylarda CPM (1000 ko\'rinish uchun).',
      ),
      h2('CPC stavka qanday belgilanadi?'),
      intro(
        'Stavka — bir bosish uchun to\'laydigan maksimal summa. Yuqori stavka = yuqoriroq pozitsiya, lekin har bir bosish qimmatroq.',
      ),
      ul([
        'Platforma tavsiya qilgan minimal stavkadan boshlang',
        'Raqobatchilar stavkasini taxmin qiling (kategoriya qiziqishiga qarab)',
        'Kunlik byudjet = taxminiy bosishlar × o\'rtacha CPC',
        'Haftada bir marta stavkani statistikaga qarab sozlang',
      ]),
      h2('Kunlik va oylik byudjet'),
      ol([
        'Kunlik limit — bir kunda sarflanadigan maksimum',
        'Umumiy kampaniya byudjeti — butun davr uchun ceiling',
        'Balans tugasa reklama to\'xtaydi — avtomatik to\'ldirishni yoqing',
        'Oylik reja: sotuv foydasining 10–20% ini reklamaga ajrating',
      ]),
      h3('Stavka optimizatsiyasi'),
      ul([
        'CTR yuqori, lekin sotuv kam — narx yoki kartochka muammosi, stavkani oshirmang',
        'CTR past — sarlavha/rasm sinab ko\'ring, stavkani biroz oshiring',
        'CPC juda yuqori — kengroq kalit so\'z yoki kategoriya reklamasiga o\'ting',
      ]),
      tip(
        '«Avtomatik stavka» yangi sotuvchilar uchun qulay. 2 hafta ma\'lumot to\'plangach, qo\'lda boshqarishga o\'ting.',
      ),
      warning(
        'Byudjetni keskin oshirish organik reytingga zarar bermaydi, lekin ROAS tushsa foyda kamayadi. Har doim foyda/ko\'rsatkich nisbati bilan qaroring.',
      ),
      nextStep(
        'Keyingi darsda qidiruv va kategoriya bo\'yicha kalit so\'zlarni tanlash strategiyasini o\'rganamiz.',
      ),
    ]),
    lesson('dars-4', 5, 4, 'Kalit so\'zlar tanlash', 'Выбор ключевых слов', 'uzum', '26 daqiqa', [
      intro(
        'Kalit so\'z — xaridor qidiruv satriga yozadigan so\'z yoki ibora. To\'g\'ri kalit so\'zlar sizni maqsadli auditoriyaga yetkazadi, noto\'g\'ri — pulni behuda sarflaydi.',
      ),
      h2('Kalit so\'z manbalari'),
      ul([
        'Uzum qidiruv takliflari — xaridorlar nima qidirayotganini ko\'rsatadi',
        'Raqobatchi kartochka sarlavhalari',
        'Google Trends va O\'zbekiston bo\'yicha qidiruv statistikasi',
        'O\'z sotuv tarixingizdagi qidiruv so\'rovlari (agar mavjud bo\'lsa)',
      ]),
      h2('Kalit so\'z turlari'),
      h3('Issiq (hot) kalit so\'zlar'),
      intro('Aniq sotib olish niyati: «iphone 15 qopqoq», «erkaklar krossovkasi 42 razmer». Konversiya yuqori, raqobat ham kuchli.'),
      h3('Issiq emas (cold) kalit so\'zlar'),
      intro('Umumiy qidiruv: «sovg\'a», «uy uchun narsa». Trafik ko\'p, konversiya past — faqat brending uchun.'),
      h2('Tanlash qoidalari'),
      ol([
        'Mahsulot nomi + brend + model + xususiyat kombinatsiyasi',
        'Lotin va kirill variantlarini alohida sinab ko\'ring',
        'Minus so\'zlar: bepul, arzon (agar premium segment bo\'lsangiz)',
        'Har 50 ta bosishdan keyin foydasiz so\'rovlarni o\'chiring',
        'Mavsumiy so\'zlarni vaqtida qo\'shing (qishki kurtka, yozgi shlyapa)',
      ]),
      tip(
        'Sarlavhangizdagi birinchi 3–4 so\'z odatda eng muhim kalit so\'zlar. Boost reklamasi ham shu so\'zlar bo\'yicha ishlaydi.',
      ),
      warning(
        'Boshqa brend nomini o\'z sarlavhangizga yozmang — bu Uzum qoidalariga zid va kartochka bloklanishi mumkin.',
      ),
      nextStep(
        'Keyingi darsda reklama trafikini sotuvga aylantirish — konversiya tahlilini o\'rganamiz.',
      ),
    ]),
    lesson('dars-5', 5, 5, 'Konversiya tahlili', 'Анализ конверсии', 'uzum', '28 daqiqa', [
      intro(
        'Konversiya — reklama orqali kelgan xaridorlarning qancha qismi haqiqiy buyurtma berganini ko\'rsatadi. Boost kabinetida va umumiy statistikada bu ko\'rsatkichni kuzatish shart.',
      ),
      h2('Asosiy metrikalar'),
      ul([
        'Ko\'rinishlar (impressions) — reklama necha marta ko\'rsatildi',
        'Bosishlar (clicks) — necha marta kartochkaga o\'tildi',
        'CTR = bosishlar ÷ ko\'rinishlar × 100%',
        'Buyurtmalar — reklamadan kelgan sotuvlar soni',
        'Konversiya = buyurtmalar ÷ bosishlar × 100%',
      ]),
      h2('Yaxshi va yomon ko\'rsatkichlar'),
      intro('Kategoriyaga qarab farq qiladi, lekin umumiy yo\'riqnoma:'),
      ul([
        'CTR 1% dan past — rasm yoki sarlavha zaif',
        'CTR 2–5% — o\'rtacha yaxshi',
        'Konversiya 3% dan past — narx, sharh yoki tavsif muammosi',
        'Konversiya 5–10% — yaxshi optimallashtirilgan kartochka',
      ]),
      h2('Tahlil bosqichlari'),
      ol([
        'Boost hisobotini kunlik yuklab oling',
        'Eng yuqori CTR li mahsulotlarni ajrating',
        'Past konversiyali mahsulotda narx va sharhlarni tekshiring',
        'A/B: bir xil mahsulotning ikki xil birinchi rasmini sinab ko\'ring',
        '7 kunlik o\'rtacha bilan 30 kunlik o\'rtachani solishtiring',
      ]),
      h3('Attributsiya'),
      intro(
        'Ba\'zi xaridorlar reklamadan bosib, keyin organik qaytadi. Uzum odatda 7 kunlik attributsiya oynasidan foydalanadi — shu sababli reklama natijasi kechikib ko\'rinishi mumkin.',
      ),
      tip(
        'Faqat CTR ga qaramang. Yuqori CTR + nol sotuv = noto\'g\'ri auditoriya yoki chalg\'ituvchi reklama.',
      ),
      warning(
        'Birinchi 3 kun statistikasi yetarli emas — kamida 100 ko\'rinish yoki 20 bosish to\'plangach qaror qiling.',
      ),
      nextStep(
        'Keyingi darsda reklama investitsiyasining qaytimini — ROAS formulasi va amaliy hisob-kitobni ko\'rib chiqamiz.',
      ),
    ]),
    lesson('dars-6', 5, 6, 'ROAS hisoblash', 'Расчёт ROAS', 'uzum', '24 daqiqa', [
      intro(
        'ROAS (Return On Ad Spend) — reklamaga sarflangan har bir so\'m (yoki dollar) uchun qancha daromad olinganini ko\'rsatadi. Bu reklamani davom ettirish yoki to\'xtatishning asosiy raqami.',
      ),
      h2('ROAS formulasi'),
      intro('ROAS = Reklama orqali olingan daromad ÷ Reklama xarajati'),
      h3('Misol'),
      ul([
        'Reklamaga sarflangan: 500 000 so\'m',
        'Reklama orqali sotuv: 2 500 000 so\'m',
        'ROAS = 2 500 000 ÷ 500 000 = 5 (yoki 500%)',
        'Har 1 so\'m reklama uchun 5 so\'m daromad',
      ]),
      h2('Foydali ROAS chegarasi'),
      intro(
        'Foydali ROAS — xarajatlaringiz (tovar, yetkazish, komissiya, soliq) ni qoplaganidan keyin qolgan foyda bilan bog\'liq.',
      ),
      ol([
        'Mahsulot marjasini hisoblang: (sotuv narxi − tannarx − komissiya − yetkazish)',
        'Minimal ROAS = 1 ÷ marja foizi (masalan, 30% marja → ROAS kamida 3.3 kerak)',
        'Maqsadli ROAS odatda minimaldan 20–30% yuqori bo\'lsin',
        'Past ROAS kampaniyalarni to\'xtating yoki kartochkani yaxshilang',
      ]),
      h2('ROAS ni oshirish usullari'),
      ul([
        'Past konversiyali kalit so\'zlarni o\'chirish',
        'Yuqori marjali mahsulotlarga byudjetni ko\'chirish',
        'Chegirma o\'rniga to\'plam (bundle) taklif qilish',
        'Sharh va reytingni yaxshilash — konversiya o\'sadi, ROAS ham',
      ]),
      tip(
        'Excel yoki Google Sheets da oylik ROAS jadvali yuriting: kampaniya nomi, xarajat, daromad, ROAS, qaror (davom/to\'xtat).',
      ),
      warning(
        'ROAS ni faqat reklama daromadi bilan hisoblang — organik sotuvni aralashtirmang, aks holda samaradorlikni ortiqcha baholaysiz.',
      ),
      nextStep(
        'Keyingi darsda Uzum Boost reklamasini doimiy optimizatsiya qilish — haftalik rutin va checklist.',
      ),
    ]),
    lesson('dars-7', 5, 7, 'Reklamani optimizatsiya qilish', 'Оптимизация рекламы', 'uzum', '26 daqiqa', [
      intro(
        'Reklama «bir marta sozlab, unutish» emas. Haftalik optimizatsiya ROAS ni 20–40% ga oshirishi mumkin. Quyida Uzum Boost uchun amaliy rutin.',
      ),
      h2('Haftalik optimizatsiya checklist'),
      ol([
        'ROAS 2 dan past kampaniyalarni to\'xtatish yoki kartochkani yangilash',
        'Eng yaxshi 3 mahsulotga byudjetni 15% oshirish',
        'CTR past 5 ta kalit so\'zni o\'chirish',
        'Yangi mahsulot qo\'shish — eng kamida 1 ta A/B sinov',
        'Balans va kunlik limitlarni tekshirish',
        'Raqobatchi narx o\'zgarishiga javob (narx yoki reklama stavkasi)',
      ]),
      h2('Kartochka + reklama bog\'liqligi'),
      ul([
        'Reklama trafik keltiradi — kartochka sotadi',
        'Rasm o\'zgartirish → CTR o\'zgarishi → 48 soat kuzating',
        'Narx tushirish → konversiya o\'sishi → ROAS yaxshilanishi',
        'Sharh javoblari → ishonch → yuqori konversiya',
      ]),
      h3('Mavsumiy sozlash'),
      intro(
        'Ramazon oldi, Navruz, yangi o\'quv yili — byudjetni oldindan oshiring. Mavsum tugagach, stavkani pasaytiring, aks holda CPC qimmatlashadi.',
      ),
      tip(
        'Har oyning 1-sanasida o\'tgan oy reklama hisobotini saqlang. 6 oylik trend sizga qaysi mahsulot doim foydali ekanini ko\'rsatadi.',
      ),
      warning(
        'Bir vaqtning o\'zida hamma narsani o\'zgartirmang — rasm, narx va stavkani bir kunda emas, alohida sinab ko\'ring.',
      ),
      nextStep(
        'Uzum qismi tugadi. Keyingi 7 ta darsda Yandex Direct va Market reklamasini o\'rganamiz — Rossiya va MDH auditoriyasiga chiqish.',
      ),
    ]),
    lesson('dars-8', 5, 8, 'Yandex Direct kirish', 'Введение в Yandex Direct', 'yandex', '24 daqiqa', [
      intro(
        'Yandex Direct — Rossiyaning yirik kontekst reklama tizimi. Yandex Market mahsulotlaringizni qidiruv, Yandex xizmatlari va hamkor saytlarda ko\'rsatish uchun Direct bilan bog\'lanadi.',
      ),
      h2('Direct va Market bog\'lanishi'),
      ul([
        'Market partner kabinetida reklama bo\'limi Direct akkauntiga ulanadi',
        'Mahsulot ofertalari avtomatik reklama materiallariga aylanadi',
        'Qidiruvda «Yandex Market» blokida mahsulotingiz chiqishi mumkin',
        'To\'lov rubl da, Direct balansidan yechiladi',
      ]),
      h2('Direct akkaunt ochish'),
      ol([
        'direct.yandex.ru ga Yandex ID bilan kiring',
        '«Reklamachi» sifatida ro\'yxatdan o\'ting',
        'To\'lov usulini ulang (bank karta, yuridik shaxs hisobi)',
        'Market partner kabinetida Direct integratsiyasini yoqing',
        'Minimal depozit kiriting (odatda 3000 ₽ dan)',
      ]),
      h2('Reklama formatlari'),
      ul([
        'Mahsulot reklamasi (Product Ads) — rasm, narx, do\'kon nomi',
        'Matnli reklama — sarlavha va tavsif bilan',
        'Smart-banner — avtomatik dizayn',
        'Retargeting — saytinga yoki Market do\'koningizga kirganlarga',
      ]),
      tip(
        'Rus tilida yaxshi kartochka — Direct reklamasining asosi. Sarlavha va tavsifni native rus tilida yozing, tarjima dasturi emas.',
      ),
      warning(
        'O\'zbekiston subyekti sifatida to\'lov va soliq qoidalari murakkab bo\'lishi mumkin. Shartnoma va valyuta konversiyasini oldindan hisob-kitob qiling.',
      ),
      nextStep(
        'Keyingi darsda birinchi Yandex Direct kampaniyasini Market mahsulotlari uchun sozlaymiz.',
      ),
    ]),
    lesson('dars-9', 5, 9, 'Kampaniya sozlash', 'Настройка кампании', 'yandex', '28 daqiqa', [
      intro(
        'Yandex Direct kampaniyasi — maqsad, geografiya, byudjet va reklama guruhlaridan iborat. Market sotuvchilari uchun mahsulot reklamasi eng samarali format.',
      ),
      h2('Kampaniya yaratish bosqichlari'),
      ol([
        'Direct kabinetida «Kampaniya yaratish» → «Mahsulot reklamasi»',
        'Market do\'konini ulang — ofertalar import qilinadi',
        'Geografiya: Rossiya, Qozog\'iston, O\'zbekiston (qaysi hududga yetkazsangiz)',
        'Kunlik byudjet: boshlang\'ich 500–1500 ₽/kun',
        'Strategiya: «Maksimal bosishlar» yoki «Maksimal konversiya»',
        'Reklama guruhlarini kategoriya bo\'yicha ajrating',
        'Kampaniyani moderatsiyaga yuboring (1–24 soat)',
      ]),
      h2('Reklama guruhi tuzilishi'),
      ul([
        'Har kategoriya — alohida guruh (elektronika, kiyim, uy-ro\'zg\'or)',
        'Guruh ichida filtr: narx oralig\'i, brend, qoldiq mavjud',
        'Har guruhga alohida stavka multiplier',
        'Past performansli ofertalarni guruhdan olib tashlash',
      ]),
      h3('Moderatsiya talablari'),
      intro(
        'Yandex reklama qoidalariga rioya qiling: nohaq da\'vo, taqiqlangan mahsulot, yolg\'on chegirma reklamada bo\'lmasin. Rad etilsa sabab ko\'rsatiladi.',
      ),
      tip(
        'Birinchi kampaniyada faqat 10–20 ta eng yaxshi sotuvchi SKU ni reklama qiling. Katalogni to\'liq ochmang — byudjet tarqalib ketadi.',
      ),
      warning(
        'FBY/DBS yetkazish vaqtingiz uzoq bo\'lsa, reklamada va\'da qilingan muddat bilan mos kelmasin — bu qaytarish va reyting tushishiga olib keladi.',
      ),
      nextStep(
        'Keyingi darsda Direct byudjetini boshqarish: kunlik limit, strategiya va mavsumiy rejalashtirish.',
      ),
    ]),
    lesson('dars-10', 5, 10, 'Byudjet boshqaruvi', 'Управление бюджетом', 'yandex', '25 daqiqa', [
      intro(
        'Yandex Direct byudjeti rubl da. Noto\'g\'ri boshqaruv tez pul ketishiga yoki raqobatda qolib ketishga olib keladi. Maqsad — barqaror kunlik xarajat va bashorat qilinadigan ROAS.',
      ),
      h2('Byudjet turlari'),
      ul([
        'Kunlik byudjet — Direct kuniga sarflashi mumkin bo\'lgan summa',
        'Haftalik/oylik reja — Excel da kuzatish uchun (Direct ichida emas)',
        'Umumiy kampaniya byudjeti — ma\'lum summa tugaguncha ishlaydi',
        'Avtomatik strategiya byudjeti — algoritm o\'zi taqsimlaydi',
      ]),
      h2('Strategiya tanlash'),
      h3('Boshlang\'ich bosqich'),
      intro('«Eng ko\'p bosishlar» yoki «Optimal bosishlar» — trafik to\'plash uchun. 2 hafta ma\'lumot kerak.'),
      h3('O\'sish bosqichi'),
      intro('«Maksimal konversiya» yoki maqsadli CPA — sotuv ma\'lum bo\'lgach. Direct o\'zi stavkani sozlaydi.'),
      ol([
        'Birinchi oy: kunlik 500 ₽, faqat eng yaxshi 15 SKU',
        'Ikkinchi oy: foydali guruhlarga 1000 ₽/kun',
        'Uchinchi oy: retargeting qo\'shish — alohida 300 ₽/kun',
        'Har hafta ROAS tekshiruvi — 3 dan past bo\'lsa byudjetni 20% kamaytiring',
      ]),
      tip(
        'Rubl kursi o\'zgarishini kuzating. O\'zbekiston sotuvchisi uchun haqiqiy xarajat so\'mda hisoblansin — foyda marjasi shu asosda.',
      ),
      warning(
        'Direct tungi soatlarda ham ishlashi mumkin. Agar kechqurun buyurtma qabul qilmasangiz, vaqt jadvali (schedule) sozlamasini ishlating.',
      ),
      nextStep(
        'Keyingi darsda maqsadli auditoriya: geografiya, demografiya va qiziqishlar bo\'yicha segmentatsiya.',
      ),
    ]),
    lesson('dars-11', 5, 11, 'Maqsadli auditoriya', 'Целевая аудитория', 'yandex', '26 daqiqa', [
      intro(
        'To\'g\'ri auditoriya — reklama xarajatining yarmini tejaydi. Yandex Direct geografiya, yosh, jins, qurilma va qiziqishlar bo\'yicha targeting beradi.',
      ),
      h2('Geografik targeting'),
      ul([
        'Yetkazish hududingiz bilan mos keladigan shahar va mintaqalar',
        'Moskva va SPb — yuqori raqobat, yuqori CPC',
        'Ikkinchi daraja shaharlar — arzonroq trafik, ba\'zan yaxshi konversiya',
        'MDH mamlakatlari — alohida kampaniya oching (til va valyuta farqi)',
      ]),
      h2('Demografik filtrlar'),
      ol([
        'Mahsulot kimga mo\'ljallangan — yosh va jinsni belgilang',
        'Bolalar mahsuloti — ota-onalar 25–45 yosh segmenti',
        'Premium elektronika — yuqori daromadli mintaqalar + 25+ yosh',
        'Keng targeting — faqat brending; tor targeting — sotuv uchun',
      ]),
      h2('Retargeting'),
      intro(
        'Market do\'koningizga kirgan, lekin sotib olmagan foydalanuvchilarga qayta reklama — eng yuqori konversiyali segment.',
      ),
      ul([
        '7 kun ichida ko\'rganlar — tez qaror qiladi',
        '30 kun ichida savatga qo\'yganlar — maxsus chegirma taklif',
        'Retargeting byudjeti asosiy kampaniyaning 15–25% i bo\'lsin',
      ]),
      tip(
        'Yandex Metrica (analitika) ni Market do\'koningizga ulang — qaysi shahar va qurilmadan konversiya yuqori ekanini ko\'rasiz.',
      ),
      warning(
        'Juda tor auditoriya — trafik yetishmasligi. Kamida 1000 ko\'rinish/hafta bo\'lishini kuzating, aks holda filtrlarni kengayting.',
      ),
      nextStep(
        'Keyingi darsda reklama matnlari va sarlavhalarni yozish — rus tilida konversiya qiladigan copywriting.',
      ),
    ]),
    lesson('dars-12', 5, 12, 'Reklama matnlari', 'Рекламные тексты', 'yandex', '24 daqiqa', [
      intro(
        'Mahsulot reklamasida matn avtomatik ofertadan olinadi, lekin qo\'lda kampaniyalar va smart-bannerlar uchun siz o\'zingiz yozasiz. Yaxshi matn CTR ni ikki baravar oshirishi mumkin.',
      ),
      h2('Sarlavha qoidalari'),
      ul([
        '65 belgigacha — to\'liq ko\'rinishi uchun qisqa',
        'Asosiy foyda boshida: «Tez yetkazish», «Rasmiy kafolat»',
        'Raqam va aniq taklif: «−20% bugun», «Bepul qaytarish 14 kun»',
        'Taqiqlangan: «eng yaxshi», «№1» (tasdiqsiz superlativlar)',
      ]),
      h2('Tavsif (2-qator)'),
      ol([
        'Mahsulot xususiyati + afzallik',
        'Ishonch elementi: «5000+ sotuv», «4.8 reyting»',
        'Call-to-action: «Buyurtma bering», «Marketda ko\'ring»',
        '3–4 variant yozib A/B sinov o\'tkazing',
        'Imlo va punktuatsiyani tekshiring — xato ishonchni pasaytiradi',
      ]),
      h2('Rus tilida yozish maslahatlari'),
      intro(
        'O\'zbek sotuvchi sifatida professional rus tili muhim. Native speaker yoki yaxshi tarjimon bilan tekshiring.',
      ),
      ul([
        'Formal «Вы» yoki informal «ты» — brend ohangiga qarab',
        'Mahalliy so\'zlar: «доставка», «скидка», «гарантия»',
        'Kategoriya jargonidan foydalaning (SMART TV, OLED va hokazo)',
      ]),
      tip(
        'Raqobatchi reklamalarini Yandex qidiruvida ko\'ring — «reklama» belgisi bilan chiqadigan natijalar namuna beradi.',
      ),
      warning(
        'Boshqa brend nomini o\'z reklama matningizda ishlatmang — huquqiy va platforma qoidalariga zid.',
      ),
      nextStep(
        'Keyingi darsda Direct statistikasini o\'qish va haftalik tahlil qilish.',
      ),
    ]),
    lesson('dars-13', 5, 13, 'Statistika va tahlil', 'Статистика и анализ', 'yandex', '27 daqiqa', [
      intro(
        'Yandex Direct batafsil statistika beradi: ko\'rinish, bosish, xarajat, konversiya, CPA. Market sotuvlari bilan solishtirib haqiqiy ROAS ni hisoblang.',
      ),
      h2('Direct hisobot bo\'limlari'),
      ul([
        'Kampaniyalar — umumiy xarajat va bosishlar',
        'Guruhlar — kategoriya bo\'yicha taqqoslash',
        'Ofertalar — qaysi SKU eng foydali',
        'Geografiya — shahar bo\'yicha konversiya',
        'Qurilma — mobil vs desktop',
      ]),
      h2('Asosiy ko\'rsatkichlar'),
      ol([
        'CTR — reklama jozibasi',
        'CPC — o\'rtacha bosish narxi',
        'Konversiya — Market buyurtmasiga aylanish',
        'CPA = xarajat ÷ buyurtmalar soni',
        'ROAS = reklama daromadi ÷ xarajat',
      ]),
      h2('Haftalik tahlil rutini'),
      intro('Har dushanba 30 daqiqa ajrating:'),
      ul([
        'O\'tgan hafta xarajat vs reja',
        'Eng yaxshi va eng yomon 5 oferta',
        'Geografiya bo\'yicha CPA farqi',
        'Yangi A/B sinov natijasi',
        'Byudjet o\'zgarish qarorlari',
      ]),
      h3('Market + Direct birlashtirish'),
      intro(
        'Direct faqat trafik keltiradi — yakuniy sotuv Market kabinetida. Ikkala hisobotni bitta jadvalda birlashtiring (sana, xarajat, buyurtmalar, daromad).',
      ),
      tip(
        'Direct dan CSV eksport → Google Sheets. Pivot jadval bilan tez tahlil qiling.',
      ),
      warning(
        'Attributsiya farqi: Direct bosish bugun, buyurtma 3 kun keyin bo\'lishi mumkin. Kamida 7 kunlik kechikish bilan tahlil qiling.',
      ),
      nextStep(
        'Modulning oxirgi darsida Yandex kampaniyalarini doimiy optimizatsiya qilish strategiyasi.',
      ),
    ]),
    lesson('dars-14', 5, 14, 'Kampaniyani optimizatsiya', 'Оптимизация кампании', 'yandex', '26 daqiqa', [
      intro(
        'Yandex Direct optimizatsiyasi — doimiy jarayon. Algoritm va raqobat o\'zgaradi; siz ham stavka, auditoriya va materiallarni yangilab turishingiz kerak.',
      ),
      h2('Optimizatsiya prioritetlari'),
      ol([
        'ROAS past ofertalarni o\'chirish yoki stavkani pasaytirish',
        'CPA yuqori geografiyalarni cheklash',
        'Yuqori CTR matnlarni kengaytirish, past CTR ni almashtirish',
        'Retargeting auditoriyasini kengaytirish (30 → 60 kun)',
        'Mavsumiy byudjet o\'zgarishlari',
        'Yangi mahsulotlarni sinov guruhiga qo\'shish',
      ]),
      h2('Avtomatik vs qo\'lda boshqaruv'),
      ul([
        'Birinchi 2 hafta — qo\'lda, o\'rganish uchun',
        'Ma\'lumot to\'plangach — «Maksimal konversiya» strategiyasi',
        'Katta katalog (500+ SKU) — avtomatik oferta reklamasi + qo\'lda guruhi filtri',
        'Har oyda bir marta «toza» audit: o\'chirilgan mahsulotlar, eskirgan narxlar',
      ]),
      h2('Modul yakuni'),
      intro(
        '5-modulni tugatdingiz! Endi Uzum Boost va Yandex Direct orqali maqsadli trafik olish, ROAS hisoblash va reklamani optimizatsiya qilishni bilasiz.',
      ),
      ul([
        'Uzum: Boost kampaniya, stavka, kalit so\'z, konversiya, ROAS',
        'Yandex: Direct, byudjet, auditoriya, matn, statistika, optimizatsiya',
        'Ikkala platformada ham kartochka sifati = reklama samaradorligi',
      ]),
      tip(
        'Amaliy vazifa: Uzumda 1 ta Boost kampaniya oching yoki Yandex Direct da 10 ta SKU bilan sinov kampaniyasi yarating. 7 kun statistika yig\'ib, ROAS hisoblang.',
      ),
      warning(
        'Reklama sotuv o\'rnini bosmaydi — past sifatli mahsulot yoki yomon xizmat reklamadan kelgan xaridorni ham yo\'qotadi. Avval kartochka va xizmat, keyin masshtab reklama.',
      ),
      nextStep(
        'Keyingi modul — «Logistika va omborxona»: FBO, FBS, FBY va qaytarish jarayonlarini chuqur o\'rganamiz.',
      ),
    ]),
  ],
}
