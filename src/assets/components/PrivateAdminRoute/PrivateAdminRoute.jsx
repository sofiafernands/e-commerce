import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

const PrivateAdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || !user.isAdmin) {
    // Redirigir al usuario a la página de login si no es administrador
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateAdminRoute;
