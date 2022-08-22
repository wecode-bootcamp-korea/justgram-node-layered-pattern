import express from "express";
import { userController } from "../controllers/userController";

const router = express.Router();

router.post("/kakao", userController.createUser);

export default router;
