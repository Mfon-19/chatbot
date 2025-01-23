"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked";
import { Message } from "../types";

if (!process.env.GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY is not defined");
}

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash-002" });

export default async function fetchModelResponse(message: Message) {
  try {
    const pdf = await message?.file?.arrayBuffer();
    const content = [];

    if (pdf) {
      content.push({
        inlineData: {
          data: Buffer.from(pdf).toString("base64"),
          mimeType: "application/pdf",
        },
      });
    }

    content.push(message.text);

    const result = await model.generateContent(content);
    const data = result.response.text();
    console.log(data);
    return marked(data);
  } catch (error) {
    console.error(`An error occured: ${error}`);
  }
}
