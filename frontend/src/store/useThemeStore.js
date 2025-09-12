import toast from "react-hot-toast";
import { create } from "zustand";

export const useThemeStore = create((set, get) => ({
    theme: localStorage.getItem("chat-theme") || "forest",

    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        set({ theme });
        const formatedTheme = theme.charAt(0).toUpperCase() + theme.slice(1);
        toast.success(`${formatedTheme} applied successfully`);
    },
}));
