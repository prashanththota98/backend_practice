import express from "express";
import {
  loginUser,
  registerUser,
  registerSeller,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/seller/register", registerSeller);

export default router;
