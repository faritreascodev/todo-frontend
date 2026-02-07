import { useState, useEffect, useCallback } from 'react';
import { taskAPI } from '../api/tasks';

export const useTasks = () => {
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filter, setFilter] = useState('all');

    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const filters = {};
            if (filter === 'completed') filters.completed = true;
            if (filter === 'pending') filters.completed = false;

            const response = await taskAPI.getAll(filters);
            setTasks(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    const fetchStats = useCallback(async () => {
        try {
            const response = await taskAPI.getStats();
            setStats(response.data);
        } catch (err) {
            console.error('Error fetching stats:', err);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
        fetchStats();
    }, [fetchTasks, fetchStats]);

    const createTask = async (taskData) => {
        try {
            await taskAPI.create(taskData);
            await fetchTasks();
            await fetchStats();
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Error al crear tarea');
        }
    };

    const updateTask = async (id, updates) => {
        try {
            await taskAPI.update(id, updates);
            await fetchTasks();
            await fetchStats();
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Error al actualizar tarea');
        }
    };

    const toggleComplete = async (id, completed) => {
        try {
            if (completed) {
                await taskAPI.incomplete(id);
            } else {
                await taskAPI.complete(id);
            }
            await fetchTasks();
            await fetchStats();
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Error al cambiar estado');
        }
    };

    const deleteTask = async (id) => {
        try {
            await taskAPI.delete(id);
            await fetchTasks();
            await fetchStats();
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Error al eliminar tarea');
        }
    };

    const deleteCompleted = async () => {
        try {
            await taskAPI.deleteCompleted();
            await fetchTasks();
            await fetchStats();
        } catch (err) {
            throw new Error(err.response?.data?.message || 'Error al eliminar tareas');
        }
    };

    return {
        tasks,
        stats,
        loading,
        error,
        filter,
        setFilter,
        createTask,
        updateTask,
        toggleComplete,
        deleteTask,
        deleteCompleted,
        refresh: fetchTasks
    };
};
