"use client";

import * as React from "react";
import { Plus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { SidebarHistory } from "./sidebar-history";
import { useSession } from "next-auth/react";
import { User } from "@/lib/types";
import { motion } from "framer-motion";

export function ChatbotSidebar() {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <Sidebar className="group-data-[side=left]:border-r-0 bg-black/40 backdrop-blur-md border-r border-white/10">
      <SidebarHeader className="p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            <MessageSquare size={18} className="text-white" />
          </div>
          <h2 className="font-semibold text-white">Conversations</h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}>
          <Button
            className="w-full justify-start glass hover:glass-strong text-white border-white/20 hover:border-white/30 transition-all duration-200"
            onClick={() => {
              router.push("/");
              router.refresh();
            }}>
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="p-4 pt-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}>
          <SidebarHistory user={user as User} />
        </motion.div>
      </SidebarContent>
    </Sidebar>
  );
}
