import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useStore from '../hooks/useStore';

const ProtectedRoute = () => {
  const { user } = useStore();
  const location = useLocation();

  if (user.id === '')
    return <Navigate to="/login" state={{ from: location }} replace />;
  return <Outlet />;
};

export default ProtectedRoute;
