"use client";
import { useChat } from "ai/react";
import Image from "next/image";

export default function MyOwnChatbot() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#FAFAFF]">
      <div className="flex flex-row items-center">
        <Image
          src="/8188d8d4eb97d1a1839fb576c3aede1ef2750620dd131af11249d03a13704f90 1.png"
          alt="Image"
          width={101}
          height={101}
        />
        <div className="w-[648px] h-[100px] text-center">
          <span className="text-[#3f4045] text-[26px] font-normal font-['Poppins']">
            Hello! I am your personal{" "}
          </span>
          <span className="text-[#3f4045] text-[28px] font-semibold font-['Poppins']">
            AI Markdown Converter
          </span>
          <span className="text-[#3f4045] text-[28px] font-normal font-['Poppins']">
            .<br />
          </span>
          <span className="text-[#3f4045] text-[23px] font-normal font-['Poppins']">
             <br />
          </span>
          <span className="text-[#3f4045] text-lg font-normal font-['Poppins']">
            Type in your text, and I’ll format it into Markdown instantly!
          </span>
        </div>
      </div>
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
