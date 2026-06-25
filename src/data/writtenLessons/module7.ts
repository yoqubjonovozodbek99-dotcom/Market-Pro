import type { WrittenModule } from './types'
import { lesson, intro, h2, h3, ul, ol, tip, warning, nextStep } from './helpers'

export const module7: WrittenModule = {
  num: 7,
  slug: 'modul-7',
  title: 'Tahlil va o\'sish',
  titleRu: 'Анализ и рост',
  desc: 'Sotuv statistikasi, konversiya, KPI, mavsumiy tahlil va o\'sish strategiyasi.',
  descRu: 'Статистика продаж, конверсия, KPI, сезонный анализ и стратегия роста.',
  lessonCount: 11,
  hours: 5,
  available: true,
  lessons: [
    lesson('dars-1', 7, 1, 'Sotuv statistikasi o\'qish', 'Чтение статистики продаж', 'uzum', '24 daqiqa', [
      intro(
        'Uzum Market sotuvchi kabinetida kunlik, haftalik va oylik statistika mavjud. Raqamlarni to\'g\'ri o\'qish — qaysi mahsulot foyda keltirayotganini va qayerda muammo borligini ko\'rsatadi.',
      ),
      h2('Asosiy bo\'limlar'),
      ul([
        'Umumiy sotuv — daromad, buyurtmalar soni, o\'rtacha chek',
        'Mahsulotlar bo\'yicha — har SKU sotuvi va qoldiq',
        'Geografiya — qaysi viloyat ko\'p sotib oladi',
        'Trafik — ko\'rinish, bosish, qidiruv so\'rovlari',
        'Moliya — komissiya, yechib olish, qaytarishlar',
      ]),
      h2('Hisobotni kunlik o\'qish'),
      ol([
        'Kecha sotuv vs o\'tgan hafta o\'sha kun — trend',
        'Yangi buyurtmalar va bekor qilinganlar',
        'Qoldiq tugayotgan SKU lar — zaxira buyurtmasi',
        'Reyting va sharhlar — salbiy sharhga tez javob',
        'Reklama xarajati va organik sotuv nisbati',
      ]),
      h3('O\'rtacha chek (AOV)'),
      intro(
        'O\'rtacha chek = Umumiy daromad ÷ Buyurtmalar soni. AOV o\'sishi — to\'plam takliflari va cross-sell natijasi.',
      ),
      tip(
        'Har dushanba ertalab o\'tgan hafta hisobotini CSV da yuklab, Google Sheets ga saqlang. 4 haftalik trend chizish oson bo\'ladi.',
      ),
      warning(
        'Faqat daromadga qaramang — qaytarishlar va komissiya ayirilgandan keyingi «sof foyda» muhimroq.',
      ),
      nextStep(
        'Keyingi darsda konversiya va CTR — trafikni sotuvga aylantirish ko\'rsatkichlari.',
      ),
    ]),
    lesson('dars-2', 7, 2, 'Konversiya va CTR', 'Конверсия и CTR', 'uzum', '26 daqiqa', [
      intro(
        'CTR (Click-Through Rate) — kartochkangiz qidiruv yoki katalogda qancha ko\'rinishdan bosilganini ko\'rsatadi. Konversiya — bosishdan keyin buyurtmaga aylanish foizi.',
      ),
      h2('Formulalar'),
      ul([
        'CTR = Bosishlar ÷ Ko\'rinishlar × 100%',
        'Konversiya = Buyurtmalar ÷ Bosishlar × 100%',
        'Umumiy konversiya = Buyurtmalar ÷ Ko\'rinishlar × 100%',
      ]),
      h2('CTR ni oshirish'),
      ol([
        'Birinchi rasm — yuqori sifat, oq fon, mahsulot markazda',
        'Sarlavha boshida asosiy kalit so\'z',
        'Narx raqobatbardosh — yonida «arzonroq» belgisi',
        'Reyting 4.5+ va ko\'p sharh — ishonch',
        'Aksiya yorlig\'i (platforma ruxsat berganda)',
      ]),
      h2('Konversiyani oshirish'),
      ul([
        'To\'liq tavsif — barcha savollarga javob',
        'O\'lcham jadvali va «qanday o\'lchash»',
        'Tez yetkazish (FBO) va qaytarish kafolati',
        'Sharhlarga javob — faol sotuvchi tasviri',
        'Bir xil mahsulotning past narxli variantini ko\'rsatmaslik (o\'zingiz bilan raqobat)',
      ]),
      h3('Benchmark'),
      intro('Kategoriyaga qarab farq qiladi: kiyim CTR 2–4%, elektronika 1–2%, konversiya 3–8% yaxshi hisoblanadi.'),
      tip(
        'Past CTR + yuqori konversiya = yaxshi kartochka, lekin kam ko\'rinish (SEO yaxshilang). Yuqori CTR + past konversiya = chalg\'ituvchi sarlavha/rasm.',
      ),
      warning(
        'Yolg\'on yoki haddan tashqari va\'da (masalan, «100% silk» deb yozib, sintetik yuborish) — qaytarish va bloklanish.',
      ),
      nextStep(
        'Keyingi darsda mahsulot samaradorligi — qaysi SKU foyda, qaysi biri zarar keltirayotganini aniqlash.',
      ),
    ]),
    lesson('dars-3', 7, 3, 'Mahsulot samaradorligi', 'Эффективность товара', 'uzum', '28 daqiqa', [
      intro(
        'Har bir mahsulot bir xil foyda keltirmaydi. Samaradorlik tahlili sizga eng yaxshi SKU larni kengaytirish va zaiflarini to\'xtatishga yordam beradi.',
      ),
      h2('ABC tahlili'),
      ul([
        'A guruhi — sotuvning 80% ini beradigan 20% mahsulot',
        'B guruhi — o\'rtacha ahamiyat',
        'C guruhi — kam sotiladi, ko\'p joy egallaydi — chegirma yoki olib tashlash',
      ]),
      h2('Mahsulot darajasidagi metrikalar'),
      ol([
        'Sotuv miqdori va daromad',
        'Marja = sotuv narxi − tannarx − komissiya − yetkazish',
        'Qaytarish foizi',
        'Ombor aylanish tezligi (kun)',
        'Reklama ROAS (agar Boost ishlatilsa)',
      ]),
      h2('Qaror matritsasi'),
      h3('Yuqori sotuv + yuqori marja'),
      intro('Kengaytiring: zaxira oshiring, reklama, yangi variantlar.'),
      h3('Yuqori sotuv + past marja'),
      intro('Tannarxni qayta kelishing yoki narxni oshiring. Aks holda hajm foyda bermaydi.'),
      h3('Past sotuv + yuqori marja'),
      intro('Niche mahsulot — SEO va targeting reklama. Yoki assortimentdan chiqaring.'),
      h3('Past sotuv + past marja'),
      intro('Tezda to\'xtating — ombor va diqqatni Boshqa SKU ga qaratting.'),
      tip(
        'Oylik «mahsulot scorecard» yarating: har SKU ga 1–5 ball (sotuv, marja, qaytarish, trend). 5 balliklar — prioritet.',
      ),
      warning(
        'Faqat «eng ko\'p sotilgan» ro\'yxatga qaramang — eng arzon mahsulot ko\'p sotilishi mumkin, lekin foyda keltirmasligi mumkin.',
      ),
      nextStep(
        'Keyingi darsda mavsumiy tahlil — qachon sotuv o\'sadi, qachon tushadi va qanday tayyorlanish.',
      ),
    ]),
    lesson('dars-4', 7, 4, 'Mavsumiy tahlil', 'Сезонный анализ', 'uzum', '24 daqiqa', [
      intro(
        'Ko\'p mahsulotlar yil davomida bir xil sotilmaydi. Mavsumiy tahlil zaxira, narx va reklama rejasini oldindan tuzish imkonini beradi.',
      ),
      h2('O\'zbekiston bozorida mavsumlar'),
      ul([
        'Yangi yil, 8-mart, Navruz — sovg\'a va gullar cho\'qqisi',
        'Ramazon va Qurbon Hayit — oziq-ovqat, kiyim, sovg\'a',
        'Sentabr — maktab va universitet mahsulotlari',
        'Yoz — konditsioner, fan, sayohat; qish — issiq kiyim, isitgich',
        'Paytaxt vs viloyat — Ramazon va bayram taqvimi bir xil, lekin hajm farq qiladi',
      ]),
      h2('Mavsumiy reja tuzish'),
      ol([
        'O\'tgan yil oylik sotuv grafigini chizing (yoki raqobatchi trend)',
        'Cho\'qqi oldidan 4–6 hafta zaxira va reklama oshiring',
        'Past mavsumda chegirma yoki SKU sonini kamaytiring',
        'Yangi mahsulotni mavsum boshlanishidan 2 hafta oldin joylashtiring',
        'Mavsum tugagach ortiqcha qoldiqni aksiya bilan soting',
      ]),
      h2('Zaxira va pul oqimi'),
      intro(
        'Cho\'qqida zaxira yetishmasligi — sotuv yo\'qotish. Ortiqcha zaxira — pul muzlatilgan. Mavsumiy prognoz ikkalasini ham kamaytiradi.',
      ),
      tip(
        'Google Trends da «O\'zbekiston» filtri bilan mahsulot kalit so\'zlarini solishtiring — qaysi oy qidiruv ko\'payishini ko\'rasiz.',
      ),
      warning(
        'Mavsumiy mahsulotni kech joylashtirsangiz — cho\'qqini o\'tkazib yuborasiz. Ertadan ko\'ra kech emas, ertaroq reja qiling.',
      ),
      nextStep(
        'Keyingi darsda rasmiy hisobotlar va KPI — biznesni raqamlar bilan boshqarish.',
      ),
    ]),
    lesson('dars-5', 7, 5, 'Hisobot va KPI', 'Отчёты и KPI', 'uzum', '26 daqiqa', [
      intro(
        'KPI (Key Performance Indicators) — biznes sog\'lig\'ini o\'lchovchi asosiy raqamlar. Hisobotlar ularni vaqt o\'tishi bilan kuzatish vositasi.',
      ),
      h2('Asosiy KPI lar marketplace uchun'),
      ul([
        'Oylik daromad (GMV) va sof foyda',
        'Buyurtmalar soni va o\'rtacha chek',
        'Konversiya va CTR (o\'rtacha)',
        'Qaytarish foizi (maqsad: 10% dan past)',
        'Reyting (4.5+)',
        'Ombor aylanish tezligi',
        'Reklama ROAS',
        'Yangi vs takroriy xaridor (agar mavjud bo\'lsa)',
      ]),
      h2('Haftalik hisobot shabloni'),
      ol([
        'Sotuv: hajm, daromad, o\'tgan haftaga nisbatan %',
        'Top 5 va bottom 5 SKU',
        'Qaytarishlar: soni, sabablari',
        'Reklama: xarajat, ROAS',
        'Qoldiq ogohlantirishlari',
        'Keyingi hafta 3 ta aniq vazifa',
      ]),
      h2('Moliyaviy hisobot'),
      intro(
        'YTT/MChJ uchun oylik daromad va xarajat jadvali. Uzum kabinetidan yechib olish, komissiya, reklama, tannarx — hammasi bir joyda.',
      ),
      tip(
        'Market Pro yoki oddiy Google Sheets shabloni ishlating. Har oy 1-sanada avvalgi oy KPI larini saqlang — yillik taqqoslash qimmatli.',
      ),
      warning(
        'KPI ni juda ko\'p qilmang — 5–7 ta asosiy ko\'rsatkich kifoya. Har kuni hammasini kuzatish charchatadi va fokus yo\'qoladi.',
      ),
      nextStep(
        'Keyingi darsda Uzum Market asosida o\'sish strategiyasi — keyingi 6–12 oy reja.',
      ),
    ]),
    lesson('dars-6', 7, 6, 'O\'sish strategiyasi', 'Стратегия роста', 'uzum', '28 daqiqa', [
      intro(
        'O\'sish tasodifiy emas — reja talab qiladi. Uzum Marketda o\'sish yo\'llari: assortiment, narx, reklama, xizmat sifati va brend.',
      ),
      h2('O\'sish ustunlari'),
      ul([
        'Assortiment kengayishi — yangi SKU, to\'liq toifa qamrovi',
        'Chuqurlashtirish — mavjud kategoriyada ko\'proq variant (rang, o\'lcham)',
        'Narx optimizatsiyasi — marjani saqlab raqobatbardosh qolish',
        'Reklama masshtablash — ROAS ijobiy kampaniyalarni kengaytirish',
        'Xizmat sifati — tez javob, kam qaytarish, yuqori reyting',
        'Brend — ijtimoiy tarmoq va takroriy xaridor',
      ]),
      h2('6 oylik o\'sish rejasi namunasi'),
      ol([
        '1–2 oy: kartochka va reyting optimizatsiyasi, birinchi Boost sinov',
        '3–4 oy: 20 ta yangi SKU, FBO zaxira barqarorligi',
        '5–6 oy: reklama byudjeti 2x (ROAS ijobiy bo\'lsa)',
        'Doimiy: haftalik KPI, oylik ABC tahlili',
        '6 oy oxirida: ikkinchi platforma (Yandex) yoki yangi kategoriya',
      ]),
      h2('Xavflarni boshqarish'),
      ul([
        'Bitta mahsulotga bog\'lanmaslik — A SKU 80% sotuv bersa xavfli',
        'Zaxira va pul oqimi — o\'sishda pul oldindan ketadi',
        'Raqobat narx urushi — marjadan voz kechmaslik',
        'Platforma qoidalar o\'zgarishi — diversifikatsiya',
      ]),
      tip(
        'SMART maqsadlar qo\'ying: «6 oyda oylik daromadni 15 mln dan 40 mln so\'mgacha oshirish, qaytarish 12% dan 8% ga tushirish».',
      ),
      warning(
        'Juda tez kengayish (100 ta SKU bir kunda) — sifat va xizmat tushadi. Bosqichma-bosqich o\'sish barqarorroq.',
      ),
      nextStep(
        'Uzum tahlil qismi tugadi. Endi Yandex Market analitikasi va MDH bozori ko\'rsatkichlari.',
      ),
    ]),
    lesson('dars-7', 7, 7, 'Yandex Market analitikasi', 'Аналитика Yandex Market', 'yandex', '26 daqiqa', [
      intro(
        'Yandex Market partner kabinetida «Statistika» va «Hisobotlar» bo\'limlari sotuv, trafik va xizmat ko\'rsatkichlarini beradi. Direct va Metrica bilan birlashtirish to\'liq rasm beradi.',
      ),
      h2('Kabinet bo\'limlari'),
      ul([
        'Sotuvlar — kunlik, oferta bo\'yicha, geografiya',
        'Konversiya — ko\'rinishdan buyurtmagacha',
        'Xizmat sifati — kechikish, bekor qilish, qaytarish',
        'Narx monitoring — raqobatchilar narxi (kategoriyaga qarab)',
        'Qoldiq va aylanish — FBY ombor hisoboti',
      ]),
      h2('Yandex Metrica integratsiyasi'),
      ol([
        'Metrica hisobini yarating va Market do\'koniga ulang',
        'Maqsadlar: «Buyurtma», «Savatga qo\'shish»',
        'Qaysi trafik manbai sotuv keltiradi — Direct, organik, ijtimoiy',
        'Geografiya va qurilma bo\'yicha konversiya farqi',
        'Haftalik Metrica + Market jadvalini birlashtiring',
      ]),
      h3('Rubl va so\'m'),
      intro(
        'Hisobot rubl da. O\'z accounting jadvalingizda kurs bilan so\'mga o\'giring — haqiqiy foyda shunda aniq.',
      ),
      tip(
        'Yandex Market API orqali hisobotni avtomatik yuklash mumkin (keyingi bosqich). Boshida CSV eksport yetarli.',
      ),
      warning(
        'FBY omborida «mavjud emas» holati qidiruvda yashirin qolish demak — qoldiqni kunlik tekshiring.',
      ),
      nextStep(
        'Keyingi darsda Yandex Market konversiya ko\'rsatkichlari chuqurroq tahlil.',
      ),
    ]),
    lesson('dars-8', 7, 8, 'Konversiya ko\'rsatkichlari', 'Показатели конверсии', 'yandex', '24 daqiqa', [
      intro(
        'Yandex Marketda konversiya zanjir: qidiruv ko\'rinishi → kartochka bosish → savat → buyurtma. Har bosqichni alohida o\'lchash optimizatsiya imkonini beradi.',
      ),
      h2('Konversiya zanjiri'),
      ul([
        'Listing CTR — ro\'yxatda ko\'rinishdan bosishgacha',
        'Kartochka konversiyasi — kartochkadan savatga',
        'Savat konversiyasi — savatdan to\'lovgacha',
        'Umumiy konversiya — ko\'rinishdan buyurtmagacha',
      ]),
      h2('Past konversiya sabablari'),
      ol([
        'Narx raqobatchidan yuqori (shu kartochkada)',
        'Kam sharh yoki past reyting',
        'Yetkazish muddati uzoq (FBS xalqaro)',
        'Tavsif rus tilida yomon yoki to\'liq emas',
        'Rasm sifati past yoki kam',
        'Boshqa sotuvchi arzonroq (bir xil katalog kartochkasi)',
      ]),
      h2('Yaxshilash amallari'),
      ul([
        'Narxni dinamik sozlash — raqobatchi monitoring',
        'Aksiya va promo (Market ruxsat berganda)',
        'Sharh yig\'ish — sifatli xizmat + follow-up',
        'Yetkazish vaqtini qisqartirish — FBY yoki mahalliy ombor',
        'Kartochka A/B — rasm va sarlavha variantlari',
      ]),
      tip(
        'Bir xil katalog kartochkasida bir nechta sotuvchi bo\'lsa — «Buy box» g\'alaba narx, reyting va yetkazish tezligiga bog\'liq. Uchala yo\'nalishda ishlang.',
      ),
      warning(
        'Ataylab past narx qo\'yib keyin yetkazishni qimmat qo\'shish — xaridor ishonchini yo\'qotadi va qaytarish oshadi.',
      ),
      nextStep(
        'Keyingi darsda mahsulot reytingi tahlili — sharhlar, yulduzlar va ularning sotuvga ta\'siri.',
      ),
    ]),
    lesson('dars-9', 7, 9, 'Mahsulot reytingi tahlili', 'Анализ рейтинга товара', 'yandex', '25 daqiqa', [
      intro(
        'Yandex Marketda reyting va sharhlar qidiruv tartibi va konversiyaga to\'g\'ridan-to\'g\'ri ta\'sir qiladi. 4.8 reytingli oferta 4.2 reytinglidan sezilarli ko\'proq sotadi.',
      ),
      h2('Reyting tarkibi'),
      ul([
        'Yulduzlar o\'rtachasi (1–5)',
        'Sharhlar soni — ko\'p sharh = ishonch',
        'So\'nggi sharhlar — yangi salbiy sharh tez ta\'sir qiladi',
        'Platforma «sotuvchi reytingi» — barcha ofertalarga ta\'sir',
        'Javob berilgan sharhlar — faollik signali',
      ]),
      h2('Sharh tahlili'),
      ol([
        'Ijobiy sharhlarda takrorlanuvchi so\'zlarni ajrating («tez yetkazish», «sifat yaxshi»)',
        'Salbiy sharhlarda sabab: o\'lcham, nuqson, kechikish, tavsif mos emas',
        'Har hafta salbiy sharhga 24 soat ichida javob',
        'Tizimli muammo (masalan, o\'lcham kichik) — kartochkada ogohlantirish qo\'shing',
        'Soxta sharh shubhasi — platformaga murojaat',
      ]),
      h2('Reytingni oshirish strategiyasi'),
      ul([
        'Birinchi 20 buyurtmada maksimal sifat — reyting asosi shu yerda',
        'Qadoq va «unboxing» tajribasi — ijobiy taassurot',
        'Muammo bo\'lsa oldindan xaridor bilan bog\'lanish (platforma ichida)',
        'Chegirma evaziga sharh so\'rash — qoidalar bo\'yicha ehtiyotkorlik',
      ]),
      tip(
        'Sharhlarni Excel ga eksport qilib, teg (tag) lar bilan guruhlang: «o\'lcham», «rang», «yetkazish». Eng ko\'p takrorlanuvchi muammoni birinchi hal qiling.',
      ),
      warning(
        'Soxta ijobiy sharh buyurtma qilish — Yandex qoidalariga zid, akkaunt bloklanishi xavfi.',
      ),
      nextStep(
        'Keyingi darsda savdo dinamikasi — trend, prognoz va tez o\'zgarishlarga javob.',
      ),
    ]),
    lesson('dars-10', 7, 10, 'Savdo dinamikasi', 'Динамика продаж', 'yandex', '26 daqiqa', [
      intro(
        'Savdo dinamikasi — vaqt o\'tishi bilan sotuv o\'zgarishi. Trendni tushunish reklama, zaxira va narx qarorlarini vaqtida qabul qilish imkonini beradi.',
      ),
      h2('Trend turlari'),
      ul([
        'O\'suvchi — yangi mahsulot yoki muvaffaqiyatli reklama',
        'Barqaror — yetilgan mahsulot, mavsum o\'rtasi',
        'Pasayuvchi — raqobat, eskirish, past reyting',
        'Siklik — bayram, mavsum, hafta oxiri effekti',
      ]),
      h2('Dinamikani o\'lchash'),
      ol([
        'Kunlik sotuv grafigi — kamida 30 kun',
        'Hafta-over-week (WoW) va oy-over-month (MoM) o\'sish %',
        'O\'rtacha 7 kunlik siljiyuvchi o\'rtacha — shovqinni kamaytiradi',
        'Raqobatchi narx o\'zgarishi bilan solishtirish',
        'Tashqi omillar: bayram, kurs, iqlom',
      ]),
      h2('Tez javob choralari'),
      h3('Sotuv tushsa'),
      ul([
        'Narx va raqobatchi tekshiruvi',
        'Qoldiq va «mavjud emas» holati',
        'Reyting va so\'nggi sharhlar',
        'Reklama byudjeti va ROAS',
        'Qidiruv pozitsiyasi (SEO)',
      ]),
      h3('Sotuv o\'ssa'),
      ul([
        'Zaxirani darhol to\'ldiring',
        'Reklama stavkasini oshiring (ROAS ijobiy bo\'lsa)',
        'O\'xshash SKU qo\'shing',
        'Ta\'minotchi bilan hajm kelishuvi',
      ]),
      tip(
        'Prognoz uchun oddiy usul: oxirgi 4 hafta o\'rtachasi × mavsum koeffitsienti (masalan, dekabr uchun 1.4). Murakkab AI shart emas boshlash uchun.',
      ),
      warning(
        'Bir kunlik tushish panika — haftalik trendga qarang. Bir kunlik o\'sish haddan ortiq optimizm — barqarorlikni tekshiring.',
      ),
      nextStep(
        'Modulning oxirgi darsida ma\'lumotlar asosida qaror qabul qilish — framework va amaliy misollar.',
      ),
    ]),
    lesson('dars-11', 7, 11, 'Qaror qabul qilish', 'Принятие решений', 'yandex', '28 daqiqa', [
      intro(
        'Ma\'lumot to\'plang — lekin qaror ham kerak. Bu darsda marketplace biznesida tez-tez uchraydigan vaziyatlar va ularni qanday hal qilish haqida framework beramiz.',
      ),
      h2('Qaror qabul qilish framework'),
      ol([
        'Muammoni aniqlang (sotuv tushdi, qaytarish oshdi, ROAS past)',
        'Ma\'lumot yig\'ing (KPI, trend, raqobatchi)',
        '2–3 ta mumkin variant yozing',
        'Har variant xavf va foydasini baholang',
        'Kichik sinov (A/B yoki 1 hafta) qiling',
        'Natijani o\'lchang va masshtablang yoki bekor qiling',
      ]),
      h2('Amaliy stsenariylar'),
      h3('Reklama to\'xtatilsinmi?'),
      intro('ROAS 2 hafta ketma-ket minimal chegaradan past + kartochka yangilangan → to\'xtating. ROAS chegarada + trend yuqori → davom eting, stavkani biroz pasaytiring.'),
      h3('Yangi kategoriyaga kirishmi?'),
      intro('Marja 25%+, raqobat o\'rtacha, mavsum yaqin → sinov 5–10 SKU. Aks holda avval mavjud kategoriyani chuqurlashtiring.'),
      h3('FBY ga o\'tishmi?'),
      intro('Kunlik 10+ buyurtma Rossiyada, qaytarish past, hajm barqaror → FBY foydali. Kam hajm → FBS arzonroq.'),
      h2('Modul va kurs bo\'ylab xulosa'),
      intro(
        '7-modulni tugatdingiz! Endi statistika o\'qish, KPI, mavsumiy reja, o\'sish strategiyasi va ma\'lumotga asoslangan qarorlar qabul qila olasiz.',
      ),
      ul([
        'Uzum: sotuv statistikasi, konversiya, ABC, mavsum, KPI, o\'sish',
        'Yandex: analitika, konversiya zanjiri, reyting, dinamika, qarorlar',
        'Har ikkala platformada: haftalik rutin + oylik strategik ko\'rib chiqish',
      ]),
      tip(
        'Har oy oxirida 1 soat «strategik sessiya»: KPI jadval, keyingi oy 3 ta prioritet, bir xil xato takrorlanmasin.',
      ),
      warning(
        '«His-hiss» bilan qaror qabul qilish xavfli — raqamlar bilan tasdiqlang. Lekin ma\'lumotsiz ham harakat qilmang — minimal KPI yig\'ishdan boshlang.',
      ),
      nextStep(
        'Keyingi modul — «Biznesni kengaytirish»: jamoa, avtomatlashtirish va brend qurish. Tabriklaymiz — tahlil va o\'sish bo\'yicha nazariy va amaliy poydevoringiz tayyor!',
      ),
    ]),
  ],
}
