import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
const PORT = 5000;
app.get("/health", (req, res) => {
  res.send("Welcome to the Student Management System API");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});