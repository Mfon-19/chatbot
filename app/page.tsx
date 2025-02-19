import { auth } from "@/auth";
import Chat from "@/components/chat";
import { v4 as uuid } from "uuid";

export default async function Home() {
  const session = await auth();
  const id = session === null ? "" : uuid();
  return <Chat id={id} initialMessages={[]} isAuthenticated={session ? true : false}/>;
}
