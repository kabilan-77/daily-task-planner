import { useEffect, useState } from "react";
import API from "../api/taskApi";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskList from "../components/TaskList";

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await API.get("/");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <Sidebar />

      <div className="main">
        <Header
          search={search}
          onSearchChange={(e) => setSearch(e.target.value)}
        />

        <div className="container">
          <h1>📋 My Tasks</h1>

          <TaskList
            tasks={filteredTasks}
            fetchTasks={fetchTasks}
          />
        </div>
      </div>
    </div>
  );
}

export default TasksPage;