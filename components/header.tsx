"use client";

import { Button } from "@/components/ui/button";
import { LogOut, User, Sparkles } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useEffect } from "react";
import { SidebarToggle } from "@/components/sidebar-toggle";
import { createUser } from "@/lib/utils";
import { motion } from "framer-motion";

export default function Header() {
  const { data: session, status } = useSession();

  useEffect(() => {
    let isLatestRequest = true;
    if (status === "authenticated" && session.user?.email) {
      createUser(session.user?.email, session.user?.name ?? "").catch(
        (error) => {
          if (!isLatestRequest) console.error(`Error creating user: ${error}`);
        }
      );
    }

    return () => {
      isLatestRequest = false;
    };
  }, [status, session?.user?.email, session?.user?.name]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-black/20 border-b border-white/10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <SidebarToggle />

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="text-purple-400">
              <Sparkles size={20} />
            </motion.div>
            <h1 className="text-xl font-bold gradient-text hidden sm:block">
              AI Assistant
            </h1>
          </motion.div>
        </div>

        <div className="flex items-center gap-3">
          {session ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-2 glass rounded-full px-4 py-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm text-white/80">Online</span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative w-10 h-10 rounded-full glass p-0.5 hover:glass-strong transition-all duration-200">
                    <Image
                      src={session?.user?.image || "/placeholder.svg"}
                      alt={session?.user?.name || "User Profile"}
                      fill
                      className="rounded-full object-cover"
                    />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="glass border-white/20 backdrop-blur-md">
                  <div className="px-3 py-2 border-b border-white/10">
                    <p className="text-sm font-medium text-white">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs text-white/60">
                      {session?.user?.email}
                    </p>
                  </div>
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="text-white hover:bg-white/10 focus:bg-white/10">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3">
              <Button
                variant="ghost"
                onClick={() => signIn("google")}
                className="text-white hover:bg-white/10 hover:text-white border border-white/20">
                <User className="mr-2 h-4 w-4" />
                Sign in
              </Button>
              <Button onClick={() => signIn("google")} className="btn-gradient">
                Get Started
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}
