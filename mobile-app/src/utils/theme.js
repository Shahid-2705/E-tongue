import React from 'react';
import { useColorScheme } from 'react-native';

export const colors = {
  // Dark Scientific Dashboard Theme
  gray900: '#111827',
  gray800: '#1F2937',
  gray700: '#374151',
  gray600: '#4B5563',
  gray500: '#6B7280',
  white: '#FFFFFF',
  green500: '#10B981',
  green600: '#059669',
  blue500: '#3B82F6',
  teal500: '#14B8A6',
  red500: '#EF4444',
  amber500: '#F59E0B',
  yellow500: '#EAB308'
};

export const theme = {
  colors,
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4
    }
  }
};

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};