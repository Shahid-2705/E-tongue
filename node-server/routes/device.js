const express = require('express');
const db = require('../config/db');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

// ESP32 data simulator
const simulateESP32Data = () => {
  const baseVoltage = 0.1 + Math.random() * 0.2;
  const voltage_curve = Array.from({ length: 20 }, (_, i) => 
    baseVoltage + Math.sin(i * 0.5) * 0.1 + Math.random() * 0.05
  );

  const baseWavelengths = [450, 500, 550, 600, 650, 700];
  const intensity = baseWavelengths.map(wl => 
    Math.exp(-Math.pow(wl - 550, 2) / 10000) * (0.5 + Math.random() * 0.5)
  );

  return {
    timestamp: new Date().toISOString(),
    device_id: "ESP32-ETONGUE-001",
    voltage_curve: voltage_curve.map(v => parseFloat(v.toFixed(3))),
    spectrum: {
      wavelengths: baseWavelengths,
      intensity: intensity.map(i => parseFloat(i.toFixed(3)))
    },
    pH: 6.8 + (Math.random() - 0.5) * 0.4, // 6.6 - 7.0
    moisture: 20 + (Math.random() - 0.5) * 10, // 15 - 25%
    status: "OK"
  };
};

// Get device status
router.get('/status', authenticateToken, async (req, res) => {
  try {
    // In a real implementation, this would check actual device connection
    // For demo purposes, we'll simulate device status
    const isConnected = Math.random() > 0.2; // 80% chance of being connected
    
    res.json({
      connected: isConnected,
      device_id: "ESP32-ETONGUE-001",
      last_seen: new Date().toISOString(),
      connection_type: "Wi-Fi",
      signal_strength: isConnected ? Math.floor(Math.random() * 100) : 0
    });
  } catch (error) {
    console.error('Error getting device status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Connect to device
router.post('/connect', authenticateToken, async (req, res) => {
  try {
    const { type, ssid, password } = req.body;

    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));

    // For demo, always succeed
    res.json({
      message: 'Device connected successfully',
      device_id: "ESP32-ETONGUE-001",
      connection_type: type || 'Wi-Fi',
      ip_address: "192.168.1.100"
    });
  } catch (error) {
    console.error('Error connecting device:', error);
    res.status(500).json({ error: 'Failed to connect to device' });
  }
});

// Disconnect device
router.post('/disconnect', authenticateToken, async (req, res) => {
  try {
    // Simulate disconnection
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    res.json({ message: 'Device disconnected successfully' });
  } catch (error) {
    console.error('Error disconnecting device:', error);
    res.status(500).json({ error: 'Failed to disconnect device' });
  }
});

// Get live sensor data
router.get('/live-data', authenticateToken, async (req, res) => {
  try {
    // Simulate sensor data reading
    const sensorData = simulateESP32Data();
    
    // Store the reading in database for history
    await db.execute(
      `INSERT INTO sensor_readings 
       (user_id, device_id, sensor_data, recorded_at) 
       VALUES (?, ?, ?, NOW())`,
      [req.user.userId, sensorData.device_id, JSON.stringify(sensorData)]
    );

    res.json(sensorData);
  } catch (error) {
    console.error('Error getting live data:', error);
    res.status(500).json({ error: 'Failed to read sensor data' });
  }
});

// Get device reading history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const [readings] = await db.execute(
      `SELECT id, device_id, sensor_data, recorded_at
       FROM sensor_readings 
       WHERE user_id = ? 
       ORDER BY recorded_at DESC 
       LIMIT 50`,
      [req.user.userId]
    );

    const parsedReadings = readings.map(reading => ({
      ...reading,
      sensor_data: JSON.parse(reading.sensor_data)
    }));

    res.json({ readings: parsedReadings });
  } catch (error) {
    console.error('Error fetching device history:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;