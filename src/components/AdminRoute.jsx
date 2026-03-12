import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

const AdminRoute = () => {

  const { user, profile } = useAuth();

  if(user === undefined) return <p>Loading...</p>
  if(!user) return <Navigate to="/login"/>
  if(profile === null) return <p>Loading...</p>
  if(profile?.role !== 'admin') return <Navigate to="/"/>
  return <Outlet/>
}

export default AdminRoute;