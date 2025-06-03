import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import Seller from "../models/sellerModel.js";
import Shop from "../models/shopModel.js";
import slugify from "slugify";

// @desc    Auth Seller & get token
// @route   POST /api/sellers/login
// @access  Public
const authSeller = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const seller = await Seller.findOne({ email }).populate("shop");

  if (seller && (await seller.matchPassword(password))) {
    res.json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      isAdmin:seller.isAdmin,
      shop: seller.shop,
      token: generateToken(seller._id, "seller"),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc    Register a new user
// @route   POST /api/users/
// @access  Public

const registerSeller = asyncHandler(async (req, res) => {
  const { name, email, password, shop: shopName, offer } = req.body;
  const slug =  slugify(shopName).toLowerCase();
  const sellerExists = await Seller.findOne({ email });
  const shopExists = await Shop.findOne({slug});

  if (sellerExists) {
    res.status(400);
    throw new Error("Email already exists");
  }
  if (shopExists) {
    res.status(400);
    throw new Error("Shop already exists");
  }

  const shop = await Shop.create({
    name: shopName,
    slug: slugify(shopName).toLowerCase(),
    offer,
  });
  const seller = await Seller.create({
    name,
    email,
    password,
    shop,
  });

  if (seller) {
    res.status(201).json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      shop: shop,
      offer: seller.offer,
      token: generateToken(seller._id, "seller"),
    });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});


// @desc    Get all sellers
// @route   GET /api/sellers
// @access  Private/Admin
const getSellers = asyncHandler(async (req, res) => {
  const sellers = await Seller.find();
  res.json(sellers);
});

// @desc    get user profile
// @route   GET /api/users/profile
// @access  Private

const getSellerProfile = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.seller._id).populate("shop");

  if (seller) {
    res.json({
      _id: seller._id,
      name: seller.name,
      email: seller.email,
      shop: seller.shop.name,
    });
  } else {
    res.status(404);
    throw new Error("Seller not found");
  }
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateSellerProfile = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.seller._id).populate("shop");

  if (seller) {
    seller.name = req.body.name || seller.name;
    seller.email = req.body.email || seller.email;

    if (req.body.password) {
      seller.password = req.body.password;
    }

    const updatedSeller = await seller.save();
    res.json({
      _id: updatedSeller._id,
      name: updatedSeller.name,
      email: updatedSeller.email,
      shop: updatedSeller.shop.name,
      token: generateToken(updatedSeller._id, "seller"),
    });
  } else {
    res.status(404);
    throw new Error("Seller not found");
  }
});

export { authSeller, registerSeller, getSellerProfile, updateSellerProfile,getSellers };
