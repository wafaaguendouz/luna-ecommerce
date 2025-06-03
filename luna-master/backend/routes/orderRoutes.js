import express from "express";
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
  updateOrderToDelivered,
} from "../controllers/orderController.js";
import { userProtect, sellerProtect,protect} from "../middleware/authMiddleware.js";

router.route("/").post(userProtect, addOrderItems).get(sellerProtect, getOrders);
router.route("/myorders").get(userProtect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(userProtect, updateOrderToPaid);
router.route("/:id/deliver").put(sellerProtect, updateOrderToDelivered);

export default router;
