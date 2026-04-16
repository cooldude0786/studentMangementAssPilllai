import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
const PORT = 5000;
console.log(process.env.DATABASE_URL);
app.get("/", (req, res) => {
  res.send("Welcome to the Student Management System API");
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});