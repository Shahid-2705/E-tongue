import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setDatasets, addDataset } from '../store/dataSlice';
import { datasetAPI, deviceAPI } from '../services/api';
import { colors } from '../utils/theme';
import Header from '../components/common/Header';
import DataPreview from '../components/dataset/DataPreview';
import MetadataForm from '../components/dataset/MetadataForm';
import LoadingSpinner from '../components/common/LoadingSpinner';

const DatasetManagerScreen = () => {
  const dispatch = useDispatch();
  const { datasets, liveData } = useSelector(state => state.data);
  const [activeTab, setActiveTab] = useState('capture');
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDatasets();
  }, []);

  const fetchDatasets = async () => {
    try {
      const response = await datasetAPI.getAll();
      dispatch(setDatasets(response.data));
    } catch (error) {
      console.error('Error fetching datasets:', error);
    }
  };

  const handleMetadataSubmit = (formData) => {
    setMetadata(formData);
    setActiveTab('preview');
  };

  const handleUpload = async () => {
    if (!liveData || !metadata) {
      Alert.alert('Error', 'No sensor data or metadata available');
      return;
    }

    setLoading(true);
    try {
      const uploadData = {
        ...metadata,
        data: liveData,
        photo: null,
        timestamp: new Date().toISOString(),
      };

      const response = await datasetAPI.upload(uploadData);
      
      dispatch(addDataset(response.data));
      
      Alert.alert('Success', 'Dataset uploaded successfully!');
      
      setMetadata(null);
      setActiveTab('capture');
      
    } catch (error) {
      Alert.alert('Error', 'Failed to upload dataset: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderCaptureTab = () => (
    <View>
      <Text style={styles.tabDescription}>
        Capture current sensor readings and add sample metadata
      </Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Sensor Data</Text>
        <DataPreview sensorData={liveData} />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sample Metadata</Text>
        <MetadataForm onSubmit={handleMetadataSubmit} />
      </View>
    </View>
  );

  const renderPreviewTab = () => (
    <View>
      <Text style={styles.tabDescription}>
        Review data before uploading
      </Text>
      
      <DataPreview sensorData={liveData} metadata={metadata} />
      
      <View style={styles.uploadSection}>
        <TouchableOpacity 
          style={[styles.uploadButton, loading && styles.uploadButtonDisabled]}
          onPress={handleUpload}
          disabled={loading}
        >
          {loading ? (
            <LoadingSpinner size="small" color={colors.white} />
          ) : (
            <Text style={styles.uploadButtonText}>Upload Dataset</Text>
          )}
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => setActiveTab('capture')}
        >
          <Text style={styles.backButtonText}>Back to Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderHistoryTab = () => (
    <View>
      <Text style={styles.tabDescription}>
        Previously uploaded datasets
      </Text>
      
      {datasets.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>No datasets uploaded yet</Text>
          <Text style={styles.emptyStateSubtext}>
            Capture and upload your first dataset to see it here
          </Text>
        </View>
      ) : (
        <ScrollView>
          {datasets.map((dataset, index) => (
            <View key={index} style={styles.datasetCard}>
              <View style={styles.datasetHeader}>
                <Text style={styles.datasetName}>{dataset.herb_name}</Text>
                <Text style={styles.datasetBatch}>{dataset.batch_id}</Text>
              </View>
              <Text style={styles.datasetInfo}>
                Operator: {dataset.operator}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Dataset Manager" 
        subtitle="Capture, manage, and upload sensor data"
      />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'capture' && styles.activeTab]}
          onPress={() => setActiveTab('capture')}
        >
          <Text style={[styles.tabText, activeTab === 'capture' && styles.activeTabText]}>
            Capture
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'preview' && styles.activeTab]}
          onPress={() => setActiveTab('preview')}
          disabled={!metadata}
        >
          <Text style={[
            styles.tabText, 
            activeTab === 'preview' && styles.activeTabText,
            !metadata && styles.disabledTab
          ]}>
            Preview
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.activeTab]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.activeTabText]}>
            History
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'capture' && renderCaptureTab()}
        {activeTab === 'preview' && renderPreviewTab()}
        {activeTab === 'history' && renderHistoryTab()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray900,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.gray800,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: colors.green500,
  },
  tabText: {
    color: colors.gray500,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.white,
  },
  disabledTab: {
    color: colors.gray600,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  tabDescription: {
    color: colors.gray500,
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  uploadSection: {
    marginTop: 24,
  },
  uploadButton: {
    backgroundColor: colors.green500,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadButtonDisabled: {
    backgroundColor: colors.green500 + '80',
  },
  uploadButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: colors.gray500,
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyStateText: {
    color: colors.gray500,
    fontSize: 16,
    marginBottom: 8,
  },
  emptyStateSubtext: {
    color: colors.gray600,
    textAlign: 'center',
  },
  datasetCard: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  datasetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  datasetName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    flex: 1,
  },
  datasetBatch: {
    fontSize: 12,
    color: colors.green500,
    fontWeight: '600',
  },
  datasetInfo: {
    fontSize: 12,
    color: colors.gray500,
    marginBottom: 4,
  },
});

export default DatasetManagerScreen;