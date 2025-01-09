import ChatInterface from "@/components/ChatInterface";
import Header from "@/components/Header";


export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-16 justify-center items-center">
        <ChatInterface />
      </main>
    </div>
  )
}
