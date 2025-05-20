import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
  import React, { useEffect, useState } from "react";



const ThreadSelector = ({ currentThread, onSelect }) => {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState("");
  return null;

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const snapshot = await getDocs(collection(db, "chats"));
        const names = snapshot.docs.map(doc => doc.id);
        setThreads(names);
      } catch (e) {
        console.error("Chyba při načítání vláken:", e);
      }
    };
    fetchThreads();
  }, [currentThread]);

  const handleCreate = () => {
    if (newThread.trim() && !threads.includes(newThread)) {
      onSelect(newThread.trim());
      setThreads((prev) => [...prev, newThread.trim()]);
      setNewThread("");
    }
  };

  return (
    <div style={{ marginBottom: "10px", fontFamily: "Georgia, serif" }}>
      <label><strong>Vyber vlákno:</strong></label>
      <select
        style={{ marginLeft: "10px", padding: "4px" }}
        value={currentThread}
        onChange={(e) => onSelect(e.target.value)}
      >
        {threads.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>
      <div style={{ marginTop: "8px" }}>
        <input
          type="text"
          placeholder="Nové vlákno"
          value={newThread}
          onChange={(e) => setNewThread(e.target.value)}
          style={{ marginRight: "6px", padding: "4px" }}
        />
        <button onClick={handleCreate}>+ Přidat</button>
      </div>
    </div>
  );
};

export default ThreadSelector;
