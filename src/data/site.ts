/** Sayt bo'yicha markaziy ma'lumotlar — aloqa va ijtimoiy tarmoqlar */
export const siteConfig = {
  name: 'MarketPro Academy',
  founder: {
    name: 'Yoqubjonov Ozodbek',
    nameRu: 'Ёқубжонов Озодбек',
    role: 'Texnik rahbar',
    roleRu: 'Технический руководитель',
  },
  /** Kanal — yangiliklar va e'lonlar */
  telegramChannel: 'https://t.me/Market_Pro_Academy',
  telegramChannelHandle: '@Market_Pro_Academy',
  /** Administrator — shaxsiy bog'lanish */
  telegramContact: 'https://t.me/Market_Pro_academiy',
  telegramContactHandle: '@Market_Pro_academiy',
  email: 'yoqubjonovozodbek99@gmail.com',
  phone: '+998 97 372 70 06',
  targetStudents: '4,200+',
  pricing: {
    monthly: 510_000,
    quarterly: 1_377_000,
    quarterlySave: 153_000,
    quarterlySavePercent: 10,
  },
} as const
