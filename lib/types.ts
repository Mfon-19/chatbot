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
