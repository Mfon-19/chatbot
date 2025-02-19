import { Message } from "ai";

export type Chat = {
  title: string;
  id: string;
  userId: string;
  createdAt: string;
};

export type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export type ChatProps = {
  id?: string;
  initialMessages?: Message[];
  isAuthenticated?: boolean;
};
