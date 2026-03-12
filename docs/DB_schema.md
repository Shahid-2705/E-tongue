Dataset Management
GET /datasets
Get all datasets for current user.

Headers:

text
Authorization: Bearer <jwt_token>
Response:

json
[
  {
    "id": 1,
    "herb_name": "Tulsi",
    "batch_id": "BATCH2024-001",
    "operator": "operator123",
    "metadata": {
      "location": "Lab A",
      "sample_type": "Leaf Extract",
      "solvent": "Ethanol"
    },
    "created_at": "2024-01-15T10:30:00Z",
    "status": "uploaded"
  }
]
POST /datasets/upload
Upload new dataset.

Headers:

text
Authorization: Bearer <jwt_token>
Request Body:

json
{
  "herb_name": "Tulsi",
  "batch_id": "BATCH2024-001",
  "operator": "operator123",
  "metadata": {
    "location": "Lab A - New Delhi",
    "sample_type": "Leaf Extract",
    "solvent": "Ethanol",
    "notes": "Sample from morning collection"
  },
  "data": {
    "timestamp": "2024-01-15T10:30:15Z",
    "device_id": "ESP32-ETONGUE-001",
    "voltage_curve": [0.12, 0.15, 0.20, 0.18, 0.22],
    "spectrum": {
      "wavelengths": [450, 500, 550, 600, 650, 700],
      "intensity": [0.3, 0.5, 0.8, 0.6, 0.4, 0.2]
    },
    "pH": 7.2,
    "moisture": 22.5,
    "status": "OK"
  },
  "photo": "base64_encoded_image_string"
}
Response:

json
{
  "message": "Dataset uploaded successfully",
  "dataset": {
    "id": 1,
    "herb_name": "Tulsi",
    "batch_id": "BATCH2024-001",
    "operator": "operator123",
    "metadata": {
      "location": "Lab A - New Delhi",
      "sample_type": "Leaf Extract",
      "solvent": "Ethanol"
    },
    "sensor_data": {
      "timestamp": "2024-01-15T10:30:15Z",
      "device_id": "ESP32-ETONGUE-001",
      "voltage_curve": [0.12, 0.15, 0.20, 0.18, 0.22],
      "spectrum": {
        "wavelengths": [450, 500, 550, 600, 650, 700],
        "intensity": [0.3, 0.5, 0.8, 0.6, 0.4, 0.2]
      },
      "pH": 7.2,
      "moisture": 22.5,
      "status": "OK"
    },
    "created_at": "2024-01-15T10:30:00Z",
    "status": "uploaded"
  }
}
GET /datasets/:id
Get specific dataset by ID.

Headers:

text
Authorization: Bearer <jwt_token>
Response:

json
{
  "dataset": {
    "id": 1,
    "herb_name": "Tulsi",
    "batch_id": "BATCH2024-001",
    "operator": "operator123",
    "metadata": {
      "location": "Lab A",
      "sample_type": "Leaf Extract",
      "solvent": "Ethanol"
    },
    "sensor_data": {
      "timestamp": "2024-01-15T10:30:15Z",
      "device_id": "ESP32-ETONGUE-001",
      "voltage_curve": [0.12, 0.15, 0.20, 0.18, 0.22],
      "spectrum": {
        "wavelengths": [450, 500, 550, 600, 650, 700],
        "intensity": [0.3, 0.5, 0.8, 0.6, 0.4, 0.2]
      },
      "pH": 7.2,
      "moisture": 22.5,
      "status": "OK"
    },
    "photo": "base64_encoded_image_string",
    "created_at": "2024-01-15T10:30:00Z",
    "status": "uploaded"
  }
}
DELETE /datasets/:id
Delete a dataset.

Headers:

text
Authorization: Bearer <jwt_token>
Response:

json
{
  "message": "Dataset deleted successfully"
}
Health Check
GET /health
Check API status.

Response:

json
{
  "status": "OK",
  "message": "E-Tongue API Gateway is running",
  "timestamp": "2024-01-15T10:30:00Z"
}
Error Responses
All endpoints may return the following error responses:

400 Bad Request - Invalid input data

401 Unauthorized - Missing or invalid authentication

403 Forbidden - Valid token but insufficient permissions

404 Not Found - Resource not found

500 Internal Server Error - Server-side error

Error Response Format:

