import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import Spinner from '../../presentation/components/common/Spinner';
import { Navigate, Outlet } from 'react-router-dom';
import UserLayout from '../../presentation/layouts/user/UserLayout';

const UserProtectedRoute: React.FC = () => {

    const { isAuthenticated, loading } = useAuth();

    if(loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#f5f0e8]">
            <Spinner />
        </div>
        )
    }

    return isAuthenticated ? (
        <UserLayout>
            <Outlet />
        </UserLayout>

    ) : (
        <Navigate to="/login" replace />
    )
}

export default UserProtectedRoute
