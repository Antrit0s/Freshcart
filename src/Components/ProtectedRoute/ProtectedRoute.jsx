import { useContext } from "react";
import { TokenContext } from "../../context/TokenContext";
import Login from "../Login/Login";

function ProtectedRoute({ children }) {
  const { token } = useContext(TokenContext);

  // Render children if token exists, otherwise render Login component
  return <>{token ? children : <Login />}</>;
}

export default ProtectedRoute;
