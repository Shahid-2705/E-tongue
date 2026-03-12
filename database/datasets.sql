USE e_tongue_db;

-- Datasets table
CREATE TABLE IF NOT EXISTS datasets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    herb_name VARCHAR(255) NOT NULL,
    batch_id VARCHAR(255) NOT NULL,
    operator VARCHAR(255) NOT NULL,
    metadata JSON,
    sensor_data JSON NOT NULL,
    photo LONGTEXT, -- Base64 encoded image
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('uploaded', 'processing', 'completed', 'failed') DEFAULT 'uploaded',
    error_message TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Indexes for faster queries
CREATE INDEX idx_datasets_user_id ON datasets(user_id);
CREATE INDEX idx_datasets_created_at ON datasets(created_at);
CREATE INDEX idx_datasets_batch_id ON datasets(batch_id);