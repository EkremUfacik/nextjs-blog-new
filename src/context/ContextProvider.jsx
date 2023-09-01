"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const ContextProvider = ({ children }) => {
  // const [token, setToken] = useState("loadtoken");
  const [expDate, setExpDate] = useState("");
  const [userId, setUserId] = useState("loadUserId");

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const expDate = localStorage.getItem("expiryDate");
    const localUserId = localStorage.getItem("userId");
    // setToken(token);
    setExpDate(expDate);
    setUserId(localUserId);
  }, []);

  return (
    <AuthContext.Provider value={{ expDate, setExpDate, userId, setUserId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default ContextProvider;
