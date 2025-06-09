import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ChatbotSidebar } from "@/components/chatbot-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Assistant - Your Intelligent Companion",
  description:
    "Experience the future of AI conversation with our intelligent assistant. Get instant, contextual responses for creativity, productivity, and learning.",
  keywords: [
    "AI",
    "Assistant",
    "Chatbot",
    "Artificial Intelligence",
    "Conversation",
  ],
  authors: [{ name: "AI Assistant Team" }],
  creator: "AI Assistant",
  metadataBase: new URL("https://ai-assistant-app.vercel.app"),
  openGraph: {
    title: "AI Assistant - Your Intelligent Companion",
    description:
      "Experience the future of AI conversation with our intelligent assistant.",
    type: "website",
    siteName: "AI Assistant",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Assistant - Your Intelligent Companion",
    description:
      "Experience the future of AI conversation with our intelligent assistant.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased overflow-hidden`}>
        <SessionProvider>
          <SidebarProvider defaultOpen={false}>
            <ChatbotSidebar />
            <SidebarInset className="overflow-hidden">
              {children}
              <Toaster
                position="top-right"
                toastOptions={{
                  style: {
                    background: "rgba(0, 0, 0, 0.8)",
                    backdropFilter: "blur(16px)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "white",
                  },
                }}
              />
            </SidebarInset>
          </SidebarProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
