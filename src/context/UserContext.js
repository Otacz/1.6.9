import React, { createContext, useState, useEffect } from "react";



export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return localStorage.getItem("geri_user") || "";
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("geri_isAdmin") === "true";
  });

  useEffect(() => {
    localStorage.setItem("geri_user", user);
    localStorage.setItem("geri_isAdmin", isAdmin ? "true" : "false");
  }, [user, isAdmin]);

  return (
    <UserContext.Provider value={{ user, setUser, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserContextProvider = UserProvider;
