import express from "express";
import Domid2 from "../models/Domid2.js";

const router = express.Router();

// POST: Save a new Domid invoice
router.post("/", async (req, res) => {
  try {
    const invoice = new Domid2(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    console.error("Error saving Domid2 invoice:", err.message);
    res.status(500).json({ error: err.message });
  }
});

// GET: Fetch all Domid invoices (optionally filter by account type)
router.get("/", async (req, res) => {
  try {
    const { account } = req.query; // e.g. /api/Domid1s?account=Domid1
    const query = account ? { account } : {};
    const invoices = await Domid2.find(query).sort({ date: -1 });
    res.json(invoices);
  } catch (err) {
    console.error("Error fetching Domid2 invoices:", err.message);
    res.status(500).json({ error: err.message });
  }
});


// DELETE: Delete a Domid invoice by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedInvoice = await Domid2.findByIdAndDelete(id);

    if (!deletedInvoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    res.json({ message: "Invoice deleted successfully", deletedInvoice });
  } catch (err) {
    console.error("Error deleting Domid invoice:", err.message);
    res.status(500).json({ error: err.message });
  }
});
export default router;
