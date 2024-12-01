import React, { useState } from "react";

const ChatInput = ({ onSend, isTyping }) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSend(input);
      setInput(""); // 메시지 전송 후 입력 필드 초기화
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey && !isTyping) {
      e.preventDefault(); // 기본 Enter 동작 방지
      handleSend(); // 메시지 전송
    }
  };

  const handleInput = (e) => {
    const textarea = e.target;

    // 입력 필드 높이 자동 조정
    textarea.style.height = "auto"; // 초기화
    const maxHeight = 200; // 최대 높이 (200px)
    if (textarea.scrollHeight > maxHeight) {
      textarea.style.height = `${maxHeight}px`;
      textarea.style.overflowY = "scroll"; // 스크롤 활성화
    } else {
      textarea.style.height = `${textarea.scrollHeight}px`;
      textarea.style.overflowY = "hidden"; // 스크롤 비활성화
    }
  };

  return (
    <div className="chat-input">
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown} // Enter와 Shift+Enter 처리
        onInput={handleInput} // 입력 필드 높이 자동 조정
        placeholder={
          isTyping
            ? "ChatGPT is typing..."
            : "Type your message... (Shift+Enter for newline)"
        }
        rows="3"
        disabled={isTyping} // ChatGPT 응답 중일 때 비활성화
        style={{
          backgroundColor: isTyping ? "#f5f5f5" : "white", // 비활성화 시 색상 변경
          cursor: isTyping ? "not-allowed" : "text", // 비활성화 시 커서 변경
        }}
      />
      <button
        onClick={handleSend}
        disabled={isTyping} // ChatGPT 응답 중일 때 비활성화
        style={{
          backgroundColor: isTyping ? "#ccc" : "#0078d4", // 비활성화 시 버튼 색상 변경
          color: isTyping ? "#666" : "white",
          cursor: isTyping ? "not-allowed" : "pointer", // 비활성화 시 커서 변경
        }}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
