import useSWR from "swr";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { MessageSquare, TrashIcon, Clock, LogIn } from "lucide-react";
import { fetcher } from "@/lib/utils";
import { Chat, User } from "@/lib/types";
import Link from "next/link";
import { toast } from "sonner";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function SidebarHistory({ user }: { user: User }) {
  const {
    data: history,
    mutate,
    isLoading,
  } = useSWR<Array<Chat>>(user ? "/api/history" : null, fetcher, {
    fallbackData: [],
  });
  const pathname = usePathname();

  useEffect(() => {
    mutate();
  }, [pathname, mutate]);

  const handleDelete = async (id: string) => {
    const deletePromise = fetch("/api/chat", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    toast.promise(deletePromise, {
      loading: "Deleting chat...",
      success: () => {
        mutate((history) => {
          if (history) return history.filter((chat) => chat.id !== id);
        });
        return "Chat deleted successfully";
      },
      error: "Failed to delete chat",
    });
  };

  if (!user) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-4 text-center">
            <LogIn className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <p className="text-white/70 text-sm leading-relaxed">
              Sign in to save and revisit your conversations!
            </p>
          </motion.div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  if (isLoading) {
    return (
      <SidebarGroup>
        <div className="flex items-center gap-2 px-2 py-3 mb-2">
          <Clock className="w-4 h-4 text-purple-400" />
          <span className="text-sm font-medium text-white/60">Recent</span>
        </div>
        <SidebarGroupContent>
          <div className="space-y-2">
            {[44, 32, 28, 64, 52].map((width, index) => (
              <motion.div
                key={width}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-lg h-12 flex items-center gap-3 px-3">
                <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20 animate-pulse" />
                <div
                  className="h-3 rounded-full bg-white/10 animate-pulse"
                  style={{ width: `${width}%` }}
                />
              </motion.div>
            ))}
          </div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  if (history?.length === 0) {
    return (
      <SidebarGroup>
        <SidebarGroupContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-xl p-4 text-center">
            <MessageSquare className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <p className="text-white/70 text-sm leading-relaxed">
              Your conversations will appear here once you start chatting!
            </p>
          </motion.div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <SidebarGroup>
      <div className="flex items-center gap-2 px-2 py-3 mb-2">
        <Clock className="w-4 h-4 text-purple-400" />
        <span className="text-sm font-medium text-white/60">
          Recent Conversations
        </span>
      </div>
      <SidebarContent>
        <SidebarMenu>
          <AnimatePresence>
            {history &&
              history.map((conversation, index) => (
                <motion.div
                  key={conversation.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.05 }}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <Link
                        href={`/chat/${conversation.id}`}
                        className="flex items-center gap-3 group hover:bg-white/10 w-full rounded-lg p-3 transition-all duration-200 hover:glass">
                        <div className="w-6 h-6 rounded-lg bg-gradient-to-r from-purple-500/40 to-blue-500/40 flex items-center justify-center flex-shrink-0">
                          <MessageSquare className="h-3 w-3 text-white" />
                        </div>
                        <span className="flex-1 truncate text-white/80 text-sm font-medium group-hover:text-white transition-colors">
                          {conversation.title}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            e.preventDefault();
                            handleDelete(conversation.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 transition-all duration-200 p-1.5 hover:bg-red-500/20 rounded-md">
                          <TrashIcon className="h-3 w-3 text-red-400 hover:text-red-300 transition-colors" />
                        </motion.button>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
          </AnimatePresence>
        </SidebarMenu>
      </SidebarContent>
    </SidebarGroup>
  );
}
