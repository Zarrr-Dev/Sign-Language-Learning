import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { ProtectedRoute } from './ProtectedRoute'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { LearnPage } from '../pages/LearnPage'
import { QuizPage } from '../pages/QuizPage'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Dashboard Area */}
        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route 
              path="/dashboard" 
              element={
                <div>
                  <h1 className="text-2xl font-bold text-white">Ringkasan Progres Belajar 📊</h1>
                  <p className="text-sm text-[#B5B5B5] mt-1">Pilih modul materi di menu sebelah kiri untuk memulai.</p>
                </div>
              } 
            />
            <Route path="/dashboard/learn" element={<LearnPage />} />
            <Route path="/dashboard/quiz" element={<QuizPage />} />
            <Route 
              path="/dashboard/profile" 
              element={<div className="text-white">Halaman Profil Pengguna (Coming Soon)</div>} 
            />
          </Route>
        </Route>

        {/* Fallback Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}