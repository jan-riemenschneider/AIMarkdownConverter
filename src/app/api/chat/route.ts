import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid request body" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Eingehende Nachrichten:", messages);

    const userMessage: string = messages
      .filter((msg) => msg.role === "user")
      .map((msg) => msg.content)
      .join("\n\n");

    const prompt = `Convert the following text into properly formatted Markdown:\n\n${userMessage}`;

    const result = streamText({
      model: openai("gpt-4o"),
      prompt,
      onError({ error }) {
        console.error("Stream error:", error);
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
