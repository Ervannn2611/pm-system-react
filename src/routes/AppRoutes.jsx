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

const PrivateRoute = () => {
  const token = authService.getToken();
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const token = authService.getToken();
  return token ? <Navigate to="/dashboard" replace /> : children;
};

// Fallback untuk route tidak dikenal
const FallbackRoute = () => {
  const token = authService.getToken();
  return <Navigate to={token ? "/dashboard" : "/login"} />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
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

      {/* Protected Routes */}
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

      {/* Redirect root ke login atau dashboard */}
      <Route path="/" element={<FallbackRoute />} />

      {/* Fallback untuk rute tidak valid */}
      <Route path="*" element={<FallbackRoute />} />
    </Routes>
  );
}

export default AppRoutes;
