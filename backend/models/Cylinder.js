import mongoose from 'mongoose';

const receiptItemSchema = new mongoose.Schema({
  id: Number,

gasFilled  : { type: Number },
  gasDispensed: { type: Number }, 
  difference: { type: Number, required: true },
  costPrice: { type: Number },
  salePrice: { type: Number },
  saleAmount: { type: Number },
  purchaseAmount: { type: Number },
  profit: { type: Number }
  
});


const cylinderInvoiceSchema = new mongoose.Schema({
account: { type: String, default: "Cylinder Gas" , required: true },
  date: { type: String, required: true },
  invoiceNo: { type: String, required: true },
    receipt: [receiptItemSchema], // list of purchased items
  grandTotal: { type: Number, required: true }
});

export default mongoose.model('CylinderInvoice', cylinderInvoiceSchema);
