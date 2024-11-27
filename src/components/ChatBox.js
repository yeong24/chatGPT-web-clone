import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const ChatBox = ({ messages, isTyping }) => {
  const chatBoxRef = useRef(null);

  // 메시지 추가 시 스크롤 자동 이동
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const renderMessage = (content, role) => {
    return (
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            return !inline && match ? (
              <SyntaxHighlighter
                children={String(children).replace(/\n$/, "")}
                style={oneDark}
                language={match[1]}
                PreTag="div"
                {...props}
              />
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      />
    );
  };

  return (
    <div
      className="chat-box"
      ref={chatBoxRef}
      style={{
        height: "100vh",
        overflowY: "auto",
        border: "1px solid #ddd",
        padding: "10px",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
      }}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`chat-message ${msg.role}`}
          style={{
            display: "flex",
            justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            marginBottom: "10px",
          }}
        >
          <div
            style={{
              maxWidth: "90%",
              backgroundColor: msg.role === "user" ? "#d1e7dd" : "#e9ecef",
              color: "#333",
              padding: "10px",
              borderRadius: "10px",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            {renderMessage(msg.content, msg.role)}
          </div>
        </div>
      ))}
      {isTyping && (
        <p
          className="typing-indicator"
          style={{
            fontStyle: "italic",
            color: "#888",
            marginTop: "10px",
          }}
        >
          ChatGPT is typing...
        </p>
      )}
    </div>
  );
};

export default ChatBox;
