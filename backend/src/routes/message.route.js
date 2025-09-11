import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
    getMessages,
    getUserForSidebar,
    sendMessage,
} from "../controllers/message.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.use(verifyJwt);

router.route("/users").get(getUserForSidebar);
router.route("/:id").get(getMessages);
router.route("/send/:id").post(upload.single("chatImage"), sendMessage);

export default router;
