import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import taskService from '../../services/taskService';

const ListTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { projectId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const fetchTasks = async () => {
    try {
      const data = await taskService.getByProjectId(projectId);
      setTasks(data);
      setLoading(false);
    } catch (err) {
      setError('Gagal memuat daftar tugas');
      setLoading(false);
    }
  };

  const handleDelete = async (taskId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
      try {
        await taskService.remove(projectId, taskId);
        fetchTasks();
      } catch (err) {
        setError('Gagal menghapus tugas');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'To Do':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <p className="text-red-700 font-medium">{error}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 mb-6">
          <div className="flex justify-between items-center">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Daftar Tugas</h1>
            </div>
            
            <button
  onClick={() => navigate(`/projects/${projectId}/tasks/new`)}
  className="inline-flex items-center text-sm md:text-base font-medium text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors self-start md:self-auto"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
  Tambah
</button>

          </div>

          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-20 w-20 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Belum ada tugas</h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">Tambahkan tugas pertama untuk proyek ini sekarang juga.</p>
            <button
              onClick={() => navigate(`/projects/${projectId}/tasks/new`)}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Tambah Tugas
            </button>
          </div>
        ) : (
          <div className="grid gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-semibold text-gray-900 truncate">{task.name}</h3>
                      {task.description && (
                        <p className="mt-2 text-gray-600">{task.description}</p>
                      )}
                      <div className="mt-4 flex flex-wrap gap-3 items-center">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {task.status}
                        </span>
                        {task.deadline && (
                          <span className="inline-flex items-center text-sm text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(task.deadline).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
         <div className="flex flex-col md:flex-row md:items-center md:space-x-2 space-y-2 md:space-y-0 justify-center mt-2">
  <button
    onClick={() => navigate(`/projects/${projectId}/tasks/${task.id}`)}
    className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-indigo-600 bg-indigo-50 hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
  >
    Detail
  </button>
  <button
    onClick={() => navigate(`/projects/${projectId}/tasks/edit/${task.id}`)}
    className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-yellow-600 bg-yellow-50 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-colors"
  >
    Edit
  </button>
  <button
    onClick={() => handleDelete(task.id)}
    className="inline-flex items-center justify-center px-3 py-1.5 border border-transparent rounded-md text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
  >
    Hapus
  </button>
</div>
         </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="mt-12 text-right">
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors "
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Kembali ke Daftar Proyek</span>
        </button>
     </div>

    </div>
  );
};

export default ListTask;
