import React, { lazy, Suspense } from 'react'
import { useAuth } from '../../hooks/useAuth'
import Spinner from '../../presentation/components/common/Spinner';
import { Navigate, Outlet } from 'react-router-dom';
import UserLayout from '../../presentation/layouts/user/UserLayout';

const AccountBlockedModal = lazy(() => import('../../presentation/components/modals/AccountBlockedModal'))

const UserProtectedRoute: React.FC = () => {

    const { isAuthenticated, loading, isBlocked, logout } = useAuth();

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#f5f0e8]">
                <Spinner />
            </div>
        )
    }

    return isAuthenticated ? (
        <>
            <UserLayout>
                <Outlet />
            </UserLayout>

            <Suspense fallback={null}>
                <AccountBlockedModal
                    open={isBlocked}
                    onLogout={logout}
                />
            </Suspense>
        </>
    ) : (
        <Navigate to="/login" replace />
    )
}

export default UserProtectedRoute
