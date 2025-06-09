"use client";

import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface SendButtonProps {
  input: string;
  submitForm: () => void;
}

export default function SendButton({ input, submitForm }: SendButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        type="submit"
        size="sm"
        onClick={submitForm}
        disabled={!input.trim()}
        className="btn-gradient h-10 w-10 p-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
        <Send size={16} />
      </Button>
    </motion.div>
  );
}
