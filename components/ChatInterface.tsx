"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import fetchModelResponse from "@/app/lib/data";
import { Bot, User } from "lucide-react";

interface Message {
  text: string;
  isUser: boolean;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isInitialView, setIsInitialView] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, isUser: true }]);
      setInput("");
      setIsInitialView(false);

      // model response

      fetchModelResponse(input)
        .then((modelResponse) => {
          setMessages((prev) => [
            ...prev,
            {
              text: modelResponse ?? "An unexpected error occured",
              isUser: false,
            },
          ]);
        })
        .catch((error) => console.error(`An error occured: ${error}`));
    }
  };

  return (
    <div className="flex flex-col h-full">
      {isInitialView ? (
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-4">What can I help you with?</h1>
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message here..." className="mb-2" />
            <Button type="submit" className="w-full">
              Send
            </Button>
          </form>
        </div>
      ) : (
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start space-x-2 ${message.isUser ? "justify-end" : "justify-start"}`}>
              {!message.isUser && (
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <Bot size={20} />
                </div>
              )}
              <div className={`max-w-xs lg:max-w-md ${message.isUser ? "bg-blue-500 text-white rounded-lg p-2" : "bg-gray-100 text-gray-800 rounded-lg p-2"}`} dangerouslySetInnerHTML={{ __html: message.text }}></div>
              {message.isUser && (
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {!isInitialView && (
        <div className="p-4">
          <form onSubmit={handleSubmit} className="flex space-x-2">
            <Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message here..." className="flex-grow" />
            <Button type="submit">Send</Button>
          </form>
        </div>
      )}
    </div>
  );
}
