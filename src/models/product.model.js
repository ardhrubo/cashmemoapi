import mongoose, {Schema} from "mongoose" ;


const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    shop: { // Reference to the Shop model (the seller)
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop",
        required: true
    },
    boughtFrom: { // Allow either a reference to User or a string for manual input
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: function(value) {
                // Ensure it's either an ObjectId or a string
                return (
                    mongoose.Types.ObjectId.isValid(value) ||
                    typeof value === 'string'
                );
            },
            message: "boughtFrom must be a valid User ID or a string."
        }
    }
}, {
    timestamps: true
});

export const Product = mongoose.model("Product", productSchema);