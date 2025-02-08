import { createUser, getUserByEmail } from "@/lib/queries";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
  try {
    const { email, name } = await req.json();

    if (!email || !name) {
      return new Response("Missing email or name in request body", { status: 400 });
    }

    const result = await getUserByEmail({ email });

    if (result.length === 0) {
      await createUser({ id: uuid(), name, email });
    }

    return new Response("User created successfully", { status: 200 });
  } catch (error) {
    console.error("Error in handler:", error);
    return new Response("Error creating user", { status: 500 });
  }
}
