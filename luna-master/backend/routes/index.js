import express from "express";
import productRoutes from "./productRoutes.js";
import userRoutes from "./userRoutes.js";
import orderRoutes from "./orderRoutes.js";
import sellerRoutes from "./sellerRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import shopRoutes from "./shopRoutes.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("API is running...");
});

router.use("/products", productRoutes);
router.use("/users", userRoutes);
router.use("/orders", orderRoutes);
router.use("/sellers", sellerRoutes);
router.use("/upload", uploadRoutes);
router.use("/shops", shopRoutes);


export default router;
