import type { WrittenLesson, LessonBlock } from './types'

export function lesson(
  id: string,
  moduleNum: number,
  lessonNum: number,
  title: string,
  titleRu: string,
  platform: 'uzum' | 'yandex' | 'both',
  readTime: string,
  blocks: LessonBlock[],
): WrittenLesson {
  return { id, moduleNum, lessonNum, title, titleRu, readTime, platform, blocks }
}

export function intro(text: string, textRu?: string): LessonBlock {
  return { type: 'p', text, textRu }
}

export function h2(text: string, textRu?: string): LessonBlock {
  return { type: 'h2', text, textRu }
}

export function h3(text: string, textRu?: string): LessonBlock {
  return { type: 'h3', text, textRu }
}

export function ul(items: string[], itemsRu?: string[]): LessonBlock {
  return { type: 'ul', items, itemsRu }
}

export function ol(items: string[], itemsRu?: string[]): LessonBlock {
  return { type: 'ol', items, itemsRu }
}

export function tip(text: string, title = 'Maslahat', textRu?: string): LessonBlock {
  return { type: 'tip', title, text, textRu }
}

export function warning(text: string, title = 'Muhim', textRu?: string): LessonBlock {
  return { type: 'warning', title, text, textRu }
}

export function nextStep(text: string, textRu?: string): LessonBlock {
  return { type: 'p', text, textRu }
}
