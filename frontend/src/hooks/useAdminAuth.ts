import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch,  RootState } from "../redux/store";
import { adminLogin, adminLogout, clearAdminError } from "../redux/features/admin/adminSlice";

export const useAdminAuth = () => {
    const dispatch = useDispatch<AppDispatch>();

    const { admin, isAuthenticated, loading, error } = useSelector(
        (state: RootState) => state.admin
    );

    const login = async (data: { email: string; password: string }) => {
        return dispatch(adminLogin(data)).unwrap();
    };

    const logout = () => dispatch(adminLogout());

    return {
        admin,
        isAuthenticated,
        loading,
        error,
        login,
        logout,
        clearError: () => dispatch(clearAdminError()),
    };
}