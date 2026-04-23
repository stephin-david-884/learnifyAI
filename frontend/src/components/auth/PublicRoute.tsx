import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Navigate } from 'react-router-dom';
import Spinner from '../../presentation/components/common/Spinner';

interface PublicRouteProps {
    children: React.ReactNode
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {

    const { isAuthenticated, loading, initialized } = useAuth();

    if (loading || !initialized) {
        return <div className="flex h-screen items-center justify-center bg-[#f5f0e8]">
            <Spinner />
        </div>
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />
    }

    return <>{children}</>;
}

export default PublicRoute;
