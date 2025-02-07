"use client";

import { useState, useRef } from "react";

export default function MyOwnChatbot() {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const chatRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: input }]);
    setTimeout(() => {
      chatRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, 100);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    if (!res.ok) {
      throw new Error(`Server Error: ${res.status}`);
    }

    const data = await res.json();
    console.log(data);
    setMessages(data.reply);
  };

  return (
    <body className="flex flex-col items-center justify-center min-h-screen bg-slate-500 p-4">
      <h1>MyOwnChatbot 🤖</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md h-80 overflow-y-auto border-b p-2 ">
        <div
          ref={chatRef}
          className="h-80 overflow-y-auto border-b p-2 flex flex-col space-y-2"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 max-w-xs rounded-lg ${
                msg.role === "user"
                  ? "bg-blue-500 text-white self-end text-right"
                  : "bg-gray-200 text-black self-start text-left"
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Gib deine Nachricht ein..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Senden
        </button>
      </form>
    </body>
  );
}
