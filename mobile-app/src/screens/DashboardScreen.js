import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setLiveData, setDeviceStatus } from '../store/dataSlice';
import { deviceAPI } from '../services/api';
import { colors } from '../utils/theme';
import Header from '../components/common/Header';
import SensorCards from '../components/dashboard/SensorCards';
import VoltammogramGraph from '../components/dashboard/VoltammogramGraph';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StatusIndicator from '../components/common/StatusIndicator';

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const { liveData, deviceStatus, loading } = useSelector(state => state.data);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLiveData = async () => {
    try {
      const response = await deviceAPI.getLiveData();
      if (response.data) {
        dispatch(setLiveData(response.data));
        dispatch(setDeviceStatus('connected'));
      }
    } catch (error) {
      console.error('Error fetching live data:', error);
      dispatch(setDeviceStatus('disconnected'));
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchLiveData();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchLiveData();
    
    // Set up interval for real-time updates
    const interval = setInterval(fetchLiveData, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleConnectDevice = async () => {
    try {
      await deviceAPI.connect({
        type: 'wifi',
        ssid: 'ESP32-E-Tongue',
        password: 'herbal123'
      });
      dispatch(setDeviceStatus('connected'));
      fetchLiveData();
    } catch (error) {
      console.error('Error connecting device:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Dashboard" 
        subtitle="Real-time Herbal Quality Monitoring"
        rightComponent={
          <StatusIndicator status={deviceStatus} showText={true} />
        }
      />
      
      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.green500]}
            tintColor={colors.green500}
          />
        }
      >
        {deviceStatus === 'disconnected' && (
          <View style={styles.disconnectedBanner}>
            <Text style={styles.disconnectedText}>
              Device Disconnected
            </Text>
            <TouchableOpacity 
              style={styles.connectButton}
              onPress={handleConnectDevice}
            >
              <Text style={styles.connectButtonText}>Connect ESP32</Text>
            </TouchableOpacity>
          </View>
        )}

        {loading && !liveData ? (
          <LoadingSpinner text="Loading sensor data..." />
        ) : liveData ? (
          <>
            <SensorCards sensorData={liveData} />
            
            <VoltammogramGraph 
              voltageData={liveData.voltage_curve}
              title="Voltammogram - Real Time"
            />

            <View style={styles.graphContainer}>
              <Text style={styles.graphTitle}>Spectral Analysis</Text>
              <Text style={styles.comingSoon}>Spectral Graph Coming Soon</Text>
            </View>

            <View style={styles.summaryContainer}>
              <Text style={styles.summaryTitle}>Current Reading Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Timestamp:</Text>
                <Text style={styles.summaryValue}>
                  {new Date().toLocaleTimeString()}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Device ID:</Text>
                <Text style={styles.summaryValue}>ESP32-ETONGUE-001</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Status:</Text>
                <Text style={styles.summaryValue}>Connected</Text>
              </View>
            </View>
          </>
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.noDataText}>No data available</Text>
            <Text style={styles.noDataSubtext}>
              Connect your ESP32 device to start monitoring
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray900,
  },
  content: {
    flex: 1,
  },
  disconnectedBanner: {
    backgroundColor: colors.amber500 + '20',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.amber500,
    alignItems: 'center',
  },
  disconnectedText: {
    color: colors.amber500,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  connectButton: {
    backgroundColor: colors.amber500,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  connectButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  graphContainer: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 8,
    alignItems: 'center',
  },
  graphTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  comingSoon: {
    color: colors.gray500,
    fontStyle: 'italic',
    padding: 20,
  },
  summaryContainer: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginTop: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  summaryLabel: {
    color: colors.gray500,
    fontSize: 14,
  },
  summaryValue: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '500',
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  noDataText: {
    color: colors.gray500,
    fontSize: 18,
    marginBottom: 8,
  },
  noDataSubtext: {
    color: colors.gray600,
    textAlign: 'center',
  },
});

export default DashboardScreen;