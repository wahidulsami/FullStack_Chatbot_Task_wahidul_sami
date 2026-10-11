import ChatWindow from "@/components/Chatbot/ChatWindow"

export default function Chat() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <div className="h-[calc(100vh-4rem)] overflow-hidden rounded-xl border border-border bg-card shadow-xs">
        <ChatWindow />
      </div>
    </div>
  )
}
