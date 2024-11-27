import React, { useState, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import ChatInput from "../components/ChatInput";
import ModelSelector from "../components/ModelSelector";
import DarkModeToggle from "../components/DarkModeToggle";
import chatgptAPI from "../api/chatgpt";
import "../styles/chat.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "uyjang. GPT API 테스트~~" }, // 기본 시스템 메시지
  ]);
  const [selectedModel, setSelectedModel] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // 응답 중 상태

  // 초기화 버튼을 눌렀을 때 메시지를 리셋
  const clearMessages = () => {
    setMessages([
      { role: "system", content: "초기화 됨~" }, // 기본 메시지 유지
    ]);
    localStorage.removeItem("chatHistory"); // 브라우저에 저장된 기록도 초기화
  };

  const handleSendMessage = async (userMessage) => {
    if (!selectedModel) {
      alert("Please select a model first.");
      return;
    }

    const userMessageObj = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, userMessageObj]);

    setIsTyping(true); // 응답 시작
    const botMessageObj = { role: "assistant", content: "" };
    setMessages((prev) => [...prev, botMessageObj]);

    try {
      const response = await chatgptAPI(
        [...messages, userMessageObj],
        selectedModel, // 선택된 모델 사용
        (updatedContent) => {
          setMessages((prev) => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].content = updatedContent;
            return newMessages;
          });
        }
      );
      setIsTyping(false); // 응답 완료
    } catch (error) {
      console.error("Error during ChatGPT response:", error);
      setIsTyping(false); // 오류 발생 시에도 입력 가능 상태로 복구
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("darkMode", newMode);
      document.body.classList.toggle("dark-mode", newMode);
      return newMode;
    });
  };

  return (
    <div className="chat-container">
      <h1>ChatGPT Clone</h1>
      {/* 다크 모드 및 초기화 버튼 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <DarkModeToggle
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
        />
        <button
          onClick={clearMessages}
          style={{ padding: "5px 10px", cursor: "pointer" }}
        >
          Clear Chat
        </button>
      </div>
      {/* 모델 선택 및 채팅 UI */}
      <ModelSelector
        selectedModel={selectedModel}
        onModelChange={setSelectedModel}
      />
      <ChatBox messages={messages} isTyping={isTyping} />
      <ChatInput onSend={handleSendMessage} isTyping={isTyping} />
    </div>
  );
};

export default ChatPage;
