import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema(
  {
    vendorInvoiceDate: {
      type: Date,
      required: true,
    },
    vendorInvoiceNumber: {
      type: String,
      required: true,
    },
    vendorName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true, // Salary, Rent, Job Work etc
    },
    invoiceTotal: {
      type: Number,
      required: true,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ['CASH', 'UPI'],
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Expense', expenseSchema);