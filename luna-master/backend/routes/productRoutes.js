import express from "express";
import {
  getProductById,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
} from "../controllers/productController.js";
import { userProtect, sellerProtect} from "../middleware/authMiddleware.js";

const router = express.Router();

// @desc    Create product
// @route   POST /api/products
// @access  Private/Seller
router.route("/").post(sellerProtect, createProduct);
router.route("/:id/reviews").post(userProtect, createProductReview);

// @desc    Fetch all products by shop
// @route   GET /api/products/shop/:shop
// @access  Public
router.route("/shop/:shop").get(getProducts);

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
router
  .route("/:id")
  .get(getProductById)
  .delete(sellerProtect, deleteProduct)
  .put(sellerProtect, updateProduct);

export default router;
