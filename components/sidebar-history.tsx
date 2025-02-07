import useSWR from "swr";
import { SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { MessageSquare, TrashIcon } from "lucide-react";
import { fetcher } from "@/lib/utils";
import { Chat, User } from "@/lib/types";
import Link from "next/link";
import { toast } from "sonner";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SidebarHistory({ user }: { user: User }) {
  const { data: history, mutate, isLoading } = useSWR<Array<Chat>>(user ? "/api/history" : null, fetcher, { fallbackData: [] });
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
      loading: "Loading...",
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
          <div className="px-2 text-zinc-500 w-full flex flex-row justify-center items-center text-sm gap-2">Login to save and revisit previous chats!</div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  if (isLoading) {
    return (
      <SidebarGroup>
        <div className="px-2 py-1 text-xs text-sidebar-foreground/50">Today</div>
        <SidebarGroupContent>
          <div className="flex flex-col">
            {[44, 32, 28, 64, 52].map((item) => (
              <div key={item} className="rounded-md h-8 flex gap-2 px-2 items-center">
                <div
                  className="h-4 rounded-md flex-1 max-w-[--skeleton-width] bg-sidebar-accent-foreground/10"
                  style={
                    {
                      "--skeleton-width": `${item}%`,
                    } as React.CSSProperties
                  }
                />
              </div>
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
          <div className="px-2 text-zinc-500 w-full flex flex-row justify-center items-center text-sm gap-2">Your conversations will appear here once you start chatting!</div>
        </SidebarGroupContent>
      </SidebarGroup>
    );
  }

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Recent Conversations</SidebarGroupLabel>
        <SidebarContent>
          <SidebarMenu>
            {history &&
              history.map((conversation) => (
                <SidebarMenuItem key={conversation.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/chat/${conversation.id}`} className="flex items-center gap-2 group hover:bg-accent/50 w-full">
                      <MessageSquare className="h-4 w-4 shrink-0" />
                      <span className="flex-1 truncate">{conversation.title}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleDelete(conversation.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-background rounded-md"
                      >
                        <TrashIcon className="h-4 w-4 text-destructive/50 hover:text-destructive transition-colors hover:drop-shadow-[0_0_4px_rgba(239,68,68,0.5)]" />
                      </button>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </SidebarContent>
      </SidebarGroup>
    </>
  );
}
