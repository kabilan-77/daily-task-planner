import { NavLink, useNavigate } from "react-router-dom";
import {
  MdDashboard,
  MdChecklist,
  MdCalendarMonth,
  MdAnalytics,
  MdPerson,
  MdSettings,
  MdLogout,
} from "react-icons/md";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <aside className="sidebar">

      {/* Logo */}
      <div className="logo">
        <h2>📋 Daily Task Planner</h2>
      </div>

      {/* Navigation */}
      <nav className="menu">

        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <MdDashboard size={22} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/analytics"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <MdAnalytics size={22} />
          <span>Analytics</span>
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <MdChecklist size={22} />
          <span>My Tasks</span>
        </NavLink>

        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <MdCalendarMonth size={22} />
          <span>Calendar</span>
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <MdPerson size={22} />
          <span>Profile</span>
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          <MdSettings size={22} />
          <span>Settings</span>
        </NavLink>

      </nav>

      {/* Logout */}
      <button className="logout-btn" onClick={handleLogout}>
        <MdLogout size={22} />
        <span>Logout</span>
      </button>

    </aside>
  );
}

export default Sidebar;