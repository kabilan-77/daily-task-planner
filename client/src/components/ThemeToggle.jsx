import { useEffect, useState } from "react";

function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      className="theme-btn"
      onClick={() => setDarkMode(!darkMode)}
    >
      {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
}

export default ThemeToggle;
