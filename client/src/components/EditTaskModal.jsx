import { useState, useEffect } from "react";
import API from "../api/taskApi";

function EditTaskModal({ task, fetchTasks, onClose }) {
  const [editTask, setEditTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "College",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setEditTask({
        title: task.title || "",
        description: task.description || "",
        priority: task.priority || "Medium",
        category: task.category || "College",
        dueDate: task.dueDate
          ? task.dueDate.substring(0, 10)
          : "",
      });
    }
  }, [task]);

  const handleChange = (e) => {
    setEditTask({
      ...editTask,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      console.log('EditTaskModal.handleUpdate - sending update for', task._id, editTask);
      const res = await API.put(`/${task._id}`, editTask);
      console.log('EditTaskModal.handleUpdate - response:', res);

      alert("Task Updated Successfully!");

      fetchTasks();

      onClose();

    } catch (error) {
      console.error('EditTaskModal.handleUpdate - error:', error.response || error);
      alert("Error Updating Task: " + (error.response?.data?.message || error.message));
    }
  };

  if (!task) return null;

  return (
    <div className="modal-overlay">

      <div className="modal">

        <h2>Edit Task</h2>

        <form onSubmit={handleUpdate}>

          <input
            type="text"
            name="title"
            value={editTask.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            value={editTask.description}
            onChange={handleChange}
          />

          <select
            name="priority"
            value={editTask.priority}
            onChange={handleChange}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <select
            name="category"
            value={editTask.category}
            onChange={handleChange}
          >
            <option>College</option>
            <option>Work</option>
            <option>Personal</option>
            <option>Shopping</option>
            <option>Health</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={editTask.dueDate}
            onChange={handleChange}
          />

          <div className="modal-buttons">

            <button
              type="button"
              className="delete-btn"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="complete-btn"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditTaskModal;