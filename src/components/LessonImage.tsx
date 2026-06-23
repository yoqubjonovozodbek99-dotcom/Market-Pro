import { useState } from 'react'
import { ImageIcon } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

interface LessonImageProps {
  file: string
  alt: string
  altRu?: string
  caption?: string
  captionRu?: string
}

export function LessonImage({ file, alt, altRu, caption, captionRu }: LessonImageProps) {
  const { lang } = useLanguage()
  const [failed, setFailed] = useState(false)
  const src = `${import.meta.env.BASE_URL}${file}`

  if (failed) {
    return (
      <figure className="my-8 rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-600 overflow-hidden">
        <div className="flex flex-col items-center justify-center gap-3 p-8 bg-gray-50 dark:bg-gray-800/50 text-center">
          <ImageIcon className="w-12 h-12 text-gray-400" />
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {lang === 'uz' ? 'Rasm hali yuklanmagan' : 'Изображение ещё не загружено'}
          </p>
          <code className="text-xs px-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 break-all">
            public/{file}
          </code>
          <p className="text-xs text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
            {lang === 'uz'
              ? 'Kompyuteringizda shu papkaga rasm qo\'ying (JPG yoki PNG, 1200px dan keng). Fayl nomi aynan shu bo\'lishi kerak.'
              : 'Поместите изображение в эту папку (JPG или PNG, от 1200px). Имя файла должно совпадать.'}
          </p>
        </div>
        {(caption || captionRu) && (
          <figcaption className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
            {lang === 'uz' ? caption : captionRu ?? caption}
          </figcaption>
        )}
      </figure>
    )
  }

  return (
    <figure className="my-8">
      <img
        src={src}
        alt={lang === 'uz' ? alt : altRu ?? alt}
        className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
        loading="lazy"
        onError={() => setFailed(true)}
      />
      {(caption || captionRu) && (
        <figcaption className="mt-3 text-sm text-center text-gray-500 dark:text-gray-400">
          {lang === 'uz' ? caption : captionRu ?? caption}
        </figcaption>
      )}
    </figure>
  )
}
