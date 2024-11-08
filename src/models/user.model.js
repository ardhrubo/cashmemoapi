import mongoose, {Schema} from "mongoose" ;
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema({

    username: {
        type:String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true,
        index:true
    },
    email: {
        type:String,
        required: true,
        unique: true,
        lowercase:true,
        trim:true
    },
    role:{
        type:String,
        enum: ['supplier', 'wholesaler']

    },
    name: {
        type:String,
        trim:true,
        index: true
    },
    avatar:{
        type: String, // cloudinary url
    },
    coverImage:{
        type: String // cloudinary url
    },
    tradeLicense:{
        type: String,
    },
    nid:{
        type: String,
    },
    location:{
        type: String,
    },
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken:{
        type:String,
    },
    shops: [{ // Array of references to Shop model
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shop"
    }],
    invoices: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice' // Assuming you have an Invoice model
    }],
    TIN: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },



},{
    timestamps: true
})





export const User = mongoose.model("User", userSchema)






