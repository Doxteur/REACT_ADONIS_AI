import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

// Importez vos composants de page ici
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import { DashboardLayout } from '@/components/dashboard-layout';
import Dashboard from './pages/Dashboard';

// Composant AuthGuard
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to='/login' />;
};

export const AppRoutes = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route
      path='/dashboard'
      element={
        <AuthGuard>
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        </AuthGuard>
      }
    />
    <Route
      path='/profile'
      element={
        <AuthGuard>
          <Profile />
        </AuthGuard>
      }
    />
  </Routes>
);
