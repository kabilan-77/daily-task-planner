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
import Notifications from "../components/Notifications";
import KanbanBoard from "../components/KanbanBoard";

import WeatherWidget from "../components/widgets/WeatherWidget";
import QuoteWidget from "../components/widgets/QuoteWidget";
import QuickActions from "../components/widgets/QuickActions";
import UpcomingWidget from "../components/widgets/UpcomingWidget";
import ClockWidget from "../components/widgets/ClockWidget";
import AISuggestions from "../components/widgets/AISuggestions";

import {
  MdListAlt,
  MdCheckCircle,
  MdHourglassEmpty,
  MdPriorityHigh,
} from "react-icons/md";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
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

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedTask(null);
    setShowModal(false);
  };

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(search.toLowerCase())
  );

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  return (
    <div className="app">

      <Sidebar />

      <div className="main">

        {/* TOP HEADER */}
        <Header
          search={search}
          onSearchChange={(e) => setSearch(e.target.value)}
        />

        {/* DASHBOARD TITLE */}
        <div className="dashboard-hero">

          <div>
            <p className="dashboard-label">DASHBOARD</p>

            <h1>
              Welcome back, {user?.name || "User"} 👋
            </h1>

            <p>Manage your daily work efficiently.</p>
          </div>

          <div className="hero-actions">

            <ExportPDF />

            <ThemeToggle />

            <button
              className="btn-primary"
              onClick={() => setShowTaskForm(!showTaskForm)}
            >
              {showTaskForm ? "Close Form" : "+ Add Task"}
            </button>

          </div>

        </div>

        {/* TASK FORM */}

        {showTaskForm && (
          <TaskForm fetchTasks={fetchTasks} />
        )}

        {/* SUMMARY CARDS */}

        <div className="summary-cards">

          <div className="summary-card">
            <MdListAlt size={45} />
            <div>
              <p>Total Tasks</p>
              <h2>{totalTasks}</h2>
            </div>
          </div>

          <div className="summary-card">
            <MdCheckCircle size={45} />
            <div>
              <p>Completed</p>
              <h2>{completedTasks}</h2>
            </div>
          </div>

          <div className="summary-card">
            <MdHourglassEmpty size={45} />
            <div>
              <p>Pending</p>
              <h2>{pendingTasks}</h2>
            </div>
          </div>

          <div className="summary-card">
            <MdPriorityHigh size={45} />
            <div>
              <p>High Priority</p>
              <h2>{highPriorityTasks}</h2>
            </div>
          </div>

        </div>

        {/* MAIN GRID */}

        <div className="dashboard-grid">

          {/* LEFT */}

          <div className="dashboard-left">

            <DashboardChart tasks={tasks} />

            <KanbanBoard
              tasks={tasks}
              fetchTasks={fetchTasks}
            />

            <RecentTasks tasks={tasks} />

            <TaskList
              tasks={filteredTasks}
              fetchTasks={fetchTasks}
              onEdit={handleEdit}
            />

          </div>

          {/* RIGHT */}

          <div className="dashboard-right">

            <ClockWidget />

            <WeatherWidget />

            <AISuggestions tasks={tasks} />

            <QuoteWidget />

            <QuickActions />

            <UpcomingWidget tasks={tasks} />

            <Notifications />

            <CalendarView tasks={tasks} />

          </div>

        </div>

      </div>

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