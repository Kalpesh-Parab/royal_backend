import Invoice from '../models/Invoice.js';

// helper → current time HH:mm
const getCurrentTime = () => {
  const now = new Date();
  return `${String(now.getHours()).padStart(2, '0')}:${String(
    now.getMinutes()
  ).padStart(2, '0')}`;
};

export const createInvoice = async (req, res) => {
  try {
    const { bikeNumber, categories, invoiceDate, timings } = req.body;

    if (!bikeNumber || !invoiceDate || !timings?.inTime) {
      return res.status(400).json({
        message: 'Bike number, in-date and in-time are required',
      });
    }

    if (!categories || categories.length === 0) {
      return res.status(400).json({
        message: 'At least one service category is required',
      });
    }

    let grandTotal = 0;

    const processedCategories = categories.map((cat) => {
      // 🔒 HARD RULE: services are mandatory
      if (!cat.services || cat.services.length === 0) {
        throw new Error(
          `At least one service must be selected for "${cat.categoryName}"`
        );
      }

      let categoryTotal = 0;

      if (cat.pricingMode === 'SERVICE') {
        categoryTotal = cat.services.reduce(
          (sum, s) => sum + Number(s.price || 0),
          0
        );
      }

      if (cat.pricingMode === 'CATEGORY') {
        if (!cat.categoryPrice || cat.categoryPrice <= 0) {
          throw new Error(`Category price required for "${cat.categoryName}"`);
        }
        categoryTotal = Number(cat.categoryPrice);
      }

      grandTotal += categoryTotal;

      return {
        ...cat,
        categoryTotal,
      };
    });

    // ✅ SERVER CONTROLS OUT TIME
    const invoice = await Invoice.create({
      ...req.body,
      bikeNumber: bikeNumber.toUpperCase(),
      invoiceDate: new Date(invoiceDate), // BIKE IN-DATE
      timings: {
        inTime: timings.inTime,
        outTime: getCurrentTime(), // ⏱️ AUTO
      },
      categories: processedCategories,
      grandTotal,
    });

    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getInvoiceByBikeNumber = async (req, res) => {
  try {
    const invoice = await Invoice.findOne({
      bikeNumber: req.params.bikeNumber.toUpperCase(),
    }).sort({ createdAt: -1 });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
