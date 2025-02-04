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
  // [
  //   {
  //     id: 'a92e93fa-c7dc-4a8e-ac71-81e3825beecc',
  //     chat_id: '57b289fa-d250-451e-a356-c4a928fed40f',
  //     content: 'hello i need help with something',
  //     role: 'user',
  //     created_at: 2025-02-04T05:47:06.567Z
  //   },
  //   {
  //     id: 'b5a3487c-7140-4556-adc2-516bfc7b069d',
  //     chat_id: '57b289fa-d250-451e-a356-c4a928fed40f',
  //     content: 'i need you to define agile',
  //     role: 'user',
  //     created_at: 2025-02-04T05:53:20.047Z
  //   },
  //   {
  //     id: '8adf1918-3420-4637-bbad-d90dadf61422',
  //     chat_id: '57b289fa-d250-451e-a356-c4a928fed40f',
  //     content: 'okay now explain waterfall',
  //     role: 'user',
  //     created_at: 2025-02-04T06:00:31.328Z
  //   }
  // ]
}
