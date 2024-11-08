import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Shop } from "../models/shop.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Create a new shop
const createShop = asyncHandler(async (req, res) => {
    const { shopName, description } = req.body;
    const avatarLocalPath = req.file?.path;

    if (!shopName) {
        throw new ApiError(400, "Shop name is required");
    }

    // Upload avatar to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
        throw new ApiError(400, "Error while uploading avatar");
    }

    const shop = await Shop.create({
        owner: req.user._id,
        shopName,
        description,
        avatar: avatar.url
    });

    return res.status(201).json(new ApiResponse(200, shop, "Shop created successfully"));
});

// Get shop details
const getShopDetails = asyncHandler(async (req, res) => {
    const { shopId } = req.params;

    const shop = await Shop.findById(shopId).populate("owner", "fullName username");
    if (!shop) {
        throw new ApiError(404, "Shop not found");
    }

    return res.status(200).json(new ApiResponse(200, shop, "Shop details fetched successfully"));
});

// Update shop details
const updateShop = asyncHandler(async (req, res) => {
    const { shopId } = req.params;
    const { shopName, description } = req.body;
    const avatarLocalPath = req.file?.path;

    const shop = await Shop.findById(shopId);
    if (!shop) {
        throw new ApiError(404, "Shop not found");
    }

    if (avatarLocalPath) {
        // Delete old avatar if it exists
        if (shop.avatar) {
            await deleteFromCloudinary(shop.avatar);
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);
        if (avatar) {
            shop.avatar = avatar.url;
        }
    }

    shop.shopName = shopName || shop.shopName;
    shop.description = description || shop.description;
    await shop.save();

    return res.status(200).json(new ApiResponse(200, shop, "Shop updated successfully"));
});

// Delete a shop
const deleteShop = asyncHandler(async (req, res) => {
    const { shopId } = req.params;

    const shop = await Shop.findById(shopId);
    if (!shop) {
        throw new ApiError(404, "Shop not found");
    }

    // Delete avatar from Cloudinary
    if (shop.avatar) {
        await deleteFromCloudinary(shop.avatar);
    }

    await shop.remove();

    return res.status(200).json(new ApiResponse(200, {}, "Shop deleted successfully"));
});

export {
    createShop,
    getShopDetails,
    updateShop,
    deleteShop
};