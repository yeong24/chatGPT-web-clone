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
    <div className="chat-box" ref={chatBoxRef}>
      {messages.map((msg, index) => (
        <div key={index} className={`chat-message ${msg.role}`}>
          <div>{renderMessage(msg.content, msg.role)}</div>
        </div>
      ))}
      {isTyping && <p className="typing-indicator">ChatGPT is typing...</p>}
    </div>
  );
};

export default ChatBox;
