import React, { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

/**
 * ToggleColourMode component manages the color mode (dark/light) for the application.
 * It uses Material UI's theme and provides a toggle button to switch between modes.
 *
 * @param {ReactNode} children - The components that require access to the color mode state.
 * @returns {JSX.Element} - The rendered ThemeProvider and color mode toggle button.
 */

/* Create a context for managing the color mode */
const ColorModeContext = createContext({ toggleColorMode: () => {} });

/* Custom hook to use the ColorModeContext more easily */
export const useColorMode = () => useContext(ColorModeContext);

export default function ToggleColourMode({ children }) {
  /**
   * State for managing the current color mode ('light' or 'dark').
   * Load initial mode from localStorage if available, otherwise default to 'light'.
   */
  const [mode, setMode] = useState(() => {
    return localStorage.getItem('colorMode') || 'light';
  });

  /**
   * Function to toggle the color mode between 'light' and 'dark'.
   * Saves the selected mode to localStorage for persistence across sessions.
   */
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => {
          const newMode = prevMode === 'light' ? 'dark' : 'light';
          localStorage.setItem('colorMode', newMode); // Save mode to localStorage
          return newMode;
        });
      },
    }),
    []
  );

  /**
   * Memoized theme based on the current mode.
   */
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <IconButton
          sx={{ position: 'fixed', top: 16, right: 16 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
          aria-label={`Toggle ${mode === 'light' ? 'dark' : 'light'} mode`}
        >
          {mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
        </IconButton>
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

/**
 * Additional Improvements:
 * - Added persistence using localStorage to remember the user's preferred colour mode.
 * - Added comprehensive comments to explain each functionality.
 * - Wrapped the colour mode toggle button within the ThemeProvider to ensure consistency.
 */
