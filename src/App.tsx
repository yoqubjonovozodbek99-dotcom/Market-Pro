import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { LanguageProvider } from './contexts/LanguageContext'
import { AuthProvider } from './contexts/AuthContext'
import { Layout } from './components/Layout'
import { ProtectedRoute } from './components/ProtectedRoute'
import { SessionWatcher } from './components/SessionWatcher'
import { HomePage } from './pages/HomePage'
import { LessonsHubPage } from './pages/LessonsHubPage'
import { WrittenLessonsPage } from './pages/WrittenLessonsPage'
import { WrittenModulePage } from './pages/WrittenModulePage'
import { WrittenLessonPage } from './pages/WrittenLessonPage'
import { VideoLessonsPage } from './pages/VideoLessonsPage'
import { ProfilePage } from './pages/ProfilePage'
import { LoginPage } from './pages/LoginPage'
import { ChatBot } from './components/ChatBot'

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <BrowserRouter basename={import.meta.env.PROD ? '/Market-Pro' : ''}>
            <SessionWatcher />
            <Routes>
              <Route path="/kirish" element={<LoginPage />} />

              <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/darslar" element={<ProtectedRoute><LessonsHubPage /></ProtectedRoute>} />
                <Route path="/darslar/yozma" element={<ProtectedRoute><WrittenLessonsPage /></ProtectedRoute>} />
                <Route path="/darslar/yozma/:moduleSlug" element={<ProtectedRoute><WrittenModulePage /></ProtectedRoute>} />
                <Route path="/darslar/yozma/:moduleSlug/:lessonId" element={<ProtectedRoute><WrittenLessonPage /></ProtectedRoute>} />
                <Route path="/video-darslar" element={<ProtectedRoute><VideoLessonsPage /></ProtectedRoute>} />
                <Route path="/profil" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
              </Route>
            </Routes>
          </BrowserRouter>
      <ChatBot />
    </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
