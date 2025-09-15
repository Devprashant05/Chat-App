import { create } from "zustand";
import axios from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set, get) => ({
    user: null,
    isSignup: false,
    isLogin: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers: [],

    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get("/auth/check");
            set({ user: response.data });
        } catch (error) {
            console.log("Error in checkAuth:", error);
            set({ user: null });
        } finally {
            set({ isCheckingAuth: false });
        }
    },

    signup: async (data) => {
        set({ isSignup: true });
        try {
            const result = await axios.post("/auth/signup", data);
            console.log(result.data.user);
            set({ user: result.data.user });
            toast.success("Account Created Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isSignup: false });
        }
    },

    login: async (data) => {
        set({ isLogin: true });
        try {
            const result = await axios.post("/auth/login", data);
            set({ user: result.data.user });
            toast.success("Logged in successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isLogin: false });
        }
    },

    logout: async () => {
        try {
            await axios.post("/auth/logout");
            set({ user: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingProfile: true });
        try {
            const response = await axios.put("/auth/update-profile", data);
            set({ user: response.data.user });
            toast.success("Profile Updated Successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUpdatingProfile: false });
        }
        console.log("Data come in hook", data.profilePic);
    },
}));
