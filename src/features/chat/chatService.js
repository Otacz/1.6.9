
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const saveMessage = async (threadId, role, content) => {
  try {
    const docRef = await addDoc(collection(db, "chats", threadId, "messages"), {
      role,
      content,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (e) {
    console.error("Chyba při ukládání zprávy do Firestore:", e);
    return null;
  }
};
