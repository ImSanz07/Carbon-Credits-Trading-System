"use client";

import React, { useState } from "react";
import { LeafyGreenIcon, X } from "lucide-react";


const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle Chat Window
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* White Circle Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-8 right-8 w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
      >
        <LeafyGreenIcon className="h-7 w-7 text-green-800"></LeafyGreenIcon>{" "}
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

            <div className="flex-1 overflow-y-auto p-4">
              <p className="text-sm text-gray-600">
                👋 Hi! How can I help you today?
              </p>
              {/* Add more chat logic here */}
            </div>

            <div className="p-4 border-t">
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Chatbot;
