import { useState } from "react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");

  const saveSettings = () => {
    const settings = {
      notifications,
      darkMode,
      language,
    };

    localStorage.setItem(
      "settings",
      JSON.stringify(settings)
    );

    alert("Settings Saved Successfully!");
  };

  const clearTasks = () => {
    const confirmClear = window.confirm(
      "Delete all tasks?"
    );

    if (!confirmClear) return;

    alert(
      "This button is ready. Later we'll connect it to MongoDB."
    );
  };

  return (
    <div className="settings-card">

      <h2>⚙ Settings</h2>

      <div className="setting-item">

        <label>Enable Notifications</label>

        <input
          type="checkbox"
          checked={notifications}
          onChange={() =>
            setNotifications(!notifications)
          }
        />

      </div>

      <div className="setting-item">

        <label>Dark Mode</label>

        <input
          type="checkbox"
          checked={darkMode}
          onChange={() =>
            setDarkMode(!darkMode)
          }
        />

      </div>

      <div className="setting-item">

        <label>Language</label>

        <select
          value={language}
          onChange={(e) =>
            setLanguage(e.target.value)
          }
        >
          <option>English</option>
          <option>Tamil</option>
          <option>Hindi</option>
        </select>

      </div>

      <div className="settings-buttons">

        <button
          className="save-btn"
          onClick={saveSettings}
        >
          Save Settings
        </button>

        <button
          className="delete-btn"
          onClick={clearTasks}
        >
          Clear All Tasks
        </button>

      </div>

    </div>
  );
}

export default Settings;