import express from "express";
import { refreshAccessToken } from "../controllers/refresh.controller.js";

const router = express.Router();

router.post("/", refreshAccessToken);

export default router;
