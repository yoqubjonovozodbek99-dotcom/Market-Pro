import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes'

dotenv.config()

const app = express()
const port = Number(process.env.PORT || 5000)

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:3000' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_req, res) => {
  res.json({ status: 'ok', message: 'MarketPro server is running' })
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})
