import type { WrittenModule } from './types'
import { lesson, intro, h2, h3, ul, ol, tip, warning, nextStep } from './helpers'

export const module6: WrittenModule = {
  num: 6,
  slug: 'modul-6',
  title: 'Logistika va omborxona',
  titleRu: 'Логистика и склад',
  desc: 'FBO, FBS, FBY, DBS sxemalari, omborga yuborish, inventarizatsiya va qaytarishlar.',
  descRu: 'Схемы FBO, FBS, FBY, DBS, отправка на склад, инвентаризация и возвраты.',
  lessonCount: 8,
  hours: 3,
  available: true,
  lessons: [
    lesson('dars-1', 6, 1, 'FBO va FBS farqi', 'Разница FBO и FBS', 'uzum', '20 daqiqa', [
      intro(
        'Uzum Marketda mahsulotni xaridorga yetkazish ikki asosiy sxema orqali amalga oshiriladi: FBO (Fulfillment by Operator) va FBS (Fulfillment by Seller). Tanlov biznes modeli, mahsulot hajmi va nazorat darajasiga bog\'liq.',
      ),
      h2('FBO — platforma ombori'),
      ul([
        'Mahsulotni Uzum omboriga yuborasiz (Toshkent yoki mintaqaviy)',
        'Buyurtma kelganda platforma qadoqlaydi va yetkazadi',
        'Tez yetkazish belgisi (1–2 kun) odatda FBO da mavjud',
        'Ombor xizmati va saqlash uchun alohida to\'lov bo\'lishi mumkin',
        'Siz faqat zaxira va narxni boshqarasiz',
      ]),
      h2('FBS — sotuvchi ombori'),
      ul([
        'Mahsulot sizning omboringizda qoladi',
        'Buyurtma kelganda 24–48 soat ichida qadoqlab topshirish punktiga yoki kuryerga berasiz',
        'Qadoqlash va yuborish mas\'uliyati sizda',
        'Ombor ijarasi yo\'q, lekin mehnat va vaqt xarajati bor',
        'Katta hajmli yoki nozik mahsulotlar uchun qulay',
      ]),
      h2('Qaysi birini tanlash?'),
      ol([
        'Yangi sotuvchi, kichik assortiment → FBO',
        'Maxsus qadoqlash yoki shaxsiy brend tajribasi kerak → FBS',
        'Tez aylanadigan mahsulot → FBO (omborda doim bor)',
        'Buyurtma hajmi kuniga 5 tadan kam → FBS arzonroq bo\'lishi mumkin',
        'Ikkalasini aralashtirib ishlash mumkin — SKU bo\'yicha',
      ]),
      h3('Aralash model namunasi'),
      intro(
        'Masalan: 80% sotuv FBO orqali, 20% maxsus sovg\'a qadoqlari FBS da. Kabinetda har SKU uchun alohida sxema tanlanadi.',
      ),
      ul([
        'FBO: tez aylanadigan standart mahsulotlar',
        'FBS: shaxsiylashtirilgan yoki katta gabaritli buyurtmalar',
        'Sxema o\'zgartirish: omborda qoldiq tugagach yoki mavsum boshida',
        'Har oy sxema bo\'yicha xarajatlarni solishtiring',
      ]),
      h2('Xarajat taqqoslash jadvali'),
      intro('Taxminiy — kategoriyaga qarab farq qiladi:'),
      ul([
        'FBO: ombor ijarasi + qadoqlash + yetkazish (platforma)',
        'FBS: o\'z qadoqlash materiali + kuryer/punkt + vaqt xarajati',
        'FBO: tez yetkazish belgisi — konversiya +5–15% bo\'lishi mumkin',
        'FBS: kechikish xavfi — jarima va reyting tushishi',
      ]),
      tip(
        'Birinchi 20 ta SKU uchun FBO tanlang — logistika xatolarini kamaytiradi va reyting tezroq o\'sadi.',
      ),
      warning(
        'FBS da vaqtida yubormasangiz — jarima va reyting tushishi. Ish vaqtingiz va kuryer imkoniyatini oldindan baholang.',
      ),
      nextStep(
        'Keyingi darsda FBO omboriga mahsulot yuborish jarayonini qadam-baqadam ko\'rib chiqamiz.',
      ),
    ]),
    lesson('dars-2', 6, 2, 'Omborga mahsulot yuborish', 'Отправка товара на склад', 'uzum', '28 daqiqa', [
      intro(
        'FBO sxemasida mahsulot birinchi marta Uzum omboriga yetib kelishi kerak. Noto\'g\'ri qadoqlash yoki hujjat xatolari qabul qilishni kechiktiradi yoki rad etishga olib keladi.',
      ),
      h2('Yuborishdan oldin tayyorgarlik'),
      ol([
        'Kabinetda «Omborga yuborish» bo\'limida ariza yarating',
        'Har bir SKU uchun miqdor va partiya raqamini kiriting',
        'Ombor manzili va qabul qilish vaqtini tanlang',
        'Yuborish ro\'yxati (invoice) ni PDF da yuklab oling',
        'Mahsulotlarni shtrix-kod bilan belgilang',
      ]),
      h2('Qadoqlash standartlari'),
      ul([
        'Har bir birlik alohida quti yoki zip-paketda',
        'Shikastlanishdan himoya: ko\'p qatlamli plyonka, to\'ldirish materiali',
        'Tashqi qutida yuborish ro\'yxati nusxasi yoki QR kod',
        'Suyuq va shisha — qo\'shimcha himoya, «ehtiyotkor» yorliq',
        'O\'lcham va og\'irlik kabinetdagi ma\'lumotga mos',
      ]),
      h2('Yetkazib olib borish'),
      ul([
        'O\'zingiz olib borish — belgilangan vaqt oralig\'ida',
        'Logistika hamkori — Uzum tavsiya qilgan yoki shartnoma asosida',
        'Yuborish ro\'yxatidagi miqdor bilan fizik miqdor mos kelishi shart',
        'Qabul qilgandan keyin 1–3 kun ichida omborda «Mavjud» holatiga o\'tadi',
      ]),
      h3('Partiya kuzatuvi'),
      intro(
        'Har yuborish partiyasiga raqam bering (P-001, P-002). Kabinetdagi «Yo\'lda» holati bilan fizik yuborish sanasini solishtiring.',
      ),
      ol([
        'Yuborish sanasi va kutilgan qabul sanasi',
        'Carrier nomi va trek-nomer',
        'Qabul qilingan vs rad etilgan miqdor',
        'Farq bo\'lsa — 48 soat ichida support ga murojaat',
      ]),
      h2('Ombor qabul qilish vaqtlari'),
      intro(
        'Uzum omborlari belgilangan qabul vaqtida ishlaydi. Reja qilmagan kelsangiz — navbat yoki keyingi kun. Kabinetda aniq vaqt oralig\'ini ko\'ring.',
      ),
      tip(
        'Birinchi yuborishda kam miqdor (10–30 dona) yuboring. Qabul jarayoni va sifat nazoratini tushungach, partiyani kattalashtiring.',
      ),
      warning(
        'Omborga yuborilgan mahsulotni qaytarib olish qiyin va pullik bo\'lishi mumkin. Faqat sotiladigan miqdorni yuboring.',
      ),
      nextStep(
        'Keyingi darsda xaridor qaytarishlari bilan ishlash — sabablar, jarayon va pul qaytarish.',
      ),
    ]),
    lesson('dars-3', 6, 3, 'Qaytarishlar bilan ishlash', 'Работа с возвратами', 'uzum', '24 daqiqa', [
      intro(
        'Qaytarish — marketplace savdosining ajralmas qismi. To\'g\'ri boshqarish reyting, pul oqimi va takroriy sotuvlarga ta\'sir qiladi. Uzum Market qaytarish qoidalarini platforma belgilaydi, siz jarayonni kuzatasiz.',
      ),
      h2('Qaytarish sabablari'),
      ul([
        'Mahsulot tavsifga mos kelmadi (rang, o\'lcham)',
        'Nuqson yoki shikastlanish yetkazishda',
        'Xaridor fikrini o\'zgartirdi (qonuniy muddat ichida)',
        'Noto\'g\'ri mahsulot yuborilgan (sizning xatoingiz)',
        'Soxta yoki sifat past deb baholangan',
      ]),
      h2('Qaytarish jarayoni Uzumda'),
      ol([
        'Xaridor kabinet orqali qaytarish so\'rovini yuboradi',
        'Siz 24–48 soat ichida tasdiqlaysiz yoki rad etasiz (sabab bilan)',
        'Xaridor mahsulotni topshirish punktiga yoki kuryer orqali qaytaradi',
        'Ombor yoki siz qabul qilib tekshirasiz',
        'Tasdiqlangach pul xaridorga qaytariladi, komissiya qoidalarga qarab',
      ]),
      h2('Rad etish asoslari'),
      intro('Asosli rad etish mumkin, lekin hujjat talab qilinadi:'),
      ul([
        'Mahsulot ishlatilgan yoki shikastlangan (xaridor aybi)',
        'Qadoq ochilgan va sotib bo\'lmaydigan holat (gigiena mahsuloti)',
        'Qaytarish muddati o\'tgan',
        'Noto\'g\'ri mahsulot qaytarilgan (almashtirish firibgarligi)',
      ]),
      h3('Moliyaviy ta\'sir'),
      intro(
        'Qaytarish pul oqimini sekinlashtiradi: xaridor puli qaytariladi, siz mahsulotni qayta sotishingiz yoki yo\'qotishingiz kerak. Oylik foydadan qaytarish foizini ayiring.',
      ),
      h2('Qaytarish foizini kamaytirish'),
      ul([
        'Video yoki 360° rasm — kutilmalar mos keladi',
        'FAQ bo\'limi kartochkada — tez-tez savollar',
        'Sifat nazorati yuborishdan oldin — nuqsonsiz mahsulot',
        'To\'g\'ri kategoriya — «boshqa narsa kutganman» kamayadi',
      ]),
      tip(
        'Kartochkada o\'lcham jadvali, real rasmlar va aniq tavsif — qaytarishning 40% ini kamaytiradi.',
      ),
      warning(
        'Xaridor bilan shaxsiy chatda platforma tashqarisida kelishmang — bu Uzum qoidalariga zid va himoya yo\'qoladi.',
      ),
      nextStep(
        'Keyingi darsda ombor qoldiqlarini boshqarish — inventarizatsiya va hisob-kitob.',
      ),
    ]),
    lesson('dars-4', 6, 4, 'Inventarizatsiya', 'Инвентаризация', 'uzum', '26 daqiqa', [
      intro(
        'Inventarizatsiya — ombordagi haqiqiy qoldiqni kabinetdagi raqam bilan moslashtirish. Noto\'g\'ri qoldiq = sotib bo\'lmagan mahsulot sotiladi yoki ortiqcha zaxira omborda turadi.',
      ),
      h2('Qoldiq boshqarish tamoyillari'),
      ul([
        'Har SKU uchun minimal va maksimal zaxira belgilang',
        'Tez aylanuvchi mahsulot — ko\'proq zaxira, sekin — kamroq',
        'Kabinet qoldiq = haqiqiy ombor + yo\'ldagi partiya',
        'Kunlik yoki haftalik qoldiq tekshiruvi (SKU soniga qarab)',
      ]),
      h2('FBO inventarizatsiya'),
      ol([
        'Kabinetda «Ombor qoldiqlari» hisobotini yuklab oling',
        'Haqiqiy qoldiq bilan solishtiring (ombor hisoboti = manba)',
        'Farq bo\'lsa — qabul qilish xatosi yoki yo\'qotish arizasi',
        'Muddati o\'tayotgan mahsulotlarni chegirma bilan sotish rejasini tuzing',
        'Yangi yuborish partiyasini qoldiq asosida rejalashtiring',
      ]),
      h2('FBS inventarizatsiya'),
      ul([
        'O\'z omboringizda jismoniy sanash (oyiga kamida 1 marta)',
        'Excel yoki Market Pro kabi tizimda qoldiq yuritish',
        'Buyurtma kelganda qoldiq avtomatik kamayishi',
        'Ikki joyda sotilsa (Uzum + boshqa kanal) — bitta umumiy qoldiq jadvali',
      ]),
      h3('Inventarizatsiya jadvali'),
      intro('Tavsiya etilgan chastota:'),
      ul([
        '50 dan kam SKU — haftalik sanash (FBS) + oylik FBO hisobot',
        '50–200 SKU — ikk haftalik + avtomatik qoldiq sync',
        '200+ SKU — kunlik tizim + oylik to\'liq audit',
      ]),
      h2('Yo\'qotish va farq'),
      intro(
        'Kabinet va haqiqiy qoldiq farqi bo\'lsa: o\'g\'irlik, qabul xatosi yoki hisob kitob xatosi. Har farq uchun sabab yozib, support ga ticket oching.',
      ),
      h3('Zaxira formulasi'),
      intro('Oddiy formula: Zaxira = Kunlik o\'rtacha sotuv × Yetkazish vaqti (kun) + Xavfsizlik zaxirasi (3–7 kun).'),
      ol([
        'Kunlik o\'rtacha sotuvni oxirgi 30 kun bo\'yicha hisoblang',
        'Yetkazish vaqti = omborga yuborish + qabul + saqlash',
        'Xavfsizlik zaxirasi = kutilmagan cho\'qqi uchun',
        'Natijani yuqoriga yaxlitlang va zaxira buyurtmasi bering',
      ]),
      tip(
        'Google Sheets da SKU, qoldiq, kunlik sotuv, «qancha kun yetadi» ustunlari bo\'lgan jadval yarating. Har dushanba yangilang.',
      ),
      warning(
        'Qoldiqni nol qilib qo\'ymang — kartochka «Tugagan» bo\'ladi va qidiruv pozitsiyasi tushadi. Kamida 3–5 kunlik zaxira saqlang.',
      ),
      nextStep(
        'Uzum logistika qismi tugadi. Endi Yandex Market sxemalari: DBS, FBY va FBS.',
      ),
    ]),
    lesson('dars-5', 6, 5, 'DBS, FBY va FBS sxemalari', 'Схемы DBS, FBY и FBS', 'yandex', '26 daqiqa', [
      intro(
        'Yandex Market uchta asosiy yetkazish modelini taklif qiladi. Har biri nazorat, xarajat va xizmat ko\'rsatkichlari (SLA) jihatidan farq qiladi.',
      ),
      h2('FBY — Fulfillment by Yandex'),
      ul([
        'Mahsulot Yandex omboriga yuboriladi (Rossiya yoki MDH hub)',
        'Saqlash, qadoqlash, yetkazish — platforma zimmasida',
        'Yandex Market qidiruvida ustunlik berilishi mumkin',
        'Ombor ijarasi va logistika komissiyasi qo\'shimcha',
        'Katta hajm va tez aylanish uchun optimal',
      ]),
      h2('FBS — sotuvchi yuboradi'),
      ul([
        'Buyurtma kelganda siz qadoqlaysiz va topshirish punktiga yetkazasiz',
        'Aniq SLA: odatda 24–48 soat ichida «Tayyor»',
        'O\'z omboringiz O\'zbekistonda bo\'lishi mumkin — xalqaro yuborish alohida',
        'Qadoqlash standartlari qattiq — o\'lcham va og\'irlik chegaralari',
      ]),
      h2('DBS — Delivery by Seller'),
      ul([
        'O\'z kuryeringiz yoki shartnomali logistika bilan yetkazasiz',
        'Shahar ichida tez yetkazish (same-day) uchun mos',
        'Yandex kuryer emas — siz to\'liq marshrutni boshqarasiz',
        'Katta shaharlar va o\'z logistika tarmog\'i bor sotuvchilar uchun',
      ]),
      h2('Sxema tanlash jadvali'),
      ol([
        'Rossiya omboriga kirish imkoni bor → FBY',
        'O\'zbekistondan yuborish, kichik hajm → FBS + xalqaro pochta',
        'Moskva/SPb da o\'z ombor → DBS yoki FBS',
        'Bir xil SKU ni turli sxemada sinab ko\'rish mumkin',
      ]),
      h2('Yandex vs Uzum logistika taqqoslash'),
      ul([
        'Uzum FBO — O\'zbekiston ichida, sodda bojxona',
        'Yandex FBY — Rossiya bojxona va sertifikat',
        'Yandex FBS xalqaro — carrier va muddat muhimroq',
        'Ikkala platformada SLA buzish — reyting va jarima',
      ]),
      tip(
        'Yandex Market partner kabinetida har bir oferta uchun sxemani alohida tanlaysiz. Bitta do\'konda FBY va FBS aralash ishlashi mumkin.',
      ),
      warning(
        'FBY ga yuborish uchun Rossiya bojxona va sertifikat talablari qattiq. Hujjatlarsiz mahsulot omborda ushlab qolinishi mumkin.',
      ),
      nextStep(
        'Keyingi darsda Yandex Market uchun yetkazib berish sozlamalari: hudud, muddat va qadoqlash.',
      ),
    ]),
    lesson('dars-6', 6, 6, 'Yetkazib berish sozlash', 'Настройка доставки', 'yandex', '28 daqiqa', [
      intro(
        'Yetkazib berish sozlamalari xaridor kutgan muddat va narxni belgilaydi. Noto\'g\'i sozlama — kechikish, jarima va past reyting.',
      ),
      h2('Asosiy parametrlar'),
      ul([
        'Yetkazish hududi — qaysi mintaqa va mamlakatlar',
        'Minimal va maksimal yetkazish muddati (kun)',
        'Yetkazish narxi — bepul yoki qat\'iy summa',
        'Ombor manzili (FBS/DBS) — aniq indeks va koordinata',
        'Ish kunlari va buyurtmani qayta ishlash vaqti',
      ]),
      h2('FBS yuborish jarayoni'),
      ol([
        'Buyurtma keldi — push yoki email xabarnoma',
        '24 soat ichida «Tayyorlanmoqda» → «Tayyor» holatiga o\'tkazing',
        'Qadoqlash standartiga mos quti, shtrix-kod yopishtiring',
        'Yandex topshirish punktiga yoki kuryerga bering',
        'Trek-nomer avtomatik yoki qo\'lda kiriting',
        'Kechikish bo\'lsa oldindan xaridor va platformaga xabar bering',
      ]),
      h2('Qadoqlash talablari Yandex'),
      ul([
        'Mustahkam karton quti, ichki to\'ldirish',
        'Og\'irlik 25 kg gacha (kategoriyaga qarab)',
        'Suyuq — germetik qadoq + ikkinchi quti',
        'Elektronika — antistatik va shock-proof',
        'Yandex brend stikerlari (agar talab qilinsa)',
      ]),
      h3('Kechikish va jarima'),
      intro(
        'SLA buzilsa — reyting tushishi, reklama cheklovi va moliyaviy jarima. Kunlik buyurtma navbatini kuzatish odatiy amaliyot.',
      ),
      tip(
        'Buyurtmalar uchun Telegram bot yoki oddiy jadval: buyurtma raqami, SKU, muddat, holat. Kichik jamoa uchun yetarli.',
      ),
      warning(
        'Xalqaro yuborishda bojxona kechikishi hisobga olinmadi — xaridor shikoyat qiladi. Yetkazish muddatiga 3–7 kun zaxira qo\'shing.',
      ),
      nextStep(
        'Keyingi darsda O\'zbekistondan Rossiya va MDH ga xalqaro logistika: carrier, bojxona, hujjatlar.',
      ),
    ]),
    lesson('dars-7', 6, 7, 'Xalqaro logistika', 'Международная логистика', 'yandex', '30 daqiqa', [
      intro(
        'O\'zbek sotuvchi sifatida Yandex Market ga FBS orqali yuborish xalqaro logistika bilimini talab qiladi. Carrier tanlash, bojxona deklaratsiyasi va muddat — muvaffaqiyat kaliti.',
      ),
      h2('Logistika variantlari'),
      ul([
        'Pochta va kurer xizmatlari: EMS, DHL, FedEx, CDEK (MDH)',
        'Konsolidator — bir nechta yuborishni birlashtirib arzonlashtiradi',
        'Tranzit ombor (Rossiya chegarasida) — keyin ichki Yandex logistika',
        'FBY hub ga to\'g\'ridan-to\'g\'ri yuborish (hajm katta bo\'lsa)',
      ]),
      h2('Bojxona hujjatlari'),
      ol([
        'Invoys (invoice) — mahsulot nomi, narxi, miqdori ingliz/rus tilida',
        'Yuboruvchi va qabul qiluvchi to\'liq manzili',
        'HS kod (bojxona toifasi) — kategoriyaga mos',
        'Sertifikat (elektronika, bolalar mahsuloti, kosmetika)',
        'CN22/CN23 bojxona deklaratsiyasi (carrier shablonida)',
      ]),
      h2('Xarajat va muddat rejalashtirish'),
      ul([
        'Og\'irlik va hajm — narxning asosi; yengil mahsulot foydaliroq',
        'Ekspress (3–5 kun) vs iqtisodiy (10–20 kun)',
        'Bojxona to\'lovi va QQSingizni sotuv narxiga qo\'shing',
        'Yo\'qotilgan yuborish uchun sug\'urta (qimmat mahsulotda majburiy)',
      ]),
      h3('CDEK va MDH tarmoqlari'),
      intro(
        'Qozog\'iston orqali tranzit ko\'p sotuvchilar uchun arzon variant. Muddat va narxni oldindan kalkulyator orqali hisoblang.',
      ),
      tip(
        'Birinchi 10 ta xalqaro yuborishni qo\'lda kuzating. Har birining muddat va xarajatini jadvalga yozing — keyin eng yaxshi carrierni tanlaysiz.',
      ),
      warning(
        'Taqiqlangan yoki litsenziyali mahsulotlarni bojxona orqali yubormang — musodara va akkaunt bloklanishi xavfi.',
      ),
      nextStep(
        'Modulning oxirgi darsida Yandex Market qaytarish jarayoni va O\'zbek sotuvchi nuqtai nazaridan maxsus holatlar.',
      ),
    ]),
    lesson('dars-8', 6, 8, 'Qaytarish jarayoni', 'Процесс возврата', 'yandex', '26 daqiqa', [
      intro(
        'Yandex Market qaytarish qoidalari Rossiya iste\'molchilar qonuniga mos. O\'zbek sotuvchi uchun qaytarish murakkabroq — mahsulot chet elga qaytishi kerak bo\'lishi mumkin.',
      ),
      h2('Qaytarish turlari'),
      ul([
        'Sifatli mahsulot — xaridor fikrini o\'zgartirishi (14 kun ichida, kategoriyaga qarab)',
        'Nuqsonli — ishlab chiqarish yoki yetkazish xatosi',
        'Noto\'g\'ri mahsulot yuborilgan — sizning xatoingiz',
        'Qisman qaytarish — to\'plamdan bir qismi',
      ]),
      h2('Jarayon bosqichlari'),
      ol([
        'Xaridor Market orqali qaytarish arizasi yuboradi',
        'Siz tasdiqlaysiz yoki rad etasiz (sabab va foto talab qilinadi)',
        'Xaridor Yandex punktiga qaytaradi yoki kuryer oladi',
        'FBY da — ombor qabul qiladi; FBS da — sizga qaytadi',
        'Tekshiruvdan keyin pul xaridorga qaytariladi',
        'Xalqaro FBS: mahsulot Rossiyada qolishi yoki qaytarib yuborilishi — shartnomaga qarab',
      ]),
      h2('Xalqaro qaytarish strategiyasi'),
      ul([
        'Arzon mahsulot — ba\'zan qaytarishni mahalliy omborda «utilizatsiya» qilish arzonroq',
        'Qimmat mahsulot — qaytarib olish va qayta sotish',
        'Nuqson bo\'lsa — ta\'minotchidan kompensatsiya so\'rang',
        'Qaytarish foizini KPI sifatida kuzating (maqsad: 10% dan past)',
      ]),
      h2('Modul yakuni'),
      intro(
        '6-modulni tugatdingiz! Uzum FBO/FBS va Yandex FBY/FBS/DBS sxemalarini, ombor, inventarizatsiya va qaytarishlarni bilasiz.',
      ),
      tip(
        'Amaliy vazifa: o\'z mahsulotingiz uchun yetkazish sxemasini tanlang va bitta test yuborish (FBO yoki FBS) rejasini yozib chiqing — miqdor, qadoq, muddat, xarajat.',
      ),
      warning(
        'Qaytarish siyosatini do\'kon sozlamalarida aniq ko\'rsating. Noaniq qoidalar nizolar va reyting tushishiga olib keladi.',
      ),
      nextStep(
        'Keyingi modul — «Tahlil va o\'sish»: statistika, KPI va qaror qabul qilish strategiyalari.',
      ),
    ]),
  ],
}
