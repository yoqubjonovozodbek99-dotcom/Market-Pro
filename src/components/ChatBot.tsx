import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

export function ChatBot() {
  const { lang } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<{role: string, text: string}[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const t = {
    title:       lang === 'uz' ? 'MarketPro Yordamchi' : 'Помощник MarketPro',
    placeholder: lang === 'uz' ? 'Savol yozing...' : 'Напишите вопрос...',
    welcome:     lang === 'uz' ? 'Salom! Uzum Market yoki Yandex Market haqida savollaringizga javob beraman 😊' : 'Привет! Отвечу на вопросы об Uzum Market и Yandex Market 😊',
    thinking:    lang === 'uz' ? 'Javob tayyorlanmoqda...' : 'Готовлю ответ...',
    error:       lang === 'uz' ? 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.' : 'Произошла ошибка. Попробуйте снова.',
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
      const apiKey = import.meta.env.VITE_GROQ_API_KEY
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'openai/gpt-oss-120b',
          messages: [
            {
              role: 'system',
              content: `Sen MarketPro Academy kursi bo'yicha yordamchi botisan. Faqat quyidagi aniq ma'lumotlar asosida javob ber. Hech qachon narx, muddat yoki boshqa raqamlarni o'zingdan to'qib chiqarma.

KURS HAQIDA:
- Nomi: MarketPro Academy — Uzum Market va Yandex Market bo'yicha savdo kursi
- Davomiyligi: 3 oy (2 oy nazariy + 1 oy amaliy savdo)
- Format: Haftada 3 kun jonli dars (har biri 2 soat), darslar yozib olinadi va istalgan vaqtda qayta ko'rish mumkin
- Jami: 8 modul, 82 ta dars

MODULLAR:
1. Marketplace asoslari (8 dars, 3 soat)
2. Mahsulot tanlash / Niche research (12 dars, 5 soat)
3. Kartochka va SEO optimizatsiya (10 dars, 4 soat)
4. Narx va raqobat strategiyasi (9 dars, 4 soat)
5. Reklama va traffic (14 dars, 6 soat)
6. Logistika va omborxona (8 dars, 3 soat)
7. Tahlil va o'sish / Analytics (11 dars, 5 soat)
8. Biznesni kengaytirish (10 dars, 4 soat)

NARXLAR:
- Oylik obuna: 510,000 so'm/oy
- 3 oylik (bir yo'la to'lov): 1,377,000 so'm (10% chegirma bilan)

KURSGA KIRADI:
- 82 ta HD video dars
- Haftada 3 marta jonli vebinar
- PDF konspekt va cheat-sheet
- Modul testlari va mentor yordami
- Shaxsiy kabinet va progress kuzatuv
- Ikki tilli interfeys (O'zbek/Rus)

MENTOR BILAN BOG'LANISH:
- Telefon: +998 97 372 70 06
- Telegram: @Market_Pro_academiy

QOIDALAR:
- Faqat yuqoridagi ma'lumotlar asosida javob ber
- Agar savol shu ro'yxatda yo'q narsaga tegishli bo'lsa, telefon raqami va Telegram orqali mentorga murojaat qilishni tavsiya qil
- Hech qachon noaniq yoki taxminiy raqam bermang
- O'zbek va Rus tillarida javob ber, foydalanuvchi qaysi tilda yozsa shu tilda javob ber
- Javoblar qisqa va aniq bo'lsin`
            },
            { role: 'user', content: userMsg }
          ]
        })
      })
      const data = await res.json()
      const reply = data?.choices?.[0]?.message?.content || t.error
      setMessages(prev => [...prev, { role: 'bot', text: reply }])
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { role: 'bot', text: t.error }])
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[calc(84px+env(safe-area-inset-bottom))] md:bottom-6 right-4 md:right-6 z-[999]"
        style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: '#7c3aed', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(124,58,237,0.5)',
          fontSize: '24px'
        }}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {isOpen && (
        <div
          className="fixed bottom-[calc(150px+env(safe-area-inset-bottom))] md:bottom-24 right-4 md:right-6 z-[998]"
          style={{
          width: '320px', height: '460px',
          maxHeight: 'calc(100vh - 200px)',
          background: 'var(--bg-secondary, #1e1640)',
          border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: '16px', display: 'flex', flexDirection: 'column',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)', overflow: 'hidden'
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
