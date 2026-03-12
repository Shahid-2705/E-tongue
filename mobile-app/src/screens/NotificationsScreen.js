import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { colors } from '../utils/theme';
import Header from '../components/common/Header';
import StatusIndicator from '../components/common/StatusIndicator';

const NotificationsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Dataset Uploaded',
      message: 'Tulsi dataset BATCH2024-001 uploaded successfully',
      time: '2 minutes ago',
      read: false,
    },
    {
      id: 2,
      type: 'info',
      title: 'Model Training Complete',
      message: 'Herb classification model training completed successfully',
      time: '1 hour ago',
      read: true,
    },
    {
      id: 3,
      type: 'warning',
      title: 'Device Connection',
      message: 'ESP32 device disconnected. Attempting to reconnect...',
      time: '3 hours ago',
      read: true,
    },
    {
      id: 4,
      type: 'success',
      title: 'Quality Check Passed',
      message: 'Sample passed all quality checks with 96% confidence',
      time: '5 hours ago',
      read: true,
    },
  ]);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return { status: 'optimal', color: colors.green500 };
      case 'warning':
        return { status: 'warning', color: colors.amber500 };
      case 'error':
        return { status: 'danger', color: colors.red500 };
      default:
        return { status: 'optimal', color: colors.blue500 };
    }
  };

  return (
    <View style={styles.container}>
      <Header 
        title="Notifications" 
        subtitle="Alerts and system messages"
        rightComponent={
          notifications.length > 0 && (
            <TouchableOpacity onPress={clearAll}>
              <Text style={styles.clearButton}>Clear All</Text>
            </TouchableOpacity>
          )
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
        {notifications.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateTitle}>No Notifications</Text>
            <Text style={styles.emptyStateText}>
              You're all caught up! New notifications about dataset uploads, 
              ML training, and system alerts will appear here.
            </Text>
          </View>
        ) : (
          <>
            {/* Unread notifications */}
            {notifications.filter(n => !n.read).length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>New</Text>
                {notifications
                  .filter(notification => !notification.read)
                  .map(notification => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onPress={() => markAsRead(notification.id)}
                      getNotificationIcon={getNotificationIcon}
                    />
                  ))
                }
              </View>
            )}

            {/* Read notifications */}
            {notifications.filter(n => n.read).length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Earlier</Text>
                {notifications
                  .filter(notification => notification.read)
                  .map(notification => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      onPress={() => markAsRead(notification.id)}
                      getNotificationIcon={getNotificationIcon}
                    />
                  ))
                }
              </View>
            )}
          </>
        )}

        {/* Notification Types Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Notification Types</Text>
          <View style={styles.infoItem}>
            <StatusIndicator status="optimal" />
            <Text style={styles.infoText}>Success - Completed actions</Text>
          </View>
          <View style={styles.infoItem}>
            <StatusIndicator status="warning" />
            <Text style={styles.infoText}>Warning - Attention needed</Text>
          </View>
          <View style={styles.infoItem}>
            <StatusIndicator status="danger" />
            <Text style={styles.infoText}>Error - Immediate action required</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const NotificationCard = ({ notification, onPress, getNotificationIcon }) => {
  const icon = getNotificationIcon(notification.type);

  return (
    <TouchableOpacity 
      style={[
        styles.notificationCard,
        !notification.read && styles.unreadCard
      ]}
      onPress={onPress}
    >
      <View style={styles.notificationHeader}>
        <View style={styles.titleContainer}>
          <StatusIndicator status={icon.status} size={8} showText={false} />
          <Text style={styles.notificationTitle}>{notification.title}</Text>
        </View>
        <Text style={styles.notificationTime}>{notification.time}</Text>
      </View>
      <Text style={styles.notificationMessage}>{notification.message}</Text>
      {!notification.read && (
        <View style={styles.unreadIndicator} />
      )}
    </TouchableOpacity>
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
  clearButton: {
    color: colors.green500,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyState: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    marginTop: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  emptyStateText: {
    color: colors.gray500,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.gray500,
    marginBottom: 12,
    marginLeft: 8,
  },
  notificationCard: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: colors.gray700,
  },
  unreadCard: {
    borderLeftColor: colors.green500,
    backgroundColor: colors.gray800 + '80',
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  notificationTitle: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  notificationTime: {
    color: colors.gray500,
    fontSize: 12,
  },
  notificationMessage: {
    color: colors.gray500,
    fontSize: 14,
    lineHeight: 18,
  },
  unreadIndicator: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.green500,
  },
  infoCard: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white,
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    color: colors.gray500,
    fontSize: 14,
    marginLeft: 8,
  },
});

export default NotificationsScreen;