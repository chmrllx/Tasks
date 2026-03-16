import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const themes = {
  light: {
    background: '#F5F7FA',
    card: '#FFFFFF',
    text: '#1A1A1A',
    subText: '#7A7A7A',
    accent: '#00ff88',
    border: '#E1E4E8',
    statusBar: 'dark-content'
  },
  dark: {
    background: '#121212',
    card: '#1E1E1E',
    text: '#FFFFFF',
    subText: '#888888',
    accent: '#00ff88',
    border: '#333333',
    statusBar: 'light-content'
  }
};

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const savedTheme = await AsyncStorage.getItem('@theme');
    if (savedTheme !== null) {
      setIsDark(savedTheme === 'dark');
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    await AsyncStorage.setItem('@theme', newTheme ? 'dark' : 'light');
  };

  const theme = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={{ isDark, theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);