import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import Booking from "./pages/BookingPage.jsx"; // ✅ Booking page
import ProfilePage from "./pages/ProfilePage.jsx"; // ✅ Profile page

import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

import { useAuthStore } from "./store/useAuthStore.js"; // ✅ Auth state

function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  // ✅ Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // ✅ Show loader while checking auth
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* ✅ Home page (protected) */}
        <Route
          path="/"
          element={
            authUser ? (
              <>
                <Navbar />
                <HomePage />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ✅ Signup */}
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" />}
        />

        {/* ✅ Login */}
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        {/* ✅ Booking page (protected) */}
        <Route
          path="/booking"
          element={
            authUser ? (
              <>
                <Navbar />
                <Booking />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* ✅ Profile page (protected) */}
        <Route
          path="/profile"
          element={
            authUser ? (
              <>
                <Navbar />
                <ProfilePage />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
