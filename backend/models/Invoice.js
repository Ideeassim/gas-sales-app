
import mongoose from 'mongoose';


const receiptItemSchema = new mongoose.Schema({
  id: Number,
  item: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  total: { type: Number, required: true }
});

const invoiceSchema = new mongoose.Schema({
  account: { type: String, required: true }, // e.g. 'Accessories'
  date: { type: String, required: true }, // keep as string since you already format it in frontend
  invoiceNo: { type: String, required: true },
  receipt: [receiptItemSchema], // list of purchased items
  grandTotal: { type: Number, required: true }
});

export default mongoose.model('Invoice', invoiceSchema);

