import React from "react";
import { MdEmojiEvents } from "react-icons/md";

function AchievementWidget({ tasks }) {

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const achievements = [];

  if (completed >= 1)
    achievements.push("🥇 First Task Completed");

  if (completed >= 5)
    achievements.push("🏅 Completed 5 Tasks");

  if (completed >= 10)
    achievements.push("🏆 Productivity Master");

  if (completed >= 20)
    achievements.push("🚀 Task Champion");

  return (
    <div className="widget-card">

      <div className="widget-header">

        <MdEmojiEvents className="widget-icon" />

        <h3>Achievements</h3>

      </div>

      {achievements.length === 0 ? (

        <p>Complete tasks to unlock achievements.</p>

      ) : (

        achievements.map((item, index) => (

          <p key={index}>{item}</p>

        ))

      )}

    </div>
  );
}

export default AchievementWidget;