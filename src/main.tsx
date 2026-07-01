import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Set background image with correct base path for GitHub Pages
const root = document.getElementById('root')!
const basePath = import.meta.env.BASE_URL
const backgroundImageUrl = `url('${basePath}nature-bg.jpg')`
root.style.setProperty('--bg-image', backgroundImageUrl)

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
