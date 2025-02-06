import { CoreMessage, Message } from "ai";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getMostRecentUserMessage(messages: Array<CoreMessage>) {
  const userMessages = messages.filter((message) => message.role === "user");
  return userMessages.at(-1);
}

export function convertToUIMessages(messages: Array<Record<string, any>>): Array<Message> {
  return messages.map((message) => {
    return {
      id: message.id,
      role: message.role,
      content: message.content,
      createdAt: message.created_at,
    };
  });
}

export const fetcher = async (url: string) => {
  const result = await fetch(url);

  if (!result.ok) {
    throw Error;
  }

  return result.json();
};
