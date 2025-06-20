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

// Layout hanya dibungkus sekali di sini
const PrivateRoute = () => {
  const token = authService.getToken();
  return token ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" replace />
  );
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
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

      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" />} />
      {/* Fallback jika rute tidak ditemukan */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default AppRoutes;
