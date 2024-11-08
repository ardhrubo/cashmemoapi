import { Product } from "../models/product.model.js";
import { Shop } from "../models/shop.model.js";
import { User } from "../models/user.model.js";
import { Stock } from "../models/stock.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";
import { Invoice } from "../models/invoice.model.js";

// Create an Invoice (Buy or Sell Product)
const createInvoice = async (req, res) => {
    try {
        const { products, buyerDetails, paymentMethod, notes,shop,seller,totalAmount } = req.body;

        // let totalAmount = 0;

        // const restockerId = req.user._id; 
        // const restocker = await User.findById(restockerId);
        
        // if (!restocker || (restocker.role !== "supplier" && restocker.role !== "wholesaler")) {
        //     return res.status(403).json({ message: "Only suppliers and wholesalers can restock products." });
        // }

        
        // const shop = await Shop.findOne({ owner: restockerId });
    
        // // Process each product to calculate total and update stock
        // for (const item in products) {
        //     const { name, quantity, price } = item;
        //     totalAmount += quantity * price;

        //     const stock = await Stock.findOne({product:name});
            

        //     if (!stock) {
        //         if (req.user.role === "supplier") {
        //     // Create stock entry when supplier buys from farmer
                     
        //      const product = await Product.findOne(name);

        //      console.log(name)

        //      if (!product) {
        //      return res.status(404).json({ message: "Product not found in the user's shop." });
        //      }
        //             await Stock.create({
        //                 product: product._id,
        //                 shop: shop._id,
        //                 restocker: restockerId,
        //                 quantity,
        //                 history: [{ type: "restock", quantity, date: new Date() }],
        //             });
        //         } else {
        //             return res.status(400).json({ message: "Stock not available for this product." });
        //         }
        //     } else {
        //         if (req.user.role === "wholesaler") {
        //             // Decrease stock when selling to retailer
        //             if (stock.quantity < quantity) {
        //                 return res.status(400).json({ message: `Insufficient stock for product: ${name}` });
        //             }
        //             stock.quantity -= quantity;
        //             stock.history.push({ type: "sale", quantity });
        //         } else if (req.user.role === "supplier") {
        //             // Increase stock when buying from farmer
        //             stock.quantity += quantity;
        //             stock.history.push({ type: "purchase", quantity });
        //         }
        //         await stock.save();
        //     }
        // }

        // Create the invoice with all details
        const invoice = new Invoice({
            seller,
            shop,
            buyerDetails,
            products,
            totalAmount,
            paymentMethod,
            notes,
        });

        await invoice.save();

        res.status(201).json({ message: "Invoice created successfully.", invoice });
    } catch (error) {
        res.status(500).json({ message: "Error creating invoice.", error: error.message });
    }
};

// Get all invoice Details
const getAllInvoice = async (req, res) => {
    try {
        const { invoiceId } = req.params;
        const invoice = await Invoice.findById(invoiceId)
            .populate("seller", "name")
            .populate("shop", "name")
            .populate("products.product", "name");

        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found." });
        }

        res.status(200).json(invoice);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving invoice details.", error: error.message });
    }
};

// Update Invoice
const updateInvoice = async (req, res) => {
    try {
        const { invoiceId } = req.params;
        const updatedInvoice = await Invoice.findByIdAndUpdate(invoiceId, req.body, { new: true });

        if (!updatedInvoice) {
            return res.status(404).json({ message: "Invoice not found." });
        }

        res.status(200).json({ message: "Invoice updated successfully.", updatedInvoice });
    } catch (error) {
        res.status(500).json({ message: "Error updating invoice.", error: error.message });
    }
};

// Delete Invoice
const deleteInvoice = async (req, res) => {
    try {
        const { invoiceId } = req.params;
        const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);

        if (!deletedInvoice) {
            return res.status(404).json({ message: "Invoice not found." });
        }

        res.status(200).json({ message: "Invoice deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: "Error deleting invoice.", error: error.message });
    }
};

const getInvoiceById = asyncHandler(async (req, res) => {
    const { id } = req.params; // Get the invoice ID from the request parameters

    const invoice = await Invoice.findById(id) // Find the invoice by ID
        .populate('items.product') // Optionally populate product details if you have a reference to a product model
        .lean(); // Use lean to return plain JavaScript objects instead of Mongoose documents

    if (!invoice) {
        throw new ApiError(404, "Invoice not found"); // Throw an error if the invoice is not found
    }

    return res.status(200).json(new ApiResponse(200, invoice, "Invoice fetched successfully"));
});



export {
    createInvoice,
    getInvoiceById,
    updateInvoice,
    deleteInvoice,
    getAllInvoice
}

