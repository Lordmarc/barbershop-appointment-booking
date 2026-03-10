import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../store/AuthContext"

const PrivateRoute = () => {
  const { user } = useAuthContext();

  if (user === undefined) return <p>Loading...</p>
  return user ? <Outlet/> : <Navigate to="/" />
}

export default PrivateRoute;