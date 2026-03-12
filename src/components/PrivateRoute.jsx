import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../store/AuthContext"

const PrivateRoute = () => {
  const { user } = useAuthContext();

  if (user === undefined) return <p>Loading...</p>
  if(!user) return <Navigate to="/login"/>
  return <Outlet/>
}

export default PrivateRoute;