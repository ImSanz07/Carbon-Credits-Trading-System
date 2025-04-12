// components/ChatMessage.tsx
import React from "react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  return (
    <div className="prose prose-sm max-w-none">
      <ReactMarkdown>{message}</ReactMarkdown>
    </div>
  );
};

export default ChatMessage;
