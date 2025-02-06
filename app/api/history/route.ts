import { getChatsByUserId, getUserIdByEmail } from "@/lib/queries";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession();

  if (!session || !session.user) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const id = await getUserIdByEmail({ email: session.user.email! });

  const chats = await getChatsByUserId({ id });
  return Response.json(chats);
}
