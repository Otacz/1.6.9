import React, { useState, useEffect, useContext } from 'react';

import ChatWindow from "./features/chat/ChatWindow";
import ThreadSelector from "./features/chat/ThreadSelector";
import MemoryPanel from "./features/chat/MemoryPanel";
import LoginScreen from "./screens/LoginScreen";
import { UserContext } from "./context/UserContext";
import { UserProvider } from "./context/UserContext";
import AdminPanel from "./features/admin/AdminPanel";

const AppContent = () => {
  const { user, isAdmin, setUser } = useContext(UserContext);
  const [threadId, setThreadId] = useState("defaultChat");

  if (!user) return <LoginScreen />;

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      fontFamily: "Georgia, serif",
      backgroundColor: "#f0f8ff"
    }}>
      <header style={{
        padding: "10px",
        backgroundColor: "#0a369d",
        color: "white",
        fontSize: "1.4em",
        fontWeight: "bold",
        textAlign: "center"
      }}>
        GeriApp Alfa - {user}
      </header>
      <main style={{
        flex: 1,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "10px"
      }}>
        {isAdmin && <AdminPanel onSelectUser={(uid) => setUser(uid)} />}
        <MemoryPanel threadId={threadId} />
        <ThreadSelector currentThread={threadId} onSelect={setThreadId} />
        <div style={{ flex: 1, overflow: "hidden" }}>
          <ChatWindow threadId={threadId} />
        </div>
      </main>
    </div>
  );
};

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;