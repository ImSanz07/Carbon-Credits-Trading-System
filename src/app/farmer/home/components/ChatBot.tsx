"use client";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Leaf, Send, X, Minimize, Maximize, Loader2 } from "lucide-react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/useMobile";

interface Message {
  text: string;
  role: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hi, I am AgriBot 🌱", role: "model" },
    {
      text: "How can I help with your sustainable farming questions today?",
      role: "model",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const isMobile = useMobile();

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (isMinimized) setIsMinimized(false);
  };

  const toggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(!isMinimized);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    const updatedMessages = [...messages, { text: userMessage, role: "user" }];
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
        {
          text: "Sorry, I'm having trouble connecting to my knowledge base. Please try again in a moment.",
          role: "model",
        },
      ]);
      setIsTyping(false);
      setIsThinking(false);

      toast({
        title: "Connection Error",
        description:
          "Unable to reach the Gemini API. Please check your connection.",
        variant: "destructive",
      });
    }
  };

  const streamResponseWordByWord = (text: string, history: Message[]) => {
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
    }, 30); // slightly faster typing speed
  };

  const getTimeString = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={toggleChat}
        className={cn(
          "fixed z-50 flex items-center justify-center transition-all duration-300 shadow-lg",
          isOpen
            ? "bottom-[600px] right-8 opacity-0 pointer-events-none"
            : "bottom-8 right-8 opacity-100 w-14 h-14 bg-green-600 hover:bg-green-700 text-white rounded-full hover:scale-110",
          isMobile && "bottom-20 right-4 w-12 h-12"
        )}
      >
        <Leaf className="h-6 w-6" />
      </button>

      {isOpen && (
        <>
          {/* Backdrop for mobile */}
          {isMobile && (
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={toggleChat}
            />
          )}

          {/* Chat Window */}
          <div
            className={cn(
              "fixed z-50 bg-white rounded-lg shadow-2xl flex flex-col transition-all duration-300 border border-green-200",
              isMinimized
                ? "h-14 bottom-8 right-8 w-80"
                : "bottom-8 right-8 w-[400px] h-[600px]",
              isMobile &&
                !isMinimized &&
                "bottom-0 right-0 w-full h-[85vh] rounded-b-none",
              isMobile && isMinimized && "bottom-20 right-4 w-[calc(100%-2rem)]"
            )}
          >
            {/* Header */}
            <div
              className={cn(
                "flex justify-between items-center p-3 border-b border-green-100 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg",
                isMinimized && "rounded-b-lg"
              )}
            >
              <div className="flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                <h3 className="font-semibold">AgriBot</h3>
                {!isMinimized && (
                  <span className="text-xs bg-green-500/30 px-2 py-0.5 rounded-full">
                    Online
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={toggleMinimize}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  {isMinimized ? (
                    <Maximize className="h-4 w-4" />
                  ) : (
                    <Minimize className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={toggleChat}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-green-50/50">
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${
                        message.role === "model"
                          ? "justify-start"
                          : "justify-end"
                      }`}
                    >
                      <div
                        className={cn(
                          "p-3 rounded-lg max-w-[85%] group relative",
                          message.role === "model"
                            ? "bg-white text-gray-800 border border-green-100 shadow-sm rounded-tl-none"
                            : "bg-green-600 text-white rounded-tr-none"
                        )}
                      >
                        <ReactMarkdown
                          components={{
                            table: ({ node, ...props }) => (
                              <div className="overflow-auto my-2 border rounded">
                                <table
                                  className="table-auto border-collapse w-full text-sm"
                                  {...props}
                                />
                              </div>
                            ),
                            th: ({ node, ...props }) => (
                              <th
                                className="border px-2 py-1 text-left font-bold bg-green-50"
                                {...props}
                              />
                            ),
                            td: ({ node, ...props }) => (
                              <td className="border px-2 py-1" {...props} />
                            ),
                            code: ({ node, inline, ...props }) =>
                              inline ? (
                                <code
                                  className="bg-gray-100 px-1 py-0.5 rounded text-sm"
                                  {...props}
                                />
                              ) : (
                                <code
                                  className="block bg-gray-100 p-2 rounded text-sm my-2 overflow-x-auto"
                                  {...props}
                                />
                              ),
                            ul: ({ node, ...props }) => (
                              <ul
                                className="list-disc pl-5 space-y-1 my-2"
                                {...props}
                              />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol
                                className="list-decimal pl-5 space-y-1 my-2"
                                {...props}
                              />
                            ),
                            a: ({ node, ...props }) => (
                              <a
                                className="text-blue-600 underline"
                                {...props}
                              />
                            ),
                          }}
                        >
                          {message.text}
                        </ReactMarkdown>
                        <span className="text-[10px] opacity-60 mt-1 block text-right">
                          {getTimeString()}
                        </span>
                      </div>
                    </div>
                  ))}

                  {/* Thinking animation */}
                  {isThinking && (
                    <div className="flex justify-start">
                      <div className="p-3 rounded-lg bg-white text-gray-800 border border-green-100 shadow-sm rounded-tl-none flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-green-600" />
                        <span className="text-sm">Thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-3 border-t border-green-100 bg-white">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Ask about sustainable farming..."
                      className="flex-1 border border-green-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleSend();
                      }}
                      disabled={isThinking}
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!input.trim() || isThinking}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      {isThinking ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="text-[10px] text-gray-500">
                      Powered by Google Gemini • For agricultural assistance
                      only
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Chatbot;
