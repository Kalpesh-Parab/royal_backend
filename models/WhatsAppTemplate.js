import mongoose from 'mongoose';

const whatsappTemplateSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, // e.g. "3 Month Reminder"
    },
    message: {
      type: String,
      required: true, // supports {{name}}, {{bikeNumber}}, etc
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model('WhatsAppTemplate', whatsappTemplateSchema);
