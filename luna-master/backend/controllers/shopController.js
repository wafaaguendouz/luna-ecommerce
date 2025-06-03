import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Shop from "../models/shopModel.js";


// @desc    Get all shops
// @route   GET /api/shops
// @access  Private/SuperAdmin
const getShops = asyncHandler(async (req, res) => {
  const shops = await Shop.find();
  res.json(shops);
});



// @desc    Delete shop
// @route   DELETE /api/shops/:id
// @access  Private/SuperAdmin
const deleteShop = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id);

  if (shop) {
    await shop.remove();
    res.json({ message: "Shop removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get shop by ID
// @route   GET /api/shops/:id
// @access  Private/SuperAdmin
const getShopById = asyncHandler(async (req, res) => {
  const shop = await Shop.findById(req.params.id);
  if (shop) {
    res.json(shop);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});


export {
  getShops,
  deleteShop,
  getShopById,
};
