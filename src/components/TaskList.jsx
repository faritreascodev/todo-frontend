import { TaskItem } from './TaskItem';

export const TaskList = ({ tasks, onToggle, onDelete, onUpdate }) => {
    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <h3>No hay tareas</h3>
                <p>Crea tu primera tarea para comenzar</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onUpdate={onUpdate}
                />
            ))}
        </div>
    );
};
