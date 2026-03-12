import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trainingStatus: null,
  currentPrediction: null,
  adulterationAlerts: [],
  modelMetrics: null,
  loading: false,
  error: null,
};

const mlSlice = createSlice({
  name: 'ml',
  initialState,
  reducers: {
    setTrainingStatus: (state, action) => {
      state.trainingStatus = action.payload;
    },
    setPrediction: (state, action) => {
      state.currentPrediction = action.payload;
    },
    addAdulterationAlert: (state, action) => {
      state.adulterationAlerts.unshift(action.payload);
    },
    setModelMetrics: (state, action) => {
      state.modelMetrics = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearAlerts: (state) => {
      state.adulterationAlerts = [];
    },
  },
});

export const { setTrainingStatus, setPrediction, addAdulterationAlert, setModelMetrics, setLoading, setError, clearAlerts } = mlSlice.actions;
export default mlSlice.reducer;