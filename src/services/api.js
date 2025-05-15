import axios from 'axios';
import { useAuth } from '../context/AuthContext';  // Aqui estamos importando o contexto para garantir que o token seja lido

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
});

// Interceptor para adicionar o token a cada requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // Lê o token do localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/user/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const response = await api.get('/task');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch tasks:', error);
    throw error;
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/task', taskData);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    throw error;
  }

};
export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/task/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    throw error;
  }
};

export const updateTaskStatus = async (taskId, status) => {
  return api.put(`/task/${taskId}/status`, { status });
};

export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post('/user', { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Registro falhou:', error);
    throw error;
  }
};

