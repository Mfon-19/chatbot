import { auth } from "@/auth";
import { getChatsByUserId, getUserIdByEmail } from "@/lib/queries";

export async function GET() {
  const session = await auth();

  if (!session || !session.user) {
    return Response.json("Unauthorized", { status: 401 });
  }

  const id = await getUserIdByEmail({ email: session.user.email! });

  const chats = await getChatsByUserId({ id });
  return Response.json(chats);
}
