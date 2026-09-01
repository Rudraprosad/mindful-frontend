import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ user }) {
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Condition Isolation
  if (location.pathname.startsWith('/modules/')) {
    const routeCondition = location.pathname.split('/')[2];
    // If routeCondition exists and does not match the user's condition
    if (routeCondition && routeCondition.toLowerCase() !== (user.condition || '').toLowerCase()) {
       // If the user has a condition, redirect to it. Otherwise to phase selection.
       if (user.condition) {
         return <Navigate to={`/modules/${user.condition.toLowerCase()}`} replace />;
       } else {
         return <Navigate to="/phase" replace />;
       }
    }
  }

  return <Outlet />;
}
