import express from 'express';
import {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  getInvoiceByBikeNumber,
  searchInvoices,
} from '../controllers/invoiceController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

/* CREATE */
router.post('/', protect, createInvoice);

/* READ */
router.get('/', protect, getAllInvoices);

/* SEARCH — MUST COME BEFORE DYNAMIC PARAMS */
router.get('/search', protect, searchInvoices);

/* GET BY ID — used for PRINT */
router.get('/id/:id', protect, getInvoiceById);

/* OPTIONAL: latest invoice of a bike */
router.get('/by-bike/:bikeNumber', protect, getInvoiceByBikeNumber);

export default router;
