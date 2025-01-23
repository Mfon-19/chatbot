"use client";

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import fetchModelResponse from "@/app/lib/data";
import { Bot, User } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Message } from "@/app/types";

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isInitialView, setIsInitialView] = useState(true);
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setCurrentFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage: Message = {
        text: input,
        isUser: true,
        file: currentFile || undefined,
      };

      setMessages([...messages, newMessage]);
      setInput("");
      setCurrentFile(null);
      setIsInitialView(false);

      // model response
      fetchModelResponse(newMessage)
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
              <div className={`max-w-xs lg:max-w-md ${message.isUser ? "bg-blue-500 text-white rounded-lg p-2" : "bg-gray-100 text-gray-800 rounded-lg p-2"}`}>
                <div dangerouslySetInnerHTML={{ __html: message.text }}></div>
                {message.file && <div className="mt-2 text-sm">📎 Attached: {message.file.name}</div>}
              </div>
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
            <div className="flex flex-col space-y-2">
              <Button type="submit">Send</Button>
              <div {...getRootProps({ className: "dropzone" })}>
                <input {...getInputProps()} />
                <Button type="button" onClick={open} variant={currentFile ? "secondary" : "default"}>
                  {currentFile ? "✓ File added" : "Add file"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
