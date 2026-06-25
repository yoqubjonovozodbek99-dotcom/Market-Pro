import type { WrittenModule } from './types'
import { lesson, intro, h2, h3, ul, ol, tip, warning, nextStep } from './helpers'

export const module8: WrittenModule = {
  num: 8,
  slug: 'modul-8',
  title: 'Biznesni kengaytirish',
  titleRu: 'Масштабирование бизнеса',
  desc: 'Ko\'p mahsulotli do\'kon, jamoa, avtomatlashtirish, soliqlar, brend va xalqaro kengayish.',
  descRu: 'Магазин с множеством товаров, команда, автоматизация, налоги, бренд и международное расширение.',
  lessonCount: 10,
  hours: 4,
  available: true,
  lessons: [
    lesson(
      'dars-1',
      8,
      1,
      'Ko\'p mahsulotli do\'kon',
      'Магазин с множеством товаров',
      'uzum',
      '22 daqiqa',
      [
        intro(
          'Birinchi oylarda 5–15 ta mahsulot bilan boshlash tabiiy. Lekin barqaror savdo paydo bo\'lgach, katalog kengaytirish — o\'sishning asosiy yo\'li. Uzum Marketda yuzlab va minglab SKU bilan ishlash alohida tizim va jarayon talab qiladi.',
        ),
        h2('Qachon katalogni kengaytirish kerak?'),
        ul([
          'Asosiy mahsulotlaringiz oylik aylanmasi barqaror va foydali',
          'Buyurtmalarni bitta o\'zingiz qayta-qayta kechqurun qayta ishlamayapsiz',
          'Mavjud mahsulotlarda qidiruv bo\'yicha yuqori pozitsiyaga yetdingiz',
          'Xaridorlar do\'koningizda boshqa mahsulotlar ham bormi deb so\'rayapti',
        ]),
        h2('Kategoriya va assortiment strategiyasi'),
        intro(
          'Tasodifiy mahsulot qo\'shish o\'rniga «mahsulot daraxti» yarating: asosiy kategoriya → kichik kategoriya → o\'xshash va qo\'shimcha mahsulotlar. Masalan, uy ro\'zg\'or buyumlari sotasiz — shu kategoriyada choynak, idish-tovoq va oshxona aksessuarlarini bir-biriga bog\'lang.',
        ),
        h3('Assortiment qoidalari'),
        ol([
          '80/20 qoidasi: daromadning 80% ini 20% mahsulot beradi — avval ularni kuchaytiring',
          'Har yangi SKU uchun minimal marja va aylanma prognozi yozing',
          'Bir vaqtning o\'zida 10–20 ta emas, 3–5 ta mahsulot qo\'shing va natijani kuzating',
          'Past aylanmali mahsulotlarni 60 kundan keyin olib tashlash yoki chegirma bilan chiqarish',
        ]),
        h2('Uzum Marketda katalog boshqaruvi'),
        ul([
          'Excel yoki API orqali ommaviy yuklash — 50+ mahsulotda qo\'lda kiritish vaqt o\'tkazadi',
          'Har mahsulot uchun alohida SKU va shtrix-kod — ombor chalkashligini oldini oladi',
          'Kategoriya va atributlarni to\'g\'ri tanlang: noto\'g\'ri kategoriya qidiruvda ko\'rinmaslikka olib keladi',
          'O\'z magazin brendingiz: bitta uslubdagi rasmlar va sarlavha formati ishonch beradi',
        ]),
        tip(
          'Kengaytirishdan oldin ombor va yetkazib berish hajmini hisoblang. 100 ta mahsulot sotsangiz ham, 3 ta eng ko\'p sotiladigan mahsulotning zaxirasi tugasa, reyting tushadi. Avval top-10 mahsulot uchun 2 haftalik zaxira saqlang.',
        ),
        h2('FBO vs FBS: kengayishda tanlov'),
        intro(
          'Katalog kattalashganda FBO (Uzum omboriga yuborish) ko\'pincha tezroq yetkazish va yuqori reyting beradi. FBS esa yangi va noaniq aylanmali mahsulotlarni sinash uchun qulay. Amaliy yondashuv: bestsellerlarni FBO, yangi pozitsiyalarni FBS da sinab ko\'ring.',
        ),
        warning(
          'Bir vaqtning o\'zida juda ko\'p kategoriyaga kirib ketmang. Uzum algoritmi va xaridorlar ixtisoslashtirilgan do\'konlarga ishonadi. 2–3 asosiy kategoriyada chuqur assortiment o\'rtacha 5 ta yuzaki kategoriyadan ko\'ra yaxshi natija beradi.',
        ),
        h2('Amaliy vazifa'),
        intro(
          'Hozirgi katalogingizni tahlil qiling: eng ko\'p sotiladigan 5 ta mahsulot, eng foydali 5 ta mahsulot va 30 kundan ko\'p sotilmagan mahsulotlarni ajrating. Keyingi oy uchun 5 ta yangi mahsulot ro\'yxatini faqat mavjud kategoriyangiz ichida tuzing.',
        ),
        nextStep(
          'Keyingi darsda jamoa yollash va rollarni ajratishni ko\'rib chiqamiz — katalog kattalashganda yolg\'iz ishlash chegarasi tez yetadi.',
        ),
      ],
    ),
    lesson(
      'dars-2',
      8,
      2,
      'Jamoa yollash',
      'Найм команды',
      'uzum',
      '24 daqiqa',
      [
        intro(
          'Ko\'p sotuvchilar «yana bir odam qancha pulga tushadi?» deb o\'ylaydi. Aslida savol shu: «Qaysi ishlar sizning vaqtingizni eng qimmat narsadan — strategiya va o\'sishdan — olib qo\'yapti?» Jamoa yollash shu ishlarni yuklash uchun kerak.',
        ),
        h2('Qachon yollash vaqti keladi?'),
        ul([
          'Kuniga 15+ buyurtma va barcha jarayonlarni o\'zingiz bajaryapsiz',
          'Buyurtma yig\'ish, qadoqlash yoki mijozlarga javob berish kechqurunlarga cho\'zilyapti',
          'Reklama va yangi mahsulot qidirish uchun haftada 2 soatdan kam vaqt qolyapti',
          'Oylik aylanma barqaror va yollash xarajatini qoplashga yetadi',
        ]),
        h2('Birinchi yollashlar: qaysi rollar?'),
        h3('1-bosqich (10–30 buyurtma/kun)'),
        ul([
          'Ombor yordamchisi — qadoqlash, yig\'ish, qaytarishlar',
          'Kontent menejeri — rasmlar, sarlavhalar, kartochka yangilash (part-time ham bo\'ladi)',
        ]),
        h3('2-bosqich (30+ buyurtma/kun)'),
        ul([
          'Operatsion menejer — ombor, yetkazib berish va buyurtma jarayoni',
          'Mijozlar bilan ishlash — chat, sharhlar, nizo hal qilish',
          'Moliya va hisob — soliq, yechim, ta\'minotchilar bilan hisob-kitob',
        ]),
        h2('Yollash manbalari O\'zbekistonda'),
        ol([
          'Ishbor.uz, HeadHunter, Telegram ish guruhlari',
          'Mahalliy kollej va universitet talabalari (part-time ombor ishchi)',
          'Tanish tavsiyasi — marketplace tajribasi bor odam tezroq moslashadi',
          'Outsourcing: qadoqlash xizmati yoki buxgalteriya alohida shartnoma bilan',
        ]),
        tip(
          'Birinchi xodimni to\'liq stavka emas, sinov davri (1 oy) bilan oling. Aniq KPI bering: masalan, «kuniga 40 ta buyurtma qadoqlash, xato 1% dan kam». Natijani raqam bilan o\'lchang.',
        ),
        h2('Jarayonlarni hujjatlashtirish'),
        intro(
          'Jamoa kattalashganda «boshda qanday qilardim» bilimi yetmaydi. Oddiy Google Doc yoki Notion da qisqa yo\'riqnomalar yarating: buyurtma qabul qilish, qadoqlash standarti, qaytarish qoidalari, ta\'minotchiga buyurtma berish. Har yangi xodim 1-haftada shu hujjatlarni o\'qiydi.',
        ),
        warning(
          'Sotuvchi kabinet parolini hammaga bermang. Uzum Marketda rollar bo\'yicha cheklangan kirish imkoniyatini tekshiring. Moliyaviy bo\'lim va pul yechish faqat ishonchli odamda bo\'lsin.',
        ),
        h2('Outsourcing vs ichki jamoa'),
        ul([
          'Outsourcing: tez boshlash, loyiha bo\'yicha to\'lov, lekin sifat nazorati qiyin',
          'Ichki jamoa: uzoq muddatda arzonroq, sizning standartlaringiz, lekin boshqaruv va soliq yuklari bor',
          'Gibrid model ko\'p hollarda eng yaxshi: ombor ichkarida, dizayn va buxgalteriya tashqarida',
        ]),
        nextStep(
          'Keyingi darsda qo\'lda qilinadigan ishlarni dasturiy ta\'minot bilan avtomatlashtirish — jamoa samaradorligini ikki baravar oshirish yo\'llarini o\'rganamiz.',
        ),
      ],
    ),
    lesson(
      'dars-3',
      8,
      3,
      'Avtomatlashtirish',
      'Автоматизация',
      'uzum',
      '26 daqiqa',
      [
        intro(
          'Avtomatlashtirish — bu robotlar o\'rniga odamlarni qo\'yish emas. Bu takroriy, xato beradigan ishlarni dasturga topshirish: zaxira yangilash, narx sinxronlash, hisobot yig\'ish. Uzum Marketda o\'sish tezligi ko\'pincha avtomatlashtirish darajasiga bog\'liq.',
        ),
        h2('Avval nimani avtomatlashtirish kerak?'),
        ol([
          'Zaxira va qoldiq yangilash — qo\'lda xato eng ko\'p shu yerda',
          'Buyurtma holati va bildirishnomalar',
          'Kunlik/haftalik savdo hisobotlari',
          'Narx monitoringi va raqobatchilar taqqoslashi',
          'Hisob-faktura va ta\'minotchilar bilan hujjatlar',
        ]),
        h2('Asosiy vositalar'),
        h3('Marketplace integratsiyasi'),
        ul([
          'Uzum Market API yoki rasmiy integratsiya — katalog va qoldiq sinxronlash',
          'Sellerboard, MPStats kabi tahlil vositalari (mavjud bo\'lsa) — KPI dashboard',
          'Google Sheets + Apps Script — kichik hajm uchun bepul va moslashuvchan',
        ]),
        h3('Ombor va hisob'),
        ul([
          'MoySklad, 1C yoki oddiy ombor jadvali — kirim-chiqim nazorati',
          'Telegram bot — yangi buyurtma haqida darhol xabar',
          'CRM (Bitrix24, AmoCRM) — takroriy mijozlar va opt savdo uchun',
        ]),
        h2('Zaxira boshqaruvi avtomatlashtirish'),
        intro(
          'Eng keng tarqalgan muammo: Uzum da mahsulot bor ko\'rsatiladi, lekin omborda tugagan. Yechim — markaziy ombor jadvali va kuniga kamida 1 marta sinxronlash. FBO ishlatsangiz, Uzum omboridagi qoldiqni ham kuzatish kerak.',
        ),
        tip(
          'Avtomatlashtirishni bir vaqtning o\'zida emas, bitta «og\'riq nuqtasi» dan boshlang. Masalan, avval faqat zaxira sinxronlashni sozlang, 2 hafta ishlatib ko\'ring, keyin hisobotlarni qo\'shing.',
        ),
        h2('Narx va reklama avtomatizatsiyasi'),
        ul([
          'Minimal marja chegarasini belgilang — undan past narx avtomatik ogohlantirsin',
          'Boost kampaniyalar uchun kunlik byudjet limiti',
          'Haftalik ROAS hisoboti — qaysi mahsulot reklamaga arzmaydi aniqlash',
        ]),
        warning(
          'To\'liq avtomatik narx o\'zgartirish ehtiyotkorlik talab qiladi. Raqobatchi vaqtincha arzon sotsa, siz zarar bilan sotishingiz mumkin. Avtomatlashtirish ogohlantirish bersin, yakuniy qarorni siz yoki menejer qabul qilsin.',
        ),
        h2('Avtomatlashtirish ROI hisobi'),
        intro(
          'Har bir vosita uchun oddiy hisob: «Bu dastur oyiga 200 000 so\'m. Qo\'lda bu ish haftada 5 soat vaqt oladi. Soatim 50 000 so\'m qiymatda — oyiga 1 000 000 so\'m tejash. ROI ijobiy.» Agar tejash xarajatdan kichik bo\'lsa, hozircha kerak emas.',
        ),
        h2('Amaliy rejа: 30 kunlik avtomatlashtirish'),
        ol([
          '1-hafta: barcha takroriy ishlarni ro\'yxatga oling va vaqt sarflang',
          '2-hafta: zaxira sinxronlash va buyurtma bildirishnomalarini sozlang',
          '3-hafta: haftalik hisobot shablonini avtomatlashtiring',
          '4-hafta: natijani baholang — xato kamaydimi, vaqt tejaldimi?',
        ]),
        nextStep(
          'Keyingi darsda daromad chiqarish, soliq va qonuniy jihatlar — pul ishlashdan muhimroq qismi uni to\'g\'ri boshqarish.',
        ),
      ],
    ),
    lesson(
      'dars-4',
      8,
      4,
      'Daromad chiqarish va soliqlar',
      'Вывод дохода и налоги',
      'uzum',
      '25 daqiqa',
      [
        intro(
          'Marketplace da pul ko\'rinadi, lekin u hali «sizniki» emas — komissiya, qaytarishlar va soliq ayirilguncha. Uzum Marketda muvaffaqiyatli o\'sishning yashirin sharti — moliyani shaffof boshqarish va qonuniy rasmiylashtirish.',
        ),
        h2('Uzum Marketdan pul yechish'),
        ul([
          'Pul odatda buyurtma yetkazilgandan keyin ma\'lum kun kutgach hisobingizga tushadi',
          'Yechish uchun bank rekvizitlari ro\'yxatdan o\'tish ma\'lumotlari bilan mos bo\'lishi kerak',
          'Haftalik yoki oylik yechish grafikini oldindan rejalashtiring — kutilmagan kechikishlar bo\'lishi mumkin',
          'Platforma komissiyasi, yetkazish va reklama xarajatlarini alohida hisoblang',
        ]),
        h2('YTT va MChJ: qaysi biri sizga mos?'),
        intro(
          'Yakka tartibdagi tadbirkor (YTT) — sodda hisobot, kichik va o\'rta hajm uchun qulay. MChJ — jamoa, yirik aylanma va investorlar uchun. Aylanma o\'sganda YTT dan MChJ ga o\'tishni buxgalter bilan muhokama qiling.',
        ),
        h3('Asosiy soliq turlari (umumiy ma\'lumot)'),
        ul([
          'Aylanmadan olinadigan soliq — faoliyat turiga qarab stavka farq qiladi',
          'QQS (NDS) — ayrim hajmlarda majburiy; buxgalter maslahati shart',
          'Daromad solig\'i — yakka tartibdagi tadbirkorlar uchun alohida tartib',
        ]),
        warning(
          'Soliq qonunlari o\'zgarishi mumkin. Bu dars umumiy yo\'naltirish beradi — aniq stavka va hisobot uchun litsenziyali buxgalter yoki soliq maslahatchisiga murojaat qiling. Qonuniy masalada «taxmin» qilish xavfli.',
        ),
        h2('Moliyaviy hisob yuritish'),
        ol([
          'Biznes uchun alohida bank kartasi yoki hisob — shaxsiy pul aralashmasin',
          'Har oy: daromad − (tovar tannarxi + komissiya + reklama + yetkazish + jamoa) = haqiqiy foyda',
          'Chek va hujjatlarni saqlang: ta\'minotchi fakturalari, bank ko\'chirmalari',
          'Kutilmagan xarajatlar uchun zaxira fond — oylik foydaning 10–15%',
        ]),
        tip(
          'Haqiqiy foydani faqat «Uzum kabinetidagi raqam» bilan emas, Excel yoki buxgalteriya dasturidagi to\'liq hisob bilan biling. Ko\'p sotuvchi reklama va tannarxni hisobga olmagani uchun «pul bor, lekin qayerda?» deb hayratda qoladi.',
        ),
        h2('Qaytarishlar va soliq'),
        intro(
          'Qaytarilgan buyurtma daromadni kamaytiradi va ba\'zan qayta ishlash xarajati qo\'shiladi. Qaytarish foizini kuzating: 5% dan yuqori bo\'lsa, mahsulot sifati yoki tavsif muammosini hal qiling. Moliyaviy hisobotda qaytarishlar alohida qator bo\'lsin.',
        ),
        h2('Pul oqimi rejalashtirish'),
        ul([
          'Ta\'minotchiga oldindan to\'lov vs keyin to\'lov — pul aylanish tezligiga ta\'sir qiladi',
          'Mavsumiy o\'sish oldidan zaxira xarajatini oldindan rejalashtiring',
          'Kredit olishdan oldin haqiqiy marja va aylanma barqarorligini ko\'rsating',
        ]),
        nextStep(
          'Keyingi darsda Uzum yo\'lidagi keyingi qadamlar — bir platformada pik yetgach nima qilish kerakligini rejalashtiramiz.',
        ),
      ],
    ),
    lesson(
      'dars-5',
      8,
      5,
      'Keyingi qadamlar',
      'Следующие шаги',
      'uzum',
      '20 daqiqa',
      [
        intro(
          'Uzum Marketda barqaror do\'kon qurganingiz — bu katta yutuq. Endi savol: shu platformada chuqurlashtirishmi, boshqa kanallarga chiqishmi, yoki o\'z brendingizni mustahkamlashmi? Bu dars Uzum yo\'lidagi aniq keyingi qadamlarni tartibga soladi.',
        ),
        h2('Uzum da chuqurlashtirish'),
        ul([
          'Premium kategoriyalarda yuqori marjali mahsulotlar qo\'shish',
          'FBO ga to\'liq o\'tish — tez yetkazish va yuqori reyting',
          'Boost va aksiyalarda professional rejalashtirish (modul 5 ni qayta ko\'rib chiqing)',
          'Opt va korporativ mijozlar — Telegram va B2B takliflar',
        ]),
        h2('Ko\'p kanalli strategiya tayyorgarligi'),
        intro(
          'Uzumda mustahkam poydevor: barqaror oylik aylanma, aniq foyda marjasi, hujjatlashtirilgan jarayonlar va kamida bitta yordamchi. Bu nuqtadan keyin Yandex Market yoki o\'z saytingizga chiqish mantiqiy — ikkinchi darslar to\'plami shu yerda boshlanadi.',
        ),
        h3('Chiqishdan oldin checklist'),
        ol([
          'Top-20 mahsulot kartochkasi professional darajada',
          'Ombor va qadoqlash 2 baravar hajmga tayyor',
          'Moliya va soliq tartibda',
          'Brend nomi va vizual uslub bir xil (keyingi platformalarda ham ishlatish uchun)',
        ]),
        tip(
          'Ikkinchi platformaga o\'tishda xuddi shu mahsulotlarni ko\'chirmang — avval o\'sha bozorda talab tahlili qiling. Uzumda yaxshi sotiladigan mahsulot Yandex da raqobat boshqacha bo\'lishi mumkin.',
        ),
        h2('O\'z brendingizni Uzum ichida mustahkamlash'),
        ul([
          'Do\'kon nomi va logotip xaridor eslab qoladigan darajada',
          'Qadoqlada brend stikeri va minnatdorchilik qog\'ozi',
          'Sharhlarga tez va xushmuomala javob — do\'kon reytingi o\'sadi',
          'Takroriy xaridorlar uchun chegirma kupon yoki komplekt taklif',
        ]),
        h2('Xavflarni boshqarish'),
        warning(
          'Bitta platformaga, bitta ta\'minotchiga yoki bitta hit-mahsulotga bog\'lanmang. Eng kamida 2 ta ta\'minotchi, 3 ta kategoriya va zaxira fond — biznesni himoya qiladi.',
        ),
        h2('90 kunlik o\'sish rejasi namunasi'),
        ol([
          '1–30 kun: katalog +15%, jamoa yoki avtomatlashtirishning birini joriy etish',
          '31–60 kun: FBO kengaytirish, reklama ROAS ni 20% yaxshilash',
          '61–90 kun: Yandex Market ro\'yxatdan o\'tish va 10 ta pilot mahsulot',
        ]),
        intro(
          'Modulning ikkinchi yarmida Yandex Market nuqtai nazaridan kengayishni chuqurroq o\'rganasiz. Hozirgi Uzum tajribangiz — o\'sha darslar uchun amaliy poydevor bo\'ladi.',
        ),
        nextStep(
          'Keyingi darsdan boshlab Yandex Market sotuvchilari uchun kengayish strategiyalarini ko\'rib chiqamiz: yangi kategoriyalarga kirish.',
        ),
      ],
    ),
    lesson(
      'dars-6',
      8,
      6,
      'Yangi kategoriyalarga kirish',
      'Выход в новые категории',
      'yandex',
      '24 daqiqa',
      [
        intro(
          'Yandex Marketda bir kategoriyada yetakchi bo\'lgach, tabiiy instinkt — «yana nima sotsam bo\'ladi?» degan savol. Yangi kategoriyaga kirish yangi auditoriya, lekin yangi raqobat, logistika va moderatsiya qoidalari ham demakdir.',
        ),
        h2('Qachon yangi kategoriyaga kirish mantiqiy?'),
        ul([
          'Asosiy kategoriyada o\'sish sekinlashdi (qidiruv hajmi to\'ldi)',
          'Mavjud xaridorlar boshqa mahsulotlar so\'rayapti',
          'Ta\'minotchi yoki ishlab chiqaruvchi yangi tovar qatorini taklif qildi',
          'Ombor va jamoa zaxirasi bor — yangi kategoriya e\'tiborni so\'ndirmasin',
        ]),
        h2('Kategoriya tanlash: Yandex Market nuqtai nazari'),
        ol([
          'Yandex Market kategoriya daraxtida talab va raqobatni tahlil qiling',
          'Birinchi 5–10 ta mahsulot — sinov partiyasi, katta partiya emas',
          'Kategoriya talablari: sertifikat, markirovka, o\'lchov birligi farq qilishi mumkin',
          'Mavsumiylikni hisobga oling (masalan, yozda qishki tovar kiritmang)',
        ]),
        h2('Cross-selling: mavjud katalogdan foydalanish'),
        intro(
          'Eng xavfsiz kengayish — hozirgi xaridorlaringizga mos qo\'shimcha mahsulot. Telefon qopqog\'i sotasiz — sim, quvvatlagich, avtomobil derjatkichini qo\'shing. Yandex algoritmi «bilan sotib olish» (cross-sell) takliflarini qadrlaydi.',
        ),
        h3('Sinov metodologiyasi'),
        ul([
          'Har yangi kategoriya uchun alohida mini-byudjet (reklama + birinchi partiya)',
          '30 kun ichida: ko\'rishlar, savatga qo\'shish, sotuv — KPI belgilang',
          'Natija past bo\'lsa — kategoriyani yopishdan tortinmang, kapitalni asosiy yo\'nalishga qaytaring',
        ]),
        tip(
          'Yandex Marketda kategoriya o\'zgartirish ba\'zan kartochkani qayta moderatsiyadan o\'tkazadi. Yangi kategoriyani alohida yangi kartochka sifatida ochish ko\'pincha xavfsizroq.',
        ),
        h2('Logistika va FBY/DBS tanlovi'),
        intro(
          'Yangi kategoriyada hajm noaniq — DBS (o\'zingiz yetkazish) yoki FBS bilan boshlang. Aylanma ishonchli bo\'lsa, FBY ga o\'tkazish yetkazish tezligini oshiradi. Og\'ir yoki nogiron qaytariladigan kategoriyalarda logistika xarajatini oldindan hisoblang.',
        ),
        warning(
          'Sertifikatsiz mahsulotni «o\'xshash kategoriyada» joylashtirish hisob bloklanishiga olib kelishi mumkin. Elektronika, bolalar tovarlari, kosmetika — qoidalarni oldindan o\'qing.',
        ),
        h2('Amaliy vazifa'),
        intro(
          'Yandex Market kategoriya tahlil vositalaridan foydalanib, hozirgi katalogingizga mos 3 ta yangi kichik kategoriya tanlang. Har biri uchun 5 ta mahsulot g\'oyasi, taxminiy marja va kerakli hujjatlar ro\'yxatini yozing.',
        ),
        nextStep(
          'Keyingi darsda faqat Yandex emas — Instagram, o\'z sayt va boshqa kanallar bilan ko\'p kanalli savdoni qurishni o\'rganamiz.',
        ),
      ],
    ),
    lesson(
      'dars-7',
      8,
      7,
      'Ko\'p kanalli savdo',
      'Многоканальные продажи',
      'yandex',
      '26 daqiqa',
      [
        intro(
          'Ko\'p kanalli savdo — bir xil mahsulotni Yandex Market, o\'z internet-do\'koni, ijtimoiy tarmoqlar va ba\'zan offline nuqtada sotish. Maqsad: bitta kanal tushganda biznes qolishi va xaridor qayerdan qulay bo\'lsa shu yerda xarid qilishi.',
        ),
        h2('Kanallar ierarxiyasi'),
        h3('Asosiy kanal'),
        intro(
          'Yandex Market — trafik va ishonch manbai. Ko\'p sotuvchi uchun 60–80% aylanma shu yerdan keladi. Boshqa kanallar qo\'shimcha, asosiy emas — avval Yandex ni barqaror qiling.',
        ),
        h3('Qo\'shimcha kanallar'),
        ul([
          'O\'z sayt (Tilda, Shopify, WooCommerce) — brend va takroriy mijozlar',
          'Telegram kanal va bot — aksiya, yangilik, to\'g\'ridan-to\'g\'ri savdo',
          'Instagram / TikTok — vizual mahsulotlar uchun trafik',
          'Opt va marketplace B2B bo\'limlari',
        ]),
        h2('Zaxira va narx sinxronlash'),
        intro(
          'Ko\'p kanalning eng katta xavfi — bitta mahsulotni ikki joyda sotib qo\'yish. Markaziy ombor jadvali shart: har sotuvdan keyin barcha kanallarda qoldiq yangilanadi. Boshlang\'ich bosqichda kamroq kanal, to\'liq sinxron — ko\'p kanaldan yaxshi.',
        ),
        ol([
          'Bitta «haqiqiy qoldiq» manbai tanlang (Google Sheet yoki ombor dasturi)',
          'Yandex va sayt qoldiqlarini kuniga kamida 1 marta yangilang',
          'Kanal bo\'yicha alohida narx siyosati — lekin farq 10–15% dan oshmasin',
          'Qaysi kanaldan qaysi mahsulot yaxshi sotilishini haftalik kuzating',
        ]),
        tip(
          'Telegram orqali to\'g\'ridan-to\'g\'ri sotishda ham chek va qonuniy rasmiylashtirishni unutmang. «Kulrang» savdo soliq va marketplace qoidalariga zid bo\'lishi mumkin.',
        ),
        h2('Trafik yo\'naltirish strategiyasi'),
        ul([
          'Yandex kartochkada brend qidiruvini kuchaytiring — xaridorlar keyin saytingizga keladi',
          'Ijtimoiy tarmoqda faqat link emas, foydali kontent + mahsulot',
          'Email yoki Telegram ro\'yxati — yangi mahsulot va chegirmalar uchun',
          'Bir kanaldagi reklama boshqa kanalga landing qilishi mumkin (A/B sinov)',
        ]),
        h2('Xarajatlar va ROAS kanal bo\'yicha'),
        intro(
          'Har kanal uchun alohida hisob: reklama, komissiya, yetkazish, vaqt. Ba\'zi kanallar trafik beradi, lekin foyda kam — ularni optimallashtiring yoki to\'xtating. Yandex + Telegram kombinatsiyasi ko\'p MDH sotuvchilari uchun eng samarali juftliklardan biri.',
        ),
        warning(
          'Yandex Market shartnomangizda boshqa platformada arzonroq sotish cheklovlari bo\'lishi mumkin. Price parity qoidalarini o\'qing — qoidabuzarlik sanksiyalarga olib keladi.',
        ),
        nextStep(
          'Keyingi darsda narx raqobatidan tashqari — brend orqali doimiy mijoz yaratish va Yandex da ajralib turish.',
        ),
      ],
    ),
    lesson(
      'dars-8',
      8,
      8,
      'Brend qurish',
      'Построение бренда',
      'yandex',
      '25 daqiqa',
      [
        intro(
          'Marketplace da hamma o\'xshash kartochkada raqobat qiladi — eng arzon yoki eng tez yetkazadigan g\'alaba qisqa muddatli. Uzoq muddatda brend qurgan sotuvchi: yuqori narx, takroriy xarid va mustaqil trafik oladi.',
        ),
        h2('Brend nima — marketplace kontekstida'),
        intro(
          'Brend — bu logotip emas, xaridorning ongidagi va\'da: «Bu do\'kondan olganim sifatli, tez va muammo bo\'lsa hal qiladi.» Yandex Marketda brend do\'kon nomi, qadoq, muloqot uslubi va mahsulot liniyasi orqali seziladi.',
        ),
        h2('Brend elementlari'),
        ul([
          'Nom — eslab qolish oson, talab bo\'yicha qidirish mumkin (masalan, «BrandName qopqog\'i»)',
          'Vizual uslub — bir xil rang, shrift, rasm fonida kartochkalar',
          'Qadoqlash — ochganda ijobiy taassurot, brend stikeri',
          'Ovoz va muloqot — sharhlar va chatdagi yagona ohang',
          'Mahsulot liniyasi — «Premium», «Eco», «Kids» kabi aniq seriyalar',
        ]),
        h2('Yandex Marketda brend ko\'rinishi'),
        ol([
          'Do\'kon sahifasini to\'liq to\'ldiring: banner, tavsif, brend hikoyasi',
          'Barcha kartochkalarda bir xil sarlavha strukturasi: Brend + Model + Asosiy foyda',
          'A+ kontent (qisqa video, infografika) — konversiyani oshiradi',
          'Yandex Direct da brend kalit so\'zlarga reklama — raqobatchilardan oldin chiqing',
        ]),
        tip(
          'Brendni qurish 6–12 oy oladi. Har oy bitta elementni yaxshilang: 1-oy qadoq, 2-oy rasmlar, 3-oy video, 4-oy Telegram jamoasi. Hammasini bir kunda qilish shart emas.',
        ),
        h2('Sharhlar va ishonch'),
        intro(
          '4.8+ do\'kon reytingi — yangi xaridor uchun eng kuchli signal. Har bir sharhga javob bering. Salbiy sharhni hal qilganingizda ko\'pincha xaridor bahoni yangilaydi. Sifat muammosini yashirmang — hal qiling va jarayonni yaxshilang.',
        ),
        h3('Ijtimoiy isbot'),
        ul([
          'Haqiqiy mijoz fotolarini kartochkaga qo\'shish (ruxsat bilan)',
          'Sotuvlar soni va qayta xarid statistikasi (ichki kuzatuv)',
          'Kafolat va qaytarish shartlarini aniq va adolatli qilish',
        ]),
        warning(
          'Soxta sharh va yolg\'on «100% original» va\'dalari hisob jazosiga olib keladi. Brend ishonch sekin quriladi, tez yo\'qoladi.',
        ),
        h2('Private label va o\'z brendi'),
        intro(
          'Tayyor mahsulot sotishdan o\'tib, o\'z brendingiz ostida (white label) mahsulot chiqarish — yuqori marja va raqobatdan ajralish. Boshlash: kichik partiya, o\'z dizayningiz, Yandex da «sizning» brend qidiruvi. Bu modulning xalqaro kengayish darsiga ham tayyorgarlik.',
        ),
        nextStep(
          'Keyingi darsda chegaradan tashqariga — Yandex Market orqali MDH va undan tashqari bozorlarga chiqish imkoniyatlari.',
        ),
      ],
    ),
    lesson(
      'dars-9',
      8,
      9,
      'Xalqaro kengayish',
      'Международное расширение',
      'yandex',
      '27 daqiqa',
      [
        intro(
          'Yandex Market asosan Rossiya va MDH bozorlariga yo\'naltirilgan. O\'zbekiston, Qozog\'iston, Belarus va Rossiya xaridorlari bir platformada uchrashishi — chegaradan tashqariga chiqishni texnik jihatdan osonlashtiradi, lekin qonuniy va logistika qiyinchiliklari saqlanadi.',
        ),
        h2('Xalqaro kengayish bosqichlari'),
        ol([
          '1-bosqich: hozirgi mamlakatda brend va operatsiyalarni mustahkamlash',
          '2-bosqich: qo\'shni mamlakatga pilot (masalan, Qozog\'iston yoki Rossiya)',
          '3-bosqich: mahalliy ombor yoki fulfillment hamkori',
          '4-bosqich: mahalliy til va narxda to\'liq katalog',
        ]),
        h2('Hujjatlar va qonuniy talablar'),
        ul([
          'Har mamlakatda soliq va bojxona qoidalari farq qiladi',
          'Mahsulot sertifikati va markirovka (masalan, Rossiyada «Chestny ZNAK»)',
          'Valyuta va to\'lov: rubll, tenge — kurs xavfi va hisob-kitob',
          'Qaytarishlar va kafolat — uzoq masofa logistikasi qimmat',
        ]),
        h2('Logistika variantlari'),
        h3('Cross-border (chegara orqali)'),
        intro(
          'Boshlang\'ich model: buyurtma qabul qilasiz, mahsulotni o\'z mamlakatingizdan yuborasiz. Yetkazish uzoq va qimmat, lekin sinov uchun yetarli. Aylanma o\'sganda mahalliy ombor iqtisodiy bo\'ladi.',
        ),
        h3('Mahalliy fulfillment'),
        ul([
          'Yandex FBY omborlari ma\'lum hududlarda mavjud — shartlar va xarajatlarni solishtiring',
          '3PL hamkor — ombor, qadoqlash va yetkazishni topshirish',
          'Mahalliy yuridik shaxs yoki vakil — ba\'zi bozorlar talab qiladi',
        ]),
        tip(
          'Bitta mamlakatni tanlab chuqurlashing. «Butun MDH ga bir vaqtda» strategiyasi kapitalni so\'ndiradi. Ko\'pincha birinchi maqsad — Rossiya yoki qo\'shni mamlakat bo\'ladi, chunki Yandex infratuzilmasi shu yerda kuchli.',
        ),
        h2('Mahsulot va narx moslashtirish'),
        ul([
          'Mahalliy o\'lchov birliklari va tavsiflar (til!)',
          'Raqobatchilar narxi — import bo\'lsa bojxona qo\'shing',
          'Mavsum va madaniy farqlar (bayramlar, o\'lchamlar)',
          'Mijozlarga mahalliy til va vaqt zonasida qo\'llab-quvvatlash',
        ]),
        warning(
          'Sanksiyalar, cheklovlar va to\'lov tizimlari o\'zgarishi mumkin. Xalqaro savdo qonunlarini kuzatib boring va rasmiy manbalardan tekshiring. Shubhali «kulrang» logistika hamkorlaridan qoching.',
        ),
        h2('Xavfni kamaytirish'),
        intro(
          'Pilot: 10–20 ta eng yaxshi sotiladigan mahsulot, bitta qo\'shni bozor, 90 kun sinov. Muvaffaqiyat mezonlari: ijobiy sharh, qaytarish 10% dan past, unit-ekonomika ijobiy. Keyin kengaytiring.',
        ),
        nextStep(
          'Oxirgi darsda barcha modullarni birlashtiruvchi uzoq muddatli reja va kursni yakunlash — siz Market Pro Academy ning to\'liq yo\'lini bosib o\'tdingiz.',
        ),
      ],
    ),
    lesson(
      'dars-10',
      8,
      10,
      'Uzoq muddatli reja',
      'Долгосрочный план',
      'yandex',
      '28 daqiqa',
      [
        intro(
          'Marketplace savdosi sprint emas, marafon. Bugungi buyurtma muhim, lekin 3 yillik reja bo\'lmasa har kuni o\'tgan kun kabi « o\'t o\'chirish» rejimida ishlaysiz. Bu dars sizning shaxsiy uzoq muddatli strategiya shablonini tuzishga yordam beradi.',
        ),
        h2('3 yillik vizion: qayerga borasiz?'),
        ul([
          'Yil 1: barqaror foyda, tizimlashtirilgan operatsiya, 1–2 ta platforma',
          'Yil 2: brend tan olinishi, jamoa 3–7 kishi, ko\'p kanal',
          'Yil 3: o\'z brendi mahsulotlari, xalqaro yoki opt yo\'nalishi, passive daromad elementlari',
        ]),
        h2('Yillik maqsadlar (OKR uslubi)'),
        intro(
          'Maqsad aniq va o\'lchanadigan bo\'lsin. Masalan: «2026 yilda oylik aylanma X mln so\'m, foyda marjasi 18%, qaytarish 4% dan past, do\'kon reytingi 4.7+.» Har chorakda progressni ko\'rib, reja moslashtiring.',
        ),
        ol([
          'Moliyaviy maqsadlar: aylanma, foyda, zaxira fond hajmi',
          'Operatsion maqsadlar: yetkazish vaqti, xato foizi, avtomatlashtirish darajasi',
          'Marketing maqsadlari: ROAS, yangi mijozlar, brend qidiruv hajmi',
          'Shaxsiy maqsadlar: ish va hayot balansi, jamoa madaniyati',
        ]),
        h2('Kurs bo\'ylab o\'rganganlaringizni birlashtirish'),
        h3('8 modul — 82 dars xulosasi'),
        ul([
          'Modul 1–2: Platformada ochilish va to\'g\'ri mahsulot tanlash',
          'Modul 3–4: Kartochka, SEO, narx va raqobat strategiyasi',
          'Modul 5: Reklama va trafik (Boost, Yandex Direct)',
          'Modul 6: Logistika — FBO, FBS, FBY, qaytarishlar',
          'Modul 7: Tahlil, KPI va ma\'lumotga asoslangan qarorlar',
          'Modul 8: Kengaytirish — jamoa, avtomatlashtirish, brend, xalqaro reja',
        ]),
        tip(
          'Har chorakda bir modulni «qayta ko\'rib chiqish» kunini belgilang. Marketplace qoidalari va algoritmlar o\'zgaradi — bir marta o\'rgangan yetarli emas.',
        ),
        h2('Uzoq muddatli xavflar va himoya'),
        ul([
          'Platforma qoidalariga bog\'liqlik — o\'z auditoriya (email, Telegram) yarating',
          'Ta\'minotchi monopoliyasi — doimo zaxira variant',
          'Sog\'liq va burnout — jamoa va avtomatlashtirish investitsiya, xarajat emas',
          'Soliq va qonun o\'zgarishi — doimiy buxgalter aloqasi',
        ]),
        h2('Keyingi o\'qish va hamjamiyat'),
        intro(
          'Market Pro Academy ning rasmiy Telegram guruhida tajriba almashing, savollar bering va yangiliklarni kuzating. Amaliyot — nazariyadan muhimroq: har hafta kamida bitta darsdagi vazifani real do\'koningizda bajaring.',
        ),
        h2('Tabriklaymiz!'),
        intro(
          'Siz Market Pro Academy ning barcha 8 modulini — jami 82 ta darsni — bosib o\'tdingiz. Bu oddiy o\'qish emas: siz Uzum Market va Yandex Marketda professional sotuvchi bo\'lish yo\'lini to\'liq ko\'rib chiqdingiz — ro\'yxatdan o\'tishdan tortib biznesni kengaytirishgacha.',
        ),
        intro(
          'Endi navbat amalda. Do\'koningizni oching yoki mavjud do\'koningizni keyingi bosqichga olib chiqing. Birinchi qadam kichik bo\'lishi mumkin — muhimi, bugun boshlangan. Omad tilaymiz — savdoda muvaffaqiyat va barqaror o\'sish siz bilan bo\'lsin!',
        ),
        tip(
          'Bu kursni tugatganingizni Telegram guruhida «#82dars» xeshtegi bilan bo\'lishing — mentorlar va hamkasblar sizni tabriklaydi va keyingi maslahatlarni beradi.',
        ),
        nextStep(
          'Yo\'l davom etadi. Statistikangizni kuzating, jamoani kuchaytiring va o\'rgangan har bir strategiyani o\'z biznesingizga moslab sinab ko\'ring. Market Pro Academy doimo yangi materiallar va yangilanishlar bilan yoningizda.',
        ),
      ],
    ),
  ],
}
