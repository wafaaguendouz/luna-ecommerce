import express from "express";
import path from "path";

const router = express.Router();

// We need to define the path to react built files.
router.use(express.static(path.join(path.resolve(), "frontend", "build")));

// we use * to redirect all request to React Router.
router.get("*", async (req, res) => {
  res.sendFile(path.join(path.resolve(), "frontend", "build", "index.html"));
});

export default router;
