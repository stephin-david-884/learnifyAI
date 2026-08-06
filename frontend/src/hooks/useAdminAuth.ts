import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux/store";
import { adminLogin, adminLogout, clearAdminError, getCurrentAdmin } from "../redux/features/admin/adminSlice";
import { useCallback } from "react";

export const useAdminAuth = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { admin, isAuthenticated, loading, error, initialized } = useSelector(
        (state: RootState) => state.admin
    );

    const login = async (data: { email: string; password: string }) => {
        return dispatch(adminLogin(data)).unwrap();
    };

    const checkAdminAuth = useCallback(
        async () => {
            try {
                return await dispatch(getCurrentAdmin()).unwrap();
            } catch (error) {
                return null;
            }
        },
        [dispatch]
    );

    const logout = async () => {
        return dispatch(adminLogout()).unwrap();
    };

    return {
        admin,
        isAuthenticated,
        loading,
        initialized,
        error,
        login,
        logout,
        checkAdminAuth,
        clearError: () => dispatch(clearAdminError()),
    };
}