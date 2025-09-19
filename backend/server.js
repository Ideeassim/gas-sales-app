import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import invoiceRoutes from './routes/InvoiceRoutes.js';
import expenseRoutes from './routes/ExpenseRoutes.js';
import domid1Routes from "./routes/domid1Routes.js";
import domid2Routes from "./routes/domid2Routes.js";
import cylinderRoutes from "./routes/cylinderRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: "https://gassync.netlify.app/", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(bodyParser.json());
app.use(express.json());



// fake "database"
const USERS = [
  { username: "testuser", password: "12345" },
  { username: "admin", password: "admin123" }
];

// API route to create a user
app.post("/api/create-user", (req, res) => {
  const { username, password } = req.body;

  // check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ success: false, message: "Username and password are required" });
  }

  // check if username already exists
  const existingUser = USERS.find(user => user.username === username);
  if (existingUser) {
    return res.status(400).json({ success: false, message: "Username already exists" });
  }

  // add new user
  USERS.push({ username, password });
  return res.status(201).json({ success: true, message: "User created successfully" });
});


// login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// API routes
app.use('/api/invoices', invoiceRoutes);
app.use('/api/expenses', expenseRoutes);
app.use("/api/domidInvoices", domid1Routes);
app.use("/api/domid2Invoices", domid2Routes);
app.use("/api/cylinderInvoices", cylinderRoutes);

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve frontend (only if you’ve built it in frontend/dist)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// Fallback to React's index.html for SPA routes

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist', 'index.html'));
});

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});

