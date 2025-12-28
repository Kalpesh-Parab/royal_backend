import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  price: {
    type: Number, // admin decides price
    default: 0,
  },
});

const categorySchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceCategory',
    required: true,
  },

  categoryName: {
    type: String,
    required: true,
  },

  pricingMode: {
    type: String,
    enum: ['SERVICE', 'CATEGORY'],
    required: true,
  },

  // ✅ services MUST exist (validated in controller)
  services: {
    type: [serviceSchema],
    required: true,
  },

  // used only when pricingMode === CATEGORY
  categoryPrice: {
    type: Number,
    default: 0,
  },

  // calculated in backend
  categoryTotal: {
    type: Number,
    required: true,
  },
});

const invoiceSchema = new mongoose.Schema(
  {
    invoiceDate: {
      type: Date,
      default: Date.now,
    },

    bikeNumber: {
      type: String,
      required: true,
      uppercase: true,
      index: true,
    },

    owner: {
      name: String,
      address: String,
      mobile: String,
      email: String,
    },

    bike: {
      model: String,
      kms: Number,
    },

    timings: {
      inTime: String,
      outTime: String,
    },

    categories: {
      type: [categorySchema],
      required: true,
    },

    grandTotal: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Invoice', invoiceSchema);
