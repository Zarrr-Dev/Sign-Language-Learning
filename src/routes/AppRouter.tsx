import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { ProtectedRoute } from './ProtectedRoute'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected Dashboard & Core Features */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={
            <div className="min-h-screen bg-[#000000] text-white p-8">
              <h1 className="text-3xl font-bold">Dashboard HandTalk Learn 🚀</h1>
              <p className="text-[#B5B5B5] mt-2">Selamat datang! Sesi login kamu berhasil.</p>
            </div>
          } />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}