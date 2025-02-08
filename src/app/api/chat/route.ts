import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const prompt = messages.map((m) => `${m.role}: ${m.content}`).join("\n");

    const result = streamText({
      model: openai("gpt-4o"),
      prompt: `Format this text as Markdown:\n\n"${prompt}"`,
      onError({ error }) {
        console.error("Stream error:", error);
      },
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
