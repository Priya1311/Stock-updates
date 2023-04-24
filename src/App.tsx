/*
 * File: App.tsx
 * Project: deriv-assignment
 * File Created: Friday, 21st April 2023 08:20:31 pm
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:10:29 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { FC } from 'react';

import { AuthContextProvider, ChosenModeProvider, ThemeProvider } from './contexts';
import AppRoutes from './routes';
import { ReactQueryClientProvider } from './utilities';

const App: FC = () => {
  return (
    <ChosenModeProvider>
      <ThemeProvider>
        <ReactQueryClientProvider>
          <AuthContextProvider>
            <AppRoutes />
          </AuthContextProvider>
        </ReactQueryClientProvider>
      </ThemeProvider>
    </ChosenModeProvider>
  );
};

export default App;
