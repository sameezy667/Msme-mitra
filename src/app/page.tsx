"use client";

import { useState, useRef, useEffect } from "react";
import ChatMessage from "@/components/ChatMessage";
import TeamSidebar from "@/components/TeamSidebar";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileTeam, setShowMobileTeam] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages after hydration to avoid timestamp mismatch
  useEffect(() => {
    setIsClient(true);
    setMessages([
      {
        id: "1",
        content: "नमस्ते! MSME-Mitra here – Ask me anything about GST, exports, or business compliance. I can understand both English and Hindi!",
        sender: "bot",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with message:", inputMessage);
    
    if (!inputMessage.trim() || isLoading) {
      console.log("Message empty or loading, returning");
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };

    console.log("Adding user message:", userMessage);
    setMessages((prev) => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage("");
    setIsLoading(true);

    try {
      console.log("Sending request to /api/chat");
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: currentMessage }),
      });

      console.log("Response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || "I received your message but couldn't generate a response.",
        sender: "bot",
        timestamp: new Date(),
      };

      console.log("Adding bot message:", botMessage);
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, I encountered an error. Please try again. Check the console for details.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen max-w-screen-2xl mx-auto">
        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Clean Header */}
          <header className="bg-white border-b border-gray-200 p-4 sm:p-6 shadow-sm">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3 text-gray-900">
                MSME-Mitra
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-700 mb-1 sm:mb-2">
                Your AI Compliance Assistant
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-gray-600 font-medium">
                Ask GST or compliance questions in English, Hindi, or both! 
                <span className="inline-block ml-1 sm:ml-2 px-2 sm:px-3 py-1 bg-orange-500 text-white rounded-full text-xs sm:text-sm font-semibold">
                  🇮🇳 Bilingual Support
                </span>
              </p>
            </div>
          </header>

          {/* Clean Chat Messages Panel */}
          <div className="flex-1 overflow-y-auto p-2 sm:p-4 lg:p-6 pt-2 sm:pt-4 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <div className="pro-card rounded-lg sm:rounded-xl p-3 sm:p-6 min-h-[50vh] sm:min-h-[60vh]">
                <div className="space-y-4 sm:space-y-6">
                  {messages.map((message, index) => (
                    <div key={message.id} className="message-enter" style={{animationDelay: `${index * 0.1}s`}}>
                      <ChatMessage message={message} />
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start message-enter">
                      <div className="pro-card rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm max-w-xs border border-gray-200">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <div className="relative">
                            <div className="w-6 sm:w-8 h-6 sm:h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xs sm:text-sm">
                              M
                            </div>
                            <div className="absolute -top-1 -right-1 w-3 sm:w-4 h-3 sm:h-4 bg-green-500 rounded-full"></div>
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 loading-dot rounded-full"></div>
                            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 loading-dot rounded-full"></div>
                            <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 loading-dot rounded-full"></div>
                          </div>
                          <span className="text-gray-700 font-medium text-sm sm:text-base">MSME-Mitra is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
            </div>
          </div>

          {/* Clean Input Form */}
          <div className="p-2 sm:p-4 lg:p-6 pt-0 bg-gray-50">
            <div className="max-w-4xl mx-auto">
              <div className="pro-card rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-gray-200">
                <form onSubmit={handleSendMessage} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Type your GST or compliance question here... (आप हिंदी में भी पूछ सकते हैं)"
                      className="input-primary w-full rounded-lg sm:rounded-xl px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-medium"
                      disabled={isLoading}
                    />
                    <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs sm:text-sm font-medium">
                      EN | हिं
                    </div>
                  </div>
                  <button
                    type="submit"
                    onClick={() => console.log("Send button clicked!", { inputMessage, isLoading })}
                    disabled={!inputMessage.trim() || isLoading}
                    className="btn-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base lg:text-lg"
                  >
                    {isLoading ? "Sending..." : "Send"}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Clean Footer */}
          <footer className="bg-white border-t border-gray-200 text-center py-3 sm:py-4 text-gray-600">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-6 px-4">
              <p className="text-xs sm:text-sm font-medium">
                Built with ❤️ for LUB Ideathon 2025
              </p>
              <p className="text-xs opacity-80">
                © 2025 MSME-Mitra. Empowering Indian MSMEs.
              </p>
            </div>
          </footer>
        </div>

        {/* Clean Team Sidebar - Hidden on mobile */}
        <div className="hidden lg:block">
          <TeamSidebar />
        </div>
      </div>

      {/* Mobile Team Info Floating Button */}
      <button 
        onClick={() => setShowMobileTeam(true)}
        className="lg:hidden fixed bottom-20 right-4 w-14 h-14 btn-primary rounded-full shadow-lg flex items-center justify-center text-white font-bold text-xl z-20"
      >
        👥
      </button>

      {/* Mobile Team Info Modal */}
      {showMobileTeam && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-30 flex items-end">
          <div className="w-full pro-card-dark rounded-t-3xl p-6 transform transition-transform duration-300 translate-y-0">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Team Info</h2>
              <button 
                onClick={() => setShowMobileTeam(false)}
                className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-white hover:bg-gray-500 transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <div className="text-sm text-gray-300 space-y-2">
                <p><span className="text-orange-500">•</span> Built by: Sameer, Sanidhya, Dhruv, Ishan, Shresth</p>
                <p><span className="text-orange-500">•</span> GST compliance guidance</p>
                <p><span className="text-orange-500">•</span> Export documentation help</p>
                <p><span className="text-orange-500">•</span> Bilingual support (Hindi/English)</p>
              </div>
              <button className="w-full btn-primary py-3 rounded-xl font-semibold">
                Learn More About Premium →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}