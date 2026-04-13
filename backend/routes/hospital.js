const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

// Hospital creates a blood request
router.post('/request', authMiddleware(['hospital']), async (req, res) => {
  try {
    const { patient_name, blood_group_required, units_required } = req.body;
    const hospital_id = req.user.id;
    
    const [result] = await db.query(
      'INSERT INTO Patient_Request (hospital_id, patient_name, blood_group_required, units_required) VALUES (?, ?, ?, ?)',
      [hospital_id, patient_name, blood_group_required, units_required]
    );
    res.status(201).json({ message: 'Request created successfully', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Hospital gets all its requests with accepted donors
router.get('/requests', authMiddleware(['hospital']), async (req, res) => {
  try {
    const hospital_id = req.user.id;
    const [requests] = await db.query('SELECT * FROM Patient_Request WHERE hospital_id = ? ORDER BY created_at DESC', [hospital_id]);
    
    // Also fetch acceptances
    for (let reqData of requests) {
      const [accepts] = await db.query(
        `SELECT a.id, a.acceptance_time, a.status, d.name, d.blood_group, d.email
         FROM Donation_Acceptance a
         JOIN Donor d ON a.donor_id = d.id
         WHERE a.request_id = ? ORDER BY a.acceptance_time ASC`,
        [reqData.id]
      );
      reqData.acceptances = accepts;
    }
    
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
