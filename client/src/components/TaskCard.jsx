import React from "react";
import API from "../api/taskApi";

function TaskCard({ task, fetchTasks, onEdit }) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dueDate = task.dueDate ? new Date(task.dueDate) : null;

  if (dueDate) {
    dueDate.setHours(0, 0, 0, 0);
  }

  let dueStatus = "";
  let dueClass = "";

  if (dueDate) {
    if (dueDate.getTime() < today.getTime()) {
      dueStatus = "❌ Overdue";
      dueClass = "overdue";
    } else if (dueDate.getTime() === today.getTime()) {
      dueStatus = "⚠️ Due Today";
      dueClass = "today";
    } else {
      dueStatus = "🟢 Upcoming";
      dueClass = "upcoming";
    }
  }

  // Delete Task
  const deleteTask = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/${task._id}`);
      fetchTasks();
      alert("✅ Task deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Error deleting task.");
    }
  };

  // Mark as Completed
  const completeTask = async () => {
    if (task.status === "Completed") return;

    try {
      await API.put(`/${task._id}`, {
        ...task,
        status: "Completed",
      });

      fetchTasks();
      alert("🎉 Task marked as completed!");
    } catch (err) {
      console.error(err);
      alert("❌ Error updating task.");
    }
  };

  return (
    <div className="task-card">

      {/* Header */}
      <div className="task-header">

        <div>
          <h2>{task.title}</h2>

          <small>
            Created:{" "}
            {task.createdAt
              ? new Date(task.createdAt).toLocaleDateString()
              : "Today"}
          </small>
        </div>

        <span className={`priority ${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>

      </div>

      {/* Description */}

      <p className="task-description">
        {task.description || "No description provided."}
      </p>

      {/* Badges */}

      <div className="task-badges">

        <span className="category-badge">
          🏷️ {task.category}
        </span>

        <span
          className={
            task.status === "Completed"
              ? "status completed"
              : "status pending"
          }
        >
          {task.status === "Completed"
            ? "✅ Completed"
            : "⏳ Pending"}
        </span>

      </div>

      {/* Due Date */}

      <div className="task-details">

        <span>
          🗓️{" "}
          {task.dueDate
            ? new Date(task.dueDate).toLocaleDateString()
            : "No Due Date"}
        </span>

        {task.dueDate && (
          <span className={`due ${dueClass}`}>
            {dueStatus}
          </span>
        )}

      </div>

      {/* Buttons */}

      <div className="task-buttons">

        <button
          className="edit-btn"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="complete-btn"
          onClick={completeTask}
          disabled={task.status === "Completed"}
        >
          {task.status === "Completed"
            ? "Completed"
            : "Mark Complete"}
        </button>

        <button
          className="delete-btn"
          onClick={deleteTask}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;

