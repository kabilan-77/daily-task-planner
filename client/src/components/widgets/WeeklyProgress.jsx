import React from "react";
import { MdTrendingUp } from "react-icons/md";

function WeeklyProgress({ tasks }) {
  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const total = tasks.length;

  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="widget-card">

      <div className="widget-header">

        <MdTrendingUp className="widget-icon" />

        <h3>Weekly Progress</h3>

      </div>

      <h1>{percentage}%</h1>

      <div className="progress-bar">

        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        ></div>

      </div>

      <p>
        {completed} of {total} tasks completed
      </p>

    </div>
  );
}

export default WeeklyProgress;