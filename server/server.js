const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const PORT = 5000;

// Connect to MongoDB (mongodb://localhost:27017/notes_db)
connectDB();

// Middleware — mounted before routes so cross-origin requests
// from the Vite dev server (http://localhost:5173) are permitted
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/notes", noteRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
