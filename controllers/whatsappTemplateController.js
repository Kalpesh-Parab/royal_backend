import WhatsAppTemplate from '../models/WhatsAppTemplate.model.js';

/* CREATE */
export const createTemplate = async (req, res) => {
  const template = await WhatsAppTemplate.create(req.body);
  res.status(201).json(template);
};

/* READ ALL */
export const getTemplates = async (req, res) => {
  const templates = await WhatsAppTemplate.find().sort({ createdAt: -1 });
  res.json(templates);
};

/* UPDATE */
export const updateTemplate = async (req, res) => {
  const updated = await WhatsAppTemplate.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
};

/* DELETE */
export const deleteTemplate = async (req, res) => {
  await WhatsAppTemplate.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
