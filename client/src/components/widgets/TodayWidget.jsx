import React from "react";
import { MdToday } from "react-icons/md";

function TodayWidget({ tasks }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;

    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);

    return (
      due.getTime() === today.getTime() &&
      task.status !== "Completed"
    );
  });

  return (
    <div className="widget-card">

      <div className="widget-header">
        <MdToday className="widget-icon" />
        <h3>Today's Tasks</h3>
      </div>

      {todayTasks.length === 0 ? (
        <p className="empty-widget">
          🎉 No tasks for today
        </p>
      ) : (
        <ul className="widget-list">
          {todayTasks.map((task) => (
            <li key={task._id}>
              <span>{task.title}</span>

              <small>{task.priority}</small>
            </li>
          ))}
        </ul>
      )}

    </div>
  );
}

export default TodayWidget;