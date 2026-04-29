import { lazy, Suspense, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import {  Route, Routes, useLocation } from "react-router-dom";
import Home from "./presentation/pages/Home";
import { Toaster } from 'react-hot-toast';
import PublicRoute from "./components/auth/PublicRoute";
import AuthGateway from "./presentation/pages/auth/AuthGateway";
import Spinner from "./presentation/components/common/Spinner";
import UserProtectedRoute from "./components/auth/UserProtectedRoute";
import DashboardPage from "./presentation/pages/Dashboard/DashboardPage";
import VerifyOtp from "./presentation/pages/auth/VerifyOtp";
import { setLogoutHandler } from "./lib/axios";

import ForgotPasswordProtectedRoute from "./components/auth/ForgotPasswordProtectedRoute";
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";
import AdminLogin from "./presentation/pages/admin/AdminLogin";
import AdminDashboard from "./presentation/pages/admin/AdminDashboard";
import { useAdminAuth } from "./hooks/useAdminAuth";

const ForgotPassword = lazy(() => import('./presentation/pages/auth/ForgotPassword'));
const VerifyForgotOtp = lazy(() => import('./presentation/pages/auth/VerifyForgotOtp'));
const ResetPassword = lazy(() => import('./presentation/pages/auth/ResetPassword'));
const AdminUsersPage = lazy(() => import('./presentation/pages/admin/AdminUsersPage'))

const App = () => {
  const { checkAuth, initialized: userInitialized, logout: userLogout } = useAuth();
  const { checkAdminAuth, initialized: adminInitialized, logout: adminLogout } = useAdminAuth();

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    if (isAdminRoute) {
      checkAdminAuth();
    } else {
      checkAuth();
    }
  }, [isAdminRoute]); 

  useEffect(() => {
    setLogoutHandler(() => {
      const path = window.location.pathname;
      const isAdmin = path.startsWith("/admin");

      if (isAdmin) {
        adminLogout();
      } else {
        userLogout();
      }
    })
  }, [adminLogout, userLogout])

  if (isAdminRoute ? !adminInitialized : !userInitialized) {
    return <div className="flex h-screen items-center justify-center">
      <Spinner />
    </div>
  }

  return (
    <>
      <Toaster position="top-right" />
      <Suspense fallback={
        <div className="flex h-screen items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary-600"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<PublicRoute><AuthGateway mode="signup" /></PublicRoute>} />
          <Route path="/login" element={<PublicRoute><AuthGateway mode="login" /></PublicRoute>} />
          <Route path="/verifyotp" element={<PublicRoute><VerifyOtp /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />

          <Route path="/verify-forgot-otp" element={<PublicRoute> <ForgotPasswordProtectedRoute requireEmail> <VerifyForgotOtp /> </ForgotPasswordProtectedRoute> </PublicRoute>} />

          <Route
            path="/reset-password"
            element={
              <PublicRoute>
                <ForgotPasswordProtectedRoute
                  requireEmail
                  requireResetToken
                >
                  <ResetPassword />
                </ForgotPasswordProtectedRoute>
              </PublicRoute>
            }
          />

          <Route element={<UserProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsersPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
};

export default App;