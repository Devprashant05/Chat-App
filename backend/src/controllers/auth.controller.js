import { asyncHandler } from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const signup = asyncHandler(async (req, res) => {
    res.send("singup route");
});

const login = asyncHandler(async (req, res) => {
    res.send("singup route");
});

const logout = asyncHandler(async (req, res) => {
    res.send("singup route");
});

export { signup, login, logout };
