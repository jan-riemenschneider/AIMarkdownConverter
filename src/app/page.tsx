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

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) throw new Error(`Server Error: ${res.status}`);

      if (!res.body) {
        throw new Error("Keine Antwort vom Server erhalten");
      }

      const reader = res.body.getReader();
      let fullReply = "";
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = new TextDecoder().decode(value);
        fullReply += chunk;

        setMessages((prev) =>
          prev.map((msg, index) =>
            index === prev.length - 1
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Fehler beim API-Request:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Fehler beim Abrufen der Antwort." },
      ]);
    }

    setInput("");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-500 p-4">
      <h1 className="text-3xl font-bold text-white mb-4">My own Chatbot 🤖</h1>

      <div
        ref={chatRef}
        className="w-full max-w-md bg-white rounded-lg shadow-md h-80 overflow-y-auto border-b p-2 flex flex-col space-y-2"
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

      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="Import your Question..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
          className="flex-1 p-2 border rounded-lg text-black"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
}
