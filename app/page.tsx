import Chat from "@/components/Chat";
import { v4 as uuid } from "uuid";

export default function Home() {
  return <Chat id={uuid()} />;
}
