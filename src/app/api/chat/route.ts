import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

interface ChatRequestBody {
  message: string;
}

const client = new OpenAI({
  apiKey: process.env["OPENAI_API_KEY"],
});

export async function POST(req: NextRequest) {
  try {
    const body: ChatRequestBody = await req.json();
    const message: string = body.message;
    console.log("Empfangene Nachricht:", message);

    const stream = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: message }],
      stream: true,
    });

    const streaming = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (chunk.choices[0]?.delta?.content) {
            controller.enqueue(chunk.choices[0].delta.content);
          }
        }
        controller.close();
      },
    });

    return new Response(streaming, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Fehler beim OpenAI-Request:", error);
    return NextResponse.json(
      { success: false, error: "Fehler beim Verarbeiten der Anfrage" },
      { status: 500 }
    );
  }
}
