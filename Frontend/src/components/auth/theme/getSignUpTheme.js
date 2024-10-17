import { createTheme, alpha } from '@mui/material/styles';
import { brand, gray, green, orange, red } from './themeColors';

/**
 * Generates the theme tokens for the signup page based on the mode.
 *
 * @param {string} mode - The current theme mode ('light' or 'dark').
 * @returns {object} - The theme configuration object.
 */
const getSignUpTheme = (mode) => {
  const isDarkMode = mode === 'dark';

  return {
    palette: {
      mode,
      primary: {
        light: brand[200],
        main: brand[500],
        dark: brand[800],
        contrastText: isDarkMode ? brand[100] : brand[50],
        ...(isDarkMode && {
          light: brand[300],
          main: brand[400],
          dark: brand[800],
        }),
      },
      secondary: {
        light: green[200],
        main: green[500],
        dark: green[800],
        contrastText: isDarkMode ? green[50] : green[900],
      },
      warning: {
        light: isDarkMode ? orange[400] : orange[300],
        main: isDarkMode ? orange[500] : orange[400],
        dark: isDarkMode ? orange[700] : orange[800],
      },
      error: {
        light: isDarkMode ? red[400] : red[300],
        main: isDarkMode ? red[500] : red[400],
        dark: isDarkMode ? red[700] : red[800],
      },
      success: {
        light: isDarkMode ? green[400] : green[300],
        main: isDarkMode ? green[500] : green[400],
        dark: isDarkMode ? green[700] : green[800],
      },
      grey: {
        ...gray,
      },
      divider: alpha(isDarkMode ? gray[600] : gray[300], isDarkMode ? 0.3 : 0.5),
      background: {
        default: isDarkMode ? 'hsl(220, 30%, 3%)' : 'hsl(0, 0%, 100%)',
        paper: isDarkMode ? gray[900] : gray[100],
      },
      text: {
        primary: isDarkMode ? 'hsl(0, 0%, 100%)' : gray[800],
        secondary: isDarkMode ? gray[400] : gray[600],
      },
    },
    typography: {
      fontFamily: ['"Inter", "sans-serif"'].join(','),
      h1: {
        fontSize: '3.75rem', // 60px
        fontWeight: 600,
        lineHeight: 1.2,
      },
      h2: {
        fontSize: '3rem', // 48px
        fontWeight: 600,
        lineHeight: 1.25,
      },
      h3: {
        fontSize: '2.625rem', // 42px
        fontWeight: 500,
        lineHeight: 1.3,
      },
      h4: {
        fontSize: '2.25rem', // 36px
        fontWeight: 500,
        lineHeight: 1.35,
      },
      h5: {
        fontSize: '1.25rem', // 20px
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontSize: '1.125rem', // 18px
        fontWeight: 500,
        lineHeight: 1.5,
      },
      subtitle1: {
        fontSize: '1rem', // 16px
        fontWeight: 500,
        lineHeight: 1.5,
      },
      subtitle2: {
        fontSize: '0.875rem', // 14px
        fontWeight: 500,
        lineHeight: 1.57,
      },
      body1: {
        fontSize: '0.9375rem', // 15px
        fontWeight: 400,
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '0.875rem', // 14px
        fontWeight: 400,
        lineHeight: 1.57,
      },
      caption: {
        fontSize: '0.75rem', // 12px
        fontWeight: 400,
        lineHeight: 1.66,
      },
      button: {
        fontSize: '0.875rem', // 14px
        fontWeight: 700,
        textTransform: 'uppercase',
      },
    },
    shape: {
      borderRadius: 12,
    },
    shadows: isDarkMode
      ? [
          'none',
          '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
          '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
        ]
      : [
          'none',
          '0px 1px 3px rgba(0,0,0,0.12),0px 1px 2px rgba(0,0,0,0.24)',
          '0px 3px 6px rgba(0,0,0,0.16),0px 3px 6px rgba(0,0,0,0.23)',
        ],
  };
};

export default getSignUpTheme;
