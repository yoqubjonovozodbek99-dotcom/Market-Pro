import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

const SYSTEM_PROMPT = `Sen MarketPro Academy ning yordamchi botisan.
Faqat quyidagi mavzularda javob ber:
- Uzum Market (ro'yxatdan o'tish, mahsulot yuklash, SEO, reklama, FBO/FBS, narx strategiyasi)
- Yandex Market (akkaunt ochish, DBS/FBY/FBS, Yandex Direct, logistika)
- Marketplace savdo (mahsulot tanlash, raqobat tahlili, daromad hisoblash)
Boshqa mavzularda: "Bu mavzu bo'yicha mentorga murojaat qiling: @Market_Pro_Academy" de.
O'zbek va Rus tillarida javob ber. Qisqa va aniq javob ber (maksimum 150 so'z).`

export function ChatBot() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{role: string, text: string}[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const t = {
    title:       language === 'UZ' ? 'MarketPro Yordamchi' : 'Помощник MarketPro',
    placeholder: language === 'UZ' ? 'Savol yozing...' : 'Напишите вопрос...',
    welcome:     language === 'UZ' ? 'Salom! Uzum Market yoki Yandex Market haqida savollaringizga javob beraman 😊' : 'Привет! Отвечу на вопросы об Uzum Market и Yandex Market 😊',
    thinking:    language === 'UZ' ? 'Javob tayyorlanmoqda...' : 'Готовлю ответ...',
    error:       language === 'UZ' ? 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.' : 'Произошла ошибка. Попробуйте снова.',
  }

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'bot', text: t.welcome }])
    }
  }, [isOpen])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', text: userMsg }])
    setLoading(true)

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: [{ parts: [{ text: userMsg }] }]
          })
        }
      )
      const data = await res.json()
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || t.error
      setMessages(prev => [...prev, { role: 'bot', text: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'bot', text: t.error }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed', bottom: '24px', right: '24px',
          width: '56px', height: '56px', borderRadius: '50%',
          background: '#7c3aed', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(124,58,237,0.5)', zIndex: 999,
          fontSize: '24px'
        }}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div style={{
          position: 'fixed', bottom: '90px', right: '24px',
          width: '320px', height: '460px',
          background: 'var(--bg-secondary, #1e1640)',
          border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: '16px', display: 'flex', flexDirection: 'column',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 998, overflow: 'hidden'
        }}>
          <div style={{
            padding: '14px 16px', background: '#7c3aed',
            display: 'flex', alignItems: 'center', gap: '10px'
          }}>
            <span style={{ fontSize: '20px' }}>🤖</span>
            <div>
              <div style={{ color: 'white', fontWeight: 600, fontSize: '14px' }}>{t.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '11px' }}>Uzum & Yandex Market</div>
            </div>
          </div>

          <div style={{
            flex: 1, overflowY: 'auto', padding: '12px',
            display: 'flex', flexDirection: 'column', gap: '8px'
          }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start'
              }}>
                <div style={{
                  maxWidth: '80%', padding: '8px 12px', borderRadius: '12px',
                  fontSize: '13px', lineHeight: '1.5',
                  background: msg.role === 'user' ? '#7c3aed' : 'rgba(255,255,255,0.08)',
                  color: 'white'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div style={{
                  padding: '8px 12px', borderRadius: '12px', fontSize: '13px',
                  background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)'
                }}>
                  {t.thinking}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div style={{
            padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.1)',
            display: 'flex', gap: '8px'
          }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder={t.placeholder}
              style={{
                flex: 1, padding: '8px 12px', borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.08)',
                color: 'white', fontSize: '13px', outline: 'none'
              }}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                padding: '8px 14px', borderRadius: '8px',
                background: loading ? '#555' : '#7c3aed',
                border: 'none', color: 'white', cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  )
}