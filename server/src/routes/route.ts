import express from "express";
import { stockController } from "../controllers/controller.js";

export const router = express.Router();

router.get("/symbols", stockController.symbols);
router.get("/price", stockController.price);
