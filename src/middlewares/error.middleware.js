export const errorHandling = (err, req, res, next) => {
  console.log("Error message received:", err.message);
  console.log("Error object:", err);

  console.error(err.stack);

  if (err.message === "Insufficient stock") {
    return res.status(400).json({ message: err.message });
  }

  if (err.message === "Product does not exist") {
    return res.status(404).json({ message: err.message });
  }

  res.status(500).json({ message: "Internal Server Error" });
};
