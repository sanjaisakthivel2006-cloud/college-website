import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ReactNode } from 'react';

interface RoleBasedRouteProps {
    children: ReactNode;
    allowedRoles: string[];
    redirectTo?: string;
}

/**
 * RoleBasedRoute - Protects routes based on user role
 * Redirects unauthorized users to specified path or /unauthorized
 */
const RoleBasedRoute = ({
    children,
    allowedRoles,
    redirectTo = '/unauthorized'
}: RoleBasedRouteProps) => {
    const { user, userData, loading } = useAuth();
    const location = useLocation();

    // Show loading while checking auth state
    if (loading) {
        return (
            <div className="loading-container">
                <p>Loading...</p>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check if user's role is in the allowed roles list
    const userRole = userData?.role || 'STUDENT';

    if (!allowedRoles.includes(userRole)) {
        // User is authenticated but doesn't have the required role
        return <Navigate to={redirectTo} replace />;
    }

    return <>{children}</>;
};

export default RoleBasedRoute;
