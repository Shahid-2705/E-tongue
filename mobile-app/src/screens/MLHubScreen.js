import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors } from '../utils/theme';
import Header from '../components/common/Header';
import LoadingSpinner from '../components/common/LoadingSpinner';
import StatusIndicator from '../components/common/StatusIndicator';

const MLHubScreen = () => {
  return (
    <View style={styles.container}>
      <Header 
        title="ML Hub" 
        subtitle="Machine Learning & Analysis"
      />
      
      <ScrollView style={styles.content}>
        {/* Training Status Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Model Training</Text>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Current Status:</Text>
            <StatusIndicator status="completed" showText={true} />
          </View>
          <Text style={styles.statusDescription}>
            Last trained: 2 hours ago
          </Text>
          <TouchableOpacity style={styles.trainButton}>
            <Text style={styles.trainButtonText}>Train New Model</Text>
          </TouchableOpacity>
        </View>

        {/* Classification Results */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Latest Classification</Text>
          <View style={styles.resultItem}>
            <Text style={styles.herbName}>Tulsi (Ocimum tenuiflorum)</Text>
            <Text style={styles.confidence}>94% confidence</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.statusLabel}>Quality:</Text>
            <StatusIndicator status="optimal" showText={true} />
          </View>
        </View>

        {/* Adulteration Detection */}
        <View style={[styles.card, styles.warningCard]}>
          <Text style={styles.cardTitle}>Adulteration Detection</Text>
          <View style={styles.alertRow}>
            <StatusIndicator status="danger" />
            <Text style={styles.alertText}>No adulteration detected</Text>
          </View>
          <Text style={styles.alertDescription}>
            All samples passed quality checks
          </Text>
        </View>

        {/* Model Metrics */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Model Performance</Text>
          <View style={styles.metricsContainer}>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>96%</Text>
              <Text style={styles.metricLabel}>Accuracy</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>94%</Text>
              <Text style={styles.metricLabel}>Precision</Text>
            </View>
            <View style={styles.metric}>
              <Text style={styles.metricValue}>97%</Text>
              <Text style={styles.metricLabel}>Recall</Text>
            </View>
          </View>
        </View>

        {/* Coming Soon Features */}
        <View style={styles.comingSoonContainer}>
          <Text style={styles.comingSoonTitle}>Upcoming Features</Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>• Real-time classification</Text>
            <Text style={styles.featureItem}>• Batch processing</Text>
            <Text style={styles.featureItem}>• Advanced analytics</Text>
            <Text style={styles.featureItem}>• Export reports</Text>
          </View>
        </View>
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
    padding: 16,
  },
  card: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  warningCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.green500,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    color: colors.gray500,
    fontSize: 14,
  },
  statusDescription: {
    color: colors.gray500,
    fontSize: 12,
    marginBottom: 12,
  },
  trainButton: {
    backgroundColor: colors.green500,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  trainButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  resultItem: {
    marginBottom: 12,
  },
  herbName: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  confidence: {
    color: colors.green500,
    fontSize: 14,
  },
  alertRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  alertText: {
    color: colors.white,
    fontSize: 14,
    marginLeft: 8,
  },
  alertDescription: {
    color: colors.gray500,
    fontSize: 12,
  },
  metricsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    color: colors.green500,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricLabel: {
    color: colors.gray500,
    fontSize: 12,
  },
  comingSoonContainer: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  comingSoonTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.green500,
    marginBottom: 12,
  },
  featureList: {
    alignSelf: 'stretch',
  },
  featureItem: {
    color: colors.gray500,
    fontSize: 14,
    marginBottom: 6,
  },
});

export default MLHubScreen;