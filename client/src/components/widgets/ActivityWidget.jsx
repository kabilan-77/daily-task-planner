import React from "react";
import {
  MdHistory,
  MdCheckCircle,
  MdHourglassEmpty,
} from "react-icons/md";

function ActivityWidget({ tasks }) {
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  return (
    <div className="widget-card">

      <div className="widget-header">
        <MdHistory className="widget-icon" />
        <h3>Recent Activity</h3>
      </div>

      {recentTasks.length === 0 ? (
        <p className="empty-widget">
          No recent activity
        </p>
      ) : (
        <ul className="widget-list">

          {recentTasks.map((task) => (

            <li key={task._id}>

              <span>

                {task.status === "Completed" ? (
                  <MdCheckCircle color="green" />
                ) : (
                  <MdHourglassEmpty color="orange" />
                )}

                {" "}
                {task.title}

              </span>

              <small>{task.status}</small>

            </li>

          ))}

        </ul>
      )}

    </div>
  );
}

export default ActivityWidget;