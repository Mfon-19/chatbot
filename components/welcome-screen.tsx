"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  Zap,
  Shield,
  Globe,
  MessageCircle,
  Brain,
  Stars,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Brain,
    title: "Intelligent Responses",
    description: "Powered by advanced AI for contextual understanding",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get instant responses to your questions",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your conversations are protected and confidential",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Globe,
    title: "Multi-Language",
    description: "Communicate in your preferred language",
    color: "from-orange-500 to-red-500",
  },
];

const suggestions = [
  "Explain quantum computing in simple terms",
  "Write a creative story about space exploration",
  "Help me plan a productive daily routine",
  "What are the latest tech trends?",
  "Suggest a healthy meal plan",
  "How to improve my coding skills?",
];

interface WelcomeScreenProps {
  onSuggestionClick: (suggestion: string) => void;
}

export function WelcomeScreen({ onSuggestionClick }: WelcomeScreenProps) {
  const [currentSuggestion, setCurrentSuggestion] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion((prev) => (prev + 1) % suggestions.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12">
        <div className="relative inline-block">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-6 -right-6 text-purple-400">
            <Sparkles size={24} />
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-bold mb-6 gradient-text animate-glow">
            AI Assistant
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl">
          Your intelligent companion for creativity, productivity, and learning
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="glass rounded-2xl p-6 mb-8 max-w-md mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <MessageCircle className="text-purple-400" size={20} />
            <span className="text-white/70 text-sm font-medium">
              Try asking:
            </span>
          </div>
          <motion.p
            key={currentSuggestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="text-white font-medium cursor-pointer hover:text-purple-300 transition-colors"
            onClick={() => onSuggestionClick(suggestions[currentSuggestion])}>
            "{suggestions[currentSuggestion]}"
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.1, duration: 0.6 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="glass rounded-xl p-6 hover:glass-strong transition-all duration-300 cursor-pointer group">
            <div
              className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <feature.icon className="text-white" size={24} />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">
              {feature.title}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-12 text-center">
        <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
          <Stars size={16} />
          <span>Start a conversation below</span>
          <Rocket size={16} />
        </div>
      </motion.div>
    </div>
  );
}
