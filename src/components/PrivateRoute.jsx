import { Navigate } from "react-router-dom";
import { useAuthContext } from "../store/AuthContext"

const PrivateRoute = ({ children }) => {
  const { user } = useAuthContext();

  if (user === undefined) return <p>Loading...</p>
  return user ? children : <Navigate to="/login" />
}

export default PrivateRoute;