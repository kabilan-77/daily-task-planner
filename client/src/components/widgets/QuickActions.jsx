import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  return (
    <div className="widget">
      <h3>⚡ Quick Actions</h3>

      <div className="quick-buttons">
        <button onClick={() => navigate("/analytics")}>
          📊 Analytics
        </button>

        <button onClick={() => navigate("/profile")}>
          👤 Profile
        </button>

        <button onClick={() => navigate("/settings")}>
          ⚙ Settings
        </button>
      </div>
    </div>
  );
}

export default QuickActions;