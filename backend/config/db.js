import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "arjuncoc101",
  database: "curriculum",
  port: 5432,
});

const pool2 = new Pool({
  host: "localhost",
  user: "postgres",
  password: "arjuncoc101",
  database: "REG_22",
  port: 5432,
});

const pool3 = new Pool({
  host: "localhost",
  user: "postgres",
  password: "arjuncoc101",
  database: "REG_R22R",
  port: 5432,
});

const pool4 = new Pool({
  host: "localhost",
  user: "postgres",
  password: "arjuncoc101",
  database: "REG_24",
  port: 5432,
});

// pool
//   .connect()
//   .then(() => console.log("Connected to the database curriculum"))
//   .catch((err) => console.error("Error connecting to database:", err));

// // Test the connection when the file is executed
// pool.query("SELECT NOW()", (err, res) => {
//   if (err) {
//     console.error("Connection failed:", err);
//   } else {
//     console.log("Connected to PostgreSQL:", res.rows[0]);
//   }
// });

pool2
  .connect()
  .then(() => console.log("Connected to the database REG_22"))
  .catch((err) => console.error("Error connecting to database:", err));

// Test the connection when the file is executed
pool2.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Connection failed:", err);
  } else {
    console.log("Connected to PostgreSQL:", res.rows[0]);
  }
});

// pool3
//   .connect()
//   .then(() => console.log("Connected to the database REG_R22R"))
//   .catch((err) => console.error("Error connecting to database:", err));

// // Test the connection when the file is executed
// pool3.query("SELECT NOW()", (err, res) => {
//   if (err) {
//     console.error("Connection failed:", err);
//   } else {
//     console.log("Connected to PostgreSQL:", res.rows[0]);
//   }
// });

// pool4
//   .connect()
//   .then(() => console.log("Connected to the database REG_24"))
//   .catch((err) => console.error("Error connecting to database:", err));

// // Test the connection when the file is executed
// pool4.query("SELECT NOW()", (err, res) => {
//   if (err) {
//     console.error("Connection failed:", err);
//   } else {
//     console.log("Connected to PostgreSQL:", res.rows[0]);
//   }
// });

export { pool, pool2, pool3, pool4 };
