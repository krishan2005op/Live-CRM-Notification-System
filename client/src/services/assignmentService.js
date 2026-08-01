import api from './api';

export const getAssignments = () => api.get('/api/assignments');
export const createAssignment = (data) => api.post('/api/assignments', data);
export const getAssignmentById = (id) => api.get(`/api/assignments/${id}`);
export const updateAssignment = (id, data) => api.put(`/api/assignments/${id}`, data);
export const deleteAssignment = (id) => api.delete(`/api/assignments/${id}`);
