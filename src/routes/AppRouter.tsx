import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { ProtectedRoute } from './ProtectedRoute'
import { DashboardLayout } from '../layouts/DashboardLayout'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Dashboard Routes */}
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
            <Route 
              path="/dashboard/learn" 
              element={<div className="text-white">Halaman Belajar (Modul Isyarat)</div>} 
            />
            <Route 
              path="/dashboard/quiz" 
              element={<div className="text-white">Halaman Kuis & Evaluasi</div>} 
            />
            <Route 
              path="/dashboard/profile" 
              element={<div className="text-white">Halaman Profil Pengguna</div>} 
            />
          </Route>
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}