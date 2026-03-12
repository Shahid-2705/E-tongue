markdown
# E-Tongue API Documentation

## Base URL
http://localhost:3000/api

text

## Authentication
All endpoints except `/auth/login` and `/auth/register` require JWT authentication.

### Headers
Authorization: Bearer <jwt_token>
Content-Type: application/json

text

## API Endpoints

### Authentication

#### POST /auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}
Response:

json
{
  "message": "User created successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
POST /auth/login
Login user.

Request Body:

json
{
  "email": "user@example.com",
  "password": "password123"
}
Response: Same as register response.

GET /auth/profile
Get current user profile.

Headers:

text
Authorization: Bearer <jwt_token>
Response:

json
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "created_at": "2024-01-15T10:30:00Z"
  }
}
POST /auth/logout
Logout user (client-side token removal).

Headers:

text
Authorization: Bearer <jwt_token>
Response:

json
{
  "message": "Logout successful"
}
Device Management
GET /device/status
Get ESP32 device connection status.

Headers:

text
Authorization: Bearer <jwt_token>
Response:

json
{
  "connected": true,
  "device_id": "ESP32-ETONGUE-001",
  "last_seen": "2024-01-15T10:30:00Z",
  "connection_type": "Wi-Fi",
  "signal_strength": 85
}
POST /device/connect
Connect to ESP32 device.

Headers:

text
Authorization: Bearer <jwt_token>
Request Body:

json
{
  "type": "wifi",
  "ssid": "ESP32-Network",
  "password": "password123"
}
Response:

json
{
  "message": "Device connected successfully",
  "device_id": "ESP32-ETONGUE-001",
  "connection_type": "wifi",
  "ip_address": "192.168.1.100"
}
POST /device/disconnect
Disconnect from ESP32 device.

Headers:

text
Authorization: Bearer <jwt_token>
Response:

json
{
  "message": "Device disconnected successfully"
}
GET /device/live-data
Get current sensor readings.

Headers:

text
Authorization: Bearer <jwt_token>
Response:

json
{
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
}
GET /device/history
Get device reading history.

Headers:

text
Authorization: Bearer <jwt_token>
Response:

json
{
  "readings": [
    {
      "id": 1,
      "device_id": "ESP32-ETONGUE-001",
      "sensor_data": {
        "timestamp": "2024-01-15T10:30:15Z",
        "pH": 7.2,
        "moisture": 22.5,
        "status": "OK"
      },
      "recorded_at": "2024-01-15T10:30:15Z"
    }
  ]
}