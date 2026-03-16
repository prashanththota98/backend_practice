import express from "express";
import {
  loginUser,
  registerUser,
  registerSeller,
  getprofile,
  editProfile,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getprofile);
router.patch("/profile", authMiddleware, editProfile);
router.post("/seller/register", registerSeller);

export default router;
