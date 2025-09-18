import mongoose from 'mongoose';

const receiptItemSchema = new mongoose.Schema({
  id: Number,
  totalKg: { type: Number, required: true },
  numberOfBottles: { type: Number },
  unitCostPrice: { type: Number },
  unitSalePrice: { type: Number },
  cashGiven: { type: Number },
  cashPaid: { type: Number },
  profit: { type: Number }
  
});


const domidInvoiceSchema = new mongoose.Schema({
  account: { type: String, enum: ['Domid I'], required: true },
  date: { type: String, required: true },
  invoiceNo: { type: String, required: true },
    receipt: [receiptItemSchema], // list of purchased items
  grandTotal: { type: Number, required: true }
});

export default mongoose.model('DomidInvoice', domidInvoiceSchema);
