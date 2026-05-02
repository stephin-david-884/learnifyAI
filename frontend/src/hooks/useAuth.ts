import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux/store";
import { clearError, forgotPassword, getCurrentUser, googleLogin, loginUser, logoutUser, registerUser, resendOtp, resetPassword, verifyForgotPasswordOtp } from "../redux/features/auth/authSlice";
import type { LoginPayload, RegisterPayload, ResetPasswordPayload } from "../types/user";

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isAuthenticated, loading, error, registerEmail, initialized, isBlocked } = useSelector((state: RootState) => state.auth);

    const handleError = () => dispatch(clearError());

    const register = async (data: RegisterPayload) => {
        return dispatch(registerUser(data)).unwrap()
    }

    const checkAuth = async () => {
        try {
            return await dispatch(getCurrentUser()).unwrap();
        } catch {

            return null;
        }
    };

    const resend = async (email: string) => {
        return dispatch(resendOtp({ email })).unwrap();
    }

    const logout = async () => {
        return dispatch(logoutUser()).unwrap()
    }

    const googleAuth = async (idToken: string) => {
        return dispatch(googleLogin({ idToken })).unwrap();
    }

    const login = async (data: LoginPayload) => {
        return dispatch(loginUser(data)).unwrap();
    }

    const forgot = async (email: string) => {
        return dispatch(forgotPassword({ email })).unwrap();
    };

    const verifyForgotOtp = async (email: string, otp: string) => {
        return dispatch(verifyForgotPasswordOtp({ email, otp })).unwrap();
    };

    const reset = async (data: ResetPasswordPayload) => {
        return dispatch(resetPassword(data)).unwrap();
    };

    return {
        user,
        isAuthenticated,
        loading,
        error,
        registerEmail,
        initialized,
        clearError: handleError,
        register,
        checkAuth,
        resendOtp: resend,
        logout,
        googleAuth,
        login,
        forgotPassword: forgot,
        verifyForgotOtp,
        resetPassword: reset,
        isBlocked
    }
}