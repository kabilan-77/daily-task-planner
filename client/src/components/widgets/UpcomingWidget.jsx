import React from "react";
import { MdUpcoming } from "react-icons/md";

function UpcomingWidget({ tasks }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTasks = tasks
    .filter((task) => {
      if (!task.dueDate) return false;

      const dueDate = new Date(task.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      return (
        dueDate > today &&
        task.status !== "Completed"
      );
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  return (
    <div className="widget-card">

      <div className="widget-header">
        <MdUpcoming className="widget-icon" />
        <h3>Upcoming Tasks</h3>
      </div>

      {upcomingTasks.length === 0 ? (
        <p className="empty-widget">
          🎉 No upcoming tasks
        </p>
      ) : (
        <ul className="widget-list">
          {upcomingTasks.map((task) => (
            <li key={task._id}>
              <div>
                <strong>{task.title}</strong>
                <br />
                <small>
                  {new Date(task.dueDate).toLocaleDateString()}
                </small>
              </div>

              <small>{task.priority}</small>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default UpcomingWidget;