import React, { use, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";

const MessageInput = () => {
    const [text, setText] = useState("");
    const [imagePreview, setImagePreview] = useState(null);
    const [chatImageFile, setChatImageFile] = useState(null);
    const fileInputRef = useRef();

    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const chatImage = e.target.files[0];

        if (!chatImage.type.startsWith("image")) {
            toast.error("Please select an image file");
            return;
        }
        setImagePreview(URL.createObjectURL(chatImage));
        setChatImageFile(chatImage);
    };

    const removeImage = () => {
        setImagePreview(null);
        setChatImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!text.trim() && !imagePreview) return;
        const formData = new FormData();

        formData.append("text", text);
        formData.append("chatImage", chatImageFile);

        try {
            await sendMessage(formData);
            // clear form
            setText("");
            setImagePreview(null);
            setChatImageFile(null);
            if (fileInputRef.current) fileInputRef.current.value = "";
        } catch (error) {
            console.error("Failed to send message", error);
        }
    };

    return (
        <div className="p-4 w-full">
            {imagePreview && (
                <div className="mb-3 flex items-center gap-2">
                    <div className="relative">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="size-20 object-cover rounded-lg border border-zinc-700"
                        />
                        <button
                            onClick={removeImage}
                            className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center"
                            type="button"
                        >
                            <X className="size-3" />
                        </button>
                    </div>
                </div>
            )}
            <form
                onSubmit={handleSendMessage}
                className="flex items-center gap-2"
            >
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        className="w-full input rounded-lg input-sm sm:input-md"
                        placeholder="Type a message..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                    />
                    <button
                        className={`hidden sm:flex btn btn-circle ${
                            imagePreview ? "text-emerald-500" : "text-zinc-400"
                        }`}
                        onClick={() => fileInputRef.current?.click()}
                        type="button"
                    >
                        <Image size={20} />
                    </button>
                </div>
                <button
                    className="btn btn-sm btn-circle"
                    type="submit"
                    disabled={!text.trim() && !imagePreview}
                >
                    <Send size={22} />
                </button>
            </form>
        </div>
    );
};

export default MessageInput;
