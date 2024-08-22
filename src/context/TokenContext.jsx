import { useState, createContext } from "react";
import PropTypes from "prop-types";

export const TokenContext = createContext(0);

export default function TokenContextProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}

TokenContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
