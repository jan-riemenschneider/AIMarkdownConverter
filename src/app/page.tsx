"use client";
import { useChat } from "ai/react";
import Image from "next/image";
import { RiChatNewLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { FaArrowUp } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";

export default function MyOwnChatbot() {
  const {
    messages,
    input,
    isLoading,
    handleInputChange,
    handleSubmit,
    setMessages,
  } = useChat({
    api: "/api/chat",
  });
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return (
    <div className="h-screen w-full flex flex-col">
      {/* Navbar */}
      <header className="navbar bg-[#e0e1dd]">
        <Image
          alt="Logo"
          src="/8188d8d4eb97d1a1839fb576c3aede1ef2750620dd131af11249d03a13704f90 1.png"
          width={50}
          height={50}
        />
        <div className="flex-1 ml-3" onClick={handleRefresh}>
          <a className="text-xl font-poppins font-bold">
            AI Markdown Converter
          </a>
        </div>
        <div className="flex-none">
          <button className="btn btn-square btn-ghost" onClick={clearMessages}>
            <RiChatNewLine style={{ fontSize: "25px" }} />
          </button>
        </div>
      </header>

      {/* Chat */}

      <section className="flex-1 overflow-y-auto p-4 bg-gray-100 w-full">
        {messages.map((msg) =>
          msg.role === "user" ? (
            <div className="chat chat-start" key={msg.id}>
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <CiUser style={{ fontSize: "30px" }} />
                </div>
              </div>
              <div className="chat-bubble">{msg.content}</div>
            </div>
          ) : (
            <div className="chat chat-end" key={msg.id}>
              <div className="chat-image avatar">
                <div className="w-10">
                  <Image
                    alt="Logo"
                    src="/8188d8d4eb97d1a1839fb576c3aede1ef2750620dd131af11249d03a13704f90 1.png"
                    width={20}
                    height={20}
                  />
                </div>
              </div>
              <div className="chat-bubble">{msg.content}</div>
            </div>
          )
        )}
      </section>

      <footer className="bg-white p-4 border-t">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Tip in your text..."
            value={input}
            onChange={handleInputChange}
            className="input input-ghost flex-1 font-poppins bg-[#e0e1dd] border-none focus:outline-none focus:border-none"
          />
          <button
            type="submit"
            className="btn btn-circle"
            onClick={isLoading ? () => stop() : handleSubmit}
          >
            {isLoading ? (
              <span className="btn btn-circle loading loading-spinner"></span>
            ) : (
              <FaArrowUp style={{ fontSize: "25px" }} />
            )}
          </button>
        </form>
      </footer>
    </div>
  );
}
