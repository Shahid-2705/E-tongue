import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { colors } from '../../utils/theme';

const MetadataForm = ({ onSubmit, initialData = {} }) => {
  const [formData, setFormData] = useState({
    herb_name: initialData.herb_name || '',
    batch_id: initialData.batch_id || '',
    operator: initialData.operator || '',
    location: initialData.metadata?.location || '',
    sample_type: initialData.metadata?.sample_type || '',
    solvent: initialData.metadata?.solvent || '',
    notes: initialData.metadata?.notes || '',
  });

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.herb_name || !formData.batch_id || !formData.operator) {
      alert('Please fill in all required fields (Herb Name, Batch ID, Operator)');
      return;
    }

    const submitData = {
      herb_name: formData.herb_name,
      batch_id: formData.batch_id,
      operator: formData.operator,
      metadata: {
        location: formData.location,
        sample_type: formData.sample_type,
        solvent: formData.solvent,
        notes: formData.notes,
      }
    };

    onSubmit(submitData);
  };

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Sample Metadata</Text>
      
      <View style={styles.formSection}>
        <Text style={styles.label}>Herb Name *</Text>
        <TextInput
          style={styles.input}
          value={formData.herb_name}
          onChangeText={(value) => updateField('herb_name', value)}
          placeholder="e.g., Tulsi, Ashwagandha"
          placeholderTextColor={colors.gray500}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>Batch ID *</Text>
        <TextInput
          style={styles.input}
          value={formData.batch_id}
          onChangeText={(value) => updateField('batch_id', value)}
          placeholder="e.g., BATCH2024-001"
          placeholderTextColor={colors.gray500}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>Operator *</Text>
        <TextInput
          style={styles.input}
          value={formData.operator}
          onChangeText={(value) => updateField('operator', value)}
          placeholder="Operator name or ID"
          placeholderTextColor={colors.gray500}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>Location</Text>
        <TextInput
          style={styles.input}
          value={formData.location}
          onChangeText={(value) => updateField('location', value)}
          placeholder="e.g., Lab A - New Delhi"
          placeholderTextColor={colors.gray500}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>Sample Type</Text>
        <TextInput
          style={styles.input}
          value={formData.sample_type}
          onChangeText={(value) => updateField('sample_type', value)}
          placeholder="e.g., Leaf Extract, Powder"
          placeholderTextColor={colors.gray500}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>Solvent</Text>
        <TextInput
          style={styles.input}
          value={formData.solvent}
          onChangeText={(value) => updateField('solvent', value)}
          placeholder="e.g., Ethanol, Water"
          placeholderTextColor={colors.gray500}
        />
      </View>

      <View style={styles.formSection}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.notes}
          onChangeText={(value) => updateField('notes', value)}
          placeholder="Additional notes about the sample..."
          placeholderTextColor={colors.gray500}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Save Metadata</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 20,
  },
  formSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.gray500,
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.gray700,
    borderRadius: 8,
    padding: 12,
    color: colors.white,
    fontSize: 16,
    borderWidth: 1,
    borderColor: colors.gray600,
  },
  textArea: {
    minHeight: 100,
  },
  submitButton: {
    backgroundColor: colors.green500,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MetadataForm;