"use client";

import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useEffect } from "react";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { createUser } from "@/lib/utils";

export default function Header() {
  const { data: session, status } = useSession();

  useEffect(() => {
    let isLatestRequest = true;
    if (status === "authenticated" && session.user?.email) {
      createUser(session.user?.email, session.user?.name ?? "").catch((error) => {
        if (!isLatestRequest) console.error(`Error creating user: ${error}`);
      });
    }

    return () => {
      isLatestRequest = false;
    };
  }, [status, session?.user?.email, session?.user?.name]);

  return (
    <header className="flex sticky top-0 bg-background py-1.5 items-center px-2 md:px-2 gap-2 justify-between">
      <SidebarToggle />
      <div className="ml-auto">
        {session ? (
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Image src={session?.user?.image || "/placeholder.svg"} alt={session?.user?.name || "User Profile"} fill className="rounded-full object-cover" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm font-medium">{session?.user?.name}</span>
          </div>
        ) : (
          <div className="space-x-2">
            <Button variant="ghost" onClick={() => signIn("google")}>
              <User className="mr-2 h-4 w-4" />
              Login
            </Button>
            <Button onClick={() => signIn("google")}>Sign up</Button>
          </div>
        )}
      </div>
    </header>
  );
}
