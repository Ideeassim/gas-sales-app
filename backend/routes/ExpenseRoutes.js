// backend/routes/ExpenseRoutes.js
import express from 'express';
import Expense from '../models/Expense.js';

const router = express.Router();

// POST new expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET all expenses (optional)
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ _id: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE expense by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ error: 'Expense not found' });
    }
    res.json({ message: 'Expense deleted successfully', deletedExpense });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
