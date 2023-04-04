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
import { ROUTES, SETTINGS_ROUTES } from 'routes';
import './App.css';
import ExercisesPage from 'pages/exercises';
import RootPage from 'pages/root';
import UserDataSubPage from 'pages/settings/subpages/user-data';
import PrivacySubPage from 'pages/settings/subpages/privacy';
import DefaultGoalsSubPage from 'pages/settings/subpages/default-goals';
import DeleteAccountSubPage from 'pages/settings/subpages/delete';
import ChangePasswordSubPage from 'pages/settings/subpages/password';

const App = () => {
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
        element={<RootPage />}
      >
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
          path={`:userId${ROUTES.WEIGHT}`}
          element={
            <PrivateRoute>
              <WeightPage />
            </PrivateRoute>
          }
        />
        <Route
          path={`:userId${ROUTES.STATS}`}
          element={
            <PrivateRoute>
              <StatsPage />
            </PrivateRoute>
          }
        />
        <Route
          path={`:userId${ROUTES.NUTRITION}`}
          element={
            <PrivateRoute>
              <NutritionPage />
            </PrivateRoute>
          }
        />
        <Route
          path={`:userId${ROUTES.EXERCISES}`}
          element={
            <PrivateRoute>
              <ExercisesPage />
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
        >
          <Route
            index
            element={
              <Navigate to={SETTINGS_ROUTES.USER_DATA} />
            }
          />
          <Route
            path={SETTINGS_ROUTES.USER_DATA}
            element={<UserDataSubPage />}
          />
          <Route
            path={SETTINGS_ROUTES.PRIVACY}
            element={<PrivacySubPage />}
          />
          <Route
            path={SETTINGS_ROUTES.DEFAULT_GOALS}
            element={<DefaultGoalsSubPage />}
          />
          <Route
            path={SETTINGS_ROUTES.DELETE_ACCOUNT}
            element={<DeleteAccountSubPage />}
          />
          <Route
            path={SETTINGS_ROUTES.CHANGE_PASSWORD}
            element={<ChangePasswordSubPage />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
