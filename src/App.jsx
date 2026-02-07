import { useTasks } from './hooks/useTasks';
import { TaskStats } from './components/TaskStats';
import { FilterBar } from './components/FilterBar';
import { TaskForm } from './components/TaskForm';
import { TaskList } from './components/TaskList';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
    const {
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
        deleteCompleted
    } = useTasks();

    const handleDeleteCompleted = async () => {
        if (!confirm('¿Eliminar todas las tareas completadas?')) return;
        try {
            await deleteCompleted();
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Task Manager</h1>
                <p>Sistema de gestión de tareas con monitoreo integrado</p>
            </header>

            <TaskStats stats={stats} />

            <TaskForm onSubmit={createTask} />

            <FilterBar
                filter={filter}
                setFilter={setFilter}
                onDeleteCompleted={handleDeleteCompleted}
                hasCompleted={stats?.completed > 0}
            />

            {error && (
                <div className="error">
                    Error: {error}
                </div>
            )}

            {loading ? (
                <LoadingSpinner />
            ) : (
                <TaskList
                    tasks={tasks}
                    onToggle={toggleComplete}
                    onDelete={deleteTask}
                    onUpdate={updateTask}
                />
            )}
        </div>
    );
}

export default App;
