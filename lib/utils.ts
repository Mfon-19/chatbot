import { CoreMessage } from "ai"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getMostRecentUserMessage(messages: Array<CoreMessage>){
  const userMessages = messages.filter((message) => message.role === 'user');
  return userMessages.at(-1);
}
