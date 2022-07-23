import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import ProductsPage from 'pages/products';
import SignUpPage from 'pages/signup';
import SignInPage from 'pages/signin';
import StatsPage from 'pages/stats';
import WeightPage from 'pages/weight';
import NutritionPage from 'pages/nutrition';
import NotFoundPage from 'pages/not-found';
import ResetPasswordPage from 'pages/reset-password';
import SendPasswordResetLinkPage from 'pages/send-password-reset-link';
import SettingsPage from 'pages/settings';
import ActivatePage from 'pages/activate';
import PrivateRoute from 'components/private-route';
import PublicRoute from 'components/public-route';
import { useAppSelector } from 'store';
import { ROUTES } from 'routes';
import './App.css';

const App = () => {
  const userData = useAppSelector((state) => state.user.data);
  const { language } = useAppSelector((state) => state.user);
  const [, i18n] = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(language);
    moment.locale(language);
  }, [language, i18n]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          userData === null ? (
            <Navigate to={ROUTES.SIGN_IN} />
          ) : (
            <Navigate to={ROUTES.STATS} />
          )
        }
      />
      <Route
        path={ROUTES.SIGN_IN}
        element={
          <PublicRoute>
            <SignInPage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.SIGN_UP}
        element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        }
      />
      <Route
        path={`${ROUTES.ACTIVATE}/:uidb64/:token`}
        element={
          <PublicRoute>
            <ActivatePage />
          </PublicRoute>
        }
      />
      <Route path={ROUTES.RESET}>
        <Route
          index
          element={
            <PublicRoute>
              <SendPasswordResetLinkPage />
            </PublicRoute>
          }
        />
        <Route
          path=":token"
          element={
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>
          }
        />
      </Route>
      <Route
        path={ROUTES.WEIGHT}
        element={
          <PrivateRoute>
            <WeightPage />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.STATS}
        element={
          <PrivateRoute>
            <StatsPage />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.NUTRITION}
        element={
          <PrivateRoute>
            <NutritionPage />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.PRODUCTS}
        element={
          <PrivateRoute>
            <ProductsPage />
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.SETTINGS}
        element={
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
