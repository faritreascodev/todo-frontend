export const TaskStats = ({ stats }) => {
    if (!stats) return null;

    const completionRate = stats.total > 0
        ? Math.round((stats.completed / stats.total) * 100)
        : 0;

    return (
        <div className="stats-grid">
            <div className="stat-card">
                <h3>Total</h3>
                <div className="value">{stats.total}</div>
            </div>

            <div className="stat-card">
                <h3>Completadas</h3>
                <div className="value" style={{ color: 'var(--success)' }}>
                    {stats.completed}
                </div>
            </div>

            <div className="stat-card">
                <h3>Pendientes</h3>
                <div className="value" style={{ color: 'var(--warning)' }}>
                    {stats.pending}
                </div>
            </div>

            <div className="stat-card">
                <h3>Progreso</h3>
                <div className="value" style={{ color: 'var(--accent)' }}>
                    {completionRate}%
                </div>
            </div>
        </div>
    );
};
