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
    .get(verifyJWT, getInvoiceById)  
    .patch(verifyJWT, updateInvoice) 
    .delete(verifyJWT, deleteInvoice); 




export default router;