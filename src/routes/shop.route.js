import express from "express";
import {
    createShop,
    getShopDetails,
    updateShop,
    deleteShop
} from "../controller/shop.controller.js";
import { verifyJWT } from "../middleware/auth.middlewares.js";

const router = express.Router();


// public routes

router.route("/").get((req, res) => {
    res.json(
        {
            message: "Shop feature is working"
        }
    );
});


router.post("/create", verifyJWT,  createShop); // Create shop
router.get("/:shopId", getShopDetails); // Get shop details
router.put("/:shopId", verifyJWT, updateShop); // Update shop
router.delete("/:shopId", verifyJWT, deleteShop); // Delete shop

export default router;