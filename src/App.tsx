import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { SessionWatcher } from './components/SessionWatcher'
import { HomePage } from './pages/HomePage'
import { LessonsPage } from './pages/LessonsPage'
import { VideoLessonsPage } from './pages/VideoLessonsPage'
import { ProfilePage } from './pages/ProfilePage'
import { LoginPage } from './pages/LoginPage'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter basename={import.meta.env.PROD ? '/Market-Pro' : ''}>
            <SessionWatcher />
            <Routes>
              {/* Login va Register — header/footer siz */}
              <Route path="/kirish" element={<LoginPage />} />

              {/* Asosiy sahifalar — header/footer bilan */}
              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/darslar" element={<ProtectedRoute><LessonsPage /></ProtectedRoute>} />
                <Route path="/video-darslar" element={<ProtectedRoute><VideoLessonsPage /></ProtectedRoute>} />
                <Route path="/profil" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              </Route>
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}