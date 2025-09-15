import { create } from "zustand";
import { toast } from "react-hot-toast";
import axios from "../lib/axios";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUserLoading: false,
    isMessagesLoading: false,

    getUsers: async () => {
        set({ isUserLoading: true });
        try {
            const response = await axios.get("/message/users");
            set({ users: response.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUserLoading: false });
        }
    },

    getMessages: async (userId) => {
        set({ isMessagesLoading: true });
        try {
            const response = await axios.get(`/message/${userId}`);
            set({ messages: response.data.chatMessage });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        try {
            const response = await axios.post(
                `/message/send/${selectedUser._id}`,
                messageData
            );
            set({ messages: [...messages, response.data.newMessage] });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    // TODO:Optimize this later
    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
