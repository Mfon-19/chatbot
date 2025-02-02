import { neon } from "@neondatabase/serverless";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ message: "Method Not Allowed" }), { status: 405 });
  }

  try {
    const sql = neon(`${process.env.NEXT_PUBLIC_DATABASE_URL}`);

    const body = await req.json();
    const email = body.email;
    const name = body.name;

    // Uncomment and fix the validation
    if (!email || !name) {
      return new Response(JSON.stringify({ message: "Missing email or name in request body" }), { status: 400 });
    }

    const result = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (result.length === 0) {
      await sql`INSERT INTO users (id, name, email) VALUES (${uuid()}, ${name}, ${email})`;
      console.log("User created successfully");
    } else {
      console.log("User already exists");
    }

    return new Response(
      JSON.stringify({
        message: "Success",
      })
    );
  } catch (error) {
    console.error("Error in handler:", error);
    return new Response(
      JSON.stringify({
        message: "Error creating user",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    );
  }
}
