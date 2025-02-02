import { neon } from "@neondatabase/serverless";
import { Message } from "ai";

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL!);

export async function getChatById({ id }: { id: string }) {
  try {
    const chat = await sql`SELECT * FROM chats WHERE id = ${id}`;
    return chat.length > 0;
  } catch (error) {
    console.error(`Failed to get chat by id from database: ${error}`);
    throw error;
  }
}

export async function getUserIdByEmail({ email }: { email: string }) {
  try {
    const userId = await sql`SELECT id FROM users WHERE email = ${email}`;
    return userId[0].id;
  } catch (error) {
    console.error(`Failed to fetch user id by email: ${error}`);
    throw error;
  }
}

export async function saveChat({ id, userId, title }: { id: string; userId: string; title: string }) {
  try {
    return await sql`INSERT INTO chats (id, user_id, title) VALUES (${id}, ${userId}, ${title})`;
  } catch (error) {
    console.error(`Failed to save chat in database: ${error}`);
    throw error;
  }
}

export async function saveMessages({ id, chatId, content, role }: { id: string; chatId: string; content: string; role: string }) {
  try {
    return sql`INSERT INTO messages (id, chat_id, content, role) VALUES (${id}, ${chatId}, ${content}, ${role})`;
  } catch (error) {
    console.error(`Failed to save messages in database: ${error}`);
    throw error;
  }
}
