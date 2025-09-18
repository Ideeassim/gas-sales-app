import express from "express";
import Cylinder from "../models/Cylinder.js";

const router = express.Router();

// POST: Save a new Cylinder invoice
router.post("/", async (req, res) => {
  try {
    const invoice = new Cylinder(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    console.error("Error savingCylinder invoice:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET: Fetch all Cylinder invoices (optionally filter by account type)
router.get("/", async (req, res) => {
  try {
    const { account } = req.query; 
    const query = account ? { account } : {};
    const invoices = await Cylinder.find(query).sort({ date: -1 });
    res.json(invoices);
  } catch (err) {
    console.error("Error fetching Cylinder invoices:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// DELETE: Delete a Cylinder invoice by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInvoice = await Cylinder.findByIdAndDelete(id);

    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json({ message: "Invoice deleted successfully", deletedInvoice });
  } catch (err) {
    console.error("Error deleting Cylinder invoice:", err.message);
    res.status(500).json({ error: err.message });
  }
});
export default router;
