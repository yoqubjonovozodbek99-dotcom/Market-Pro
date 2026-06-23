export type LessonBlock =
  | { type: 'h2'; text: string; textRu?: string }
  | { type: 'h3'; text: string; textRu?: string }
  | { type: 'p'; text: string; textRu?: string }
  | { type: 'ul'; items: string[]; itemsRu?: string[] }
  | { type: 'ol'; items: string[]; itemsRu?: string[] }
  | { type: 'tip'; title?: string; text: string; textRu?: string }
  | { type: 'warning'; title?: string; text: string; textRu?: string }
  | { type: 'image'; file: string; alt: string; altRu?: string; caption?: string; captionRu?: string }

export interface WrittenLesson {
  id: string
  moduleNum: number
  lessonNum: number
  title: string
  titleRu: string
  readTime: string
  platform: 'uzum' | 'yandex' | 'both'
  blocks: LessonBlock[]
}

export interface WrittenModule {
  num: number
  slug: string
  title: string
  titleRu: string
  desc: string
  descRu: string
  lessonCount: number
  hours: number
  available: boolean
  lessons: WrittenLesson[]
}
