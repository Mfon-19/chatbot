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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export async function fetcher(url: string) {
  const result = await fetch(url);

  if (!result.ok) {
    throw Error;
  }

  return result.json();
}

export async function createUser(email: string, name: string) {
  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, name }),
    });

    if (!response.ok) {
      if (response.status === 409) return;
      console.error(`Error creating user: ${await response.text()}`);
      return;
    }

    return response.json();
  } catch (error) {
    console.error(`Error creating user: ${error}`);
  }
}
