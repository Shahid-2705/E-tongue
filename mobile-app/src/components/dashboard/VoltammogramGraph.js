import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/theme';

const VoltammogramGraph = ({ voltageData, title = "Voltammogram" }) => {
  if (!voltageData || voltageData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No voltage data available</Text>
      </View>
    );
  }

  // Calculate some basic stats for display
  const maxVoltage = Math.max(...voltageData).toFixed(3);
  const minVoltage = Math.min(...voltageData).toFixed(3);
  const avgVoltage = (voltageData.reduce((a, b) => a + b, 0) / voltageData.length).toFixed(3);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      {/* Simple graph representation */}
      <View style={styles.graphContainer}>
        <View style={styles.graph}>
          {voltageData.map((value, index) => (
            <View
              key={index}
              style={[
                styles.bar,
                {
                  height: `${(value / Math.max(...voltageData)) * 80}%`,
                  backgroundColor: colors.blue500,
                }
              ]}
            />
          ))}
        </View>
        
        <View style={styles.stats}>
          <Text style={styles.statText}>Max: {maxVoltage}V</Text>
          <Text style={styles.statText}>Min: {minVoltage}V</Text>
          <Text style={styles.statText}>Avg: {avgVoltage}V</Text>
          <Text style={styles.statText}>Points: {voltageData.length}</Text>
        </View>
      </View>

      <Text style={styles.note}>
        Advanced graphing with Victory Native coming soon
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  graphContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 150,
    marginBottom: 12,
  },
  graph: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    marginRight: 16,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.gray600,
    paddingHorizontal: 4,
  },
  bar: {
    flex: 1,
    marginHorizontal: 1,
    borderRadius: 2,
    minHeight: 1,
  },
  stats: {
    width: 100,
  },
  statText: {
    color: colors.gray500,
    fontSize: 12,
    marginBottom: 4,
  },
  note: {
    color: colors.gray500,
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 8,
  },
  noDataText: {
    color: colors.gray500,
    textAlign: 'center',
    padding: 20,
  },
});

export default VoltammogramGraph;