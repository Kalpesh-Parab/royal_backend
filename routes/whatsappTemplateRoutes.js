import express from 'express';
import {
  createTemplate,
  getTemplates,
  updateTemplate,
  deleteTemplate,
} from '../controllers/whatsappTemplate.controller.js';

const router = express.Router();

router.get('/', getTemplates);
router.post('/', createTemplate);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

export default router;
