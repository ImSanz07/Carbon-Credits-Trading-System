"use client";

import React, { useState } from "react";
import axios from "axios";
import { X, Send } from "lucide-react";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [input, setInput] = useState("");

  // Send Message to Dialogflow
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    setInput("");

    // try {
    //   const response = await axios.post("/api/dialogflow", { query: input });
    //   const botMessage = {
    //     sender: "bot",
    //     text: response.data.response || "Sorry, I didn't get that.",
    //   };
    //   setMessages((prev) => [...prev, botMessage]);
    // } catch (error) {
    //   console.error("Error sending message:", error);
    // }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-8 w-80 h-96 bg-white rounded-lg shadow-lg z-50 flex flex-col">
          <div className="w-80 h-96 bg-white rounded-lg shadow-lg flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-bold text-green-800">Chatbot</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-green-100 text-right"
                      : "bg-gray-100 text-left"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="w-full px-3 py-2 border rounded-md focus:outline-none"
              />
              <button onClick={sendMessage} className="ml-2 text-green-600">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
