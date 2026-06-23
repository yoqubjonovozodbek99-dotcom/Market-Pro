import logoImg from '../assets/logo.png'

interface MarketProLogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'light'
  showText?: boolean
}

export function MarketProLogo({
  size = 'md',
  variant = 'default',
  showText = false,
}: MarketProLogoProps) {
  const heights = {
    sm: 'h-9',
    md: 'h-11',
    lg: 'h-14',
  }

  const titleClass = variant === 'light' ? 'text-white' : 'text-gray-900 dark:text-white'
  const subClass = variant === 'light' ? 'text-blue-300' : 'text-uzum dark:text-blue-400'

  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <img
        src={logoImg}
        alt="MarketPro Academy"
        className={`${heights[size]} w-auto object-contain shrink-0`}
      />
      {showText && (
        <div className="text-left min-w-0 hidden sm:block">
          <div className={`text-base font-bold leading-tight ${titleClass}`}>MarketPro</div>
          <div className={`text-[10px] font-medium ${subClass} tracking-wide uppercase`}>
            Academy
          </div>
        </div>
      )}
    </div>
  )
}

export function UzumLogo({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-uzum text-white font-bold text-sm shadow-md whitespace-nowrap ${className}`}
    >
      <span className="w-6 h-6 shrink-0 rounded-md bg-white/20 flex items-center justify-center text-xs font-black">
        U
      </span>
      <span className="truncate">uzum market</span>
    </div>
  )
}

export function YandexLogo({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yandex text-gray-900 font-bold text-sm shadow-md whitespace-nowrap ${className}`}
    >
      <span className="w-6 h-6 shrink-0 rounded-full bg-gray-900 text-yandex flex items-center justify-center text-xs font-black">
        Y
      </span>
      <span className="truncate">Yandex Market</span>
    </div>
  )
}
