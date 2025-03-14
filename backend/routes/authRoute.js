import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/login", async (req, res) => {
  console.log("Received login request:", req.body);
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email, password: password });
    if (!user) {
      return res.status(401).json({ message: "User does not exist" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("User authenticated:", user);

    // Generate the session token and determine which role is logging in
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "12h",
    });

    res.json({ message: "Login successful", token, user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
