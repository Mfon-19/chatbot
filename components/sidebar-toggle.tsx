import { useSidebar } from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PanelLeft } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

export function SidebarToggle() {
  const { toggleSidebar } = useSidebar();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={toggleSidebar}
            variant="ghost"
            size="sm"
            className="glass hover:glass-strong h-10 w-10 p-0 text-white border-white/20 hover:border-white/30 transition-all duration-200">
            <PanelLeft size={18} />
          </Button>
        </motion.div>
      </TooltipTrigger>
      <TooltipContent
        align="start"
        className="glass border-white/20 backdrop-blur-md text-white">
        Toggle Sidebar
      </TooltipContent>
    </Tooltip>
  );
}
