import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux/store";
import { clearError, getCurrentUser, registerUser, resendOtp } from "../redux/features/auth/authSlice";
import type { RegisterPayload } from "../types/user";

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isAuthenticated, loading, error, registerEmail, initialized } = useSelector((state: RootState) => state.auth);

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

    const resend = async(email: string) => {
        return dispatch(resendOtp({email})).unwrap();
    }

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
    }
}