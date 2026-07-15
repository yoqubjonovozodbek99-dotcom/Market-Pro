import type { WrittenModule } from './types'
import { pairedCurriculumModules } from './curriculum'

export const writtenModules: WrittenModule[] = [
  ...pairedCurriculumModules,
]

export function getWrittenModule(slug: string) {
  return writtenModules.find((m) => m.slug === slug)
}

export function getWrittenLesson(moduleSlug: string, lessonId: string) {
  const mod = getWrittenModule(moduleSlug)
  return mod?.lessons.find((l) => l.id === lessonId)
}

export type { WrittenModule, WrittenLesson, LessonBlock } from './types'
