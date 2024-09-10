import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Importez vos composants de page ici
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import DashboardPage from './pages/DashboardPage';
import Layout from '@/components/core/Layouts';

// Composant AuthGuard
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to='/login' />;
};

export const AppRoutes = () => (
  <Routes>
    <Route path='/' element={
      <AuthGuard>
        <Layout>
          <DashboardPage />
        </Layout>
      </AuthGuard>
    } />

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
  </Routes>
);
