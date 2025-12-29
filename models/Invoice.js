import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
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

  services: {
    type: [serviceSchema],
    required: true,
  },

  categoryPrice: {
    type: Number,
    default: 0,
  },

  categoryTotal: {
    type: Number,
    required: true,
  },
});

const invoiceSchema = new mongoose.Schema(
  {
    // ✅ BIKE IN-DATE (ADMIN SELECTS)
    invoiceDate: {
      type: Date,
      required: true,
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
      inTime: {
        type: String,
        required: true,
      },
      outTime: {
        type: String,
        required: true,
      },
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
