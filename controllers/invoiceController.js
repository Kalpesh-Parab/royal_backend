import Invoice from '../models/Invoice.js';

export const createInvoice = async (req, res) => {
  try {
    const { bikeNumber, categories } = req.body;

    if (!bikeNumber || !categories || categories.length === 0) {
      return res.status(400).json({
        message: 'Bike number and at least one category are required',
      });
    }

    let grandTotal = 0;

    const processedCategories = categories.map((cat) => {
      // 🔒 HARD RULE: services are mandatory
      if (!cat.services || cat.services.length === 0) {
        throw new Error(
          `At least one service must be selected for category "${cat.categoryName}"`
        );
      }

      let categoryTotal = 0;

      // SERVICE-wise pricing
      if (cat.pricingMode === 'SERVICE') {
        categoryTotal = cat.services.reduce(
          (sum, s) => sum + Number(s.price || 0),
          0
        );
      }

      // CATEGORY-wise pricing (services still mandatory!)
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

    const invoice = await Invoice.create({
      ...req.body,
      bikeNumber: bikeNumber.toUpperCase(),
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
