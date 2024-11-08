
import { Router } from "express";
import {
    createProduct,
    getProductDetails,
    updateProduct,
    deleteProduct,
    buyProduct,
    sellProduct
} from "../controller/product.controller.js";
import { verifyJWT } from "../middleware/auth.middlewares.js";

const router = Router();

// Public routes
router.get("/", (req, res) => {
    res.json({
        message: "Product feature is working"
    });
});



// Product CRUD Routes
router.post("/create", verifyJWT, createProduct);
router.get("/:productId", verifyJWT, getProductDetails);
router.patch("/:productId", verifyJWT, updateProduct);
router.delete("/:productId", verifyJWT, deleteProduct);

// Buy Product (updates stock)
router.post("/buy", verifyJWT, buyProduct);

// Sell Product (updates stock)
router.post("/sell", verifyJWT, sellProduct);

export default router;