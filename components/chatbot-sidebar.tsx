"use client";

import * as React from "react";
import { MessageSquare, Plus, } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { DefaultSession,  } from "next-auth";

// TODO: create an api endpoint to fetch recent chats
const recentConversations = [
  { id: 1, title: "Weather Inquiry", date: "2025-02-04" },
  { id: 2, title: "Product Recommendation", date: "2025-02-03" },
  { id: 3, title: "Technical Support", date: "2025-02-02" },
  { id: 4, title: "Booking Assistance", date: "2025-02-01" },
];

export function ChatbotSidebar({ user }: { user: DefaultSession }) {
  const router = useRouter();

  return (
      <Sidebar className="group-data-[side=left]:border-r-0">
        <SidebarHeader>
          {/* <SidebarGroup className="py-2">
            <SidebarGroupContent>
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Label htmlFor="search" className="sr-only">
                    Search conversations
                  </Label>
                  <Input id="search" placeholder="Search conversations" className="pl-8" />
                </div>
              </form>
            </SidebarGroupContent>
          </SidebarGroup> */}
        </SidebarHeader>
        {user ? (
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Recent Conversations</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {recentConversations.map((conversation) => (
                    <SidebarMenuItem key={conversation.id}>
                      <SidebarMenuButton asChild>
                        <a href={`#conversation-${conversation.id}`}>
                          <MessageSquare className="h-4 w-4" />
                          <span>{conversation.title}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        ) : (
          <SidebarGroup>
            <SidebarGroupContent>
              <div className="p-4 text-center">
                <p className="text-muted-foreground mb-4">Please log in to see your conversation history.</p>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
        <div className="mt-auto p-4">
          <Button
            className="w-full justify-start"
            onClick={() => {
              router.push("/");
              router.refresh();
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            New Conversation
          </Button>
        </div>
      </Sidebar>
  );
}
