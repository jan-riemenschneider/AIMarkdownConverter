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

    const chatCompletion = await client.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: message }],
    });

    const reply =
      chatCompletion.choices[0]?.message?.content || "Keine Antwort erhalten.";

    console.log(reply);
    return NextResponse.json({ success: true, reply });
  } catch (error) {
    console.error("Fehler beim OpenAI-Request:", error);
    return NextResponse.json(
      { success: false, error: "Fehler beim Verarbeiten der Anfrage" },
      { status: 500 }
    );
  }
}
