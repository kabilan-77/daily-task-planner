import React from "react";
import { MdFlag } from "react-icons/md";

function GoalWidget({ tasks }) {
  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const goal = 20;

  const percentage = Math.min(
    Math.round((completed / goal) * 100),
    100
  );

  return (
    <div className="widget-card">

      <div className="widget-header">
        <MdFlag className="widget-icon" />
        <h3>Monthly Goal</h3>
      </div>

      <h1>{completed}/{goal}</h1>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>

      <p>{percentage}% Completed</p>

    </div>
  );
}

export default GoalWidget;