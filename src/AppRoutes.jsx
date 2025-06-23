import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Dashboard from '../components/Dashboard';
import Layout from '../components/Layout';
import ProjectList from '../pages/projects/ProjectList';
import FormProject from '../pages/projects/formProject';
import DetailProject from '../pages/projects/detailProject';
import ListTask from '../pages/tasks/listTask';
import FormTask from '../pages/tasks/formTask';
import DetailTask from '../pages/tasks/detailTask';
import authService from '../services/authService';

// Route hanya untuk user yang sudah login
const PrivateRoute = () => {
  const token = authService.getToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

// Route hanya untuk user yang belum login
const PublicRoute = ({ children }) => {
  const token = authService.getToken();
  return token ? <Navigate to="/dashboard" replace /> : children;
};

// Fallback route jika "/" atau "*" → arahkan sesuai status login
const FallbackRoute = () => {
  const token = authService.getToken();
  console.log('Token fallback:', token);
  return <Navigate to={token ? '/dashboard' : '/login'} />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* 🔓 Public Routes */}
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* 🔒 Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/new" element={<FormProject />} />
          <Route path="/projects/edit/:id" element={<FormProject />} />
          <Route path="/projects/:id" element={<DetailProject />} />
          <Route path="/projects/:projectId/tasks" element={<ListTask />} />
          <Route path="/projects/:projectId/tasks/new" element={<FormTask />} />
          <Route path="/projects/:projectId/tasks/edit/:taskId" element={<FormTask />} />
          <Route path="/projects/:projectId/tasks/:taskId" element={<DetailTask />} />
        </Route>
      </Route>

      {/* 🏠 Root path dan fallback path */}
      <Route path="/" element={<FallbackRoute />} />
      <Route path="*" element={<FallbackRoute />} />
    </Routes>
  );
}

export default AppRoutes;
