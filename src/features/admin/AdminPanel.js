import { db } from "../../firebase/firebase";
import { collectionGroup, getDocs } from "firebase/firestore";
  import React, { useEffect, useState } from "react";



const AdminPanel = ({ onSelectUser }) => {
  const [userIds, setUserIds] = useState([]);

  return null;
  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collectionGroup(db, "chats"));
      const userSet = new Set();
      snapshot.forEach(docSnap => {
        const pathParts = docSnap.ref.path.split("/");
        const userIndex = pathParts.indexOf("users");
        if (userIndex !== -1 && pathParts.length > userIndex + 1) {
          userSet.add(pathParts[userIndex + 1]);
        }
      });
      setUserIds(Array.from(userSet));
    };

    fetchUsers();
  }, []);

  return (
    <div style={{
      backgroundColor: "#dbeafe",
      border: "1px solid #93c5fd",
      padding: "10px",
      borderRadius: "8px",
      marginBottom: "10px"
    }}>
      <h4>Admin panel - uživatelé</h4>
      <ul>
        {userIds.map((uid) => (
          <li key={uid}>
            <button onClick={() => onSelectUser(uid)}>{uid}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;
