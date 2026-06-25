import type { WrittenModule } from './types'
import { lesson, intro, h2, h3, ul, ol, tip, warning, nextStep } from './helpers'

export const module4: WrittenModule = {
  num: 4,
  slug: 'modul-4',
  title: 'Narx va raqobat strategiyasi',
  titleRu: 'Ценовая и конкурентная стратегия',
  desc: 'Narx strategiyasi, raqobatchilar narxini kuzatish, chegirma, aksiyalar va foyda marjasini saqlash.',
  descRu: 'Ценовая стратегия, мониторинг цен конкурентов, скидки, акции и сохранение маржи.',
  lessonCount: 9,
  hours: 4,
  available: true,
  lessons: [
    lesson(
      'dars-1',
      4,
      1,
      'Narx strategiyasi asoslari',
      'Основы ценовой стратегии',
      'uzum',
      '18 daqiqa',
      [
        intro(
          'Narx strategiyasi — qancha sotasiz va nima uchun. Uzum Marketda narx raqobat, marja, yetkazish turi (FBO/FBS) va reklama (Boost) bilan bog\'liq. Tasodifiy narx — foyda yoki sotuv yo\'qotish.',
        ),
        h2('Asosiy narx strategiyalari'),
        ul([
          'Penetratsiya — boshlang\'ichda past narx, reyting va sharh yig\'ish',
          'Raqobatbardosh — o\'rtacha yoki median raqobatchi narx',
          'Premium — yuqori narx + sifat, tez yetkazish, yaxshi xizmat',
          'Dinamik — talab va qoldiqga qarab o\'zgartirish',
        ]),
        h2('Uzum Market kontekstida'),
        intro(
          'Yangi kartochka uchun tavsiya: birinchi 2 hafta o\'rtacha narx yoki 3–5% past — tez birinchi buyurtmalar va sharhlar. Keyin marja maqsadiga qaytish.',
        ),
        h3('FBO vs FBS narx farqi'),
        ul([
          'FBO — tez yetkazish, xaridor ko\'proq to\'lashga tayyor, narx biroz yuqori bo\'lishi mumkin',
          'FBS — yetkazish uzoqroq, narx raqobatbardosh bo\'lishi kerak',
        ]),
        warning(
          'Juda arzon narx — xaridor shubhasi («sifat yomon?») va platforma «shubhali narx» tekshiruvi. Minimal marjadan past sotmang.',
        ),
        h2('Narx belgilash bosqichlari'),
        ol([
          'Marja jadvalini hisoblang (2-modul)',
          'Raqobatchi narxlarini yozing (min, max, median)',
          'Strategiyani tanlang (penetratsiya / raqobat / premium)',
          'seller.uzum.uz da narx qo\'ying',
          'Haftalik kuzatuv va moslashtirish',
        ]),
        tip(
          '«9990» yoki «49900» kabi psixologik narxlar ba\'zi kategoriyalarda konversiyani oshiradi — A/B test bilan sinab ko\'ring.',
        ),
        nextStep(
          'Keyingi dars — raqobatchilar narxini kuzatish: qachon va qanday reaksiya qilish.',
        ),
      ],
    ),
    lesson(
      'dars-2',
      4,
      2,
      'Raqobatchilar narxini kuzatish',
      'Мониторинг цен конкурентов',
      'uzum',
      '19 daqiqa',
      [
        intro(
          'Raqobatchilar narxini kuzatmasdan narx strategiyasi ishlamaydi. Uzum Marketda narxlar tez o\'zgaradi — aksiyalar, qoldiq tashlash, mavsum. Haftalik monitoring — standart.',
        ),
        h2('Kuzatish usullari'),
        ul([
          'Qo\'lda — haftada 1 marta top-10 raqobatchi narxini Excel ga yozish',
          'Uzum ilovasida «Sevimlilar» — tez solishtirish',
          'seller.uzum.uz analitika — o\'z mahsulotingiz vs bozor (mavjud bo\'lsa)',
          'Uchinchi tomon parserlar — ko\'p SKU uchun (qoidalar bilan mos)',
        ]),
        h2('Monitoring jadvali'),
        ol([
          'Ustunlar: Sana | Raqobatchi | Narx | Yetkazish | Eslatma',
          'Har hafta yangilang',
          'O\'z narx va o\'rtacha farqni hisoblang',
          'Katta o\'zgarish (10%+) — sababni aniqlang',
        ]),
        h3('Reaksiya qoidalari'),
        ul([
          'Raqobatchi 5% tushirdi — shoshilmang, 3 kun kuzating',
          'Bir nechta raqobatchi bir vaqtda tushirdi — aksiya yoki qoldiq bosimi',
          'Siz eng arzonsiz — marjani tekshiring, zarar bo\'lmasin',
          'Siz eng qimmatbobsiz — yetkazish yoki reyting ustunligingiz bormi?',
        ]),
        warning(
          'Narx urushiga kirish — ikkala tomonga zarar. Agar marja 15% dan tushsa, narxni tushirish o\'rniga kartochka yoki reklamani yaxshilang.',
        ),
        tip(
          'Boost reklama yoqilgan paytda raqobatchi narxini kunlik kuzating — reklama + yuqori narx = past ROAS.',
        ),
        nextStep(
          'Keyingi dars — chegirma va aksiyalar: Uzum Marketda qachon va qanday chegirma berish.',
        ),
      ],
    ),
    lesson(
      'dars-3',
      4,
      3,
      'Chegirma va aksiyalar',
      'Скидки и акции',
      'uzum',
      '20 daqiqa',
      [
        intro(
          'Chegirma — sotuvni tezlashtirish vositasi, lekin marjani kamaytiradi. Uzum Marketda platforma aksiyalari (masalan, «Chegirmalar» bo\'limi) va o\'z chegirmangiz mavjud.',
        ),
        h2('Chegirma turlari'),
        ul([
          'Doimiy chegirma — «eski narx» chizilgan (ehtiyotkorlik: ishonch)',
          'Vaqt chegaralangan — 3–7 kun, mavsum yoki qoldiq tashlash',
          'Platforma aksiyasi — Uzum taklif qiladi, siz qo\'shimcha chegirma berasiz',
          'Kupon — ma\'lum xaridorlar guruhiga (mavjud bo\'lsa)',
        ]),
        h2('Qachon chegirma berish?'),
        ol([
          'Qoldiq tugayapti — yangi partiya kelishidan oldin',
          'Mavsum oxiri — mavsumiy mahsulot',
          'Raqobatchi katta aksiya — cheklangan muddat javob',
          'Reyting yig\'ish — yangi kartochka, kichik chegirma',
          'Platforma «Aksiya» ga taklif qilgan — ROI hisoblang',
        ]),
        h3('Chegirma hajmi'),
        intro(
          'Odatda 5–15% — sezilarli, lekin marja saqlanadi. 20%+ — faqat qoldiq tashlash yoki maxsus kampaniya. Oldin marja jadvalini yangilang.',
        ),
        warning(
          'Doimiy «90% chegirma» — xaridor ishonchini yo\'qotadi va platforma tekshiruvi. Haqiqiy va vaqt chegaralangan chegirmalar ishlating.',
        ),
        h2('Aksiya rejalashtirish'),
        ul([
          'Byudjet — chegirma × taxminiy sotuv hajmi',
          'Maqsad — sotuv hajmi yoki reyting',
          'Muddat — qisqa va aniq',
          'Keyin narxni normal holatga qaytarish rejasi',
        ]),
        tip(
          'Chegirma davrida Boost reklama byudjetini oshirmang — organik talab va reklama birga marjani juda tushiradi.',
        ),
        nextStep(
          'Keyingi dars — foyda marjasini saqlash: chegirma va raqobat paytida marja qanday himoya qilinadi.',
        ),
      ],
    ),
    lesson(
      'dars-4',
      4,
      4,
      'Foyda marjasini saqlash',
      'Сохранение маржи прибыли',
      'uzum',
      '18 daqiqa',
      [
        intro(
          'Marja saqlash — narx, xarajat va hajm balansi. Uzum Marketda komissiya, logistika, Boost va qaytarish — barchasi marjani yeydi. Har chegirma oldidan «soflam» foydani hisoblang.',
        ),
        h2('Marja himoya qoidalari'),
        ul([
          'Minimal marja chegara — masalan, 25% dan past sotmang',
          'Chegirma maksimum — marja 20% dan past tushmasin',
          'Xarajatlarni har oy yangilang — komissiya va logistika o\'zgarishi mumkin',
          'Qaytarish foizini kuzating — yuqori qaytarish = past sof marja',
        ]),
        h2('Xarajatni kamaytirish (marja saqlash)'),
        ol([
          'Supplier dan yaxshiroq narx — hajm oshganda',
          'FBO vs FBS — qaysi arzonroq hisoblang',
          'Qadoqlash optimizatsiyasi — material xarajati',
          'Boost ROI — foydasiz kalit so\'zni o\'chirish',
          'Qaytarish sababini bartaraf etish — tavsif va sifat',
        ]),
        h3('Unit economics'),
        intro(
          'Har bir sotilgan dona uchun: Sof foyda = Sotuv − Barcha xarajatlar. Oylik foyda = Sof foyda × Sotilgan dona − O\'zgaruvchan bo\'lmagan xarajatlar (ijara, ish haqi).',
        ),
        warning(
          'Faqat sotuv hajmiga qarab xursand bo\'lmang — past marjada ko\'p sotish katta hajmda ham zarar keltirishi mumkin.',
        ),
        tip(
          'seller.uzum.uz moliya bo\'limidan oylik hisob-kitobni yuklab, Excel da haqiqiy marjani hisoblang — taxmin emas, raqam.',
        ),
        h2('Marja monitoring'),
        ul([
          'Har SKU uchun minimal narx formulasi Excel da',
          'Raqobatchi tushirganda — avval marja, keyin qaror',
          'Oy oxirida kam foydali SKU larni to\'xtatish yoki narx oshirish',
        ]),
        nextStep(
          'Uzum narx bo\'limi tugadi. Keyingi 5 ta dars Yandex Market narx strategiyasi — dinamik narxlash, promokodlar va foyda optimizatsiyasi.',
        ),
      ],
    ),
    lesson(
      'dars-5',
      4,
      5,
      'Dinamik narxlash',
      'Динамическое ценообразование',
      'yandex',
      '20 daqiqa',
      [
        intro(
          'Dinamik narxlash — talab, raqobat va qoldiqga qarab narxni avtomatik yoki qo\'lda o\'zgartirish. Yandex Marketda bu qo\'lda boshlanadi, keyin API yoki repricer vositalari bilan avtomatlashtiriladi.',
        ),
        h2('Dinamik narx omillari'),
        ul([
          'Raqobatchi narx — buy box uchun',
          'Qoldiq miqdori — ko\'p qoldiq = chegirma',
          'Talab mavsumi — Wordstat va sotuv tarixi',
          'Yetkazish turi — FBY ustunligi',
          'Rubl kursi — xalqaro sotuvchilar uchun',
        ]),
        h2('Qo\'lda dinamik narx'),
        ol([
          'Haftalik raqobatchi narxini yozing',
          'Buy box yo\'qolgan bo\'lsa — narx yoki yetkazishni tekshiring',
          'Qoldiq 30+ kun turgan bo\'lsa — 5–10% chegirma',
          'Mavsum oldi — narxni biroz oshirish mumkin',
        ]),
        h3('Avtomatlashtirish'),
        intro(
          'Ko\'p SKU uchun repricer dasturlari (qoidalar bilan) yoki partner.yandex.ru API — minimal/maksimal narx chegarasi bilan. Avval qo\'lda tajriba, keyin avtomat.',
        ),
        warning(
          'Minimal narx chegarasiz avtomatik tushirish — zarar. Har doim «floor price» (minimal foydali narx) belgilang.',
        ),
        tip(
          'Yandex Marketda narx o\'zgarishi 15–30 daqiqa ichida ko\'rinadi. Tez-tez o\'zgartirish o\'rniga aniq qoidalar bilan ishlang.',
        ),
        nextStep(
          'Keyingi dars — raqobat tahlili: Yandex Marketda buy box va raqobatchi strategiyasi.',
        ),
      ],
    ),
    lesson(
      'dars-6',
      4,
      6,
      'Raqobat tahlili',
      'Конкурентный анализ',
      'yandex',
      '19 daqiqa',
      [
        intro(
          'Yandex Market raqobat tahlili — buy box, narx, yetkazish va reyting kombinatsiyasi. Bir xil kartochkada 5–20 ta sotuvchi bo\'lishi mumkin; siz ulardan qanday ajralishingizni bilishingiz kerak.',
        ),
        h2('Buy box tahlili'),
        ul([
          'Kim buy box da — narx, FBY/FBS, reyting',
          'Buy box almashinuvi — qachon va nima uchun',
          'Siz buy box da emassiz — sabab: narx? yetkazish? reyting?',
        ]),
        h2('Raqobatchi segmentatsiya'),
        ol([
          'Katta o\'yinchilar — keng assortiment, FBY, brend',
          'Narx o\'yinchilari — doim eng arzon',
          'Premium — yuqori narx, yuqori reyting',
          'Siz qaysi segmentda ishlaysiz — tanlang va ushlab turing',
        ]),
        h3('Monitoring chastotasi'),
        ul([
          'Buy box raqobati — kunlik (asosiy SKU)',
          'Qolgan raqobatchilar — haftalik',
          'Yangi sotuvchi paydo bo\'lganda — darhol tahlil',
        ]),
        warning(
          'Faqat narx bo\'yicha raqobat — past marja tuzumi. Yetkazish (FBY), reyting va kartochka sifati ham buy box beradi.',
        ),
        h2('Raqobatchi harakatlariga javob'),
        ul([
          'Narx tushirdi — marjani hisoblang, shoshilmang',
          'Aksiya boshladi — vaqt chegaralangan javob yoki o\'tkazib yuborish',
          'Yangi kuchli sotuvchi — differensatsiya (xizmat, qadoq, bonus)',
        ]),
        tip(
          'partner.yandex.ru «Конкуренты» yoki «Цены» bo\'limi bo\'lsa — o\'z mahsulotingizni bozor o\'rtachasi bilan solishtiring.',
        ),
        nextStep(
          'Keyingi dars — minimal narx va komissiya: Yandex tariflari va foydali narx pastki chegara.',
        ),
      ],
    ),
    lesson(
      'dars-7',
      4,
      7,
      'Minimal narx va komissiya',
      'Минимальная цена и комиссия',
      'yandex',
      '18 daqiqa',
      [
        intro(
          'Yandex Market har kategoriyada komissiya foizi va ba\'zan minimal narx belgilaydi. Xalqaro sotuvchi uchun rubl kursi va logistika ham minimal foydali narxni belgilaydi.',
        ),
        h2('Komissiya tuzilmasi'),
        ul([
          'Kategoriya komissiyasi — odatda 5–25%',
          'FBY: qabul, saqlash, komplektatsiya, yetkazish — alohida',
          'To\'lov qabul qilish — ba\'zan qo\'simcha',
          'Reklama — Market Boost / Direct alohida',
        ]),
        h2('Minimal foydali narx formulasi'),
        intro(
          'Floor price (₽) = (Xarid + Logistika + Reklama) / (1 − Komissiya % − Minimal marja %). Masalan: xarid 200 ₽, logistika 80 ₽, reklama 30 ₽, komissiya 15%, marja 20% → Floor ≈ (200+80+30) / (1−0.15−0.20) ≈ 441 ₽.',
        ),
        h3('Minimal narx qoidalari'),
        ul([
          'Platforma minimal narx — kategoriya qoidalarida',
          'Juda arzon — «подозрительная цена» tekshiruvi',
          'Brend MAP (Minimum Advertised Price) — ba\'zi brendlar cheklaydi',
        ]),
        warning(
          'Komissiya va tariflar o\'zgarishi mumkin — partner.yandex.ru «Тарифы» ni har chorak tekshiring.',
        ),
        h2('Kurs va minimal narx'),
        intro(
          'O\'zbek supplier dan xarid so\'mda, sotuv rubl da. Kurs 5% tushsa — marja kamayadi. Floor price ga 3–5% kurs zaxirasi qo\'shing.',
        ),
        tip(
          'Excel da har SKU uchun floor price ustuni yarating. Oferta narxini hech qachon floor dan past qo\'ymang — avtomat repricer da ham cheklov.',
        ),
        nextStep(
          'Keyingi dars — aksiya va promokodlar: Yandex Marketda chegirma kampaniyalari.',
        ),
      ],
    ),
    lesson(
      'dars-8',
      4,
      8,
      'Aksiya va promokodlar',
      'Акции и промокоды',
      'yandex',
      '20 daqiqa',
      [
        intro(
          'Yandex Market aksiyalari — platforma («Распродажа», «Чёрная пятница») va o\'z kampaniyangiz. Promokod — ma\'lum xaridorlar guruhiga qo\'simcha chegirma (mavjud bo\'lsa).',
        ),
        h2('Aksiya turlari'),
        ul([
          'Platforma aksiyasi — Yandex taklif, siz ishtirok shartlarini qabul qilasiz',
          'Do\'kon aksiyasi — o\'z chegirmangiz, muddat chegaralangan',
          '«Скидка» yorlig\'i — eski narx ko\'rsatiladi (qoidalar bilan)',
          'Promokod — reklama orqali tarqatish',
        ]),
        h2('Aksiyaga qachon kirish?'),
        ol([
          'ROI hisoblang — chegirma + komissiya + logistika',
          'Maqsad aniq — qoldiq, reyting, buy box',
          'Muddat qisqa — 3–14 kun',
          'Keyin narxni floor price ga qaytarish',
        ]),
        h3('Promokod strategiyasi'),
        ul([
          'Yangi xaridor — birinchi buyurtma chegirma',
          'Qayta xaridor — sodiqlik (ehtiyotkor — marja)',
          'Ijtimoiy tarmoq — cheklangan kod, hajm nazorati',
        ]),
        warning(
          'Doimiy katta chegirma — buy box vaqti bo\'lsa ham marja yo\'qoladi. Aksiya — vosita, doimiy narx emas.',
        ),
        h2('Aksiya monitoring'),
        ul([
          'Sotuv hajmi o\'sishi vs marja tushishi',
          'Buy box vaqtida o\'zgarish',
          'Raqobatchilar ham aksiyada — nisbiy pozitsiya',
        ]),
        tip(
          'Platforma «Чёрная пятница» kabi katta aksiyalarda oldindan zaxira va floor price ni hisoblang — talab 3–5 barobar oshishi mumkin.',
        ),
        nextStep(
          'Modulning oxirgi darsi — foyda optimizatsiyasi: narx, hajm va xarajat balansi Yandex Marketda.',
        ),
      ],
    ),
    lesson(
      'dars-9',
      4,
      9,
      'Foyda optimizatsiyasi',
      'Оптимизация прибыли',
      'yandex',
      '21 daqiqa',
      [
        intro(
          'Foyda optimizatsiyasi — narx, sotuv hajmi va xarajatlar orasida eng yaxshi nuqtani topish. Yandex Marketda bu buy box, marja va operatsion samaradorlik kombinatsiyasi.',
        ),
        h2('Optimizatsiya yo\'nalishlari'),
        ul([
          'Narx — floor price dan yuqori, buy box imkoniyat',
          'Hajm — qaysi SKU scale qilish, qaysi to\'xtatish',
          'Xarajat — supplier, logistika, reklama ROI',
          'Assortiment — foydali SKU ga fokus',
        ]),
        h2('SKU darajasida tahlil'),
        ol([
          'Har SKU: sotuv, marja, buy box %, qaytarish',
          'A-klass — yuqori foyda, ko\'p resurs',
          'B-klass — o\'rtacha, barqaror',
          'C-klass — past foyda yoki zarar — narx oshirish yoki to\'xtatish',
        ]),
        h3('Reklama va foyda'),
        intro(
          'ROAS (Return on Ad Spend) = Reklamadan tushum / Reklama xarajati. ROAS 3+ yaxshi (kategoriyaga qarab). Past ROAS SKU da reklama byudjetini kamaytiring.',
        ),
        h2('Oylik optimizatsiya tsikli'),
        ul([
          '1-hafta: moliya hisoboti — haqiqiy marja',
          '2-hafta: raqobatchi va buy box tahlili',
          '3-hafta: narx va aksiya rejalari',
          '4-hafta: supplier va logistika muzokarasi',
        ]),
        warning(
          'Faqat buy box ga erishish uchun marjani qurbon qilmang — uzoq muddatda biznes barqaror emas.',
        ),
        tip(
          'partner.yandex.ru «Отчёты» → foyda va xarajatlar bir joyda. Oylik 1 soat tahlil — yillik foydaga katta ta\'sir.',
        ),
        h2('Modul yakuni'),
        intro(
          '4-modul tugadi. Endi Uzum va Yandex Marketda narx strategiyasi, raqobat tahlili, chegirma va marja saqlashni bilasiz. Keyingi modul — reklama va traffic (Boost, Yandex Direct).',
        ),
        nextStep(
          'Amaliy vazifa: bitta SKU uchun to\'liq narx jadvali (floor price, raqobatchi, aksiya rejasi) yarating va 2 hafta amalda qo\'llang.',
        ),
      ],
    ),
  ],
}
