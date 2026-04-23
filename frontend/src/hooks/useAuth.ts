import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../redux/store";
import { clearError, getCurrentUser, registerUser } from "../redux/features/auth/authSlice";
import type { RegisterPayload } from "../types/user";

export const useAuth = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { user, isAuthenticated, loading, error, registerEmail, initialized} = useSelector((state: RootState) => state.auth);

    const handleError = () => dispatch(clearError());

    const register = async(data :RegisterPayload) => {
        return dispatch(registerUser(data)).unwrap()
    }

    const checkAuth = async () => {
    try {
        return await dispatch(getCurrentUser()).unwrap();
    } catch {
        // 👇 swallow expected auth error
        return null;
    }
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
    }
}