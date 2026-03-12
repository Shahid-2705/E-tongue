class ESP32DataGenerator {
  constructor(deviceId = "ESP32-ETONGUE-001") {
    this.deviceId = deviceId;
    this.sequence = 0;
  }

  generateVoltammogramData() {
    const baseVoltage = 0.1 + Math.random() * 0.2;
    const dataPoints = 20;
    const voltage_curve = [];

    for (let i = 0; i < dataPoints; i++) {
      const time = i * 0.1;
      const value = baseVoltage + 
                   Math.sin(time * 2) * 0.08 + 
                   Math.sin(time * 5) * 0.03 +
                   (Math.random() - 0.5) * 0.02;
      voltage_curve.push(parseFloat(value.toFixed(3)));
    }

    return voltage_curve;
  }

  generateSpectralData() {
    const wavelengths = [450, 500, 550, 600, 650, 700];
    const intensity = wavelengths.map(wl => {
      // Simulate spectral peaks around 550nm (green)
      const baseIntensity = Math.exp(-Math.pow(wl - 550, 2) / 8000);
      const noise = (Math.random() - 0.5) * 0.1;
      return parseFloat((baseIntensity + noise).toFixed(3));
    });

    return {
      wavelengths,
      intensity
    };
  }

  generateSensorReadings() {
    this.sequence++;

    // Simulate realistic sensor values with some variation
    const pH = 6.8 + (Math.random() - 0.5) * 0.4; // 6.6 - 7.0
    const moisture = 20 + (Math.random() - 0.5) * 8; // 16 - 24%

    return {
      timestamp: new Date().toISOString(),
      device_id: this.deviceId,
      voltage_curve: this.generateVoltammogramData(),
      spectrum: this.generateSpectralData(),
      pH: parseFloat(pH.toFixed(2)),
      moisture: parseFloat(moisture.toFixed(2)),
      status: "OK",
      sequence: this.sequence
    };
  }

  // Simulate adulterated sample
  generateAdulteratedData() {
    const data = this.generateSensorReadings();
    
    // Modify values to indicate potential adulteration
    data.pH = 4.2 + Math.random() * 2; // Acidic range
    data.moisture = 35 + Math.random() * 10; // High moisture
    data.status = "WARNING";
    
    return data;
  }
}

module.exports = ESP32DataGenerator;