import api from './api';

export const getTasks = () => api.get('/tasks');
export const createTask = (data: { title: string; description?: string }) =>
  api.post('/tasks', data);
export const updateTask = (id: number, data: { title?: string; description?: string; status?: 'PENDING' | 'COMPLETED' }) =>
  api.patch(`/tasks/${id}`, data);
export const deleteTask = (id: number) =>
  api.delete(`/tasks/${id}`); 