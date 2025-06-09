"use client";

import { Textarea } from "@/components/ui/textarea";
import { Bot, User, Send, Loader2 } from "lucide-react";
import { useCallback, useRef, useEffect } from "react";
import { useChat } from "ai/react";
import Header from "./header";
import StopButton from "./stop-button";
import SendButton from "./send-button";
import { ChatProps } from "@/lib/types";
import { Markdown } from "./markdown";
import { motion, AnimatePresence } from "framer-motion";
import { WelcomeScreen } from "./welcome-screen";
import { AnimatedBackground } from "./animated-background";

export default function Chat({
  id,
  initialMessages,
  isAuthenticated,
}: ChatProps) {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    setInput,
  } = useChat({
    id,
    body: { id },
    initialMessages,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const submitForm = useCallback(
    (e?: React.FormEvent) => {
      if (e) e.preventDefault();
      if (!input.trim()) return;

      if (isAuthenticated) window.history.replaceState({}, "", `/chat/${id}`);
      handleSubmit(e);
    },
    [handleSubmit, id, isAuthenticated, input]
  );

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    setTimeout(() => {
      const form = document.querySelector("form");
      if (form) {
        form.requestSubmit();
      }
    }, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitForm();
    }
  };

  return (
    <div className="flex flex-col min-w-0 h-dvh relative">
      <AnimatedBackground />

      <Header />

      <div className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-auto py-6 px-4 relative z-10">
        {messages.length === 0 ? (
          <WelcomeScreen onSuggestionClick={handleSuggestionClick} />
        ) : (
          <div className="max-w-4xl mx-auto w-full space-y-6">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`flex items-start gap-4 ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}>
                  {message.role !== "user" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="w-10 h-10 rounded-full glass flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={20} className="text-purple-400" />
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, duration: 0.3 }}
                    className={`max-w-[80%] lg:max-w-[60%] rounded-2xl p-4 ${
                      message.role === "user"
                        ? "message-user ml-auto"
                        : "message-bot"
                    }`}>
                    <div className="prose prose-invert max-w-none">
                      <Markdown>{message.content}</Markdown>
                    </div>
                  </motion.div>

                  {message.role === "user" && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <User size={20} className="text-white" />
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-4 justify-start">
                <div className="w-10 h-10 rounded-full glass flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={20} className="text-purple-400" />
                </div>
                <div className="message-bot max-w-[80%] lg:max-w-[60%] rounded-2xl p-4">
                  <div className="flex items-center gap-2">
                    <Loader2
                      size={16}
                      className="animate-spin text-purple-400"
                    />
                    <span className="text-white/80">Thinking...</span>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="relative z-10 p-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={submitForm} className="relative">
            <div className="glass rounded-2xl p-4 shadow-2xl">
              <div className="flex items-end gap-3">
                <div className="flex-1 relative">
                  <Textarea
                    name="prompt"
                    value={input}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message here..."
                    className="min-h-[60px] max-h-32 resize-none bg-transparent border-none focus:ring-0 text-white placeholder-white/50 pr-12"
                    disabled={isLoading}
                  />
                </div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0">
                  {isLoading ? (
                    <StopButton stop={() => {}} />
                  ) : (
                    <button
                      type="submit"
                      disabled={!input.trim()}
                      className="w-12 h-12 rounded-xl btn-gradient flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                      <Send size={20} />
                    </button>
                  )}
                </motion.div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
