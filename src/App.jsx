import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";
import AdminPage from "./pages/admin/AdminPage";
import BookingPage from "./pages/BookingPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import RegisterPage from "./pages/RegisterPage";
import Appointments from "./pages/admin/Appointments";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/appointments" element={<Appointments/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
