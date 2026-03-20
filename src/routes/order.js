import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { placeOrderFromCart } from "../controllers/order.controller.js";

const router = express.Router();

router.post("/cart", authMiddleware, placeOrderFromCart);

export default router;
