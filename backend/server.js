// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS & body parsing
app.use(cors());
app.use(express.json());

// TiDB (MySQL) config
const MYSQL_CONFIG = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: true } : null,
  waitForConnections: true,
  connectionLimit: 10,
};

let pool;

// Init DB (create tables if missing)
async function initDB() {
  pool = mysql.createPool(MYSQL_CONFIG);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS students (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      roll VARCHAR(50) NOT NULL UNIQUE,
      dob DATE NOT NULL,
      total_marks INT NOT NULL DEFAULT 0,
      percentage DECIMAL(5,2) NOT NULL DEFAULT 0.00,
      grade CHAR(1) NOT NULL DEFAULT 'F',
      overall_pass TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS subjects (
      id INT AUTO_INCREMENT PRIMARY KEY,
      student_id INT NOT NULL,
      subject_name VARCHAR(255) NOT NULL,
      marks INT NOT NULL,
      pass TINYINT(1) NOT NULL,
      FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
    )
  `);

  console.log('✅ Database connected & tables ready');
}
