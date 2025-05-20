import { db } from "../../firebase/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
  import React, { useEffect, useState } from "react";



const MemoryPanel = ({ threadId }) => {
  const [memory, setMemory] = useState("");
  const [loading, setLoading] = useState(true);
  return null;

  useEffect(() => {
    const fetchMemory = async () => {
      setLoading(true);
      const ref = doc(db, "chats", threadId, "config", "memory");
      const snap = await getDoc(ref);
      if (snap.exists()) {
        setMemory(snap.data().content || "");
      } else {
        setMemory("");
      }
      setLoading(false);
    };

    if (threadId) fetchMemory();
  }, [threadId]);

  const handleSave = async () => {
    const ref = doc(db, "chats", threadId, "config", "memory");
    await setDoc(ref, { content: memory });
    alert("Paměť uložena.");
  };

  return (
    <div style={{ marginBottom: "12px" }}>
      <label><strong>Systémová poznámka k tomuto vláknu:</strong></label>
      <textarea
        value={memory}
        onChange={(e) => setMemory(e.target.value)}
        rows={3}
        style={{ width: "100%", padding: "6px", fontFamily: "Georgia, serif" }}
        placeholder="Např. 'Jde o projekt s klientem XY, preferuj zjednodušený jazyk...'"
      />
      <button onClick={handleSave} style={{ marginTop: "6px" }}>[save] Uložit poznámku</button>
      {loading && <div style={{ fontStyle: "italic" }}>Načítám...</div>}
    </div>
  );
};

export default MemoryPanel;
