export const FilterBar = ({ filter, setFilter, onDeleteCompleted, hasCompleted }) => {
    return (
        <div className="filter-bar">
            <div style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
                <button
                    className={`filter-button ${filter === 'all' ? 'active' : ''}`}
                    onClick={() => setFilter('all')}
                >
                    Todas
                </button>
                <button
                    className={`filter-button ${filter === 'pending' ? 'active' : ''}`}
                    onClick={() => setFilter('pending')}
                >
                    Pendientes
                </button>
                <button
                    className={`filter-button ${filter === 'completed' ? 'active' : ''}`}
                    onClick={() => setFilter('completed')}
                >
                    Completadas
                </button>
            </div>

            {hasCompleted && (
                <button
                    className="btn btn-danger btn-sm"
                    onClick={onDeleteCompleted}
                >
                    Eliminar Completadas
                </button>
            )}
        </div>
    );
};
