import { Router } from "express";
import {
    createInvoice,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
    getAllInvoice
} from "../controller/invoice.controller.js";
import { verifyJWT } from "../middleware/auth.middlewares.js";

const router = Router();

// Secured Routes for Invoice Management
router.route("/create")
    .post(verifyJWT, createInvoice)  // Create a new invoice

router.route("/:id")
    .get(verifyJWT, getInvoiceById)  
    .patch(verifyJWT, updateInvoice) 
    .delete(verifyJWT, deleteInvoice); 




export default router;