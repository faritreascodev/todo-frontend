import { useState } from 'react';

export const TaskForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('El título es requerido');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            await onSubmit({ title: title.trim(), description: description.trim() });
            setTitle('');
            setDescription('');
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>Nueva Tarea</h2>

            {error && (
                <div className="error" style={{ marginBottom: '1rem' }}>
                    {error}
                </div>
            )}

            <div className="form-group">
                <label htmlFor="title">Título</label>
                <input
                    id="title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ingresa el título de la tarea"
                    disabled={isSubmitting}
                    autoComplete="off"
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Descripción (opcional)</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Agrega una descripción detallada"
                    disabled={isSubmitting}
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Creando...' : 'Crear Tarea'}
            </button>
        </form>
    );
};
