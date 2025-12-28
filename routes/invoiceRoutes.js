import express from "express";
import {
  createInvoice,
  getInvoiceByBikeNumber,
  getAllInvoices,
} from "../controllers/invoiceController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/", protect, createInvoice);
router.get("/", protect, getAllInvoices);
router.get("/:bikeNumber", protect, getInvoiceByBikeNumber);

export default router;
