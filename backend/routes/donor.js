const express = require('express');
const router = express.Router();
const db = require('../db');
const authMiddleware = require('../middleware/auth');

// Donor fetching matched blood requests
router.get('/requests', authMiddleware(['donor']), async (req, res) => {
  try {
    const donor_id = req.user.id;
    // Get donor blood group
    const [donors] = await db.query('SELECT blood_group FROM Donor WHERE id = ?', [donor_id]);
    if (donors.length === 0) return res.status(404).json({ error: 'Donor not found' });
    const bg = donors[0].blood_group;

    // Fetch pending requests matching blood group
    const [requests] = await db.query(
      `SELECT pr.*, h.name as hospital_name, h.address as hospital_address 
       FROM Patient_Request pr 
       JOIN Hospital h ON pr.hospital_id = h.id 
       WHERE pr.blood_group_required = ? AND pr.status = 'pending' 
       ORDER BY pr.created_at DESC`,
      [bg]
    );

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Donor accepts a request
router.post('/accept/:requestId', authMiddleware(['donor']), async (req, res) => {
  try {
    const { requestId } = req.params;
    const donor_id = req.user.id;

    // Check last donation date to enforce 1 donation per cycle (e.g., 90 days)
    const [donors] = await db.query('SELECT last_donation_date FROM Donor WHERE id = ?', [donor_id]);
    const lastDate = donors[0].last_donation_date;
    if (lastDate) {
      const diffTime = Math.abs(new Date() - new Date(lastDate));
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      if (diffDays < 90) {
         return res.status(400).json({ error: 'You are not eligible to donate yet. (Must be 90 days since last donation)' });
      }
    }

    // Check if donor already accepted
    const [existing] = await db.query('SELECT * FROM Donation_Acceptance WHERE request_id = ? AND donor_id = ?', [requestId, donor_id]);
    if (existing.length > 0) return res.status(400).json({ error: 'You have already accepted this request' });

    // Transaction logic to check units and determine waitlist status
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // get request units & count primary acceptances
      const [reqDataArr] = await connection.query('SELECT units_required, status FROM Patient_Request WHERE id = ? FOR UPDATE', [requestId]);
      const reqData = reqDataArr[0];
      if (!reqData) throw new Error('Request not found');
      
      const [accepts] = await connection.query('SELECT count(*) as count FROM Donation_Acceptance WHERE request_id = ? AND status = "primary"', [requestId]);
      const primaryCount = accepts[0].count;

      let status = 'primary';
      if (primaryCount >= reqData.units_required) {
        status = 'waitinglist';
      }

      await connection.query('INSERT INTO Donation_Acceptance (request_id, donor_id, status) VALUES (?, ?, ?)', [requestId, donor_id, status]);
      
      if (status === 'primary') {
         // Also update last_donation_date
         await connection.query('UPDATE Donor SET last_donation_date = CURRENT_DATE WHERE id = ?', [donor_id]);
      }

      await connection.commit();
      connection.release();
      res.json({ message: 'Request accepted', status });

    } catch (err) {
      await connection.rollback();
      connection.release();
      throw new Error(err.message);
    }

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
