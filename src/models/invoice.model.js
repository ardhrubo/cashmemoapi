import mongoose from "mongoose";
const { Schema, model } = mongoose;

const invoiceSchema = new Schema(
    {
        
        buyerDetails: {
            name: { type: String, required: true, trim: true },
            phone: { type: String, required: true, trim: true },
            email: { type: String, trim: true, lowercase: true },
            address: { type: String, trim: true },
        },
        seller: {
            // type: Schema.Types.ObjectId,
            // ref: "User", // Refers to wholesaler or supplier
            // required: true,
            type:String
        },
        shop: {
            type: Schema.Types.ObjectId,
            ref: "Shop", // Refers to the seller's shop
            // required: true,
        },
        products: [
            {
                product: {
                    type: String,
                    // ref: "Product", // Refers to purchased product
                    // required: true,
                },
                quantity: { type: Number, required: true, min: 1 },
                price: { type: Number, required: true },
                total: { type: Number }, // quantity * price
            },
        ],
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["paid", "pending", "failed"],
            default: "pending",
            
        },
        paymentMethod: {
            type: String,
            enum: ["cash", "card", "bank transfer", "mobile payment"],
            
        },
        issuedDate: {
            type: Date,
            default: Date.now,
        },
        dueDate: {
            type: Date,
        },
        notes: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

export const Invoice = model("Invoice", invoiceSchema);




