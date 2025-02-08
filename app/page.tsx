import Chat from "@/components/chat";
import { v4 as uuid } from "uuid";

export default function Home() {
  return <Chat id={uuid()} initialMessages={[]} />;
}
