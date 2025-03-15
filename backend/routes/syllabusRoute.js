import { pool2, pool3, pool4 } from "../config/db.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  const { regulation, department } = req.query;
  console.log("CONTEXTS: ", regulation, department);
  if (!regulation || !department) {
    return res.status(400).json({
      message:
        "Missing required parameters: regulation, department",
    });
  }
  let finalRegulation, client;
  if (regulation == "R22") {
    finalRegulation = "R22";
    client = await pool2.connect();
    console.log("Connected to REG_22");
  } else if (regulation == "R22R") {
    finalRegulation = "R22R";
    client = await pool3.connect();
    console.log("Connected to REG_22R");
  } else if (regulation == "R24") {
    finalRegulation = "R24";
    client = await pool4.connect();
    console.log("Connected to REG_24");
  }
  try {
    console.log(finalRegulation);
    const query = `SELECT * FROM ${department}`;
    const result = await client.query(query);
    console.log(result);
    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: "Syllabus not found" });
    }
    client.release();
  } catch (e) {
    console.error("Error executing query", e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
