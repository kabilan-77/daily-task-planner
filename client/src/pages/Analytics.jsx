import { useEffect, useState } from "react";
import API from "../api/taskApi";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import AnalyticsChart from "../components/AnalyticsChart";

import {
  MdListAlt,
  MdCheckCircle,
  MdHourglassEmpty,
  MdPriorityHigh,
} from "react-icons/md";

function Analytics() {
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

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const highPriority = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const productivity =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

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
              ANALYTICS
            </p>

            <h1>Task Analytics 📊</h1>

            <p>
              Monitor your productivity and task performance.
            </p>
          </div>
        </div>

        <div className="summary-cards">

          <div className="summary-card">
            <MdListAlt size={42} color="#6C63FF" />
            <div>
              <p>Total Tasks</p>
              <h2>{totalTasks}</h2>
            </div>
          </div>

          <div className="summary-card">
            <MdCheckCircle size={42} color="#4CAF50" />
            <div>
              <p>Completed</p>
              <h2>{completedTasks}</h2>
            </div>
          </div>

          <div className="summary-card">
            <MdHourglassEmpty size={42} color="#FF9800" />
            <div>
              <p>Pending</p>
              <h2>{pendingTasks}</h2>
            </div>
          </div>

          <div className="summary-card">
            <MdPriorityHigh size={42} color="#F44336" />
            <div>
              <p>High Priority</p>
              <h2>{highPriority}</h2>
            </div>
          </div>

        </div>

        <AnalyticsChart tasks={tasks} />

        <div className="chart-card" style={{ marginTop: "25px" }}>
          <h2>Productivity Score</h2>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${productivity}%` }}
            ></div>
          </div>

          <h1
            style={{
              textAlign: "center",
              color: "#6C63FF",
              marginTop: "20px",
            }}
          >
            {productivity}%
          </h1>

        </div>

      </div>
    </div>
  );
}

export default Analytics;