import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../utils/theme';
import StatusIndicator from '../common/StatusIndicator';

const SensorCard = ({ title, value, unit, status, subtitle }) => {
  const getValueColor = () => {
    switch (status) {
      case 'optimal': return colors.green500;
      case 'warning': return colors.amber500;
      case 'danger': return colors.red500;
      default: return colors.white;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{title}</Text>
        <StatusIndicator status={status} />
      </View>
      <Text style={[styles.cardValue, { color: getValueColor() }]}>
        {value} {unit}
      </Text>
      {subtitle && (
        <Text style={styles.cardSubtitle}>{subtitle}</Text>
      )}
    </View>
  );
};

const SensorCards = ({ sensorData }) => {
  const getpHStatus = (pH) => {
    if (pH >= 6.5 && pH <= 7.5) return 'optimal';
    if (pH >= 6.0 && pH <= 8.0) return 'warning';
    return 'danger';
  };

  const getMoistureStatus = (moisture) => {
    if (moisture >= 15 && moisture <= 25) return 'optimal';
    if (moisture >= 10 && moisture <= 30) return 'warning';
    return 'danger';
  };

  if (!sensorData) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No sensor data available</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <SensorCard
        title="pH Level"
        value={sensorData.pH}
        unit="pH"
        status={getpHStatus(sensorData.pH)}
        subtitle="Acidity/Alkalinity"
      />
      
      <SensorCard
        title="Moisture"
        value={sensorData.moisture}
        unit="%"
        status={getMoistureStatus(sensorData.moisture)}
        subtitle="Water Content"
      />
      
      <SensorCard
        title="Device Status"
        value={sensorData.status}
        status={sensorData.status === 'OK' ? 'optimal' : 'danger'}
        subtitle="ESP32 Connection"
      />
      
      <SensorCard
        title="Voltage Range"
        value={Math.max(...sensorData.voltage_curve).toFixed(2)}
        unit="V"
        status="optimal"
        subtitle="Peak Voltage"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    backgroundColor: colors.gray800,
    padding: 16,
    borderRadius: 12,
    minWidth: 140,
    ...theme.shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 14,
    color: colors.gray500,
    fontWeight: '500',
    flex: 1,
    marginRight: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: colors.gray500,
  },
  noDataText: {
    color: colors.gray500,
    textAlign: 'center',
    padding: 20,
  },
});

export default SensorCards;