const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const cors = require("cors");
const connectDB = require("./backend/db");
const authRoutes = require("./backend/routes/auth.routes");

dotenv.config({ path: path.join(__dirname, "backend", ".env") });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
