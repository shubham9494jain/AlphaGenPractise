import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import VerifyOTPPage from './pages/VerifyOTPPage';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectIfAuth from './components/RedirectIfAuth';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ForgotPasswordVerifyPage from './pages/ForgotPasswordVerifyPage';
import CreateNewPasswordPage from './pages/CreateNewPasswordPage';
import HistoryPage from './pages/HistoryPage';


import LandingPageLayout from './components/LandingPageLayout';
import PublicLayout from './components/PublicLayout';
import DashboardLayout from './components/DashboardLayout';
import { AlertProvider } from './components/AlertContext';
import Alert from './components/Alert';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <AlertProvider>
        <Router>
          <main>
            <Routes>
              {/* Landing Page and Public Routes */}
              <Route element={<RedirectIfAuth />}>
                <Route element={<LandingPageLayout />}>
                  <Route path="/" element={<LandingPage />} />
                </Route>
                <Route element={<PublicLayout />}>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/sign-up" element={<SignUpPage />} />
                  <Route path="/verify-otp" element={<VerifyOTPPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                  <Route path="/forgot-password-verify" element={<ForgotPasswordVerifyPage />} />
                  <Route path="/create-new-password" element={<CreateNewPasswordPage />} />
                </Route>
              </Route>

              {/* Protected Routes with DashboardLayout */}
              <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard" element={<HomePage />} />
                  <Route path="/history" element={<HistoryPage />} />
                </Route>
              </Route>
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </main>
        </Router>
        <Alert />
      </AlertProvider>
    </AuthProvider>
  );
}

export default App;
