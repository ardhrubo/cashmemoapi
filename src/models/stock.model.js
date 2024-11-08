import mongoose, { Schema } from "mongoose";

const stockSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        shop: {
            type: Schema.Types.ObjectId,
            ref: "Shop",
            required: true,
        },
        restocker: {
            type: Schema.Types.ObjectId,
            ref: "User", // Both suppliers and wholesalers can restock products
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
            min: 0, // Quantity can't be negative
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
        history: [
            {
                type: {
                    type: String,
                    enum: ["purchase", "sale", "restock"],
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
                remarks: String,
                date: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);



export const Stock = mongoose.model("Stock", stockSchema);