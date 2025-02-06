"use client";

import * as React from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { SidebarHistory } from "./sidebar-history";
import { useSession } from "next-auth/react";
import { User } from "@/lib/types";

export function ChatbotSidebar() {
  const router = useRouter();

  const { data: session } = useSession();

  const user = session?.user;

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
      <SidebarContent>
        <SidebarHistory user={user as User} />
      </SidebarContent>
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
