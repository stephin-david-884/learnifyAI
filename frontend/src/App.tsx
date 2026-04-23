import { Suspense, useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import { BrowserRouter, Route, Routes, } from "react-router-dom";
import Home from "./presentation/pages/Home";
import { Toaster } from 'react-hot-toast';
import PublicRoute from "./components/auth/PublicRoute";
import AuthGateway from "./presentation/pages/auth/AuthGateway";
import Spinner from "./presentation/components/common/Spinner";

const App = () => {
  const { checkAuth, initialized } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  if (!initialized) {
    return <div className="flex h-screen items-center justify-center">
      <Spinner />
    </div>
  }

  return (
    <BrowserRouter>
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
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
};

export default App;