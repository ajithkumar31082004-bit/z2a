-- Create database and tables for Student Result App
CREATE DATABASE IF NOT EXISTS student_results;
USE student_results;

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
);

CREATE TABLE IF NOT EXISTS subjects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  subject_name VARCHAR(255) NOT NULL,
  marks INT NOT NULL,
  pass TINYINT(1) NOT NULL,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);
