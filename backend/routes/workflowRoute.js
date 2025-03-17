import express from "express";
import Request from "../models/Request.js";

const router = express.Router();

// Here we register a new request
router.post("/modify-course", async (req, res) => {
  console.log("Received course modification request:", req.body);
  const { course, requestText, requestedBy, department } = req.body;
  try {
    const newRequest = new Request(
      course,
      requestText,
      requestedBy,
      department
    );
    await newRequest.save();
  } catch (err) {
    console.error("Error modifying course:", err);
  }
});

// To handle as a HOD
router.post("/hod-action", async (req, res) => {
  console.log("Received HOD action request:", req.body);
});

export default router;
