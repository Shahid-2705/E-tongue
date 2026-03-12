export const API_BASE_URL = 'http://localhost:3000/api'; // Change to your Node server URL

export const SENSOR_THRESHOLDS = {
  pH: {
    optimal: { min: 6.5, max: 7.5 },
    warning: { min: 6.0, max: 8.0 },
    danger: { min: 4.0, max: 9.0 }
  },
  moisture: {
    optimal: { min: 15, max: 25 },
    warning: { min: 10, max: 30 },
    danger: { min: 5, max: 40 }
  }
};

export const ML_STATUS = {
  PENDING: 'pending',
  RUNNING: 'running',
  COMPLETED: 'completed',
  FAILED: 'failed'
};

export const DEVICE_STATUS = {
  CONNECTED: 'connected',
  DISCONNECTED: 'disconnected',
  ERROR: 'error'
};