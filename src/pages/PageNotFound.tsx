/*
 * File: PageNotFound.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:08:29 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { FC } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';

import { useDocumentTitle } from '../hooks/custom-hooks';
import { RoutePaths } from '../routes';

const PageNotFound: FC = () => {
  useDocumentTitle('Page Not Found');

  return (
    <Box
      sx={{
        p: 2,
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography gutterBottom variant='h3'>
        Page Not Found
      </Typography>
      <Link component={RouterLink} to={RoutePaths.Root} replace={true}>
        Go to Home
      </Link>
    </Box>
  );
};

export default PageNotFound;
