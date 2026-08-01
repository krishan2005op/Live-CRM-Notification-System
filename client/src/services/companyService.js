import api from './api';

export const getCompanies = () => api.get('/api/companies');
export const createCompany = (data) => api.post('/api/companies', data);
export const getCompanyById = (id) => api.get(`/api/companies/${id}`);
export const updateCompany = (id, data) => api.put(`/api/companies/${id}`, data);
export const deleteCompany = (id) => api.delete(`/api/companies/${id}`);
