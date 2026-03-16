import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import {
  createNewAddress,
  deleteAddress,
  getAllAddressController,
  getOneAddress,
  updateAddress,
} from "../controllers/address.controller.js";
const router = express.Router();

router.post("/", authMiddleware, createNewAddress);
router.get("/", authMiddleware, getAllAddressController);
router.get("/:id", authMiddleware, getOneAddress);
router.delete("/:id", authMiddleware, deleteAddress);
router.patch("/:id", authMiddleware, updateAddress);

export default router;
