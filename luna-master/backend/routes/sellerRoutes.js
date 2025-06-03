import express from "express";
const router = express.Router();
import {
  authSeller,
  getSellerProfile,
  registerSeller,
  updateSellerProfile,
  getSellers,
} from "../controllers/sellerController.js";

import {
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";

import {  userProtect, sellerProtect, adminProtect } from "../middleware/authMiddleware.js";

router.route("/").post(registerSeller).get(adminProtect, getSellers);

router.post("/login", authSeller);

router
  .route("/profile")
  .get(sellerProtect, getSellerProfile)
  .put(sellerProtect, updateSellerProfile);

router
  .route("/:id")
  .delete(sellerProtect, deleteUser)
  .get(sellerProtect, getUserById)
  .put(sellerProtect, updateUser);

export default router;
