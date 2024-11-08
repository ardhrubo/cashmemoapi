import { Product } from "../models/product.model.js";
import { Shop } from "../models/shop.model.js";
import { User } from "../models/user.model.js";
import { Stock } from "../models/stock.model.js";

// Create or Restock Product (Only Suppliers and Wholesalers)
const restockProduct = async (req, res) => {
    try {
        const { productName, quantity, remarks } = req.body;
        const restockerId = req.user._id; // Assuming user info is available from JWT

        // Check if the user is a supplier or wholesaler
        const restocker = await User.findById(restockerId);
        if (!restocker || (restocker.role !== "supplier" && restocker.role !== "wholesaler")) {
            return res.status(403).json({ message: "Only suppliers and wholesalers can restock products." });
        }

        // Find the shop associated with the user
        const shop = await Shop.findOne({ owner: restockerId });
        if (!shop) {
            return res.status(404).json({ message: "Shop not found for the user." });
        }

        // Find the product by name within the user's shop
        const product = await Product.findOne({ name: productName, shop: shop._id });
        if (!product) {
            return res.status(404).json({ message: "Product not found in the user's shop." });
        }

        // Find or create a stock entry
        let stock = await Stock.findOne({ product: product._id, shop: shop._id });

        if (stock) {
            stock.quantity += quantity;
            stock.history.push({ type: "restock", quantity, remarks, date: new Date() });
        } else {
            stock = new Stock({
                product: product._id,
                shop: shop._id,
                restocker: restockerId,
                quantity,
                history: [{ type: "restock", quantity, remarks, date: new Date() }],
            });
        }

        stock.lastUpdated = new Date();
        await stock.save();
        res.status(200).json({ message: "Product restocked successfully.", stock });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error restocking product.", error: error.message });
    }
};



// Update Stock on Sale or Purchase
const updateStock = async (req, res) => {
    try {
        const { productId, shopId, quantity, type, remarks } = req.body;

        const stock = await Stock.findOne({ product: productId, shop: shopId });

        if (!stock) {
            return res.status(404).json({ message: "Stock not found." });
        }

        if (type === "sale" && stock.quantity < quantity) {
            return res.status(400).json({ message: "Insufficient stock." });
        }

        stock.quantity = type === "sale" ? stock.quantity - quantity : stock.quantity + quantity;
        stock.history.push({ type, quantity, remarks, date: new Date() });

        stock.lastUpdated = new Date();
        await stock.save();
        res.status(200).json({ message: "Stock updated successfully.", stock });
    } catch (error) {
        res.status(500).json({ message: "Error updating stock.", error: error.message });
    }
};

// Get Stock Details (with History)
const getStockDetails = async (req, res) => {
    try {
        const { productId, shopId } = req.params;

        const stock = await Stock.findOne({ product: productId, shop: shopId })
            .populate("product", "name price")
            .populate("shop", "name")
            .populate("supplier", "name");

        if (!stock) {
            return res.status(404).json({ message: "Stock not found." });
        }

        res.status(200).json(stock);
    } catch (error) {
        res.status500().json({ message: "Error fetching stock details.", error: error.message });
    }
};

// Get Stock History
const getStockHistory = async (req, res) => {
    try {
        const { productId, shopId } = req.params;

        const stock = await Stock.findOne({ product: productId, shop: shopId })
            .select("history")
            .populate("history.supplier", "name");

        if (!stock) {
            return res.status(404).json({ message: "Stock not found." });
        }

        res.status(200).json(stock.history);
    } catch (error) {
        res.status(500).json({ message: "Error fetching stock history.", error: error.message });
    }
};

export { restockProduct, updateStock, getStockDetails, getStockHistory };