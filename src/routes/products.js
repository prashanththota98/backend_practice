import express from "express";
import {
  addNewProduct,
  deleteProduct,
  getProductByIdController,
  updateProduct,
} from "../controllers/product.controller.js";
import { authorizeRole } from "../middlewares/authorizeRole.js";
import { authMiddleware } from "../middlewares/auth.js";

const router = express.Router();
router.post("/", authMiddleware, authorizeRole(["seller"]), addNewProduct);
router.get(
  "/:id",
  authMiddleware,
  authorizeRole(["seller"]),
  getProductByIdController,
);
router.delete("/:id", authMiddleware, authorizeRole(["seller"]), deleteProduct);
router.patch("/:id", authMiddleware, authorizeRole(["seller"]), updateProduct);

export default router;
