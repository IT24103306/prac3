const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const itemRoutes = require("./routes/itemRoutes");

dotenv.config();

const app = express();

// Allows React frontend to send requests to this backend.
app.use(cors());

// Allows Express to read JSON data from request bodies.
app.use(express.json());

// Main API route for items.
app.use("/api/items", itemRoutes);

app.get("/", (req, res) => {
  res.send("MERN Item Manager backend is running");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection failed");
    console.log(error.message);
  });
