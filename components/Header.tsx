"use client";

import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useEffect } from "react";

export default function Header() {
  const { data: session, status } = useSession();

  useEffect(() => {
    const createUser = async () => {
      console.log(`Email: ${session?.user?.email}, Name: ${session?.user?.name}`)
      if (session?.user) {
        try {
          const response = await fetch("/api/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: session?.user?.email, name: session?.user?.name }),
          });

          if (!response.ok) {
            // Server responded with an error status
            const errorData = await response.text();
            console.error(`Error creating user: ${response.status} - ${response.statusText}`, errorData);
            return;
          }
        } catch (error) {
          console.error(`Error creating user: ${error}`);
        }
      }
    };

    if (status === "authenticated") {
      createUser();
    }
  }, [status, session]);

  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 bg-white shadow-sm">
      <div className="flex items-center space-x-2">
        <span className="font-semibold text-xl">ChatBot</span>
      </div>
      <div>
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
