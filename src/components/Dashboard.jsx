import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import authService from '../services/authService';
import projectService from '../services/projectService';
import taskService from '../services/taskService';

function Dashboard() {
  const navigate = useNavigate();
  const username = authService.getCurrentUser()?.username || 'Pengguna';
  const [totalProjects, setTotalProjects] = useState(0);
  const [doneTasks, setDoneTasks] = useState(0);
  const [inProgressTasks, setInProgressTasks] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const projects = await projectService.getAll();
        setTotalProjects(projects.length);

        let doneCount = 0;
        let inProgressCount = 0;

        const allTasks = await Promise.all(
          projects.map((project) => taskService.getByProjectId(project.id))
        );

        allTasks.flat().forEach((task) => {
          const status = task.status?.toLowerCase().trim();
          if (status === 'done') doneCount++;
          if (status === 'in progress') inProgressCount++;
        });

        setDoneTasks(doneCount);
        setInProgressTasks(inProgressCount);
      } catch (error) {
        console.error('Gagal memuat statistik dashboard:', error);
      }
    };

    fetchStats();
  }, []);

  return (
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Selamat Datang, {username}!
          </h1>
          <p className="mt-2 text-gray-600">
            Kelola proyek dan tugas Anda dengan mudah di Sistem Manajemen Proyek.
          </p>
        </div>

        {/* Statistik */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Proyek */}
          <StatCard
            title="Total Proyek"
            count={totalProjects}
            iconColor="text-indigo-500"
            bgColor="bg-indigo-100"
            borderColor="border-indigo-500"
            iconPath="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
          {/* Tugas Selesai */}
          <StatCard
            title="Tugas Selesai"
            count={doneTasks}
            iconColor="text-green-500"
            bgColor="bg-green-100"
            borderColor="border-green-500"
            iconPath="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
          {/* Tugas Dalam Proses */}
          <StatCard
            title="Tugas Dalam Proses"
            count={inProgressTasks}
            iconColor="text-yellow-500"
            bgColor="bg-yellow-100"
            borderColor="border-yellow-500"
            iconPath="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </div>

        {/* Pintasan */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Pintasan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ShortcutButton
              onClick={() => navigate('/projects/new')}
              color="indigo"
              iconPath="M12 4v16m8-8H4"
              text="Buat Proyek Baru"
            />
            <ShortcutButton
              onClick={() => navigate('/projects')}
              color="green"
              iconPath="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              text="Lihat Semua Proyek"
            />
          </div>
        </div>
      </div>
  );
}

function StatCard({ title, count, iconPath, iconColor, bgColor, borderColor }) {
  return (
    <div className={`bg-white rounded-lg shadow p-6 border-l-4 ${borderColor}`}>
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${bgColor} mr-4`}>
          <svg className={`h-6 w-6 ${iconColor}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
          </svg>
        </div>
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900">{count}</p>
        </div>
      </div>
    </div>
  );
}

function ShortcutButton({ onClick, color, iconPath, text }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center p-4 bg-${color}-50 rounded-lg hover:bg-${color}-100 transition-colors`}
    >
      <svg className={`h-6 w-6 text-${color}-500 mr-3`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
      </svg>
      <span className={`text-${color}-700 font-medium`}>{text}</span>
    </button>
  );
}

export default Dashboard;
