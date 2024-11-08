import { Router } from "express";
import { restockProduct, updateStock, getStockDetails, getStockHistory } from "../controller/stock.controller.js";
import { verifyJWT } from "../middleware/auth.middlewares.js";

const router = Router();

// Restock Product
router.post("/restock", verifyJWT, restockProduct);

// Update Stock
router.post("/update", verifyJWT, updateStock);

// Get Stock Details
router.get("/:productId/:shopId", verifyJWT, getStockDetails);

// Get Stock History
router.get("/history/:productId/:shopId", verifyJWT, getStockHistory);

export default router;




