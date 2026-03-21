import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminRoute from "./components/AdminRoute";
import PrivateRoute from "./components/PrivateRoute";

// Lazy loaded pages
const LandingPage   = lazy(() => import("./pages/LandingPage"));
const BookingPage   = lazy(() => import("./pages/BookingPage"));
const LoginPage     = lazy(() => import("./pages/LoginPage"));
const RegisterPage  = lazy(() => import("./pages/RegisterPage"));
const Profile       = lazy(() => import("./pages/Profile"));
const AdminPage     = lazy(() => import("./pages/admin/AdminPage"));
const Appointments  = lazy(() => import("./pages/admin/Appointments"));
const Barbers       = lazy(() => import("./pages/admin/Barbers"));
const Services      = lazy(() => import("./pages/admin/Services"));
const Customers     = lazy(() => import("./pages/admin/Customer"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage  = lazy(() => import("./pages/ResetPasswordPage"));

// Loading spinner
const PageLoader = () => (
  <div className="min-h-screen bg-[#0f1309] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#86c559] border-t-transparent rounded-full animate-spin"/>
  </div>
);

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/"         element={<LandingPage />} />
          <Route path="/booking"  element={<BookingPage />} />
          <Route path="/login"    element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password"  element={<ResetPasswordPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path="/admin">
              <Route index          element={<AdminPage />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="barbers"      element={<Barbers />} />
              <Route path="services"     element={<Services />} />
              <Route path="customers"    element={<Customers />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;