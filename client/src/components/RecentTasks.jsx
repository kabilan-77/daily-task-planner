function RecentTasks({ tasks }) {

  const recentTasks = tasks.slice(0, 5);

  return (
    <div className="recent-card">

      <h2>Recent Tasks</h2>

      {recentTasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (

        recentTasks.map((task) => (

          <div
            className="recent-task"
            key={task._id}
          >
            <div>
              <h4>{task.title}</h4>
              <p>{task.priority}</p>
            </div>

            <span
              className={
                task.status === "Completed"
                  ? "completed-badge"
                  : "pending-badge"
              }
            >
              {task.status}
            </span>

          </div>

        ))

      )}

    </div>
  );
}

export default RecentTasks;

