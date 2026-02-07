import { useState } from 'react';
import { formatDate } from '../utils/format';

export const TaskItem = ({ task, onToggle, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editDescription, setEditDescription] = useState(task.description);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSave = async () => {
        try {
            await onUpdate(task.id, {
                title: editTitle.trim(),
                description: editDescription.trim()
            });
            setIsEditing(false);
        } catch (err) {
            alert(err.message);
        }
    };

    const handleDelete = async () => {
        if (!confirm('¿Estás seguro de eliminar esta tarea?')) return;

        setIsDeleting(true);
        try {
            await onDelete(task.id);
        } catch (err) {
            alert(err.message);
            setIsDeleting(false);
        }
    };

    if (isEditing) {
        return (
            <div className="task-item">
                <div className="task-content" style={{ flex: 1 }}>
                    <div className="form-group" style={{ marginBottom: '0.75rem' }}>
                        <input
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            style={{ width: '100%' }}
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            value={editDescription}
                            onChange={(e) => setEditDescription(e.target.value)}
                            style={{ width: '100%', minHeight: '60px' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                        <button
                            className="btn btn-success btn-sm"
                            onClick={handleSave}
                        >
                            Guardar
                        </button>
                        <button
                            className="btn btn-sm"
                            onClick={() => setIsEditing(false)}
                            style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`task-item ${task.completed ? 'completed' : ''}`}>
            <input
                type="checkbox"
                className="task-checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id, task.completed)}
            />

            <div className="task-content">
                <h3 className="task-title">{task.title}</h3>
                {task.description && (
                    <p className="task-description">{task.description}</p>
                )}
                <div className="task-meta">
                    <span>Creado {formatDate(task.created_at)}</span>
                    {task.updated_at !== task.created_at && (
                        <span>Actualizado {formatDate(task.updated_at)}</span>
                    )}
                </div>
            </div>

            <div className="task-actions">
                <button
                    className="btn btn-sm"
                    onClick={() => setIsEditing(true)}
                    style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                    disabled={isDeleting}
                >
                    Editar
                </button>
                <button
                    className="btn btn-danger btn-sm"
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Eliminando...' : 'Eliminar'}
                </button>
            </div>
        </div>
    );
};
