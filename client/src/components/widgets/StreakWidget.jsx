import React from "react";
import { MdLocalFireDepartment } from "react-icons/md";

function StreakWidget({ tasks }) {
  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  // Demo streak calculation
  const streak = completed === 0 ? 0 : Math.min(completed, 30);

  return (
    <div className="widget-card">

      <div className="widget-header">
        <MdLocalFireDepartment
          className="widget-icon"
          color="#ff5722"
        />
        <h3>Productivity Streak</h3>
      </div>

      <h1 className="streak-number">
        🔥 {streak}
      </h1>

      <p>
        {streak === 0
          ? "Complete a task to start your streak!"
          : `${streak} productive day${streak > 1 ? "s" : ""}`}
      </p>

    </div>
  );
}

export default StreakWidget;