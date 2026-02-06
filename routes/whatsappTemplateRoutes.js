import express from 'express';
import {
  createTemplate,
  getTemplates,
  updateTemplate,
  deleteTemplate,
} from '../controllers/whatsappTemplateController.js';

const router = express.Router();

router.get('/', getTemplates);
router.post('/', createTemplate);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

export default router;
