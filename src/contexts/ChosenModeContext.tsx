/*
 * File: ChosenModeContext.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:06:17 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useLocalStorage } from '../hooks/custom-hooks';

export type ModeName = 'dark' | 'light';
type IChosenMode = {
  mode: ModeName;
  setMode: Dispatch<SetStateAction<ModeName>>;
};

const ChosenMode = createContext<IChosenMode>({} as IChosenMode);
export const useChosenModeContext = () => useContext(ChosenMode);

type ChosenModeContextProviderProps = {
  children: React.ReactNode;
};
export const ChosenModeProvider = ({ children }: ChosenModeContextProviderProps) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [mode, setMode] = useLocalStorage<ModeName>('mode', prefersDarkMode ? 'dark' : 'light');

  return <ChosenMode.Provider value={{ mode, setMode }}>{children}</ChosenMode.Provider>;
};
