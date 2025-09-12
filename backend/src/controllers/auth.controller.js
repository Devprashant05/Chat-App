import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcryptjs from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const signup = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        // check for if fields are empty
        if ([fullname, email, password].some((field) => field.trim() === "")) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check for length of the password
        if (password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters long",
            });
        }

        // check for existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }
        // Hashing the password
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // create new user
        const newUser = await User({
            fullname,
            email,
            password: hashedPassword,
        });

        if (newUser) {
            // generate jwt token
            generateToken(newUser._id, res);
            await newUser.save();

            return res.status(201).json({
                user: {
                    id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                    profilePic: newUser.profilePic,
                },
                message: "User created successfully",
            });
        } else {
            return res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        console.log("Error in signup controller: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    try {
        // check for if fields are empty
        if ([email, password].some((field) => field.trim() === "")) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcryptjs.compare(
            password,
            existingUser.password
        );

        if (isPasswordValid) {
            generateToken(existingUser._id, res);
            return res.status(200).json({
                user: {
                    id: existingUser._id,
                    fullname: existingUser.fullname,
                    email: existingUser.email,
                    profilePic: existingUser.profilePic,
                },
                message: "User logged in successfully",
            });
        } else {
            return res.status(400).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        console.log("Error in login controller ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

const logout = asyncHandler(async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller ", error);
        return req.status(500).json({ message: "Internal Server Error" });
    }
});

const updateProfile = asyncHandler(async (req, res) => {
    const localFilePath = req.file?.path;
    const userId = req.user._id;
    try {
        if (!localFilePath) {
            return res.status(400).json({ message: "Image file not found" });
        }

        const cloudinaryResponse = await uploadOnCloudinary(localFilePath);

        if (!cloudinaryResponse.url) {
            return res.status(400).json({
                message: "Error while uploading profile image to cloudinary",
            });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                profilePic: cloudinaryResponse.url,
            },
            { new: true }
        );

        return res.status(200).json({
            user: {
                id: updatedUser._id,
                fullname: updatedUser.fullname,
                email: updatedUser.email,
                profilePic: updatedUser.profilePic,
                createdAt: updatedUser.createdAt,
            },
            message: "Profile Picture updated successfully",
        });
    } catch (error) {
        console.log("Error in update profile controller ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

const checkAuth = asyncHandler(async (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in check auth controller ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

export { signup, login, logout, updateProfile, checkAuth };
