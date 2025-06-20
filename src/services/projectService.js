// src/services/projectService.js
import axios from 'axios';
import authService from '../services/authService';

const API_URL = 'http://localhost:8000/projects';

const getAuthHeaders = () => {
  const token = authService.getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

const projectService = {
  getAll: () => axios.get(`${API_URL}/`, getAuthHeaders()).then(res => res.data),

  getById: (id) => axios.get(`${API_URL}/${id}`, getAuthHeaders()).then(res => res.data),

  create: (data) => axios.post(`${API_URL}/`, data, getAuthHeaders()).then(res => res.data),

  update: (id, data) => axios.put(`${API_URL}/${id}`, data, getAuthHeaders()).then(res => res.data),

  remove: (id) => axios.delete(`${API_URL}/${id}`, getAuthHeaders()).then(res => res.data),
};

export default projectService;
