"use client";

import { useChat } from "ai/react";

export default function MyOwnChatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-500 p-4">
      <h1 className="text-3xl font-bold text-white mb-4">My own Chatbot 🤖</h1>

      <div className="w-full max-w-md bg-white rounded-lg shadow-md h-80 overflow-y-auto border-b p-2 flex flex-col space-y-2">
        {messages.map((msg) => (
          <div key={msg.id} className="whitespace-pre-wrap">
            {msg.role === "user" ? "User: " : "AI: "}
            {msg.content}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
        <input
          type="text"
          placeholder="Import your Question..."
          value={input}
          onChange={handleInputChange}
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
