import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../utils/theme';

const StatusIndicator = ({ status, size = 12, showText = true }) => {
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case 'connected':
      case 'success':
      case 'optimal':
        return { color: colors.green500, text: 'Optimal' };
      case 'warning':
      case 'pending':
        return { color: colors.amber500, text: 'Warning' };
      case 'error':
      case 'danger':
      case 'adulterated':
        return { color: colors.red500, text: 'Danger' };
      case 'disconnected':
      default:
        return { color: colors.gray500, text: 'Disconnected' };
    }
  };

  const config = getStatusConfig(status);

  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.indicator,
          { 
            backgroundColor: config.color,
            width: size,
            height: size,
            borderRadius: size / 2,
          }
        ]} 
      />
      {showText && (
        <Text style={[styles.text, { color: config.color }]}>
          {config.text}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    marginRight: 6,
  },
  text: {
    fontSize: 12,
    fontWeight: '500',
  },
});

export default StatusIndicator;