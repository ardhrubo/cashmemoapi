import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";



const registerUser = asyncHandler(async (req, res) => {
    const { name,coverImage, email, username, password, role, tradeLicense, nid, location,TIN,phoneNumber,avatar } = req.body;

    if ([ email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists");
    }
    const user = await User.create({
            name,
            avatar,
            coverImage,
            email,
            password,
            role,
            username: username.toLowerCase(),
            tradeLicense: tradeLicense || "",
            nid: nid || "",
            location: location || "",
            TIN: TIN || "",
            phoneNumber: phoneNumber || "",

        });

        const createdUser = await User.findById(user._id).select("-password -refreshToken");

        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user");
        }

        return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const loginUser =asyncHandler();

const logoutUser =asyncHandler();

const getCurrentUser =asyncHandler();


const getAllInvoices =asyncHandler();


const getUserShopDetails =asyncHandler();



const updateAccountDetails =asyncHandler();


const changeCurrentPassword =asyncHandler();


const refreshAccessToken =asyncHandler();

const updateUserAvatar =asyncHandler();

const updateUserCoverImage =asyncHandler();










export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getAllInvoices,
    getUserShopDetails
}


