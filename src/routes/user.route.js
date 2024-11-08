import { Router } from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getAllInvoices,
    getUserShopDetails
} from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middlewares.js";

const router = Router();

// Public routes

router.route("/").get((req, res) => {
    res.json(
        {
            message: "User feature is working"
        }
    );
});


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

// Secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(verifyJWT, refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/avatar").patch(verifyJWT, updateUserAvatar);
router.route("/coverImage").patch(verifyJWT,  updateUserCoverImage);

// get all invoice and shop
router.route("/invoices").get(verifyJWT, getAllInvoices);
router.route("/userShop").get(verifyJWT, getUserShopDetails);

export default router;





