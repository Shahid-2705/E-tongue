import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../utils/theme';
import StatusIndicator from '../common/StatusIndicator';

const DataPreview = ({ sensorData, metadata }) => {
  if (!sensorData) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No data to preview</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Sensor Data Preview</Text>
      
      <View style={styles.dataSection}>
        <Text style={styles.subtitle}>Basic Measurements</Text>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>pH Level:</Text>
          <Text style={styles.dataValue}>{sensorData.pH}</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Moisture:</Text>
          <Text style={styles.dataValue}>{sensorData.moisture}%</Text>
        </View>
        <View style={styles.dataRow}>
          <Text style={styles.dataLabel}>Status:</Text>
          <StatusIndicator status={sensorData.status} />
        </View>
      </View>

      <View style={styles.dataSection}>
        <Text style={styles.subtitle}>Voltage Curve</Text>
        <Text style={styles.dataSummary}>
          {sensorData.voltage_curve?.length || 0} data points
        </Text>
        <Text style={styles.dataRange}>
          Range: {Math.min(...sensorData.voltage_curve).toFixed(2)}V - {Math.max(...sensorData.voltage_curve).toFixed(2)}V
        </Text>
      </View>

      <View style={styles.dataSection}>
        <Text style={styles.subtitle}>Spectral Data</Text>
        <Text style={styles.dataSummary}>
          {sensorData.spectrum?.wavelengths?.length || 0} wavelengths
        </Text>
        <Text style={styles.dataRange}>
          Intensity: {Math.min(...sensorData.spectrum.intensity).toFixed(2)} - {Math.max(...sensorData.spectrum.intensity).toFixed(2)}
        </Text>
      </View>

      {metadata && (
        <View style={styles.dataSection}>
          <Text style={styles.subtitle}>Metadata</Text>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Herb:</Text>
            <Text style={styles.dataValue}>{metadata.herb_name}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Batch:</Text>
            <Text style={styles.dataValue}>{metadata.batch_id}</Text>
          </View>
          <View style={styles.dataRow}>
            <Text style={styles.dataLabel}>Operator:</Text>
            <Text style={styles.dataValue}>{metadata.operator}</Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    maxHeight: 400,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 16,
  },
  dataSection: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.green500,
    marginBottom: 8,
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  dataLabel: {
    fontSize: 14,
    color: colors.gray500,
  },
  dataValue: {
    fontSize: 14,
    color: colors.white,
    fontWeight: '500',
  },
  dataSummary: {
    fontSize: 12,
    color: colors.gray500,
    marginBottom: 2,
  },
  dataRange: {
    fontSize: 12,
    color: colors.gray500,
  },
  noDataText: {
    color: colors.gray500,
    textAlign: 'center',
    padding: 20,
  },
});

export default DataPreview;