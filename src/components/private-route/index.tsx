import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import { ROUTES } from 'routes';
import './index.css';

export interface IPrivateRoute {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: IPrivateRoute) => {
  const userData = useAppSelector((state) => state.user.data);

  if (userData !== null) {
    return children;
  }

  return <Navigate to={ROUTES.SIGN_IN} />;
};

export default PrivateRoute;
