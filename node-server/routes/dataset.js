const express = require('express');
const db = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// Get all datasets for authenticated user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [datasets] = await db.execute(
      `SELECT id, herb_name, batch_id, operator, metadata, 
              created_at, status, error_message
       FROM datasets 
       WHERE user_id = ? 
       ORDER BY created_at DESC`,
      [req.user.userId]
    );

    // Parse metadata JSON strings
    const datasetsWithParsedMetadata = datasets.map(dataset => ({
      ...dataset,
      metadata: dataset.metadata ? JSON.parse(dataset.metadata) : null
    }));

    res.json(datasetsWithParsedMetadata);
  } catch (error) {
    console.error('Error fetching datasets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Upload new dataset
router.post('/upload', authenticateToken, async (req, res) => {
  try {
    const { herb_name, batch_id, operator, metadata, data, photo } = req.body;

    // Validate required fields
    if (!herb_name || !batch_id || !operator || !data) {
      return res.status(400).json({ 
        error: 'Herb name, batch ID, operator, and sensor data are required' 
      });
    }

    // Insert dataset
    const [result] = await db.execute(
      `INSERT INTO datasets 
       (user_id, herb_name, batch_id, operator, metadata, sensor_data, photo, created_at, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 'uploaded')`,
      [
        req.user.userId,
        herb_name,
        batch_id,
        operator,
        metadata ? JSON.stringify(metadata) : null,
        JSON.stringify(data),
        photo || null
      ]
    );

    // Fetch the created dataset
    const [datasets] = await db.execute(
      `SELECT id, herb_name, batch_id, operator, metadata, 
              created_at, status, sensor_data
       FROM datasets 
       WHERE id = ?`,
      [result.insertId]
    );

    const dataset = datasets[0];
    dataset.metadata = dataset.metadata ? JSON.parse(dataset.metadata) : null;
    dataset.sensor_data = JSON.parse(dataset.sensor_data);

    res.status(201).json({
      message: 'Dataset uploaded successfully',
      dataset
    });

  } catch (error) {
    console.error('Error uploading dataset:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific dataset
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const [datasets] = await db.execute(
      `SELECT id, herb_name, batch_id, operator, metadata, 
              sensor_data, photo, created_at, status
       FROM datasets 
       WHERE id = ? AND user_id = ?`,
      [req.params.id, req.user.userId]
    );

    if (datasets.length === 0) {
      return res.status(404).json({ error: 'Dataset not found' });
    }

    const dataset = datasets[0];
    dataset.metadata = dataset.metadata ? JSON.parse(dataset.metadata) : null;
    dataset.sensor_data = JSON.parse(dataset.sensor_data);

    res.json({ dataset });
  } catch (error) {
    console.error('Error fetching dataset:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete dataset
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const [result] = await db.execute(
      'DELETE FROM datasets WHERE id = ? AND user_id = ?',
      [req.params.id, req.user.userId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Dataset not found' });
    }

    res.json({ message: 'Dataset deleted successfully' });
  } catch (error) {
    console.error('Error deleting dataset:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;