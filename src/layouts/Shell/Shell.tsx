/*
 * File: Shell.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:07:14 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { FC } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Header from 'src/components/shared/Header/Header';
import SideNav from 'src/components/shared/SideNav/SideNav';

const Shell: FC = () => {
  return (
    <Container maxWidth={false} disableGutters sx={{ height: '100vh' }}>
      <Header />
      <Box>
        <SideNav />
      </Box>
    </Container>
  );
};

export default Shell;
