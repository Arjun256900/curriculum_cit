import { pool2, pool3, pool4 } from "../config/db.js";
import express from "express";

const router = express.Router();

router.get("/fetch-syllabus", async (req, res) => {
  const { regulation, department, course_code } = req.query;
  if (!regulation || !department || !course_code) {
    return res.status(400).json({
      message:
        "Missing required parameters: regulation, department, course_code",
    });
  }
  let finalRegulation, client;
  if (regulation == "REG_22") {
    finalRegulation = "REG_22";
    client = await pool2.connect();
  } else if (regulation == "REG_R22R") {
    finalRegulation = "REG_R22R";
    client = await pool3.connect();
  } else if (regulation == "REG_24") {
    finalRegulation = "REG_24";
    client = await pool4.connect();
  }
  try {
    console.log(finalRegulation);
    const coursesToFetch = course_code.split('-');
    const query = `SELECT * FROM ${department} WHERE course_code = ANY($1)`;
    const result = await client.query(query, [coursesToFetch]);
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
