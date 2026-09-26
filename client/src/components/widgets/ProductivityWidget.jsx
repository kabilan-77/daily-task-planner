import React from "react";
import { MdTrendingUp } from "react-icons/md";

function ProductivityWidget({ tasks }) {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const percent =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="widget-card">

      <div className="widget-header">
        <MdTrendingUp className="widget-icon" />
        <h3>Productivity</h3>
      </div>

      <h1 className="productivity-percent">
        {percent}%
      </h1>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      <div className="progress-info">

        <p>Total Tasks</p>
        <strong>{total}</strong>

      </div>

      <div className="progress-info">

        <p>Completed</p>
        <strong>{completed}</strong>

      </div>

    </div>
  );
}

export default ProductivityWidget;