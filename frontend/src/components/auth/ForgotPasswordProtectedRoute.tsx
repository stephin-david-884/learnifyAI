import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  requireEmail?: boolean;
  requireResetToken?: boolean;
}

const ForgotPasswordProtectedRoute: React.FC<Props> = ({
  children,
  requireEmail = false,
  requireResetToken = false,
}) => {
  const location = useLocation();

  const state = location.state as {
    email?: string;
    resetToken?: string;
  } | null;

  // If email is required but missing → send back
  if (requireEmail && !state?.email) {
    return <Navigate to="/forgot-password" replace />;
  }

  // If resetToken is required but missing → send back
  if (requireResetToken && !state?.resetToken) {
    return <Navigate to="/forgot-password" replace />;
  }

  return <>{children}</>;
};

export default ForgotPasswordProtectedRoute;