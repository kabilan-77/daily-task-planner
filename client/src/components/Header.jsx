import React from "react";
import { FaSearch, FaBell } from "react-icons/fa";

function Header({ search, onSearchChange }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="header">

      {/* Empty space to push items to the right */}
      <div className="header-left"></div>

      {/* Right Side */}
      <div className="header-right">

        {/* Search Box */}
        <div className="search-container">
          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={onSearchChange}
            className="search-input"
          />
        </div>

        {/* Notification */}
        <button className="notification-btn">
          <FaBell />
        </button>

        {/* User Avatar */}
        <div className="profile-avatar">
          {user?.name
            ? user.name.charAt(0).toUpperCase()
            : "U"}
        </div>

      </div>

    </header>
  );
}

export default Header;