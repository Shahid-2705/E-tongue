import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  liveData: null,
  datasets: [],
  currentDataset: null,
  deviceStatus: 'disconnected',
  loading: false,
  error: null,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setLiveData: (state, action) => {
      state.liveData = action.payload;
    },
    setDatasets: (state, action) => {
      state.datasets = action.payload;
    },
    addDataset: (state, action) => {
      state.datasets.unshift(action.payload);
    },
    setDeviceStatus: (state, action) => {
      state.deviceStatus = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLiveData, setDatasets, addDataset, setDeviceStatus, setLoading, setError, clearError } = dataSlice.actions;
export default dataSlice.reducer;