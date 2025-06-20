// src/services/taskService.js
import axios from 'axios';
import authService from '../services/authService';

const BASE_URL = 'http://127.0.0.1:8000/projects';

const getAuthHeaders = () => {
  const token = authService.getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const taskService = {
  // Ambil semua task berdasarkan projectId
  getByProjectId: async (projectId) => {
    const response = await axios.get(`${BASE_URL}/${projectId}/tasks`, getAuthHeaders());
    return response.data;
  },

  // Ambil detail task tertentu dalam project tertentu
  getById: async (projectId, taskId) => {
    const response = await axios.get(`${BASE_URL}/${projectId}/tasks/${taskId}`, getAuthHeaders());
    return response.data;
  },

  // Buat task baru dalam project tertentu
  create: async (projectId, taskData) => {
    const response = await axios.post(`${BASE_URL}/${projectId}/tasks`, taskData, getAuthHeaders());
    return response.data;
  },

  // Update task dalam project tertentu
  update: async (projectId, taskId, taskData) => {
    const response = await axios.put(`${BASE_URL}/${projectId}/tasks/${taskId}`, taskData, getAuthHeaders());
    return response.data;
  },

  // Hapus task dalam project tertentu
  remove: async (projectId, taskId) => {
    const response = await axios.delete(`${BASE_URL}/${projectId}/tasks/${taskId}`, getAuthHeaders());
    return response.data;
  }
};

export default taskService;
