import React from 'react';
import { useSelector } from '../../../src/services/store';
import {
  selectIsAuthChecked,
  selectUser
} from '../../../src/services/user/slice';
import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  component: React.JSX.Element;
};

export const ProtectedRoute = ({
  onlyUnAuth = false,
  component
}: ProtectedRouteProps): React.JSX.Element => {
  const selector = useSelector();
  const isAuthCheced = selector(selectIsAuthChecked);
  const user = selector(selectUser);
  const location = useLocation();

  if (!isAuthCheced) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  return component;
};

import { useLocation, Navigate, replace } from "react-router-dom";

type ProtectedRouteProps = {
    onlyUnAuth?: boolean;
    component: React.JSX.Element;
};

export const ProtectedRoute = (
    { onlyUnAuth = false, component }: ProtectedRouteProps
): React.JSX.Element => {

    const user = localStorage.getItem('accessToken')
    const location = useLocation();

    const isAuth = !!user;

    if (!onlyUnAuth && !isAuth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (onlyUnAuth && isAuth) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return component;
};
