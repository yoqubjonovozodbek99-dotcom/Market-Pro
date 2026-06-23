import { Lightbulb, AlertTriangle } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'
import { LessonImage } from './LessonImage'
import type { LessonBlock } from '../data/writtenLessons/types'

export function LessonContent({ blocks }: { blocks: LessonBlock[] }) {
  const { lang } = useLanguage()
  const uz = lang === 'uz'

  return (
    <article className="prose prose-gray dark:prose-invert max-w-none">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2
                key={i}
                className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mt-10 mb-4"
              >
                {uz ? block.text : block.textRu ?? block.text}
              </h2>
            )
          case 'h3':
            return (
              <h3
                key={i}
                className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-3"
              >
                {uz ? block.text : block.textRu ?? block.text}
              </h3>
            )
          case 'p':
            return (
              <p key={i} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {uz ? block.text : block.textRu ?? block.text}
              </p>
            )
          case 'ul':
            return (
              <ul key={i} className="list-disc pl-6 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
                {(uz ? block.items : block.itemsRu ?? block.items).map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={i} className="list-decimal pl-6 space-y-2 mb-6 text-gray-700 dark:text-gray-300">
                {(uz ? block.items : block.itemsRu ?? block.items).map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ol>
            )
          case 'tip':
            return (
              <div
                key={i}
                className="my-6 p-5 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30"
              >
                <div className="flex items-start gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
                      {block.title ?? (uz ? 'Maslahat' : 'Совет')}
                    </p>
                    <p className="text-sm text-blue-900 dark:text-blue-200 leading-relaxed">
                      {uz ? block.text : block.textRu ?? block.text}
                    </p>
                  </div>
                </div>
              </div>
            )
          case 'warning':
            return (
              <div
                key={i}
                className="my-6 p-5 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                      {block.title ?? (uz ? 'Muhim' : 'Важно')}
                    </p>
                    <p className="text-sm text-amber-900 dark:text-amber-200 leading-relaxed">
                      {uz ? block.text : block.textRu ?? block.text}
                    </p>
                  </div>
                </div>
              </div>
            )
          case 'image':
            return (
              <LessonImage
                key={i}
                file={block.file}
                alt={block.alt}
                altRu={block.altRu}
                caption={block.caption}
                captionRu={block.captionRu}
              />
            )
          default:
            return null
        }
      })}
    </article>
  )
}
