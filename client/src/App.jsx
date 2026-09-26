import { useEffect, useState } from "react";
import "./App.css";

const starterTasks = [
  { id: 1, text: "Plan the day", completed: true },
  { id: 2, text: "Finish the most important task", completed: false },
  { id: 3, text: "Take a proper break", completed: false },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("simple-todo-tasks");
    return savedTasks ? JSON.parse(savedTasks) : starterTasks;
  });
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("simple-todo-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const remainingTasks = tasks.filter((task) => !task.completed).length;
  const visibleTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  function addTask(event) {
    event.preventDefault();
    const text = newTask.trim();
    if (!text) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: Date.now(), text, completed: false },
    ]);
    setNewTask("");
  }

  function toggleTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task,
      ),
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== id));
  }

  function clearCompleted() {
    setTasks((currentTasks) => currentTasks.filter((task) => !task.completed));
  }

  return (
    <main className="todo-page">
      <section className="todo-shell" aria-labelledby="todo-title">
        <header className="todo-header">
          <div>
            <p className="eyebrow">A little space for what matters</p>
            <h1 id="todo-title">Today<span>.</span></h1>
          </div>
          <div className="progress-note" aria-label={`${remainingTasks} tasks left`}>
            <strong>{remainingTasks}</strong>
            <span>left to do</span>
          </div>
        </header>

        <form className="add-form" onSubmit={addTask}>
          <input
            aria-label="New task"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="What needs doing?"
          />
          <button type="submit">Add task</button>
        </form>

        <div className="toolbar">
          <div className="filters" aria-label="Task filters">
            {[
              ["all", "All"],
              ["active", "To do"],
              ["completed", "Done"],
            ].map(([value, label]) => (
              <button
                className={filter === value ? "filter active" : "filter"}
                key={value}
                onClick={() => setFilter(value)}
                type="button"
              >
                {label}
              </button>
            ))}
          </div>
          <button className="clear-button" onClick={clearCompleted} type="button">
            Clear done
          </button>
        </div>

        <ul className="task-list">
          {visibleTasks.map((task) => (
            <li className={task.completed ? "task completed" : "task"} key={task.id}>
              <button
                aria-label={task.completed ? `Mark ${task.text} active` : `Complete ${task.text}`}
                className="check-button"
                onClick={() => toggleTask(task.id)}
                type="button"
              >
                {task.completed ? "✓" : ""}
              </button>
              <span>{task.text}</span>
              <button
                aria-label={`Delete ${task.text}`}
                className="delete-button"
                onClick={() => deleteTask(task.id)}
                type="button"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        {visibleTasks.length === 0 && (
          <div className="empty-state">
            <span>All clear</span>
            <p>Nothing here yet. Add a small win to your list.</p>
          </div>
        )}

        <footer className="todo-footer">
          <span>{tasks.length} {tasks.length === 1 ? "task" : "tasks"} total</span>
          <span>Saved on this device</span>
        </footer>
      </section>
    </main>
  );
}

export default App;


