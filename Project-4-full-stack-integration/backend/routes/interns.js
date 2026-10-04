const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET /api/interns - fetch all interns
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM interns ORDER BY created_at DESC');
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch interns' });
  }
});

// POST /api/interns - add a new intern
router.post('/', async (req, res) => {
  const { name, email, batch } = req.body;

  if (!name || !email || !batch) {
    return res.status(400).json({ error: 'name, email and batch are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO interns (name, email, batch) VALUES (?, ?, ?)',
      [name, email, batch]
    );
    const [rows] = await pool.query('SELECT * FROM interns WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Failed to add intern' });
  }
});

// PATCH /api/interns/:id - update status (active/completed)
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['active', 'completed'].includes(status)) {
    return res.status(400).json({ error: "status must be 'active' or 'completed'" });
  }

  try {
    const [result] = await pool.query(
      'UPDATE interns SET status = ? WHERE id = ?',
      [status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Intern not found' });
    }
    res.status(200).json({ message: 'Status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update intern' });
  }
});

// DELETE /api/interns/:id - remove an intern
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query('DELETE FROM interns WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Intern not found' });
    }
    res.status(200).json({ message: 'Intern deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete intern' });
  }
});

module.exports = router;
