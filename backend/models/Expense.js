// backend/models/Expense.js
import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  Date: { type: String, required: true },
InvoiceNo: { type: String, required: true },
Amount: { type: Number, required: true },
Narration: { type: String, required: false },
Account: { type: String, required: true},
Type: {type: String, required: true}
  // Add other fields as needed
});

export default mongoose.model('Expense', expenseSchema);

