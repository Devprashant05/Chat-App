import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/useAuthStore";
import { LoaderCircle } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./store/useThemeStore";

const App = () => {
    const { user, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
    const { theme } = useThemeStore();

    console.log(onlineUsers);

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isCheckingAuth && !user) {
        return (
            <div className="flex items-center justify-center h-screen">
                <LoaderCircle className="size-10 animate-spin" />
            </div>
        );
    }

    return (
        <div className="" data-theme={theme}>
            <Navbar />

            <Routes>
                <Route
                    path="/"
                    element={user ? <HomePage /> : <Navigate to={"/login"} />}
                />
                <Route
                    path="/signup"
                    element={!user ? <SignupPage /> : <Navigate to={"/"} />}
                />
                <Route
                    path="/login"
                    element={!user ? <LoginPage /> : <Navigate to={"/"} />}
                />
                <Route path="/settings" element={<SettingsPage />} />
                <Route
                    path="/profile"
                    element={
                        user ? <ProfilePage /> : <Navigate to={"/login"} />
                    }
                />
            </Routes>

            <Toaster />
        </div>
    );
};

export default App;
