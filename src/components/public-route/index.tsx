import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'store';
import { ROUTES } from 'routes';
import './index.css';

export interface IPublicRoute {
  children: JSX.Element;
}

const PublicRoute = ({ children }: IPublicRoute) => {
  const userData = useAppSelector((state) => state.user.data);

  if (userData === null) {
    return children;
  }

  return <Navigate to={ROUTES.STATS} />;
};

export default PublicRoute;
