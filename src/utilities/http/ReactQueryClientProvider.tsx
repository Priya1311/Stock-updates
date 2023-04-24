/*
 * File: ReactQueryClientProvider.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:09:26 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type ReactQueryClientProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const ReactQueryClientProvider: React.FC<ReactQueryClientProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryClientProvider;
