import { User } from "../models/user.model.js";
import { Message } from "../models/message.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { isValidObjectId } from "mongoose";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getUserForSidebar = asyncHandler(async (req, res) => {
    try {
        const loggedInUser = req.user._id;
        const filterdUsers = await User.find({
            _id: { $ne: loggedInUser },
        }).select("-password");

        if (!filterdUsers) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json({
            filterdUsers,
            message: "Users fetched Successfully",
        });
    } catch (error) {
        console.log("Error in getUserForSidebar controller, ", error);
        return res.status(500).json({ message: "Intrnal Server Error" });
    }
});

const getMessages = asyncHandler(async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myId = req.user._id;

        if (!isValidObjectId(userToChatId)) {
            return res
                .status(404)
                .json({ message: "Invalid id or user not found" });
        }

        const chatMessage = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId },
            ],
        });

        res.status(200).json({
            chatMessage,
            message: "Messages fetched successfully",
        });
    } catch (error) {
        console.log("Error in getMessage controller, ", error);
        return res.status(500).json({ message: "Intrnal Server Error" });
    }
});

const sendMessage = asyncHandler(async (req, res) => {
    try {
        const chatImageLocalPath = req.file?.path;
        const { text } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!isValidObjectId(receiverId)) {
            return res
                .status(404)
                .json({ message: "Invalid id or user not found" });
        }

        let imageUrl;
        if (chatImageLocalPath) {
            const uploadResult = await uploadOnCloudinary(chatImageLocalPath);
            imageUrl = uploadResult.url;
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl || "",
        });

        // TODO: Real time functionality goes here => socket.io

        res.status(200).json({
            newMessage,
            message: "New message created successfully",
        });
        
    } catch (error) {
        console.log("Error in sendMessage controller, ", error);
        return res.status(500).json({ message: "Intrnal Server Error" });
    }
});

export { getUserForSidebar, getMessages, sendMessage };
