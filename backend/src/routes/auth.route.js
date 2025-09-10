import { Router } from "express";
import {
    login,
    logout,
    signup,
    updateProfile,
    checkAuth
} from "../controllers/auth.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/signup").post(signup);

router.route("/login").post(login);

router.route("/logout").post(logout);

router
    .route("/update-profile")
    .put(verifyJwt, upload.single("profilePic"), updateProfile);

router.route("/check").get(verifyJwt, checkAuth)

export default router;
