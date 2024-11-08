import { Product } from "../models/product.model.js";
import { Shop } from "../models/shop.model.js";
import { Stock } from "../models/stock.model.js";


const createProduct = async (req, res) => {
    try {
        const { name, price, stock, category, shopName, boughtFrom, supplierId } = req.body;

        // Find the shop by name
        const shop = await Shop.findOne({ name: shopName });
        if (!shop) {
            return res.status(404).json({ message: 'Shop not found' });
        }

        // Create the product
        const product = new Product({
            name,
            price,
            stock,
            category,
            shop: shop._id,
            boughtFrom
        });

        await product.save();

        // Create a stock entry for the product
        const stockEntry = new Stock({
            product: product._id,
            shop: shop._id,
            supplier: supplierId, // Ensure supplierId is provided in the request body
            quantity: stock,
            history: [{
                type: 'purchase',
                quantity: stock,
                remarks: 'Initial stock'
            }]
        });

        await stockEntry.save();

        res.status(201).json({ message: 'Product and stock created successfully', product, stock: stockEntry });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating product and stock', error: error.message });
    }
};



// Get product details by ID
const getProductDetails = async (req, res) => {
    try {
        const { productId } = req.params;
        const product = await Product.findById(productId).populate("shop", "name").exec();

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: "Error fetching product details", error: error.message });
    }
};

// Update a product by ID
const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const updates = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error: error.message });
    }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

const buyProduct = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update the product stock
        product.stock += quantity;
        await product.save();

        res.status(200).json({ message: 'Product bought successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error buying product' });
    }
};

// Sell Product
const sellProduct = async (req, res) => {
    try {
        const { productId, quantity } = req.body;

        // Find the product by ID
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Check if there is enough stock to sell
        if (product.stock < quantity) {
            return res.status(400).json({ message: 'Not enough stock to sell' });
        }

        // Update the product stock
        product.stock -= quantity;
        await product.save();

        res.status(200).json({ message: 'Product sold successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error selling product' });
    }
};



// Exporting the controller functions
export {
    createProduct,
    getProductDetails,
    updateProduct,
    deleteProduct,
    buyProduct,
    sellProduct
};