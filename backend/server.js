import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import semesterRoutes from "./routes/semesterRoutes.js";
import creditsDisplayRoutes from "./routes/creditsDisplayRoutes.js";
import syllabusRoute from "./routes/syllabusRoute.js";
import loginRoute from "./routes/authRoute.js";
import connection from "./config/mongoDb.js";

dotenv.config();
const app = express();
const port = 5000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // Allow frontend to access backend
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type"], // Allowed headers
  })
);
app.use(bodyParser.json());
app.use("/api/auth", loginRoute);
app.use("/api/syllabus", syllabusRoute);
app.use("/api", creditsDisplayRoutes);
app.use("/", semesterRoutes);

// The server starts only after mongodb connection is established
connection
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
