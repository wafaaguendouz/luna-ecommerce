import express from "express";
const router = express.Router();
import {
  getShops,
  deleteShop,
  getShopById,
} from "../controllers/shopController.js";
import {adminProtect} from "../middleware/authMiddleware.js";

router.route("/").get(adminProtect, getShops);

router
  .route("/:id")
  .delete(adminProtect, deleteShop)
  .get(adminProtect, getShopById);

export default router;
