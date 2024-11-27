import React from "react";

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div style={{ marginBottom: "20px", textAlign: "right" }}>
      <button
        onClick={toggleDarkMode}
        style={{ padding: "5px 10px", cursor: "pointer" }}
      >
        {isDarkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </div>
  );
};

export default DarkModeToggle;
