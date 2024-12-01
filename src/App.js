import React, { useRef, useState } from "react";
import ChatPage from "./pages/ChatPage";
import DarkModeToggle from "./components/DarkModeToggle";
import "./styles/chat.css";
import HistoryPage from "./pages/HistoryPage";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const trigger = useRef();

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      document.body.classList.toggle("dark-mode", newMode);
      return newMode;
    });
  };

  const toggleHistoryList = () => {
    setIsHistoryOpen((prevState) => !prevState);
  };

  const handleBurgerClick = (e) => {
    e.preventDefault();
    if (trigger.current) {
      // 현재 버튼의 classList에 active 추가/제거
      trigger.current.classList.toggle(`active-1`); // index+1로 구현 가능
    }
    toggleHistoryList();
  };

  return (
    <div>
      <div className="app-header">
        {/* 햄버거 버튼 */}
        <a
          className="hamburger-menu"
          onClick={handleBurgerClick}
          ref={trigger}
          href="{()=>false}"
        >
          <span></span>
          <span></span>
          <span></span>
        </a>
        <h1 className="app-title">ChatGPT Clone</h1>
        <DarkModeToggle
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </div>
      <div className="contents-wrapper">
        <HistoryPage isHistoryOpen={isHistoryOpen} />
        <ChatPage />
      </div>
    </div>
  );
}

export default App;
