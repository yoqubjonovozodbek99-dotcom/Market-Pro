import type { WrittenModule } from './types'
import { module1 } from './module1'

export const writtenModules: WrittenModule[] = [
  module1,
  {
    num: 2,
    slug: 'modul-2',
    title: 'Mahsulot tanlash (Niche research)',
    titleRu: 'Выбор товара (Niche research)',
    desc: 'To\'g\'ri mahsulot tanlash, raqobat tahlili va marja hisoblash.',
    descRu: 'Правильный выбор товара, анализ конкурентов и расчёт маржи.',
    lessonCount: 12,
    hours: 5,
    available: false,
    lessons: [],
  },
  {
    num: 3,
    slug: 'modul-3',
    title: 'Kartochka va SEO optimizatsiya',
    titleRu: 'Карточка и SEO оптимизация',
    desc: 'Sarlavha, rasm, kalit so\'zlar va konversiya.',
    descRu: 'Заголовок, фото, ключевые слова и конверсия.',
    lessonCount: 10,
    hours: 4,
    available: false,
    lessons: [],
  },
  {
    num: 4,
    slug: 'modul-4',
    title: 'Narx va raqobat strategiyasi',
    titleRu: 'Ценовая и конкурентная стратегия',
    desc: 'Narx strategiyasi, chegirma va foyda marjasi.',
    descRu: 'Ценовая стратегия, скидки и маржа.',
    lessonCount: 9,
    hours: 4,
    available: false,
    lessons: [],
  },
  {
    num: 5,
    slug: 'modul-5',
    title: 'Reklama va traffic',
    titleRu: 'Реклама и трафик',
    desc: 'Boost, Yandex Direct va ROAS.',
    descRu: 'Boost, Yandex Direct и ROAS.',
    lessonCount: 14,
    hours: 6,
    available: false,
    lessons: [],
  },
  {
    num: 6,
    slug: 'modul-6',
    title: 'Logistika va omborxona',
    titleRu: 'Логистика и склад',
    desc: 'FBO, FBS, FBY va qaytarishlar.',
    descRu: 'FBO, FBS, FBY и возвраты.',
    lessonCount: 8,
    hours: 3,
    available: false,
    lessons: [],
  },
  {
    num: 7,
    slug: 'modul-7',
    title: 'Tahlil va o\'sish',
    titleRu: 'Анализ и рост',
    desc: 'Statistika, KPI va o\'sish strategiyasi.',
    descRu: 'Статистика, KPI и стратегия роста.',
    lessonCount: 11,
    hours: 5,
    available: false,
    lessons: [],
  },
  {
    num: 8,
    slug: 'modul-8',
    title: 'Biznesni kengaytirish',
    titleRu: 'Масштабирование бизнеса',
    desc: 'Jamoa, avtomatlashtirish va brend.',
    descRu: 'Команда, автоматизация и бренд.',
    lessonCount: 10,
    hours: 4,
    available: false,
    lessons: [],
  },
]

export function getWrittenModule(slug: string) {
  return writtenModules.find((m) => m.slug === slug)
}

export function getWrittenLesson(moduleSlug: string, lessonId: string) {
  const mod = getWrittenModule(moduleSlug)
  return mod?.lessons.find((l) => l.id === lessonId)
}

export type { WrittenModule, WrittenLesson, LessonBlock } from './types'
