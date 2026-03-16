import jwt from "jsonwebtoken";
import {
  deleteRefreshToken,
  findRefreshToken,
} from "../services/refresh.service.js";
import { findUserById } from "../services/user.service.js";

export const refreshAccessToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }
    const storedToken = await findRefreshToken(refreshToken);
    console.log("Stored Token:", storedToken);
    if (!storedToken) {
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    if (new Date(storedToken.expires_at) < new Date()) {
      await deleteRefreshToken(refreshToken);
      return res.status(403).json({ message: "Refresh token expired" });
    }
    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      console.log("Decoded payload:", payload);
    } catch (err) {
      console.log("JWT ERROR:", err.message);
      if (
        err.name === "TokenExpiredError" ||
        err.name === "JsonWebTokenError"
      ) {
        await deleteRefreshToken(refreshToken);
      }
      return res.status(403).json({ message: "Invalid refresh token" });
    }
    const user = await findUserById(payload.sub);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const accessToken = jwt.sign(
      { sub: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
