"use client";
import { useChat } from "ai/react";
import Image from "next/image";
import { RiChatNewLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import { FaArrowUp } from "react-icons/fa6";

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
      <header className="navbar bg-[#e9ecef] px-4">
        <div className="flex-1" onClick={handleRefresh}>
          <a className="font-poppins font-semibold text-xl">
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

      <section className="flex-1 overflow-y-auto px-4 sm:w-[60%] self-center">
        {messages === null || messages.length === 0 ? (
          
            <div className="flex items-center justify-center w-auto h-full">
              <Image
                className="mx-4"
                alt="Logo"
                src="/8188d8d4eb97d1a1839fb576c3aede1ef2750620dd131af11249d03a13704f90 1.png"
                width={101}
                height={101}
              />
              <div className="text-center">
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
        
        ) : (
          messages.map((msg) =>
            msg.role === "user" ? (
              <div className="chat chat-start mb-5" key={msg.id}>
                <div className="chat-bubble bg-[#e9ecef] text-black">
                  {msg.content}
                </div>
              </div>
            ) : (
              <div className="chat chat-end mb-5" key={msg.id}>
                <div className="chat-bubble bg-blue-500 text-white">
                  {msg.content}
                </div>
              </div>
            )
          )
        )}
      </section>

      <footer className="flex flex-col w-full items-center">
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 w-full justify-center px-4 sm:max-w-[60%] sm:px-0"
        >
          <input
            type="text"
            placeholder="Tip in your text..."
            value={input}
            onChange={handleInputChange}
            className="input input-ghost w-full flex-1 font-poppins bg-[#e9ecef] 
                 focus:outline-none focus:border-none"
          />
          <button
            type="submit"
            className="btn btn-circle bg-[#e9ecef] hover:bg-gray-300"
            onClick={isLoading ? () => stop() : handleSubmit}
          >
            {isLoading ? (
              <span className="btn btn-circle loading loading-spinner"></span>
            ) : (
              <FaArrowUp className="text-2xl" />
            )}
          </button>
        </form>

        <p className="py-2 text-center text-xs text-gray-300">
          powered by Jan Riemenschneider
        </p>
      </footer>
    </div>
  );
}
