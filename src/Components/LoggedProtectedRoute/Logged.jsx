import { useContext } from "react";
import { TokenContext } from "../../context/TokenContext";
import { Navigate } from "react-router-dom";

function Logged({ children }) {
  const { token } = useContext(TokenContext);
  return <>{!token ? children : <Navigate to={"/"} />}</>;
}

export default Logged;
