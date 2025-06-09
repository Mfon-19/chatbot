"use client";

import { Button } from "@/components/ui/button";
import { Square } from "lucide-react";
import { motion } from "framer-motion";

interface StopButtonProps {
  stop: () => void;
}

export default function StopButton({ stop }: StopButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
      <Button
        className="btn-glass h-10 w-10 p-0 text-white hover:bg-red-500/20 hover:text-red-300 transition-all duration-200"
        onClick={() => stop()}>
        <Square size={16} />
      </Button>
    </motion.div>
  );
}
