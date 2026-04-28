import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../../hooks/useAdminAuth";
import Spinner from "../../presentation/components/common/Spinner";

const AdminProtectedRoute = () => {
    const { isAuthenticated, loading } = useAdminAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#f5f0e8]">
                <Spinner />
            </div>
        )
    }

    return isAuthenticated ? (

        <Outlet />

    ) : (
        <Navigate to="/login" replace />
    )
}

export default AdminProtectedRoute