"use client";

import React, { useState } from "react";
import { LeafyGreenIcon, X } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

interface Messages {
  text: string;
  role: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Messages[]>([
    { text: "Hi, I am AgriBot", role: "model" },
    { text: "How may I help you?", role: "model" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);


  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const updatedMessages = [...messages, { text: input, role: "user" }];
    setMessages(updatedMessages);
    setInput("");
    setIsTyping(true);

    try {
      setIsThinking(true);
      const res = await axios.post("/api/gemini", {
        history: updatedMessages,
      });

      const fullText = res.data.message;
      setIsThinking(false);
      streamResponseWordByWord(fullText, updatedMessages);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages([
        ...updatedMessages,
        { text: "Error: Unable to contact Gemini API.", role: "model" },
      ]);
      setIsTyping(false);
      setIsThinking(false);
    }
  };

  const streamResponseWordByWord = (text: string, history: Messages[]) => {
    const words = text.split(" ");
    let i = 0;
    let currentText = "";

    const interval = setInterval(() => {
      if (i < words.length) {
        currentText += words[i] + " ";
        const updated = [
          ...history,
          { text: currentText.trim(), role: "model" },
        ];
        setMessages(updated);
        i++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 40); // typing speed in ms
  };

  return (
    <>
      {/* Circle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <LeafyGreenIcon className="h-7 w-7 text-green-800" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-40"
            onClick={toggleChat}
          ></div>

          {/* Chat Window */}
          <div className="fixed bottom-20 right-8 w-[450px] h-[600px] bg-white rounded-lg shadow-2xl z-50 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold text-green-800">AgriBot</h3>
              <button
                onClick={toggleChat}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Messages */}
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "model" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg max-w-xs mb-2 overflow-x-auto ${
                      message.role === "model"
                        ? "bg-green-500 text-white"
                        : "bg-green-200 text-black"
                    }`}
                    style={{ wordBreak: "break-word", overflowX: "auto" }}
                  >
                    <ReactMarkdown
                      components={{
                        table: ({ node, ...props }) => (
                          <div className="overflow-auto">
                            <table
                              className="table-auto border border-collapse border-white w-full text-sm"
                              {...props}
                            />
                          </div>
                        ),
                        th: ({ node, ...props }) => (
                          <th
                            className="border border-white px-2 py-1 text-left font-bold"
                            {...props}
                          />
                        ),
                        td: ({ node, ...props }) => (
                          <td
                            className="border border-white px-2 py-1"
                            {...props}
                          />
                        ),
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}

              {/* Typing animation */}
              {isThinking && (
                <div className="flex justify-start">
                  <div className="p-2 rounded-lg max-w-xs mb-2 bg-green-500 text-white flex items-center gap-2">
                    <span>AgriBot is Thinking</span>
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:.1s]" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:.2s]" />
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:.3s]" />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSend();
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Chatbot;
