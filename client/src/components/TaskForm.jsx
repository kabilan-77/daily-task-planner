import { useState } from "react";
import API from "../api/taskApi";

function TaskForm({ fetchTasks }) {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Personal");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    try {

      await API.post("/", {
        title,
        description,
        dueDate,
        priority,
        category,
        status,
      });

      alert("✅ Task Added Successfully");

      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
      setCategory("Personal");
      setStatus("Pending");

      fetchTasks();

    } catch (err) {
      console.error(err);
      alert("❌ Error Adding Task");
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>

      <h2>Add New Task</h2>

      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="Low">Low Priority</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="Personal">Personal</option>
        <option value="College">College</option>
        <option value="Project">Project</option>
        <option value="Work">Work</option>
        <option value="Shopping">Shopping</option>
        <option value="Fitness">Fitness</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>

      <button type="submit">
        Add Task
      </button>

    </form>
  );
}

export default TaskForm;
