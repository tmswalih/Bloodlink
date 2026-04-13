const express = require('express');
const router = express.Router();
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Donor Registration
router.post('/donor/register', async (req, res) => {
  try {
    const { name, blood_group, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO Donor (name, blood_group, email, password) VALUES (?, ?, ?, ?)', [name, blood_group, email, hashedPassword]);
    res.status(201).json({ message: 'Donor registered successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'Email already exists' });
    res.status(500).json({ error: error.message });
  }
});

// Donor Login
router.post('/donor/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [donors] = await db.query('SELECT * FROM Donor WHERE email = ?', [email]);
    if (donors.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    
    const valid = await bcrypt.compare(password, donors[0].password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: donors[0].id, type: 'donor' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, id: donors[0].id, name: donors[0].name, blood_group: donors[0].blood_group });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hospital Registration
router.post('/hospital/register', async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO Hospital (name, email, password, address) VALUES (?, ?, ?, ?)', [name, email, hashedPassword, address]);
    res.status(201).json({ message: 'Hospital registered successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') return res.status(400).json({ error: 'Email already exists' });
    res.status(500).json({ error: error.message });
  }
});

// Hospital Login
router.post('/hospital/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const [hospitals] = await db.query('SELECT * FROM Hospital WHERE email = ?', [email]);
    if (hospitals.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
    
    const valid = await bcrypt.compare(password, hospitals[0].password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    
    const token = jwt.sign({ id: hospitals[0].id, type: 'hospital' }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, id: hospitals[0].id, name: hospitals[0].name });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
