import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Importez vos composants de page ici
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import DashboardPage from './pages/DashboardPage';
import Layout from '@/components/core/Layouts';
import PaymentPage from './pages/Paiments';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Success from '@/components/services/stripe/Success';
import Cancel from '@/components/services/stripe/Cancel';
import LandingPages from './pages/LandingPages';
const stripePromise = loadStripe(
  'pk_test_51O5unuFEj403Phjgbi9HfcgZSe8NW3jkyu9L47FNAx8dwXknEndmFqYhlmqo2BksV1Uwsv1rfo0s3ZeeZgQYuxSn00P9W9WRNc'
);

// Composant AuthGuard
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to='/login' />;
};

export const AppRoutes = () => (
  <Routes>
    <Route
      path='/'
      element={
        <AuthGuard>
          <Layout>
            <DashboardPage />
          </Layout>
        </AuthGuard>
      }
    />

    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route
      path='/dashboard'
      element={
        <AuthGuard>
          <Layout>
            <DashboardPage />
          </Layout>
        </AuthGuard>
      }
    />
    <Route
      path='/profile'
      element={
        <AuthGuard>
          <Layout>
            <Profile />
          </Layout>
        </AuthGuard>
      }
    />
    <Route
      path='/payment'
      element={
        <AuthGuard>
          <Layout>
            <Elements stripe={stripePromise}>
              <PaymentPage />
            </Elements>
          </Layout>
        </AuthGuard>
      }
    />

    <Route
      path='/landing'
      element={
        <Elements stripe={stripePromise}>
          <LandingPages />
        </Elements>
      }
    />
    <Route
      path='/success'
      element={
        <Elements stripe={stripePromise}>
          <Success />
        </Elements>
      }
    />
  </Routes>
);
