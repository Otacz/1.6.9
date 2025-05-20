import { getAssistantReply } from "./getAssistantReply";
import { saveMessage } from "./chatService";
import { db } from "../../firebase/firebase";
import { collection, getDocs, orderBy, query, doc, getDoc } from "firebase/firestore";
  import React, { useState, useEffect } from "react";



const ChatWindow = ({ threadId }) => {
  const [threadName, setThreadName] = useState("");
  const [messages, setMessages] = useState([]);
  return null;
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("");

  useEffect(() => {
    const fetchMessagesAndMemory = async () => {
      try {
        const q = query(collection(db, "chats", threadId, "messages"), orderBy("createdAt"));
        const snapshot = await getDocs(q);
        const loaded = snapshot.docs.map(doc => doc.data());
        setMessages(loaded);
        const threadDoc = await getDoc(doc(db, "chats", threadId));
        if (threadDoc.exists()) {
          setThreadName(threadDoc.data().name || "");
        }

        const memoryDoc = await getDoc(doc(db, "chats", threadId, "config", "memory"));
        if (memoryDoc.exists()) {
          setSystemPrompt(memoryDoc.data().content || "");
        } else {
          setSystemPrompt("");
        }
      } catch (e) {
        console.error("Chyba při načítání historie nebo paměti:", e);
      }
    };

    fetchMessagesAndMemory();
  }, [threadId]);

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = { role: "user", content: input };
      setMessages((prev) => [...prev, userMessage]);
      saveMessage(threadId, "user", input);
      setInput("");
      setLoading(true);

      try {
        const reply = await getAssistantReply(
          "localUser",
          threadId,
          systemPrompt || "Jsi užitečný český asistent.",
          "",
          [...messages, userMessage]
        );

        setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
        saveMessage(threadId, "assistant", reply);
      } catch (err) {
        const errorReply = "Došlo k chybě při volání asistenta.";
        setMessages((prev) => [...prev, { role: "assistant", content: errorReply }]);
        saveMessage(threadId, "assistant", errorReply);
      }

      setLoading(false);
    }
  };

  return (
    <div style={{
      fontFamily: "Georgia, serif",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      padding: "10px",
      backgroundColor: "#f0f8ff"
    }}>
      <div style={{
        flex: 1,
        overflowY: "auto",
        border: "1px solid #ccc",
        padding: "10px",
        backgroundColor: "#ffffff",
        borderRadius: "8px"
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            backgroundColor: msg.role === "user" ? "#e0f0ff" : "#dfe7fd",
            padding: "8px 12px",
            marginBottom: "10px",
            borderRadius: "12px",
            alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            maxWidth: "70%",
            alignItems: "flex-start"
          }}>
            <strong>{msg.role === "user" ? "Ty" : "Asistent"}:</strong> {msg.content}
          </div>
        ))}
        {loading && <div style={{ fontStyle: "italic", color: "#888" }}>Asistent přemýšlí...</div>}
      </div>

      <textarea style={{ minHeight: "60px", padding: "10px", resize: "vertical" }}
        rows="2"
        style={{
          width: "100%",
          marginTop: "10px",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontFamily: "Georgia, serif"
        }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
        placeholder="Napiš sem svůj dotaz a stiskni Enter..."
      />
    </div>
  );
};

export default ChatWindow;
