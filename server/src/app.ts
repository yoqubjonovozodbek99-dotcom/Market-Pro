import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes.js'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 5000)

app.use(cors({ 
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    const allowedOrigins = [
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5000',
      'https://yoqubjonovozodbek99-dotcom.github.io',
      process.env.CLIENT_URL
    ].filter(Boolean)
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API responses uchun cache-control headers
app.use('/api', (_req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  res.set('Pragma', 'no-cache')
  res.set('Expires', '0')
  next()
})

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'MarketPro server is running' })
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})