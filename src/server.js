import app from "./app.js";
import dotenv from "dotenv";
import pool from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT | 5000;

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log("Database connection failed...");
  } else {
    console.log("Connected to PostgreSQL at:", res.rows[0].now);
  }
});

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});

process.on("SIGINT", () => {
  console.log("Shutting down server...");
  process.exit();
});
