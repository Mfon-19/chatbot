"use client";

import { Textarea } from "@/components/ui/textarea";
import { Bot, User } from "lucide-react";
import { useCallback } from "react";
import { Message, useChat } from "ai/react";
import { Markdown } from "./markdown";
import Header from "./header";
import StopButton from "./stop-button";
import SendButton from "./send-button";

export default function Chat({ id, initialMessages }: { id: string; initialMessages: Message[] }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({ id, body: { id }, initialMessages });

  const submitForm = useCallback(() => {
    window.history.replaceState({}, "", `/chat/${id}`);
    handleSubmit(undefined);
  }, [handleSubmit, id]);

  return (
    <div className="flex flex-col min-w-0 h-dvh bg-background pl-5">
      <Header />
      <div className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll py-4">
        {messages.length === 0 && <h1 className="text-3xl font-bold mb-4 text-center">What can I help you with?</h1>}
        {messages.map((message, index) => (
          <div key={index} className={`flex items-start space-x-2 ${message.role === "user" ? "justify-end pr-5" : "justify-start"}`}>
            {message.role !== "user" && (
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <Bot size={20} />
              </div>
            )}
            <div className={`max-w-xs lg:max-w-md ${message.role === "user" ? "bg-blue-500 text-white rounded-lg p-2" : "bg-gray-100 text-gray-800 rounded-lg p-2"}`}>
              <Markdown>{message.content}</Markdown>
            </div>
            {message.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start space-x-2 justify-start">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div className="bg-gray-100 text-gray-800 rounded-lg p-2 max-w-xs lg:max-w-md">Thinking...</div>
          </div>
        )}
      </div>
      <div className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
        <form onSubmit={submitForm} className="relative w-full flex flex-col gap-4">
          <Textarea name="prompt" value={input} onChange={handleInputChange} placeholder="Type your message here..." className="flex-grow" />
          <div className="absolute bottom-0 right-0 p-2 w-fit flex flex-row justify-end">{isLoading ? <StopButton stop={stop} /> : <SendButton input={input} submitForm={submitForm} />}</div>
        </form>
      </div>
    </div>
  );
}
