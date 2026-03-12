import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';
import { AuthService } from '../services/auth';
import { colors } from '../utils/theme';
import Header from '../components/common/Header';
import StatusIndicator from '../components/common/StatusIndicator';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { deviceStatus } = useSelector(state => state.data);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          style: 'destructive',
          onPress: () => {
            AuthService.logout();
            dispatch(logout());
          }
        }
      ]
    );
  };

  const SettingsSection = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  const SettingsItem = ({ label, value, onPress, rightComponent, type = 'button' }) => (
    <TouchableOpacity 
      style={styles.settingsItem}
      onPress={onPress}
      disabled={type === 'display'}
    >
      <Text style={styles.settingsLabel}>{label}</Text>
      <View style={styles.settingsValue}>
        {type === 'button' ? (
          <>
            <Text style={styles.settingsValueText}>{value}</Text>
            <Text style={styles.chevron}>›</Text>
          </>
        ) : type === 'switch' ? (
          rightComponent
        ) : (
          <Text style={styles.settingsValueText}>{value}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Header 
        title="Settings" 
        subtitle="Configure your e-tongue system"
      />
      
      <ScrollView style={styles.content}>
        {/* User Profile Section */}
        <SettingsSection title="User Profile">
          <SettingsItem
            label="Email"
            value={user?.email || 'Not available'}
            type="display"
          />
          <SettingsItem
            label="User ID"
            value={user?.id || 'Not available'}
            type="display"
          />
        </SettingsSection>

        {/* Device Settings Section */}
        <SettingsSection title="Device Configuration">
          <SettingsItem
            label="ESP32 Connection"
            value={deviceStatus}
            type="display"
            rightComponent={<StatusIndicator status={deviceStatus} />}
          />
          <SettingsItem
            label="Wi-Fi Settings"
            value="Configure"
            onPress={() => Alert.alert('Wi-Fi', 'Wi-Fi configuration coming soon')}
          />
          <SettingsItem
            label="BLE Pairing"
            value="Pair Device"
            onPress={() => Alert.alert('BLE', 'Bluetooth pairing coming soon')}
          />
        </SettingsSection>

        {/* Application Settings Section */}
        <SettingsSection title="Application Settings">
          <SettingsItem
            label="Lab Mode"
            value="Enabled"
            type="switch"
            rightComponent={<Switch value={true} onValueChange={() => {}} />}
          />
          <SettingsItem
            label="Data Sync Frequency"
            value="5 seconds"
            onPress={() => Alert.alert('Sync', 'Sync frequency configuration coming soon')}
          />
          <SettingsItem
            label="Notification Preferences"
            value="Configure"
            onPress={() => Alert.alert('Notifications', 'Notification settings coming soon')}
          />
        </SettingsSection>

        {/* Threshold Settings Section */}
        <SettingsSection title="Quality Thresholds">
          <SettingsItem
            label="pH Optimal Range"
            value="6.5 - 7.5"
            onPress={() => Alert.alert('pH Thresholds', 'pH range configuration coming soon')}
          />
          <SettingsItem
            label="Moisture Optimal Range"
            value="15% - 25%"
            onPress={() => Alert.alert('Moisture', 'Moisture thresholds coming soon')}
          />
          <SettingsItem
            label="Spectral Peaks"
            value="Configure"
            onPress={() => Alert.alert('Spectral', 'Spectral analysis settings coming soon')}
          />
        </SettingsSection>

        {/* About Section */}
        <SettingsSection title="About">
          <SettingsItem
            label="App Version"
            value="1.0.0"
            type="display"
          />
          <SettingsItem
            label="Support"
            value="Get Help"
            onPress={() => Alert.alert('Support', 'Support information coming soon')}
          />
          <SettingsItem
            label="Privacy Policy"
            value="View"
            onPress={() => Alert.alert('Privacy', 'Privacy policy coming soon')}
          />
        </SettingsSection>

        {/* Logout Section */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            E-Tongue Herbal Monitoring System
          </Text>
          <Text style={styles.footerSubtext}>
            AI-powered quality assessment
          </Text>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.green500,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  sectionContent: {
    backgroundColor: colors.gray800,
    borderRadius: 12,
    overflow: 'hidden',
    ...theme.shadows.md,
  },
  settingsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray700,
  },
  settingsLabel: {
    fontSize: 16,
    color: colors.white,
    flex: 1,
  },
  settingsValue: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsValueText: {
    fontSize: 14,
    color: colors.gray500,
    marginRight: 8,
  },
  chevron: {
    fontSize: 16,
    color: colors.gray500,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: colors.red500 + '20',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.red500,
  },
  logoutButtonText: {
    color: colors.red500,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  footerText: {
    color: colors.gray500,
    fontSize: 14,
    marginBottom: 4,
  },
  footerSubtext: {
    color: colors.gray600,
    fontSize: 12,
  },
});

export default SettingsScreen;