json
{
  "error": "Error description",
  "message": "Detailed error message"
}
Example Usage
JavaScript/Node.js
javascript
const response = await fetch('http://localhost:3000/api/device/live-data', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer your-jwt-token',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log(data);
cURL
bash
# Get live data
curl -H "Authorization: Bearer your-jwt-token" \
     -H "Content-Type: application/json" \
     http://localhost:3000/api/device/live-data

# Upload dataset
curl -X POST -H "Authorization: Bearer your-jwt-token" \
     -H "Content-Type: application/json" \
     -d '{"herb_name":"Tulsi","batch_id":"BATCH001","operator":"user123","data":{...}}' \
     http://localhost:3000/api/datasets/upload
Rate Limiting
100 requests per minute per user

1000 requests per hour per user

Versioning
Current API version: v1.0

text

## `/docs/DB_SCHEMA.md`

```markdown
# Database Schema Documentation

## Database: e_tongue_db

## Overview
This database stores all data for the E-Tongue Herbal Quality Monitoring System, including user accounts, sensor readings, datasets, and device configurations.

## Tables

### users
Stores user authentication and profile information.

| Field | Type | Null | Key | Default | Description |
|-------|------|------|-----|---------|-------------|
| id | INT | NO | PRI | NULL | Primary key, auto increment |
| email | VARCHAR(255) | NO | UNI | NULL | Unique user email address |
| password | VARCHAR(255) | NO | | NULL | Hashed password (bcrypt) |
| name | VARCHAR(255) | NO | | NULL | User's display name |
| created_at | TIMESTAMP | NO | | CURRENT_TIMESTAMP | Account creation timestamp |
| updated_at | TIMESTAMP | NO | | CURRENT_TIMESTAMP | Last update timestamp (auto-updates) |

**Indexes:**
- `PRIMARY` (id)
- `idx_users_email` (email) - For fast email lookups

**Example Data:**
```sql
INSERT INTO users (email, password, name) VALUES 
('admin@example.com', '$2a$12$hashedpassword', 'Admin User'),
('researcher@example.com', '$2a$12$hashedpassword', 'Research Scientist');
datasets
Stores herbal sample datasets with sensor readings and metadata.

Field	Type	Null	Key	Default	Description
id	INT	NO	PRI	NULL	Primary key, auto increment
user_id	INT	NO	MUL	NULL	Foreign key to users table
herb_name	VARCHAR(255)	NO		NULL	Name of the herb (e.g., Tulsi, Ashwagandha)
batch_id	VARCHAR(255)	NO	MUL	NULL	Unique batch identifier
operator	VARCHAR(255)	NO		NULL	Operator who collected the sample
metadata	JSON	YES		NULL	Additional sample metadata (location, solvent, etc.)
sensor_data	JSON	NO		NULL	Complete sensor readings from ESP32
photo	LONGTEXT	YES		NULL	Base64 encoded sample photo (optional)
created_at	TIMESTAMP	NO	MUL	CURRENT_TIMESTAMP	Dataset creation timestamp
status	ENUM	NO		'uploaded'	Upload/processing status
error_message	TEXT	YES		NULL	Error details if processing failed
Status Values:

uploaded - Dataset successfully uploaded

processing - Being processed by ML backend

completed - Processing completed successfully

failed - Processing failed

Indexes:

PRIMARY (id)

idx_datasets_user_id (user_id) - User-based queries

idx_datasets_created_at (created_at) - Time-based queries

idx_datasets_batch_id (batch_id) - Batch lookups

Example Data:

sql
INSERT INTO datasets (user_id, herb_name, batch_id, operator, metadata, sensor_data) VALUES 
(1, 'Tulsi', 'BATCH2024-001', 'operator123', 
 '{"location": "Lab A", "sample_type": "Leaf Extract", "solvent": "Ethanol"}',
 '{"timestamp": "2024-01-15T10:30:15Z", "device_id": "ESP32-ETONGUE-001", "pH": 7.2, "moisture": 22.5}');
sensor_readings
Stores historical sensor readings from ESP32 device for real-time monitoring.

Field	Type	Null	Key	Default	Description
id	INT	NO	PRI	NULL	Primary key, auto increment
user_id	INT	NO	MUL	NULL	Foreign key to users table
device_id	VARCHAR(255)	NO	MUL	NULL	ESP32 device identifier
sensor_data	JSON	NO		NULL	Complete sensor reading data
recorded_at	TIMESTAMP	NO	MUL	CURRENT_TIMESTAMP	Reading timestamp
Indexes:

PRIMARY (id)

idx_sensor_readings_user_device (user_id, device_id) - Combined index for user/device queries

idx_sensor_readings_recorded_at (recorded_at) - Time-based queries

Example Data:

sql
INSERT INTO sensor_readings (user_id, device_id, sensor_data) VALUES 
(1, 'ESP32-ETONGUE-001', 
 '{"timestamp": "2024-01-15T10:30:15Z", "voltage_curve": [0.12,0.15,0.20], "pH": 7.2, "moisture": 22.5}');
device_configs
Stores ESP32 device configuration and connection details.

Field	Type	Null	Key	Default	Description
id	INT	NO	PRI	NULL	Primary key, auto increment
user_id	INT	NO	MUL	NULL	Foreign key to users table
device_id	VARCHAR(255)	NO		NULL	ESP32 device identifier
connection_type	ENUM	NO		'wifi'	Connection type: 'wifi' or 'ble'
ssid	VARCHAR(255)	YES		NULL	Wi-Fi network name
password	VARCHAR(255)	YES		NULL	Wi-Fi password (encrypted)
ip_address	VARCHAR(45)	YES		NULL	Device IP address
last_connected	TIMESTAMP	YES		NULL	Last connection timestamp
created_at	TIMESTAMP	NO		CURRENT_TIMESTAMP	Configuration creation timestamp
Indexes:

PRIMARY (id)

idx_device_configs_user_id (user_id) - User-based queries

Example Data:

sql
INSERT INTO device_configs (user_id, device_id, connection_type, ssid, ip_address) VALUES 
(1, 'ESP32-ETONGUE-001', 'wifi', 'LabWiFi', '192.168.1.100');
Relationships
users.id 1:N datasets.user_id - One user can have many datasets

users.id 1:N sensor_readings.user_id - One user can have many sensor readings

users.id 1:N device_configs.user_id - One user can have multiple device configurations

Entity Relationship Diagram
text
users
┌─────────────┐   1:N   ┌─────────────┐
│    users    │───────→│  datasets   │
├─────────────┤         ├─────────────┤
│ id (PK)     │         │ id (PK)     │
│ email       │         │ user_id (FK)│
│ password    │         │ herb_name   │
│ name        │         │ batch_id    │
│ created_at  │         │ metadata    │
└─────────────┘         └─────────────┘
         │
         │ 1:N
         ↓
┌─────────────┐
│sensor_readings│
├─────────────┤
│ id (PK)     │
│ user_id (FK)│
│ device_id   │
│ sensor_data │
│ recorded_at │
└─────────────┘
         ↑
         │ 1:N
         │
┌─────────────┐
│device_configs│
├─────────────┤
│ id (PK)     │
│ user_id (FK)│
│ device_id   │
│ ssid        │
│ ip_address  │
└─────────────┘
Sample Queries
Get user's recent datasets with metadata
sql
SELECT 
    d.herb_name,
    d.batch_id,
    d.operator,
    d.metadata->>'$.location' as location,
    d.metadata->>'$.solvent' as solvent,
    d.created_at,
    d.status
FROM datasets d
WHERE d.user_id = 1
ORDER BY d.created_at DESC
LIMIT 10;
Get device reading history with sensor values
sql
SELECT 
    sr.device_id,
    sr.recorded_at,
    sr.sensor_data->>'$.pH' as pH,
    sr.sensor_data->>'$.moisture' as moisture,
    sr.sensor_data->>'$.status' as status
FROM sensor_readings sr
WHERE sr.user_id = 1 
    AND sr.device_id = 'ESP32-ETONGUE-001'
    AND sr.recorded_at >= NOW() - INTERVAL 1 DAY
ORDER BY sr.recorded_at DESC;
Count datasets by status for a user
sql
SELECT 
    status,
    COUNT(*) as count,
    MAX(created_at) as latest
FROM datasets 
WHERE user_id = 1
GROUP BY status
ORDER BY count DESC;
Get device connection statistics
sql
SELECT 
    device_id,
    connection_type,
    ip_address,
    last_connected,
    TIMESTAMPDIFF(MINUTE, last_connected, NOW()) as minutes_since_connection
FROM device_configs
WHERE user_id = 1
ORDER BY last_connected DESC;
Data Retention Policy
sensor_readings: Automatic cleanup after 90 days

datasets: Permanent storage (manual deletion only)

device_configs: Permanent until user deletion

Backup Strategy
Recommended backup schedule:

Full backup: Weekly

Incremental backup: Daily

Binary logs: Real-time

Security Considerations
Passwords: Hashed using bcrypt with salt

Sensitive data: Device passwords encrypted at application level

SQL Injection: Prevented using parameterized queries

Access control: Row-level security via user_id foreign keys

text

These two files provide comprehensive documentation for your E-Tongue system:

- **API.md**: Complete API reference with examples, error codes, and usage
- **DB_SCHEMA.md**: Detailed database structure, relationships, and sample queries

Both files are ready to be placed in the `/docs/` folder of your project.
