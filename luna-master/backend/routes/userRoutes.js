import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import {  userProtect, sellerProtect} from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(sellerProtect, getUsers);

router.post("/login", authUser);

router
  .route("/profile")
  .get(userProtect, getUserProfile)
  .put(userProtect, updateUserProfile);

router
  .route("/:id")
  .delete(sellerProtect, deleteUser)
  .get(sellerProtect, getUserById)
  .put(sellerProtect, updateUser);

export default router;
