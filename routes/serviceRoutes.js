import express from "express";
import {
  getAllCategories,
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
  addService,
  deleteService,
  updateService,
} from "../controllers/serviceController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Base CRUD routes
router.get("/", protect, getAllCategories);
router.post("/", protect, createCategory);
router.get("/:id", protect, getCategoryById);
router.put("/:id", protect, updateCategory);
router.delete("/:id", protect, deleteCategory);

// Extra service management routes
router.patch("/:id/add", protect, addService);
router.patch("/:id/delete", protect, deleteService);
router.patch("/:id/update", protect, updateService);

export default router;
