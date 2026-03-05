import express from "express";
import { addNewProduct } from "../controllers/product.controller.js";

const router = express.Router();
router.post("/", addNewProduct);

export default router;
