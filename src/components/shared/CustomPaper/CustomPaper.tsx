/*
 * File: CustomPaper.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 12:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:02:44 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { FC } from 'react';
import Paper from '@mui/material/Paper';

type CustomPaperProps = {
  children: React.ReactNode;
};

const CustomPaper: FC<CustomPaperProps> = ({ children }) => {
  return (
    <Paper sx={{ p: 2, textAlign: 'center' }} elevation={1}>
      {children}
    </Paper>
  );
};

export default CustomPaper;
