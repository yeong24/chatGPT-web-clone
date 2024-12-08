import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {
  Box,
  Text,
  VStack,
  Code,
  Heading,
  Link,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";

const ChatBox = ({ messages, isTyping }) => {
  const chatBoxRef = useRef(null);

  // 메시지 추가 시 스크롤 자동 이동
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const renderMessage = (content) => {
    return (
      <ReactMarkdown
        children={content}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: (props) => <Heading as="h1" size="xl" my={4} {...props} />,
          h2: (props) => <Heading as="h2" size="lg" my={4} {...props} />,
          h3: (props) => <Heading as="h3" size="md" my={4} {...props} />,
          p: (props) => <Text mb={2} {...props} />,
          a: (props) => <Link color="teal.500" {...props} />,
          li: (props) => <ListItem {...props} />,
          ul: (props) => <UnorderedList pl={4} {...props} />,
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
              <Code {...props}>{children}</Code>
            );
          },
        }}
      />
    );
  };

  return (
    <Box
      ref={chatBoxRef}
      overflowY="auto"
      height="100%"
      border="1px"
      borderColor="gray.200"
      p={4}
      borderRadius="md"
      bg="white"
    >
      <VStack spacing={4} align="stretch">
        {messages.map((msg, index) => (
          <Box
            key={index}
            bg={msg.role === "assistant" ? "green.100" : "gray.100"}
            p={3}
            borderRadius="md"
            alignSelf={msg.role === "assistant" ? "flex-start" : "flex-end"}
            maxWidth="90%"
          >
            {renderMessage(msg.content)}
          </Box>
        ))}
        {isTyping && (
          <Text fontStyle="italic" color="gray.500">
            ChatGPT is typing...
          </Text>
        )}
      </VStack>
    </Box>
  );
};

export default ChatBox;
