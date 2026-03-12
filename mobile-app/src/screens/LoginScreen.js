import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../store/authSlice';
import { AuthService } from '../services/auth';
import { colors } from '../utils/theme';
import LoadingSpinner from '../components/common/LoadingSpinner';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const handleAuth = async () => {
    if (!email || !password) {
      dispatch(loginFailure('Please enter both email and password'));
      return;
    }

    dispatch(loginStart());

    try {
      let result;
      if (isLogin) {
        result = await AuthService.login(email, password);
      } else {
        result = await AuthService.register({ email, password, name: email.split('@')[0] });
      }

      if (result.success) {
        dispatch(loginSuccess(result.user));
      } else {
        dispatch(loginFailure(result.error));
      }
    } catch (err) {
      dispatch(loginFailure('An unexpected error occurred'));
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>E-Tongue</Text>
          <Text style={styles.subtitle}>Herbal Quality Monitoring</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>
            {isLogin ? 'Sign In' : 'Create Account'}
          </Text>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.gray500}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.gray500}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {loading ? (
            <LoadingSpinner text="Authenticating..." />
          ) : (
            <TouchableOpacity style={styles.authButton} onPress={handleAuth}>
              <Text style={styles.authButtonText}>
                {isLogin ? 'Sign In' : 'Create Account'}
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity 
            style={styles.switchButton}
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text style={styles.switchButtonText}>
              {isLogin 
                ? "Don't have an account? Sign Up" 
                : "Already have an account? Sign In"
              }
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.demoNote}>
          <Text style={styles.demoNoteText}>
            Demo: Use any email/password for testing
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray900,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.green500,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.gray500,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: colors.gray800,
    borderRadius: 16,
    padding: 24,
    ...theme.shadows.md,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    backgroundColor: colors.gray700,
    borderRadius: 8,
    padding: 16,
    color: colors.white,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray600,
  },
  authButton: {
    backgroundColor: colors.green500,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  authButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  switchButton: {
    padding: 16,
    alignItems: 'center',
  },
  switchButtonText: {
    color: colors.green500,
    fontSize: 14,
  },
  errorContainer: {
    backgroundColor: colors.red500 + '20',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: colors.red500,
  },
  errorText: {
    color: colors.red500,
    fontSize: 14,
  },
  demoNote: {
    marginTop: 30,
    padding: 16,
    backgroundColor: colors.gray800 + '80',
    borderRadius: 8,
  },
  demoNoteText: {
    color: colors.gray500,
    textAlign: 'center',
    fontSize: 12,
  },
});

export default LoginScreen;