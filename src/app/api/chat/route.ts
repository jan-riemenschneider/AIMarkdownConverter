import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    console.log(messages);
    const result = streamText({
      model: openai("gpt-4o"),
      messages,
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
