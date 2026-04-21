import Expense from '../models/expenseModel.js';

/* ---------- CREATE ---------- */
export const createExpense = async (req, res) => {
  try {
    const expense = await Expense.create(req.body);
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create expense' });
  }
};

/* ---------- GET ALL ---------- */
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ paymentDate: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
};

/* ---------- GET SINGLE ---------- */
export const getExpenseById = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Not found' });

    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching expense' });
  }
};

/* ---------- UPDATE ---------- */
export const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!expense) return res.status(404).json({ message: 'Not found' });

    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update' });
  }
};

/* ---------- DELETE ---------- */
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Not found' });

    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete' });
  }
};