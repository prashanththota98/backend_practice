import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  addToCartController,
  deleteCartItemController,
  getCartItemsController,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/", authMiddleware, addToCartController);
router.get("/", authMiddleware, getCartItemsController);
router.delete("/:id", authMiddleware, deleteCartItemController);

export default router;
