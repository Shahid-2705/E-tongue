const ESP32DataGenerator = require('./data_generator');
const axios = require('axios');

class ESP32Simulator {
  constructor(apiBaseUrl, deviceId = "ESP32-ETONGUE-001") {
    this.generator = new ESP32DataGenerator(deviceId);
    this.apiBaseUrl = apiBaseUrl;
    this.isRunning = false;
    this.intervalId = null;
  }

  start(intervalMs = 5000) {
    if (this.isRunning) {
      console.log('Simulator is already running');
      return;
    }

    this.isRunning = true;
    console.log(`Starting ESP32 simulator. Sending data every ${intervalMs}ms`);

    this.intervalId = setInterval(async () => {
      try {
        // Occasionally generate adulterated data (10% chance)
        const sensorData = Math.random() < 0.1 
          ? this.generator.generateAdulteratedData()
          : this.generator.generateSensorReadings();

        // In a real scenario, this would be sent to the Node.js server
        console.log('Generated sensor data:', {
          timestamp: sensorData.timestamp,
          pH: sensorData.pH,
          moisture: sensorData.moisture,
          status: sensorData.status,
          voltage_points: sensorData.voltage_curve.length,
          spectral_points: sensorData.spectrum.wavelengths.length
        });

        // You can uncomment the following to actually send data to your API
        /*
        await axios.post(`${this.apiBaseUrl}/api/device/data`, sensorData, {
          headers: { 'Authorization': 'Bearer your-token-here' }
        });
        */

      } catch (error) {
        console.error('Error in simulator:', error.message);
      }
    }, intervalMs);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isRunning = false;
    console.log('ESP32 simulator stopped');
  }
}

// Example usage
if (require.main === module) {
  const simulator = new ESP32Simulator('http://localhost:3000');
  simulator.start(3000); // Send data every 3 seconds

  // Stop after 30 seconds for demo
  setTimeout(() => {
    simulator.stop();
    process.exit(0);
  }, 30000);
}

module.exports = ESP32Simulator;