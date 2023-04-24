/*
 * File: CircularLoader.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 2:10:32 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:04:23 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { FC } from 'react';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const CircularLoader: FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default CircularLoader;
