// routes/InvoiceRoutes.js
import express from 'express';
import Invoice from '../models/Invoice.js';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
  res.json({ message: 'Invoices route works!' });
});

// Create new invoice
router.post('/', async (req, res) => {
  console.log('Received POST data:', req.body);
  try {
    const invoice = new Invoice(req.body);
    const savedInvoice = await invoice.save();
    res.status(201).json(savedInvoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ _id: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//delete invoice
router.delete('/:id', async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Invoice deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router; // ✅ Correct ESM export
