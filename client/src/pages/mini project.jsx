import { useEffect, useState } from "react";
import API from "../api/taskApi";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import EditTaskModal from "../components/EditTaskModal";
import DashboardChart from "../components/DashboardChart";
import RecentTasks from "../components/RecentTasks";
import CalendarView from "../components/CalendarView";
import ExportPDF from "../components/ExportPDF";
import ThemeToggle from "../components/ThemeToggle";
import Profile from "../components/Profile";

function Dashboard() {
  // Logged-in User
  const user = JSON.parse(localStorage.getItem("user"));

  // States
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch Tasks
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

  // Edit Task
  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  // Close Modal
  const closeModal = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  return (
    <div className="app">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main">

        {/* Header */}
        <Header />

        {/* Welcome */}
        <h1>Welcome {user?.name} 👋</h1>

        <p>Manage your daily tasks efficiently.</p>

        {/* PDF + Theme Buttons */}
        <div
          style={{
            display: "flex",
            gap: "15px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          <ExportPDF tasks={tasks} />
          <ThemeToggle />
        </div>

        {/* User Profile */}
        <Profile />

        {/* Dashboard Cards */}
        <div className="cards">

          <div className="card">
            <h3>Total Tasks</h3>
            <h2>{tasks.length}</h2>
          </div>

          <div className="card">
            <h3>Pending</h3>
            <h2>
              {tasks.filter((task) => task.status === "Pending").length}
            </h2>
          </div>

          <div className="card">
            <h3>Completed</h3>
            <h2>
              {tasks.filter((task) => task.status === "Completed").length}
            </h2>
          </div>

          <div className="card">
            <h3>High Priority</h3>
            <h2>
              {tasks.filter((task) => task.priority === "High").length}
            </h2>
          </div>

        </div>

        {/* Chart & Recent Tasks */}
        <div className="dashboard-grid">
          <DashboardChart tasks={tasks} />
          <RecentTasks tasks={tasks} />
        </div>

        {/* Add Task */}
        <TaskForm fetchTasks={fetchTasks} />

        {/* Task List */}
        <TaskList
          tasks={tasks}
          fetchTasks={fetchTasks}
          onEdit={handleEdit}
        />

      </div>

      {/* Edit Modal */}
      {showModal && (
        <EditTaskModal
          task={selectedTask}
          fetchTasks={fetchTasks}
          onClose={closeModal}
        />
      )}

    </div>
  );
}

export default Dashboard;
