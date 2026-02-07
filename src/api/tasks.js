import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://todoapi.mltprdj.com';

const api = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

export const taskAPI = {
    getAll: async (filters = {}) => {
        const params = new URLSearchParams();
        if (filters.completed !== undefined) params.append('completed', filters.completed);
        if (filters.limit) params.append('limit', filters.limit);
        if (filters.offset) params.append('offset', filters.offset);

        const response = await api.get(`/tasks?${params}`);
        return response.data;
    },

    getById: async (id) => {
        const response = await api.get(`/tasks/${id}`);
        return response.data;
    },

    create: async (task) => {
        const response = await api.post('/tasks', task);
        return response.data;
    },

    update: async (id, updates) => {
        const response = await api.put(`/tasks/${id}`, updates);
        return response.data;
    },

    complete: async (id) => {
        const response = await api.patch(`/tasks/${id}/complete`);
        return response.data;
    },

    incomplete: async (id) => {
        const response = await api.patch(`/tasks/${id}/incomplete`);
        return response.data;
    },

    delete: async (id) => {
        const response = await api.delete(`/tasks/${id}`);
        return response.data;
    },

    deleteCompleted: async () => {
        const response = await api.delete('/tasks/completed/all');
        return response.data;
    },

    getStats: async () => {
        const response = await api.get('/tasks/stats/summary');
        return response.data;
    }
};
