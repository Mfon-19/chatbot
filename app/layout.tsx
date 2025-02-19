import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatbotSidebar } from "@/components/chatbot-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chatbot",
  description: "Chat with an AI!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          <>
            <SidebarProvider defaultOpen={false}>
              <ChatbotSidebar />
              <SidebarInset>
                {children}
                <Toaster position="top-right" />
              </SidebarInset>
              {/* <div className="flex-1 min-w-0 flex flex-col">
                {children}
                <Toaster position="top-right" />
              </div> */}
            </SidebarProvider>
          </>
        </SessionProvider>
      </body>
    </html>
  );
}
