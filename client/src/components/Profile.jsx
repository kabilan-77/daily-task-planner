import React, { useState } from "react";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState(user?.name || "");

  const email = user?.email || "";

  const saveProfile = () => {
    const updatedUser = {
      ...user,
      name,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Profile updated successfully!");

    window.location.reload();
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const initials = name
    ? name
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase())
        .slice(0, 2)
        .join("")
    : "U";

  return (
    <div className="profile-card">

      <div className="profile-top">

        <div className="profile-avatar-large">
          {initials}
        </div>

        <div>
          <h2>{name}</h2>
          <p className="muted">
            Daily Task Planner User
          </p>
        </div>

      </div>

      <div className="profile-info">

        <label>Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Email</label>

        <input
          type="email"
          value={email}
          disabled
        />

      </div>

      <div className="profile-stats">

        <div className="stat-box">
          <h3>🏆</h3>
          <p>Task Manager</p>
        </div>

        <div className="stat-box">
          <h3>🔥</h3>
          <p>Productive</p>
        </div>

        <div className="stat-box">
          <h3>⭐</h3>
          <p>Active User</p>
        </div>

      </div>

      <div className="profile-buttons">

        <button
          className="save-btn"
          onClick={saveProfile}
        >
          Save Changes
        </button>

        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Profile;