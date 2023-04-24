/*
 * File: Header.tsx
 * Project: deriv-assignment
 * File Created: Saturday, 22nd April 2023 11:20:31 am
 * Author: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Last Modified: Monday, 24th April 2023 5:03:50 pm
 * Modified By: Priya Gupta (priyagupta.90@gmail.com)
 * -----
 * Copyright 2023 - 2023, Deriv By Priya
 */

import { FC, useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { CREDENTIALS_KEY } from 'src/constants';
import { useAuthContext, useChosenModeContext } from 'src/contexts';

const Header: FC = () => {
  const location = useLocation();
  const authCtx = useAuthContext();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [username, setUsername] = useState<string | null>(null);

  const { mode, setMode } = useChosenModeContext();

  useEffect(() => {
    const creds = localStorage.getItem(CREDENTIALS_KEY) || sessionStorage.getItem(CREDENTIALS_KEY);

    if (creds) {
      const { username } = JSON.parse(creds);
      setUsername(username);
    }
  }, []);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    setAnchorElUser(null);
    location.pathname = '/';
    authCtx.logout();
  };

  return (
    <AppBar position='fixed' enableColorOnDark>
      <Box px={2} sx={{ flexGrow: 1 }}>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component={NavLink}
            to='/'
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '3px',
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: 1,
            }}
          >
            Deriv Assignment
          </Typography>

          <Typography
            variant='h6'
            noWrap
            component={NavLink}
            to='/'
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '3px',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Deriv Assignment
          </Typography>
          <IconButton
            sx={{ mx: 1 }}
            onClick={() => setMode((mode) => (mode === 'dark' ? 'light' : 'dark'))}
            color='inherit'
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>{username?.charAt(0).toUpperCase()}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={handleCloseUserMenu}>
                <Stack display='row'>
                  <Typography textAlign='center'>
                    Signed in as{' '}
                    {username && (
                      <Tooltip arrow title={username?.length > 15 ? username : ''}>
                        <Typography sx={{ fontWeight: '700' }} variant='body1' component='span'>
                          {username?.length > 15 ? `${username?.slice(0, 15)}...` : username}
                        </Typography>
                      </Tooltip>
                    )}
                  </Typography>
                </Stack>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Typography textAlign='center'>Logout</Typography>
                <LogoutIcon sx={{ ml: 1 }} fontSize='small' />
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
};
export default Header;
