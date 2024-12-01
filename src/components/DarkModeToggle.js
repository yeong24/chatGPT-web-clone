import React from "react";

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className="dark-mode-toggle">
      <label className="toggle-switch">
        <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
        <span className="slider"></span>
      </label>
    </div>
  );
};
export default DarkModeToggle;
