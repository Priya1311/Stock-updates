/*
 * File: ThemeContext.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:06:36 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { useMemo } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';

import { ModeName, useChosenModeContext } from './ChosenModeContext';

type ThemeContextProviderProps = {
  children: React.ReactNode;
};
export const ThemeProvider = ({ children }: ThemeContextProviderProps) => {
  const { mode } = useChosenModeContext();
  const muiTheme = useMemo(() => createThemeHelper(mode), [mode]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

const brandColor = '#6666ff';
const createThemeHelper = (mode: ModeName) => {
  const isDark = mode === 'dark';
  return createTheme({
    palette: {
      mode,
      background: {
        default: isDark ? '#353636;' : '#f0f0f0',
        paper: isDark ? '#242526' : '#ffffff',
      },
      primary: {
        main: brandColor,
      },
      error: {
        main: '#FF0000',
      },
      success: {
        main: '#00FF00',
      },
    },
  });
};
