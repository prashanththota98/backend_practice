import { createUser, findUserByEmail } from "../services/user.service.js";
import bcrypt from "bcrypt";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser({ name, email, hashedPassword });
  res.status(201).json({ message: "User created", data: user });
};
