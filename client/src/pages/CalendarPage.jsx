import { useEffect, useState } from "react";
import API from "../api/taskApi";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import CalendarView from "../components/CalendarView";

function CalendarPage() {
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

  return (
    <div className="app">
      <Sidebar />

      <div className="main">

        <Header
          search={search}
          onSearchChange={(e) => setSearch(e.target.value)}
        />

        <div className="dashboard-hero">
          <div>
            <p className="dashboard-label">
              CALENDAR
            </p>

            <h1>Task Calendar 📅</h1>

            <p>
              View all your tasks by due date.
            </p>
          </div>
        </div>

        <CalendarView tasks={tasks} />

      </div>
    </div>
  );
}

export default CalendarPage;