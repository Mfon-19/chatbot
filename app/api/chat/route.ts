import { convertToCoreMessages, CoreMessage, createDataStreamResponse, streamText, TextPart } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { v4 as uuid } from "uuid";
import { deleteChatByChatId, getChatById, getUserIdByEmail, saveChat, saveMessages } from "@/lib/queries";
import { getMostRecentUserMessage } from "@/lib/utils";
import { generateTitleFromUserMessage } from "@/app/actions";
import { auth } from "@/auth";

export const maxDuration = 30;
const google = createGoogleGenerativeAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { id, messages } = await req.json();

    const coreMessages = convertToCoreMessages(messages);
    const userMessage = getMostRecentUserMessage(coreMessages);

    if (!userMessage) {
      return new Response("No user message found", { status: 400 });
    }

    const session = await auth();

    if (!session) return streamUnauthenticatedResponse(coreMessages);

    const userId = await getUserIdByEmail({ email: session.user?.email || "" });

    const chat = await getChatById({ id });

    if (!chat) {
      const title = await generateTitleFromUserMessage({ message: userMessage });
      await saveChat({ id, userId, title });
    }

    await saveMessages({ id: uuid(), chatId: id, content: userMessage.content.toString(), role: userMessage.role });

    return createDataStreamResponse({
      execute: (dataStream) => {
        dataStream.writeData({
          type: "user-message-id",
          content: uuid(),
        });

        const result = streamText({
          model: google("gemini-1.5-flash"),
          system: "You are a helpful assistant.",
          messages: coreMessages,

          onFinish: async ({ response }) => {
            try {
              saveMessages({ id: uuid(), chatId: id, role: "assistant", content: (response.messages[0].content[0] as TextPart).text });
            } catch (error) {
              console.log(`Error occured: ${error}`);
            }
          },
        });

        result.mergeIntoDataStream(dataStream);
      },
      onError: (error) => `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
    });
  } catch (error) {
    console.error("Error", error);
    return new Response("Invalid request data", { status: 400 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) return new Response("Unauthorized", { status: 401 });

    const { id } = await req.json();

    await deleteChatByChatId({ id });

    return new Response("Deleted Successfully", { status: 200 });
  } catch (error) {
    console.error(`An error occured: ${error}`);
    return new Response("An error occured", { status: 500 });
  }
}

async function streamUnauthenticatedResponse(coreMessages: CoreMessage[]) {
  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: google("gemini-1.5-flash"),
        system: "You are a helpful assistant.",
        messages: coreMessages,
      });
      result.mergeIntoDataStream(dataStream);
    },
    onError: (error) => `Error: ${error instanceof Error ? error.message : "Unknown error"}`,
  });
}
