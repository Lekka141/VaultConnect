import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { getSignUpTheme } from './theme/getSignUpTheme';

/**
 * Component to toggle between light and dark modes.
 * 
 * @param {object} props - React component props.
 * @returns {JSX.Element} - Theme provider with the ability to toggle color mode.
 */
export default function ToggleColourMode({ children }) {
  const [mode, setMode] = useState('light');

  /**
   * Check and set the mode from localStorage on component mount.
   */
  useEffect(() => {
    const savedMode = localStorage.getItem('themeMode');
    if (savedMode) {
      setMode(savedMode);
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  /**
   * Toggles between light and dark modes.
   */
  const toggleColorMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };

  const theme = createTheme(getSignUpTheme(mode));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <button onClick={toggleColorMode}>
        Toggle {mode === 'light' ? 'Dark' : 'Light'} Mode
      </button>
      {children}
    </ThemeProvider>
  );
}
