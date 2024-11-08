import { Router } from "express";
import {
    createInvoice,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
} from "../controller/invoice.controller.js";
import { verifyJWT } from "../middleware/auth.middlewares.js";

const router = Router();

// Secured Routes for Invoice Management
router.route("/")
    .post(verifyJWT, createInvoice)  // Create a new invoice

router.route("/:id")
    .get(verifyJWT, getInvoiceById)  // Get specific invoice by ID
    .patch(verifyJWT, updateInvoice) // Update invoice by ID
    .delete(verifyJWT, deleteInvoice); // Delete invoice by ID




export default router;