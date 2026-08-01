import api from './api';

export const getContacts = () => api.get('/api/contacts');
export const createContact = (data) => api.post('/api/contacts', data);
export const getContactById = (id) => api.get(`/api/contacts/${id}`);
export const updateContact = (id, data) => api.put(`/api/contacts/${id}`, data);
export const deleteContact = (id) => api.delete(`/api/contacts/${id}`);
