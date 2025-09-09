"use client";

import { useState, useEffect } from "react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const [isClient, setIsClient] = useState(false);
  const isBot = message.sender === "bot";

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Format timestamp consistently for both server and client
  const formatTime = (date: Date) => {
    if (!isClient) {
      // Return a simple format during SSR to avoid hydration mismatch
      return "...";
    }
    
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, '0');
    
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  return (
    <div className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3 sm:mb-4`}>
      <div
        className={`max-w-[85%] sm:max-w-lg px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl transition-all duration-200 ${
          isBot
            ? "message-bot"
            : "message-user"
        }`}
      >
        {isBot && (
          <div className="flex items-center mb-2 sm:mb-3">
            <div className="relative mr-2 sm:mr-3">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shadow-sm">
                M
              </div>
              <div className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-3 sm:w-4 h-3 sm:h-4 bg-green-500 rounded-full border border-white"></div>
            </div>
            <div>
              <span className="text-xs sm:text-sm font-bold text-gray-900">MSME-Mitra</span>
              <div className="text-xs text-gray-500 font-medium">AI Compliance Assistant</div>
            </div>
          </div>
        )}
        
        <div className={`text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium ${
          isBot ? "text-gray-800" : "text-white"
        }`}>
          {message.content}
        </div>
        
        <div className={`text-xs mt-2 sm:mt-3 flex items-center ${
          isBot ? "text-gray-500" : "text-blue-100"
        }`}>
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
          </svg>
          {formatTime(message.timestamp)}
          {isBot && (
            <span className="ml-2 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
              Live
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
