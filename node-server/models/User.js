const db = require('../config/db');

const User = {
  // Find user by ID
  async findById(id) {
    const [users] = await db.execute(
      'SELECT id, email, name, created_at FROM users WHERE id = ?',
      [id]
    );
    return users[0];
  },

  // Find user by email
  async findByEmail(email) {
    const [users] = await db.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    return users[0];
  },

  // Create new user
  async create(userData) {
    const { email, password, name } = userData;
    const [result] = await db.execute(
      'INSERT INTO users (email, password, name, created_at) VALUES (?, ?, ?, NOW())',
      [email, password, name]
    );
    return result.insertId;
  },

  // Update user profile
  async update(id, userData) {
    const { name, email } = userData;
    const [result] = await db.execute(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
    return result.affectedRows > 0;
  }
};

module.exports = User;