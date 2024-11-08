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
    image:{
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

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username:this.username,
            name: this.name
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}


userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10)
    next()
})


export const User = mongoose.model("User", userSchema)






