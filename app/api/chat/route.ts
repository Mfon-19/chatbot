import { convertToCoreMessages, streamText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { v4 as uuid } from "uuid";
import { getChatById, getUserIdByEmail, saveChat, saveMessages } from "@/lib/queries";
import { getMostRecentUserMessage } from "@/lib/utils";
import { generateTitleFromUserMessage } from "@/app/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const maxDuration = 30;
const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return new Response("Unauthorized", { status: 401 });

    const userId = await getUserIdByEmail({ email: session.user?.email || "" });

    const { id, messages } = await req.json();

    // const existingMessages = body.messages || [];
    // const userMessageContent = body.data.file ? `File attached: ${body.data.file}` : body.messages?.content || "";

    // const allMessages = [
    //   ...existingMessages,
    //   { role: "user", content: userMessageContent },
    // ];

    const coreMessages = convertToCoreMessages(messages);
    const userMessage = getMostRecentUserMessage(coreMessages);

    if (!userMessage) {
      return new Response("No user message found", { status: 400 });
    }

    const chat = await getChatById({ id });

    if (!chat) {
      const title = await generateTitleFromUserMessage({ message: userMessage });
      await saveChat({ id, userId, title });
    }

    await saveMessages({ id: uuid(), chatId: id, content: userMessage.content.toString(), role: userMessage.role });

    const result = streamText({
      model: google("gemini-1.5-flash"),
      system: "You are a helpful assistant.",
      messages: coreMessages,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("Error", error);
    return new Response("Invalid request data", { status: 400 });
  }
}
