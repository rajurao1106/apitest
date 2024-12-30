const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define Food Schema and Model
const foodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: Number,
});

const Food = mongoose.model("Food", foodSchema);

// Routes
app.get("/api/foods", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch foods" });
  }
});

app.post("/api/foods", async (req, res) => {
  // Corrected: Using object property assignment with ':' instead of '='
  const { name, description, price } = req.body;
  
  const food = new Food({
    name: "raju",  // Corrected the assignment
    description: "this is a test", // Corrected the assignment
    price: 123,  // Corrected the assignment (Number, not string)
  });

  try {
    await food.save();
    res.status(201).json({ message: "Food added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to add food" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
