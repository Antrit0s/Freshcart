import { useState, createContext } from "react";
export const TokenContext = createContext(0);

export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}
