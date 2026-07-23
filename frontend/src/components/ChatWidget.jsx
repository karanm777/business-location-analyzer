import React, { useState, useRef, useEffect } from "react";
import useAuth from "../hooks/useAuth.js";
import useAnalysisContext from "../hooks/useAnalysisContext.js";
import { sendChatMessage } from "../services/chat.service.js";

const ChatBubbleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path
      d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-5 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
      fill="currentColor"
    />
  </svg>
);

const ChatWidget = () => {
  const { user } = useAuth();
  const { lastAnalysis } = useAnalysisContext();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! Ask me anything about your analysis or how to use this app."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  if (!user) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const nextMessages = [...messages, { role: "user", text: trimmed }];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await sendChatMessage(trimmed, messages, lastAnalysis);
      setMessages((prev) => [...prev, { role: "assistant", text: res.data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, I couldn't reply right now. Please try again in a moment."
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-20">
      {open && (
        <div className="mb-3 w-80 sm:w-96 h-[26rem] bg-white rounded-xl border border-ink-100 shadow-[0_12px_36px_-12px_rgba(18,64,59,0.35)] flex flex-col overflow-hidden">
          <div className="bg-ink-500 text-paper px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-display font-semibold text-sm">Assistant</p>
              <p className="text-xs text-paper/70">Ask about your analysis</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-paper/80 hover:text-paper text-lg leading-none">
              ×
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`text-sm max-w-[85%] px-3 py-2 rounded-lg leading-relaxed ${
                  msg.role === "user"
                    ? "bg-ink-500 text-paper ml-auto rounded-br-sm"
                    : "bg-ink-50 text-ink-700 rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-sm text-ink-400 font-mono bg-ink-50 px-3 py-2 rounded-lg rounded-bl-sm max-w-[60%]">
                typing...
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="border-t border-ink-100 p-2.5 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 text-sm px-3 py-2 rounded-lg border border-ink-100 focus:outline-none focus:ring-2 focus:ring-amber-400/40 focus:border-amber-400 transition"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-3.5 py-2 rounded-lg bg-ink-500 text-paper text-sm font-medium hover:bg-ink-600 disabled:opacity-60 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-14 h-14 rounded-full bg-amber-400 text-ink-700 shadow-[0_8px_24px_-8px_rgba(224,151,61,0.6)] flex items-center justify-center hover:bg-amber-500 transition-colors"
        aria-label="Toggle chat assistant"
      >
        <ChatBubbleIcon />
      </button>
    </div>
  );
};

export default ChatWidget;
