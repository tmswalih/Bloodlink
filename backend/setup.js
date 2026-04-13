const mysql = require('mysql2/promise');
require('dotenv').config();

async function setup() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  await connection.query(`USE \`${process.env.DB_NAME}\`;`);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS Donor (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      blood_group VARCHAR(10) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      last_donation_date DATE NULL
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS Hospital (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      address TEXT NOT NULL
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS Patient_Request (
      id INT AUTO_INCREMENT PRIMARY KEY,
      hospital_id INT NOT NULL,
      patient_name VARCHAR(255) NOT NULL,
      blood_group_required VARCHAR(10) NOT NULL,
      units_required INT NOT NULL DEFAULT 1,
      status ENUM('pending', 'fulfilled') DEFAULT 'pending',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (hospital_id) REFERENCES Hospital(id)
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS Donation_Acceptance (
      id INT AUTO_INCREMENT PRIMARY KEY,
      request_id INT NOT NULL,
      donor_id INT NOT NULL,
      acceptance_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      status ENUM('primary', 'waitinglist') DEFAULT 'primary',
      FOREIGN KEY (request_id) REFERENCES Patient_Request(id),
      FOREIGN KEY (donor_id) REFERENCES Donor(id)
    )
  `);

  console.log("Database & tables created successfully!");
  process.exit(0);
}

setup().catch(err => {
  console.error("Error setting up database:", err);
  process.exit(1);
});
