const db = require('../config/db');

const Dataset = {
  // Find all datasets for a user
  async findByUserId(userId, limit = 50) {
    const [datasets] = await db.execute(
      `SELECT id, herb_name, batch_id, operator, metadata, 
              sensor_data, photo, created_at, status, error_message
       FROM datasets 
       WHERE user_id = ? 
       ORDER BY created_at DESC 
       LIMIT ?`,
      [userId, limit]
    );

    return datasets.map(dataset => ({
      ...dataset,
      metadata: dataset.metadata ? JSON.parse(dataset.metadata) : null,
      sensor_data: dataset.sensor_data ? JSON.parse(dataset.sensor_data) : null
    }));
  },

  // Find dataset by ID and user ID
  async findByIdAndUser(id, userId) {
    const [datasets] = await db.execute(
      `SELECT id, herb_name, batch_id, operator, metadata, 
              sensor_data, photo, created_at, status
       FROM datasets 
       WHERE id = ? AND user_id = ?`,
      [id, userId]
    );

    if (datasets.length === 0) return null;

    const dataset = datasets[0];
    dataset.metadata = dataset.metadata ? JSON.parse(dataset.metadata) : null;
    dataset.sensor_data = dataset.sensor_data ? JSON.parse(dataset.sensor_data) : null;

    return dataset;
  },

  // Create new dataset
  async create(datasetData) {
    const { user_id, herb_name, batch_id, operator, metadata, sensor_data, photo } = datasetData;
    
    const [result] = await db.execute(
      `INSERT INTO datasets 
       (user_id, herb_name, batch_id, operator, metadata, sensor_data, photo, created_at, status) 
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 'uploaded')`,
      [
        user_id,
        herb_name,
        batch_id,
        operator,
        metadata ? JSON.stringify(metadata) : null,
        JSON.stringify(sensor_data),
        photo || null
      ]
    );

    return result.insertId;
  },

  // Delete dataset
  async delete(id, userId) {
    const [result] = await db.execute(
      'DELETE FROM datasets WHERE id = ? AND user_id = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  },

  // Update dataset status
  async updateStatus(id, status, errorMessage = null) {
    const [result] = await db.execute(
      'UPDATE datasets SET status = ?, error_message = ? WHERE id = ?',
      [status, errorMessage, id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = Dataset;