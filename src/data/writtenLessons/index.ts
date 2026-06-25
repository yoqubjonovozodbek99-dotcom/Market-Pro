import type { WrittenModule } from './types'
import { module1 } from './module1'
import { module2 } from './module2'
import { module3 } from './module3'
import { module4 } from './module4'
import { module5 } from './module5'
import { module6 } from './module6'
import { module7 } from './module7'
import { module8 } from './module8'

export const writtenModules: WrittenModule[] = [
  module1,
  module2,
  module3,
  module4,
  module5,
  module6,
  module7,
  module8,
]

export function getWrittenModule(slug: string) {
  return writtenModules.find((m) => m.slug === slug)
}

export function getWrittenLesson(moduleSlug: string, lessonId: string) {
  const mod = getWrittenModule(moduleSlug)
  return mod?.lessons.find((l) => l.id === lessonId)
}

export type { WrittenModule, WrittenLesson, LessonBlock } from './types'
