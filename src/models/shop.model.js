import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true
    },
    shopName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    avatar: {
        type: String,
        default: ""
    },
    coverImage: {
        type: String,
        default: ""
    },
    products: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product" // Reference to the Product model
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Shop = mongoose.model("Shop", shopSchema);