import "./config/env.js";

import app from "./app.js";
import pool from "./config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connected to PostgreSQL at:", res.rows[0].now);

    app.listen(PORT, () => {
      console.log(`server started at port ${PORT}`);
    });
  } catch (error) {
    console.log("Database connection failed...", error);
    process.exit(1);
  }
};

startServer();

process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await pool.end();
  process.exit(0);
});
