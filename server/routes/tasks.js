const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const authenticateToken = require('../middleware/auth');

// Create a task
router.post('/', authenticateToken, async (req, res) => {
  const { title, description, priority, status } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO tasks (title, description, priority, status, user_id)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, priority, status, req.user.userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// Get all tasks for logged-in user (optional filters)
router.get('/', authenticateToken, async (req, res) => {
  const { status, priority } = req.query;
  console.log(status, priority);
  console.log(req.query);
  let query = 'SELECT * FROM tasks WHERE user_id = $1';
  const values = [req.user.userId];

  if (status) {
    values.push(status);
    query += ` AND status = $${values.length}`;
  }
  if (priority) {
    values.push(priority);
    query += ` AND priority = $${values.length}`;
  }

  console.log(query, values);
  try {
    const result = await pool.query(query, values);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// Get a task by ID
router.get('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
      [id, req.user.userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Task not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
});

// Update a task
router.put('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, status } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tasks SET title = $1, description = $2, priority = $3, status = $4
       WHERE id = $5 AND user_id = $6 RETURNING *`,
      [title, description, priority, status, id, req.user.userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Task not found or not yours' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// Delete a task
router.delete('/:id', authenticateToken, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.userId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Task not found or not yours' });
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;